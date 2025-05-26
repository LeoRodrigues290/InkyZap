import { FC } from "react";
import { FiXCircle } from "react-icons/fi";

interface Props {
    onConfirmar: () => void;
    onCancelar:  () => void;
}

const ConfirmarFinalizacaoModal: FC<Props> = ({ onConfirmar, onCancelar }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Finalizar Serviço</h2>
                <button
                    onClick={onCancelar}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                    <FiXCircle size={24} />
                </button>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
                Tem certeza que deseja finalizar este serviço?
            </p>
            <div className="flex justify-end mt-6 space-x-3">
                <button
                    onClick={onCancelar}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg"
                >
                    Cancelar
                </button>
                <button
                    onClick={onConfirmar}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
                >
                    Confirmar
                </button>
            </div>
        </div>
    </div>
);

export default ConfirmarFinalizacaoModal;
