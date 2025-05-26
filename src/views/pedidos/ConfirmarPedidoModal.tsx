import { FC } from "react"
import { Modal, Button } from "flowbite-react"
import { Icon } from "@iconify/react"

interface Props {
    action: "resolvido" | "cancelado"
    onConfirm: () => void
    onCancel: () => void
}

const MENSAGENS = {
    resolvido: "Tem certeza que deseja marcar este pedido como resolvido?",
    cancelado: "Tem certeza que deseja cancelar este pedido?",
} as const

export default function ConfirmarPedidoModal({
                                                 action,
                                                 onConfirm,
                                                 onCancel,
                                             }: Props) {
    const title =
        action === "resolvido" ? "Resolver Pedido" : "Cancelar Pedido"
    const iconTitle =
        action === "resolvido" ? "mdi:check-circle-outline" : "mdi:close-circle-outline"
    const buttonColor = action === "resolvido" ? "success" : "failure"

    return (
        <Modal
            show
            onClose={onCancel}
            className="rounded-2xl overflow-hidden"
        >
            <Modal.Header className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                <Icon icon={iconTitle} className="text-2xl" />
                <span className="text-xl font-semibold">{title}</span>
            </Modal.Header>

            <Modal.Body className="text-gray-700 dark:text-gray-200">
                {MENSAGENS[action]}
            </Modal.Body>

            <Modal.Footer className="flex justify-end space-x-3">
                <Button
                    color="gray"
                    onClick={onCancel}
                    className="flex items-center space-x-2"
                >
                    <Icon icon="mdi:close" />
                    <span>Cancelar</span>
                </Button>
                <Button
                    color={buttonColor}
                    onClick={onConfirm}
                    className="flex items-center space-x-2"
                >
                    <Icon icon={action === "resolvido" ? "mdi:check" : "mdi:close"} />
                    <span>Confirmar</span>
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
