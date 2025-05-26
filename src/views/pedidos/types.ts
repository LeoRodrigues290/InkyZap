import { Timestamp } from "firebase/firestore";

export type PedidoStatus = "aberto" | "resolvido" | "cancelado";

export interface Pedido {
    id: string;
    descricao: string;
    criado_por: string;
    criado_nome: string;
    status: PedidoStatus;
    data_criacao: Timestamp;
    resolvido_por?: string;
    resolvido_nome?: string;
}
