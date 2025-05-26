import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Fuse from 'fuse.js'

import { buscarProdutos } from 'src/services/produtosService'
import { buscarServicos } from 'src/services/servicosService'
import { buscarPedidos  } from 'src/services/pedidosService'
import { buscarVendas   } from 'src/services/vendasService'

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

export default function SearchResults() {
    const [params] = useSearchParams()
    const nav      = useNavigate()
    const q        = params.get('q') || ''
    const filter   = (params.get('filter') as SearchItem['category'] | 'all') || 'all'

    const [items,   setItems]   = useState<SearchItem[]>([])
    const [results, setResults] = useState<SearchItem[]>([])

    useEffect(() => {
        let mounted = true
        Promise.all([
            buscarProdutos(),
            buscarServicos(),
            buscarPedidos(),
            buscarVendas(),
        ]).then(([prods, servs, peds, vends]) => {
            if (!mounted) return
            const unified: SearchItem[] = []
            prods.forEach(p => {
                const n = p.titulo as string
                unified.push({
                    id: p.id, category: 'produtos', name: n, description: p.descricao,
                    nameNorm: normalizeText(n), descNorm: normalizeText(p.descricao || '')
                })
            })
            servs.forEach(s => {
                const n = s.titulo as string
                unified.push({
                    id: s.id, category: 'servicos', name: n, description: s.descricao,
                    nameNorm: normalizeText(n), descNorm: normalizeText(s.descricao || '')
                })
            })
            peds.forEach(d => {
                const n = d.descricao as string
                unified.push({
                    id: d.id, category: 'pedidos', name: n,
                    nameNorm: normalizeText(n), descNorm: ''
                })
            })
            vends.forEach(v => {
                const n = v.produto_nome as string
                unified.push({
                    id: v.id, category: 'vendas', name: n, description: v.cliente,
                    nameNorm: normalizeText(n), descNorm: normalizeText(v.cliente || '')
                })
            })
            setItems(unified)
        })
        return () => { mounted = false }
    }, [])

    useEffect(() => {
        if (!items.length) return
        const fuse = new Fuse(items, {
            keys: ['nameNorm','descNorm'],
            threshold: 0.4,
            ignoreLocation: true,
        })
        const normQ = normalizeText(q)
        let out = normQ ? fuse.search(normQ).map(r => r.item) : items
        if (filter !== 'all') {
            out = out.filter(i => i.category === filter)
        }
        setResults(out)
    }, [items, q, filter])

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 dark:text-gray-100">
                Resultados para <span className="text-blue-600">“{q}”</span>
            </h1>

            <div className="flex flex-wrap gap-3 mb-8">
                {(['all','produtos','servicos','pedidos','vendas'] as const).map(cat => (
                    <button
                        key={cat}
                        onClick={() => nav(`/search?q=${encodeURIComponent(q)}&filter=${cat}`)}
                        className={`px-4 py-2 rounded-full font-medium transition ${
                            filter === cat
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                    >
                        {cat === 'all' ? 'Tudo' : cat.charAt(0).toUpperCase()+cat.slice(1)}
                    </button>
                ))}
            </div>

            {results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {results.map(item => (
                        <div
                            key={`${item.category}:${item.id}`}
                            onClick={() => nav(`/${item.category}/${item.id}`)}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow hover:shadow-lg transition cursor-pointer"
                        >
                            <div className="flex justify-between items-start">
                                <h2 className="text-xl font-semibold dark:text-white">{item.name}</h2>
                                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 uppercase">
                  {item.category}
                </span>
                            </div>
                            {item.description && (
                                <p className="mt-2 text-gray-600 dark:text-gray-400">{item.description}</p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">Nenhum item encontrado.</p>
            )}
        </div>
    )
}
