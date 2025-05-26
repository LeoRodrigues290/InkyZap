// src/components/ServicoList.tsx
import React, { useState } from "react"
import { FiEye, FiEdit2, FiCheckCircle } from "react-icons/fi"

interface Servico {
    id: string
    titulo: string
    nome_cliente: string
    cpf_cliente: string
    telefone_cliente: string
    valor: number
    custo_materiais: number
    data_entrada: any
    data_entrega: any
    status: string
}

interface Props {
    servicos: Servico[]
    onNovo: () => void
    onEditar: (s: Servico) => void
    onDetalhes: (s: Servico) => void
    onFinalizar: (s: Servico) => void
}

export default function ServicoList({
                                        servicos,
                                        onNovo,
                                        onEditar,
                                        onDetalhes,
                                        onFinalizar,
                                    }: Props) {
    const [filtro, setFiltro] = useState("abertos")
    const hoje = new Date()

    const formatarData = (ts: any) =>
        ts ? ts.toDate().toLocaleDateString("pt-BR") : "-"

    const traduzirStatus = (s: string) =>
        s === "aberto"
            ? "Aberto"
            : s === "em_andamento"
            ? "Em Andamento"
            : "Finalizado"

    const filtrados = servicos.filter(s =>
        filtro === "abertos" ? s.status !== "finalizado" : s.status === filtro
    )

    const avisos = filtrados.filter(s => {
        if (!s.data_entrega) return false
        const d = s.data_entrega.toDate()
        return (
            d.getFullYear() === hoje.getFullYear() &&
            d.getMonth() === hoje.getMonth() &&
            d.getDate() === hoje.getDate()
        )
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Serviços
                </h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                    <button
                        onClick={onNovo}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
                    >
                        Novo Serviço
                    </button>
                    <select
                        className="border bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg px-3 py-2"
                        value={filtro}
                        onChange={e => setFiltro(e.target.value)}
                    >
                        <option value="abertos">Abertos / Em andamento</option>
                        <option value="aberto">Abertos</option>
                        <option value="em_andamento">Em andamento</option>
                        <option value="finalizado">Finalizados</option>
                    </select>
                </div>
            </div>

            {/* Alertas */}
            {avisos.length > 0 && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg">
                    {avisos.map(s => (
                        <p key={s.id}>
                            ⚠️ Atenção: a data de entrega do serviço <strong>{s.titulo}</strong> é hoje!
                        </p>
                    ))}
                </div>
            )}

            {/* Mobile: Cards */}
            <div className="md:hidden space-y-4">
                {filtrados.map(s => (
                    <div
                        key={s.id}
                        className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex justify-between"
                    >
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">{s.titulo}</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Cliente: {s.nome_cliente}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                CPF: {s.cpf_cliente}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Valor: R$ {s.valor.toFixed(2).replace(".", ",")}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Entrada: {formatarData(s.data_entrada)}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Status: {traduzirStatus(s.status)}
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <button onClick={() => onDetalhes(s)} title="Detalhes" className="text-blue-500 hover:text-blue-600">
                                <FiEye size={20} />
                            </button>
                            <button onClick={() => onEditar(s)} title="Editar" className="text-yellow-400 hover:text-yellow-500">
                                <FiEdit2 size={20} />
                            </button>
                            {s.status !== "finalizado" && (
                                <button onClick={() => onFinalizar(s)} title="Finalizar" className="text-green-500 hover:text-green-600">
                                    <FiCheckCircle size={20} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop: Tabela */}
            <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                            Título
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                            Cliente
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                            CPF
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                            Valor
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                            Entrada
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                            Status
                        </th>
                        <th className="px-6 py-3 text-center text-xs font-semibold uppercase text-gray-600 dark:text-gray-300">
                            Ações
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filtrados.map(s => (
                        <tr key={s.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100">
                                {s.titulo}
                            </td>
                            <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{s.nome_cliente}</td>
                            <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{s.cpf_cliente}</td>
                            <td className="px-6 py-4 text-right text-gray-700 dark:text-gray-300">
                                R$ {s.valor.toFixed(2).replace(".", ",")}
                            </td>
                            <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                                {formatarData(s.data_entrada)}
                            </td>
                            <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                                {traduzirStatus(s.status)}
                            </td>
                            <td className="px-6 py-4 text-right flex justify-center gap-4">
                                <button onClick={() => onDetalhes(s)} title="Detalhes" className="text-blue-500 hover:text-blue-600">
                                    <FiEye />
                                </button>
                                <button onClick={() => onEditar(s)} title="Editar" className="text-yellow-400 hover:text-yellow-500">
                                    <FiEdit2 />
                                </button>
                                {s.status !== "finalizado" && (
                                    <button onClick={() => onFinalizar(s)} title="Finalizar" className="text-green-500 hover:text-green-600">
                                        <FiCheckCircle />
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
