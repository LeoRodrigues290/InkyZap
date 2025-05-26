import {
    getFirestore,
    collection,
    query,
    orderBy,
    onSnapshot,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
} from "firebase/firestore"

export interface ListaItem {
    id: string
    nome: string
    valor: number
    quantidade: number
    createdAt: Date
}

const db = getFirestore()
const colRef = collection(db, "listaCompras")

export function subscribeToListaCompras(
    callback: (items: ListaItem[]) => void
) {
    const q = query(colRef, orderBy("createdAt", "desc"))
    const unsub = onSnapshot(q, (snap) => {
        const arr: ListaItem[] = snap.docs.map((d) => {
            const data = d.data() as any
            return {
                id: d.id,
                nome: data.nome,
                valor: data.valor,
                quantidade: data.quantidade,
                createdAt: data.createdAt?.toDate() ?? new Date(),
            }
        })
        callback(arr)
    })
    return unsub
}

export async function addItemLista(
    nome: string,
    valor: number,
    quantidade: number
) {
    return addDoc(colRef, {
        nome,
        valor,
        quantidade,
        createdAt: serverTimestamp(),
    })
}

export async function updateItemLista(
    id: string,
    fields: { nome: string; valor: number; quantidade: number }
) {
    const d = doc(db, "listaCompras", id)
    return updateDoc(d, fields)
}

export async function deleteItemLista(id: string) {
    const d = doc(db, "listaCompras", id)
    return deleteDoc(d)
}
