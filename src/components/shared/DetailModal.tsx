import React, { useEffect, useState } from 'react'
import { useDetailModal } from 'src/contexts/DetailModalContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from 'src/firebase/config'

export default function DetailModal() {
    const { isOpen, category, id, closeModal } = useDetailModal()
    const [data, setData] = useState<any>(null)

    useEffect(() => {
        if (!isOpen || !category || !id) return
        setData(null)
        const fetch = async () => {
            const ref = doc(db, category, id)
            const snap = await getDoc(ref)
            if (snap.exists()) setData({ id: snap.id, ...snap.data() })
            else setData({ error: 'Documento não encontrado.' })
        }
        fetch()
    }, [isOpen, category, id])

    if (!isOpen) return null
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-lg w-full relative">
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 dark:hover:text-white"
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-4 dark:text-white">
                    {category === 'produtos' ? 'Detalhes do Produto'
                        : category === 'servicos' ? 'Detalhes do Serviço'
                            : category === 'pedidos'  ? 'Detalhes do Pedido'
                                : 'Detalhes da Venda'}
                </h2>

                {!data ? (
                    <p className="text-gray-700 dark:text-gray-300">Carregando…</p>
                ) : data.error ? (
                    <p className="text-red-500">{data.error}</p>
                ) : (
                    <ul className="space-y-2 text-gray-800 dark:text-gray-200">
                        {Object.entries(data).map(([key, value]) => (
                            <li key={key}>
                                <span className="font-semibold">{key.replace(/_/g, ' ')}:</span>{' '}
                                {value?.toString()}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
