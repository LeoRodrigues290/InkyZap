import {
    collection,
    addDoc,
    doc,
    updateDoc,
    runTransaction,
    query,
    limit,
    startAfter,
    getDocs,
    onSnapshot,
    serverTimestamp,
} from 'firebase/firestore'
import { db, auth } from 'src/firebase/config'
import { getUserName } from 'src/utils/userMap'
import { logActivity } from 'src/services/activityLogService'

const col = collection(db, 'produtos')

export const onProdutosChange = (cb: (docs: any[]) => void) =>
    onSnapshot(col, snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() }))))

export const addProduto = async (data: any) => {
    const ref = await addDoc(col, {
        ...data,
        criado_por: auth.currentUser!.uid,
        criado_nome: getUserName(auth.currentUser!.uid),
        createdAt: serverTimestamp(),
    })
    await logActivity(
        'produto_criado',
        `Produto “${data.titulo}” criado.`,
        { produtoId: ref.id }
    )
    return ref
}

export const editProduto = async (id: string, dados: any) => {
    await updateDoc(doc(db, 'produtos', id), {
        ...dados,
        updatedAt: serverTimestamp(),
    })
    await logActivity(
        'produto_editado',
        `Produto “${dados.titulo || id}” editado.`,
        { produtoId: id }
    )
}

export const venderProduto = async (id: string, qtd: number) => {
    let titulo = ''
    await runTransaction(db, async tx => {
        const ref = doc(db, 'produtos', id)
        const snap = await tx.get(ref)
        titulo = snap.data()?.titulo
        const atual = snap.data()?.quantidade ?? 0
        if (atual < qtd) throw new Error('Estoque insuficiente')
        tx.update(ref, { quantidade: atual - qtd })
    })
    await logActivity(
        'produto_vendido',
        `Vendidos ${qtd}× “${titulo}”.`,
        { produtoId: id, quantidade: qtd }
    )
}

export const fetchProdutosPage = async (last: any) => {
    let q = query(col, limit(10))
    if (last) q = query(col, startAfter(last), limit(10))
    const snap = await getDocs(q)
    return {
        lastDoc: snap.docs[snap.docs.length - 1],
        data: snap.docs.map(d => ({ id: d.id, ...d.data() })),
    }
}

/**
 * Busca **todos** os produtos (autocomplete)
 */
export async function buscarProdutos() {
    const snap = await getDocs(col)
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
