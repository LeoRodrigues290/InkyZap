import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "flowbite-react";
import {
    subscribeToLembretes,
    deleteLembrete,
} from "src/services/lembretesService";

const MESSAGES = {
    excluir: "Tem certeza que deseja excluir este lembrete?",
} as const;

export default function RemindersPreview() {
    const [lembretes, setLembretes] = useState<
        { id: string; mensagem: string; createdAt: Date }[]
        >([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toDeleteId, setToDeleteId] = useState<string | null>(null);

    useEffect(() => {
        const unsub = subscribeToLembretes(setLembretes);
        return () => unsub();
    }, []);

    const top3 = lembretes.slice(0, 3);

    function openModal(id: string) {
        setToDeleteId(id);
        setIsModalOpen(true);
    }

    async function handleConfirm() {
        if (!toDeleteId) return;
        await deleteLembrete(toDeleteId);
        setIsModalOpen(false);
        setToDeleteId(null);
    }

    const fmtDate = (d: Date) =>
        d.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

    return (
        <div className="relative">
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
                    <Button onClick={handleConfirm}>Excluir</Button>
                </Modal.Footer>
            </Modal>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 space-y-3">
                <h3 className="text-lg font-medium dark:text-white">
                    Próximos Lembretes
                </h3>

                {top3.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400">Sem lembretes</p>
                ) : (
                    <ul className="space-y-2">
                        {top3.map((rem) => (
                            <li
                                key={rem.id}
                                className="relative p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                            >
                                <button
                                    onClick={() => openModal(rem.id)}
                                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                                >
                                    ✕
                                </button>
                                <p className="text-gray-800 dark:text-gray-200">
                                    {rem.mensagem}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {fmtDate(rem.createdAt)}
                                </p>
                            </li>
                        ))}
                    </ul>
                )}

                {lembretes.length > 3 && (
                    <Link
                        to="/lembretes"
                        className="block text-center text-sm text-blue-600 hover:underline"
                    >
                        Ver mais…
                    </Link>
                )}
            </div>
        </div>
    );
}
