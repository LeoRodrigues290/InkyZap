import React, { useState } from "react"
import { useListaCompras } from "src/hooks/useListaCompras"
import {
    addItemLista,
    updateItemLista,
    deleteItemLista,
    ListaItem,
} from "src/services/listaComprasService"

import ShoppingForm from "./ShoppingForm"
import ShoppingItems from "./ShoppingItems"

export default function ShoppingList() {
    const { items, loading } = useListaCompras()

    const [nome, setNome] = useState("")
    const [valor, setValor] = useState<number>(0)
    const [quant, setQuant] = useState<number>(1)
    const [editingId, setEditingId] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (editingId) {
            await updateItemLista(editingId, { nome, valor, quantidade: quant })
        } else {
            await addItemLista(nome, valor, quant)
        }
        setNome("")
        setValor(0)
        setQuant(1)
        setEditingId(null)
    }

    function handleEdit(i: ListaItem) {
        setEditingId(i.id)
        setNome(i.nome)
        setValor(i.valor)
        setQuant(i.quantidade)
    }

    async function handleRemove(id: string) {
        if (window.confirm("Deseja remover este item?")) {
            await deleteItemLista(id)
        }
    }

    return (
        <div className="space-y-6">
            <ShoppingForm
                nome={nome}
                valor={valor}
                quant={quant}
                editingId={editingId}
                onChangeNome={setNome}
                onChangeValor={setValor}
                onChangeQuant={setQuant}
                onSubmit={handleSubmit}
            />

            <ShoppingItems
                items={items}
                loading={loading}
                onEdit={handleEdit}
                onRemove={handleRemove}
            />
        </div>
    )
}
