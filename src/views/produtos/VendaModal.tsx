import { useState } from "react"
import { Icon }     from "@iconify/react"
import { Modal, Button, Label, TextInput } from "flowbite-react"
import { registrarVenda }                 from "src/services/vendasService"
import { auth }                           from "src/firebase/config"
import { toast }                          from "react-toastify"

interface Props {
    produto: any
    onClose: () => void
}

export default function VendaModal({ produto, onClose }: Props) {
    const [cliente, setCliente]   = useState("")
    const [telefone, setTelefone] = useState("")
    const [qtd, setQtd]           = useState(1)

    const handleSubmit = async () => {
        try {
            await registrarVenda({
                produto_id: produto.id,
                produto_nome: produto.titulo,
                cliente,
                telefone,
                quantidade: qtd,
            })
            toast.success("Venda registrada!")
            onClose()
        } catch {
            toast.error("Erro ao registrar venda")
        }
    }

    return (
        <Modal
            show
            onClose={onClose}
            className="rounded-2xl bg-white dark:bg-gray-800"
        >
            <Modal.Header className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Icon icon="solar:shopping-cart-bold" width={24} /> Registrar Venda
            </Modal.Header>
            <Modal.Body className="space-y-4 text-gray-700 dark:text-gray-200">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Icon icon="solar:user-line" width={20} className="text-gray-600 dark:text-gray-300"/>
                        <Label htmlFor="cliente" value="Cliente" />
                    </div>
                    <TextInput
                        id="cliente"
                        placeholder="Nome do cliente"
                        value={cliente}
                        onChange={e => setCliente(e.target.value)}
                        className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg"
                    />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Icon icon="solar:phone-call-line" width={20} className="text-gray-600 dark:text-gray-300"/>
                        <Label htmlFor="telefone" value="Telefone" />
                    </div>
                    <TextInput
                        id="telefone"
                        placeholder="(xx) xxxx-xxxx"
                        value={telefone}
                        onChange={e => setTelefone(e.target.value)}
                        className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg"
                    />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Icon icon="solar:numeric-1-square-line" width={20} className="text-gray-600 dark:text-gray-300"/>
                        <Label htmlFor="quantidade" value="Quantidade" />
                    </div>
                    <TextInput
                        id="quantidade"
                        type="number"
                        min="1"
                        value={qtd}
                        onChange={e => setQtd(+e.target.value)}
                        className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg"
                    />
                </div>
            </Modal.Body>
            <Modal.Footer className="space-x-2">
                <Button onClick={handleSubmit}>
                    <Icon icon="solar:shopping-cart-line" width={20} /> Vender
                </Button>
                <Button color="gray" onClick={onClose}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
