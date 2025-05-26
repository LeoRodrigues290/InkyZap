// src/utils/pdfUtils.ts

import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { formatCurrency } from 'src/utils/formatCurrency'
import type { ListaItem } from 'src/services/listaComprasService'

export function generateShoppingListPDF(items: ListaItem[]): void {
    const pdf = new jsPDF()
    pdf.setFontSize(18)
    pdf.text('Lista de Compras', 14, 20)

    const body = items.map(i => {
        const subtotal = i.valor * i.quantidade
        return [
            i.nome,
            formatCurrency(i.valor),
            i.quantidade.toString(),
            formatCurrency(subtotal),
        ]
    })

    const total = items
        .reduce((sum, i) => sum + i.valor * i.quantidade, 0)

    autoTable(pdf, {
        startY: 30,
        head: [['Produto', 'Valor (R$)', 'Quantidade', 'Subtotal (R$)']],
        body,
        foot: [['Total', '', '', formatCurrency(total)]],
        theme: 'grid',
        headStyles: { fillColor: [29, 78, 216], textColor: [255, 255, 255] },
        footStyles: { fillColor: [29, 78, 216], textColor: [255, 255, 255] },
        styles: { halign: 'center' },
        columnStyles: { 0: { halign: 'left' } },
    })

    pdf.save('lista-de-compras.pdf')
}
