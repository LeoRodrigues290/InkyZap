import { useState } from "react"
import { Icon } from "@iconify/react"
import { toast } from "react-toastify"

import PedidoList from "./PedidoList"
import PedidoModal from "./PedidoModal"
import ConfirmarPedidoModal from "./ConfirmarPedidoModal"
import { usePedidos } from "src/hooks/usePedidos"
import {
    addPedido,
    resolverPedido,
    cancelarPedido,
} from "src/services/pedidosService"

export default function PedidosPage() {
    const { pedidos, loading } = usePedidos()
    const [isNewOpen, setNewOpen] = useState(false)
    const [confirm, setConfirm] = useState<{
        id: string
        action: "resolvido" | "cancelado"
    } | null>(null)

    const handleAdd = async (descricao: string) => {
        try {
            await addPedido(descricao)
            toast.success("Pedido criado!")
            setNewOpen(false)
        } catch {
            toast.error("Erro ao criar pedido")
        }
    }

    const handleConfirm = async () => {
        if (!confirm) return
        try {
            if (confirm.action === "resolvido")
                await resolverPedido(confirm.id)
            else
                await cancelarPedido(confirm.id)

            toast.success(
                `Pedido ${
                    confirm.action === "resolvido" ? "resolvido" : "cancelado"
                }!`
            )
            setConfirm(null)
        } catch {
            toast.error("Erro ao executar ação")
        }
    }

    if (loading)
        return (
            <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
                Carregando pedidos…
            </div>
        )

    return (
        <div className="container mx-auto px-4 py-8 space-y-6">
            {/* Cabeçalho */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    Pedidos
                </h1>
                <button
                    onClick={() => setNewOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition"
                >
                    <Icon icon="mdi:plus-circle-outline" className="text-xl" />
                    Novo Pedido
                </button>
            </div>

            {/* Lista */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <PedidoList
                    pedidos={pedidos}
                    onResolve={(id) => setConfirm({ id, action: "resolvido" })}
                    onCancel={(id) => setConfirm({ id, action: "cancelado" })}
                />
            </div>

            {/* Modals */}
            {isNewOpen && (
                <PedidoModal
                    onClose={() => setNewOpen(false)}
                    onSave={handleAdd}
                />
            )}
            {confirm && (
                <ConfirmarPedidoModal
                    action={confirm.action}
                    onConfirm={handleConfirm}
                    onCancel={() => setConfirm(null)}
                />
            )}
        </div>
    )
}
