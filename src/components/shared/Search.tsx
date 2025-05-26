// src/components/shared/Search.tsx
import React, { useEffect, useState, useRef } from 'react'
import Fuse from 'fuse.js'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'

import { buscarProdutos } from 'src/services/produtosService'
import { buscarServicos } from 'src/services/servicosService'
import { buscarPedidos }  from 'src/services/pedidosService'
import { buscarVendas }   from 'src/services/vendasService'
import { useDetailModal } from 'src/contexts/DetailModalContext'

type SearchItem = {
    id: string
    category: 'produtos' | 'servicos' | 'pedidos' | 'vendas'
    name: string
    description?: string
    nameNorm: string
    descNorm: string
}

function normalizeText(str: string) {
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase()
}

export default function Search() {
    const navigate = useNavigate()
    const { openModal } = useDetailModal()

    const [items,  setItems]  = useState<SearchItem[]>([])
    const [q,      setQ]      = useState('')
    const [filter, setFilter] = useState<'all' | SearchItem['category']>('all')
    const [open,   setOpen]   = useState(false)
    const fuse = useRef<Fuse<SearchItem>>()
    const ref = useRef<HTMLFormElement>(null)

    // carregar e indexar tudo uma única vez
    useEffect(() => {
        async function loadAll() {
            const [prods, servs, peds, vends] = await Promise.all([
                buscarProdutos(),
                buscarServicos(),
                buscarPedidos(),
                buscarVendas(),
            ])
            const unified: SearchItem[] = []

            prods.forEach(p => {
                const name = p.titulo as string
                const desc = (p.descricao as string) || ''
                unified.push({
                    id: p.id,
                    category: 'produtos',
                    name,
                    description: desc,
                    nameNorm: normalizeText(name),
                    descNorm: normalizeText(desc),
                })
            })
            servs.forEach(s => {
                const name = s.titulo as string
                const desc = (s.descricao as string) || ''
                unified.push({
                    id: s.id,
                    category: 'servicos',
                    name,
                    description: desc,
                    nameNorm: normalizeText(name),
                    descNorm: normalizeText(desc),
                })
            })
            peds.forEach(d => {
                const name = d.descricao as string
                unified.push({
                    id: d.id,
                    category: 'pedidos',
                    name,
                    description: '',
                    nameNorm: normalizeText(name),
                    descNorm: '',
                })
            })
            vends.forEach(v => {
                const name = v.produto_nome as string
                const desc = (v.cliente as string) || ''
                unified.push({
                    id: v.id,
                    category: 'vendas',
                    name,
                    description: desc,
                    nameNorm: normalizeText(name),
                    descNorm: normalizeText(desc),
                })
            })

            setItems(unified)
            fuse.current = new Fuse(unified, {
                keys: ['nameNorm', 'descNorm'],
                threshold: 0.4,
                ignoreLocation: true,
            })
        }
        loadAll()
    }, [])

    // resultados instantâneos
    const normQ = normalizeText(q)
    const raw = q && fuse.current
        ? fuse.current.search(normQ).map(r => r.item)
        : []
    const hits = filter === 'all'
        ? raw
        : raw.filter(i => i.category === filter)

    // fecha dropdown ao clicar fora
    useEffect(() => {
        function onClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', onClickOutside)
        return () => document.removeEventListener('mousedown', onClickOutside)
    }, [])

    // ao pressionar Enter, navega para a página de resultados
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setOpen(false)
        navigate(`/search?q=${encodeURIComponent(q)}&filter=${filter}`)
    }

    return (
        <form
            ref={ref}
            onSubmit={handleSubmit}
            className="relative w-full max-w-md"
        >
            <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
          <Icon icon="mdi:magnify" width="20" height="20" />
        </span>
                <input
                    type="text"
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    onFocus={() => setOpen(true)}
                    placeholder="Buscar..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>

            {open && q && (
                <div className="absolute mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-auto max-h-80 z-50">
                    {/* filtros */}
                    <div className="flex flex-wrap gap-2 p-3 border-b border-gray-100 dark:border-gray-700">
                        {(['all','produtos','servicos','pedidos','vendas'] as const).map(cat => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setFilter(cat)}
                                className={
                                    filter === cat
                                        ? 'px-3 py-1 text-sm font-medium rounded-full bg-blue-600 text-white'
                                        : 'px-3 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                }
                            >
                                {cat === 'all' ? 'Tudo' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </button>
                        ))}
                    </div>

                    {/* sugestões */}
                    {hits.length > 0 ? (
                        hits.slice(0, 5).map(hit => (
                            <div
                                key={`${hit.category}:${hit.id}`}
                                onClick={() => {
                                    setOpen(false)
                                    openModal(hit.category, hit.id)
                                }}
                                className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition cursor-pointer"
                            >
                                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800 dark:text-gray-100">
                    {hit.name}
                  </span>
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 uppercase">
                    {hit.category}
                  </span>
                                </div>
                                {hit.description && (
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        {hit.description}
                                    </p>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                            Nenhum resultado encontrado
                        </div>
                    )}
                </div>
            )}
        </form>
    )
}
