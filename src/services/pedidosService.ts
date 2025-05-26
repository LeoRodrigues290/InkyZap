import {
    collection,
    addDoc,
    updateDoc,
    doc,
    onSnapshot,
    serverTimestamp,
    getDocs,
} from 'firebase/firestore'
import { db, auth } from 'src/firebase/config'
import { getUserName } from 'src/utils/userMap'
import { logActivity } from 'src/services/activityLogService'

const col = collection(db, 'pedidos')

export const onPedidosChange = (cb: (docs: any[]) => void) =>
    onSnapshot(col, snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() }))))

export const addPedido = async (descricao: string) => {
    const ref = await addDoc(col, {
        descricao,
        criado_por: auth.currentUser!.uid,
        criado_nome: getUserName(auth.currentUser!.uid),
        status: 'aberto',
        data_criacao: serverTimestamp(),
    })
    await logActivity(
        'pedido_criado',
        `Pedido “${descricao}” criado.`,
        { pedidoId: ref.id }
    )
    return ref
}

export const resolverPedido = async (id: string) => {
    await updateDoc(doc(db, 'pedidos', id), {
        status: 'resolvido',
        resolvido_por: auth.currentUser!.uid,
        resolvido_nome: getUserName(auth.currentUser!.uid),
    })
    await logActivity(
        'pedido_resolvido',
        `Pedido ${id} marcado como resolvido.`,
        { pedidoId: id }
    )
}

export const cancelarPedido = async (id: string) => {
    await updateDoc(doc(db, 'pedidos', id), {
        status: 'cancelado',
        resolvido_por: auth.currentUser!.uid,
        resolvido_nome: getUserName(auth.currentUser!.uid),
    })
    await logActivity(
        'pedido_cancelado',
        `Pedido ${id} cancelado.`,
        { pedidoId: id }
    )
}

/**
 * Busca **todos** os pedidos (autocomplete)
 */
export async function buscarPedidos() {
    const snap = await getDocs(col)
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
