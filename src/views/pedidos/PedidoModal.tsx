import { FC, useState } from "react"
import {
    Modal,
    Button,
    Label,
    TextInput,
} from "flowbite-react"
import { Icon } from "@iconify/react"

interface Props {
    onClose: () => void
    onSave: (descricao: string) => void
}

export default function PedidoModal({ onClose, onSave }: Props) {
    const [desc, setDesc] = useState("")

    return (
        <Modal
            show
            onClose={onClose}
            className="rounded-2xl overflow-hidden"
            size="md"
        >
            <Modal.Header className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                <Icon icon="mdi:plus-box-outline" className="text-2xl" />
                <span className="text-xl font-semibold">Novo Pedido</span>
            </Modal.Header>

            <Modal.Body className="space-y-4 text-gray-700 dark:text-gray-200">
                <div>
                    <Label htmlFor="desc" value="Descrição" />
                    <TextInput
                        id="desc"
                        type="text"
                        placeholder="O que precisa?"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className="
              mt-2 bg-gray-100 dark:bg-gray-700
              border border-gray-300 dark:border-gray-600
              text-gray-900 dark:text-gray-100
              rounded-lg w-full
              focus:ring-2 focus:ring-primary
            "
                    />
                </div>
            </Modal.Body>

            <Modal.Footer className="flex justify-end space-x-2">
                <Button
                    onClick={() => onSave(desc)}
                    className="inline-flex items-center gap-1"
                >
                    <Icon icon="mdi:content-save-outline" />
                    Salvar
                </Button>
                <Button
                    color="gray"
                    onClick={onClose}
                    className="inline-flex items-center gap-1"
                >
                    <Icon icon="mdi:close" />
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
