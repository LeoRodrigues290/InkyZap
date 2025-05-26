import React from "react"

interface Props {
    nome: string
    valor: number
    quant: number
    editingId: string | null
    onChangeNome: (v: string) => void
    onChangeValor: (v: number) => void
    onChangeQuant: (v: number) => void
    onSubmit: (e: React.FormEvent) => void
}

export default function ShoppingForm({
                                         nome,
                                         valor,
                                         quant,
                                         editingId,
                                         onChangeNome,
                                         onChangeValor,
                                         onChangeQuant,
                                         onSubmit,
                                     }: Props) {
    return (
        <form
            onSubmit={onSubmit}
            className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow"
        >
            <div className="flex flex-col">
                <label
                    htmlFor="nome"
                    className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Nome do produto
                </label>
                <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(e) => onChangeNome(e.target.value)}
                    className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring focus:ring-blue-300"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="valor"
                    className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Valor (R$)
                </label>
                <input
                    id="valor"
                    type="number"
                    value={valor}
                    onChange={(e) => onChangeValor(+e.target.value)}
                    className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring focus:ring-blue-300"
                    min={0}
                    step="0.01"
                    required
                />
            </div>
            <div className="flex flex-col">
                <label
                    htmlFor="quant"
                    className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Quantidade
                </label>
                <input
                    id="quant"
                    type="number"
                    value={quant}
                    onChange={(e) => onChangeQuant(+e.target.value)}
                    className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring focus:ring-blue-300"
                    min={1}
                    required
                />
            </div>
            <div className="flex items-end">
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow transition"
                >
                    {editingId ? "Atualizar Item" : "Adicionar à Lista"}
                </button>
            </div>
        </form>
    )
}
