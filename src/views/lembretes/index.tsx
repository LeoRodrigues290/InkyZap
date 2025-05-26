import { useState, useEffect } from "react";
import { Modal, Button } from "flowbite-react";
import {
    subscribeToLembretes,
    addLembrete,
    deleteLembrete,
} from "src/services/lembretesService";

interface Rem {
    id: string;
    mensagem: string;
    createdAt: Date;
}

const MESSAGES = {
    excluir: "Tem certeza que deseja excluir este lembrete?",
} as const;

export default function Lembretes() {
    const [lista, setLista] = useState<Rem[]>([]);
    const [mensagem, setMensagem] = useState("");
    const [saving, setSaving] = useState(false);

    // Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toDeleteId, setToDeleteId] = useState<string | null>(null);

    useEffect(() => {
        const unsub = subscribeToLembretes(setLista);
        return () => unsub();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!mensagem.trim()) return;
        setSaving(true);
        try {
            await addLembrete(mensagem.trim());
            setMensagem("");
        } finally {
            setSaving(false);
        }
    }

    function openDeleteModal(id: string) {
        setToDeleteId(id);
        setIsModalOpen(true);
    }

    async function handleDeleteConfirm() {
        if (!toDeleteId) return;
        await deleteLembrete(toDeleteId);
        setIsModalOpen(false);
        setToDeleteId(null);
    }

    const fmt = (d: Date) =>
        d.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Modal de confirmação */}
            <Modal
                show={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                className="rounded-2xl bg-white dark:bg-gray-800"
            >
                <Modal.Header className="text-gray-900 dark:text-gray-100">
                    Confirmar Exclusão
                </Modal.Header>
                <Modal.Body className="text-gray-700 dark:text-gray-200">
                    {MESSAGES.excluir}
                </Modal.Body>
                <Modal.Footer className="space-x-2">
                    <Button color="gray" onClick={() => setIsModalOpen(false)}>
                        Cancelar
                    </Button>
                    <Button onClick={handleDeleteConfirm}>Excluir</Button>
                </Modal.Footer>
            </Modal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Formulário */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold dark:text-white mb-4">
                        Meus Lembretes
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Deixe aqui o seu lembrete, somente você poderá ver seus lembretes.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Digite seu lembrete..."
                className="w-full h-40 px-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
            />
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {saving ? "Salvando..." : "Salvar Lembrete"}
                        </button>
                    </form>
                </div>

                {/* Lista de cards */}
                <div className="space-y-4">
                    {lista.length === 0 ? (
                        <p className="text-gray-500 dark:text-gray-400">
                            Nenhum lembrete ainda.
                        </p>
                    ) : (
                        lista.map((rem) => (
                            <div
                                key={rem.id}
                                className="relative bg-white dark:bg-gray-800 rounded-lg shadow p-4"
                            >
                                <button
                                    onClick={() => openDeleteModal(rem.id)}
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                >
                                    ✕
                                </button>
                                <p className="text-gray-800 dark:text-gray-200">
                                    {rem.mensagem}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                    {fmt(rem.createdAt)}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
