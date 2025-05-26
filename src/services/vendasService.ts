import {
    collection,
    addDoc,
    getDocs,
    doc,
    runTransaction,
    serverTimestamp,
} from 'firebase/firestore'
import { db, auth } from 'src/firebase/config'
import { logActivity } from 'src/services/activityLogService'
import { getUserName } from 'src/utils/userMap'

const col = collection(db, 'vendas')

export const registrarVenda = async (dados: {
    produto_id: string
    produto_nome: string
    cliente: string
    telefone: string
    quantidade: number
}) => {
    const produtoRef = doc(db, 'produtos', dados.produto_id)
    let vendaRef: any
    let unitPrice = 0
    const vendedorId = auth.currentUser!.uid
    const vendedorNome = getUserName(vendedorId, auth.currentUser!.displayName || 'Usuário')

    await runTransaction(db, async transaction => {
        const produtoDoc = await transaction.get(produtoRef)
        if (!produtoDoc.exists()) throw new Error('Produto não encontrado')

        const estoqueAtual = produtoDoc.data()?.quantidade || 0
        if (estoqueAtual < dados.quantidade) throw new Error('Estoque insuficiente')

        transaction.update(produtoRef, { quantidade: estoqueAtual - dados.quantidade })
        unitPrice = produtoDoc.data()?.valor_final || 0

        vendaRef = await addDoc(col, {
            produto_id: dados.produto_id,
            produto_nome: dados.produto_nome,
            cliente: dados.cliente,
            telefone: dados.telefone,
            quantidade: dados.quantidade,
            vendido_por: vendedorId,
            vendido_nome: vendedorNome,
            valor_unitario: unitPrice,
            total: unitPrice * dados.quantidade,
            data_venda: serverTimestamp(),
        })
    })

    await logActivity(
        'venda_registrada',
        `Venda de ${dados.quantidade}× "${dados.produto_nome}" realizada por ${vendedorNome} (total R$${(unitPrice * dados.quantidade).toFixed(2)})`,
        { produtoId: dados.produto_id, vendaId: vendaRef.id, total: unitPrice * dados.quantidade }
    )

    return vendaRef
}

/**
 * Busca **todas** as vendas (autocomplete)
 */
export async function buscarVendas() {
    const snap = await getDocs(col)
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
