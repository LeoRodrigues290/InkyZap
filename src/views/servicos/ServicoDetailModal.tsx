// src/components/ServicoDetailModal.tsx
import { FC } from "react"
import { FiX } from "react-icons/fi"
import { formatarData } from "src/utils/formatDate"

interface Props {
    servico: any
    onClose: () => void
}

const ServicoDetailModal: FC<Props> = ({ servico, onClose }) => {
    if (!servico) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg w-full max-w-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <FiX size={24} />
                </button>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Detalhes do Serviço
                </h2>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                    <p><strong>Título:</strong> {servico.titulo}</p>
                    <p><strong>Cliente:</strong> {servico.nome_cliente}</p>
                    <p><strong>CPF:</strong> {servico.cpf_cliente}</p>
                    <p><strong>Telefone:</strong> {servico.telefone_cliente}</p>
                    <p><strong>Descrição:</strong> {servico.descricao}</p>
                    <p><strong>Valor:</strong> R$ {servico.valor.toFixed(2).replace(".", ",")}</p>
                    <p><strong>Custo Materiais:</strong> R$ {servico.custo_materiais.toFixed(2).replace(".", ",")}</p>
                    <p><strong>Data de Serviço:</strong> {formatarData(servico.data_entrada)}</p>
                    <p><strong>Data de Entrega:</strong> {formatarData(servico.data_entrega)}</p>
                    <p><strong>Status:</strong> {servico.status}</p>
                    <p><strong>Criado Por:</strong> {servico.criado_nome}</p>
                </div>
            </div>
        </div>
    )
}

export default ServicoDetailModal
