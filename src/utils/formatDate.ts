// src/utils/formatDate.ts
import { Timestamp } from "firebase/firestore";

/**
 * Recebe um Timestamp do Firestore ou um Date nativo
 * e retorna uma string no formato DD/MM/AAAA.
 */
export function formatarData(
    data: Timestamp | Date | null | undefined
): string {
    if (!data) return "-";

    // Se for Timestamp, converte para Date
    const date: Date =
        data instanceof Timestamp
            ? data.toDate()
            : data as Date;

    return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}
