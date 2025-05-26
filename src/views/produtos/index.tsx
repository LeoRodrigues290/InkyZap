import React, { useState } from "react"
import { Icon } from "@iconify/react"

import { useProdutos } from "src/hooks/useProdutos"
import ProdutoList      from "./ProdutoList"
import ShoppingList     from "./ShoppingList"
import ProdutoModal     from "./ProdutoModal"
import VendaModal       from "./VendaModal"
import VendasRealizadas from "./VendasRealizadas"
import { useListaCompras } from "src/hooks/useListaCompras"
import { generateShoppingListPDF } from "src/utils/pdfUtils"

export default function ProdutosPage() {
    const { produtos, loading } = useProdutos()
    const { items: listaItems } = useListaCompras()

    const [showProdutoModal, setShowProdutoModal]         = useState(false)
    const [showVendaModal, setShowVendaModal]             = useState(false)
    const [showVendasRealizadas, setShowVendasRealizadas] = useState(false)
    const [showLista, setShowLista]                       = useState(false)
    const [selecionado, setSelecionado]                   = useState<any>(null)

    if (loading) {
        return (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                Carregando produtos…
            </div>
        )
    }

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="flex items-center gap-2 text-3xl font-semibold text-gray-900 dark:text-gray-100">
                    <Icon icon="solar:tag-bold" width={28} />
                    {showLista ? "Lista de Compras" : "Produtos"}
                </h1>

                <div className="flex flex-wrap gap-3">
                    {showLista ? (
                        <>
                            <button
                                onClick={() => generateShoppingListPDF(listaItems)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow transition"
                            >
                                <Icon icon="mdi:download-outline" width={20} />
                                Salvar Lista
                            </button>
                            <button
                                onClick={() => setShowLista(false)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl shadow transition"
                            >
                                <Icon icon="mdi:arrow-left-circle-outline" width={20} />
                                Voltar
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    setSelecionado(null)
                                    setShowProdutoModal(true)
                                }}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow transition"
                            >
                                <Icon icon="solar:plus-bold" width={20} />
                                Novo Produto
                            </button>
                            <button
                                onClick={() => setShowVendasRealizadas(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow transition"
                            >
                                <Icon icon="solar:shopping-cart-line" width={20} />
                                Vendas Realizadas
                            </button>
                            <button
                                onClick={() => setShowLista(true)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow transition"
                            >
                                <Icon icon="mdi:format-list-bulleted" width={20} />
                                Lista de Compras
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
                {showLista ? (
                    <ShoppingList />
                ) : showVendasRealizadas ? (
                    <VendasRealizadas onVoltar={() => setShowVendasRealizadas(false)} />
                ) : (
                    <ProdutoList
                        produtos={produtos}
                        onEditar={(p) => {
                            setSelecionado(p)
                            setShowProdutoModal(true)
                        }}
                        onVender={(p) => {
                            setSelecionado(p)
                            setShowVendaModal(true)
                        }}
                    />
                )}
            </div>

            {/* Modals */}
            {showProdutoModal && (
                <ProdutoModal
                    produto={selecionado}
                    onClose={() => {
                        setSelecionado(null)
                        setShowProdutoModal(false)
                    }}
                />
            )}
            {showVendaModal && (
                <VendaModal
                    produto={selecionado}
                    onClose={() => {
                        setSelecionado(null)
                        setShowVendaModal(false)
                    }}
                />
            )}
        </div>
    )
}
