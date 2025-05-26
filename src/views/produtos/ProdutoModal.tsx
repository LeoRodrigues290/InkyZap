import { useState }              from "react"
import { Icon }                  from "@iconify/react"
import { Modal, Button, Label, TextInput } from "flowbite-react"
import { addProduto, editProduto }         from "src/services/produtosService"
import { auth }                  from "src/firebase/config"
import { toast }                 from "react-toastify"

interface Props {
    produto: any
    onClose: () => void
}

export default function ProdutoModal({ produto, onClose }: Props) {
    const [titulo,    setTitulo]    = useState(produto?.titulo || "")
    const [descricao, setDescricao] = useState(produto?.descricao || "")
    const [quant,     setQuant]     = useState(produto?.quantidade || 0)
    const [vBruto,    setVBruto]    = useState(produto?.valor_bruto || 0)
    const [vFinal,    setVFinal]    = useState(produto?.valor_final || 0)

    const handleSubmit = async () => {
        try {
            const dados = {
                titulo,
                descricao,
                quantidade: quant,
                valor_bruto: vBruto,
                valor_final: vFinal,
                criado_por: auth.currentUser?.uid,
                criado_nome: auth.currentUser?.displayName || "Usuário",
            }
            if (produto?.id) {
                await editProduto(produto.id, dados)
                toast.success("Produto atualizado!")
            } else {
                await addProduto(dados)
                toast.success("Produto criado!")
            }
            onClose()
        } catch {
            toast.error("Erro ao salvar produto")
        }
    }

    return (
        <Modal
            show
            onClose={onClose}
            className="rounded-2xl bg-white dark:bg-gray-800"
        >
            <Modal.Header className="text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Icon icon="solar:tag-bold" width={24} />
                {produto ? "Editar Produto" : "Novo Produto"}
            </Modal.Header>
            <Modal.Body className="space-y-6 text-gray-700 dark:text-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label htmlFor="titulo" value="Título" />
                        <TextInput
                            id="titulo"
                            placeholder="Título do produto"
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)}
                            className="mt-2 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg"
                        />
                    </div>
                    <div>
                        <Label htmlFor="descricao" value="Descrição" />
                        <TextInput
                            id="descricao"
                            placeholder="Descrição do produto"
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                            className="mt-2 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg"
                        />
                    </div>
                    <div>
                        <Label htmlFor="quantidade" value="Quantidade em estoque" />
                        <TextInput
                            id="quantidade"
                            type="number"
                            placeholder="0"
                            value={quant}
                            onChange={e => setQuant(+e.target.value)}
                            className="mt-2 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg"
                        />
                    </div>
                    <div>
                        <Label htmlFor="valorBruto" value="Valor Bruto (Custo)" />
                        <TextInput
                            id="valorBruto"
                            type="number"
                            placeholder="0"
                            value={vBruto}
                            onChange={e => setVBruto(+e.target.value)}
                            className="mt-2 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg"
                        />
                    </div>
                    <div>
                        <Label htmlFor="valorFinal" value="Valor Final (Venda)" />
                        <TextInput
                            id="valorFinal"
                            type="number"
                            placeholder="0"
                            value={vFinal}
                            onChange={e => setVFinal(+e.target.value)}
                            className="mt-2 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 rounded-lg"
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="space-x-2">
                <Button onClick={handleSubmit}>
                    <Icon icon="solar:save-bold" width={20} /> Salvar
                </Button>
                <Button color="gray" onClick={onClose}>
                    Cancelar
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
