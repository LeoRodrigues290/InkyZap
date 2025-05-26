import {
    collection,
    addDoc,
    doc,
    updateDoc,
    getDocs,
    query,
    limit,
    startAfter,
    onSnapshot,
    serverTimestamp,
} from 'firebase/firestore'
import { db, auth } from 'src/firebase/config'
import { getUserName } from 'src/utils/userMap'
import { logActivity } from 'src/services/activityLogService'

const col = collection(db, 'servicos')

export const onServicosChange = (cb: (docs: any[]) => void) =>
    onSnapshot(col, snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() }))))

export const addServico = async (data: any) => {
    const ref = await addDoc(col, {
        ...data,
        criado_por: auth.currentUser!.uid,
        criado_nome: getUserName(auth.currentUser!.uid),
        status: 'aberto',
        data_entrada: serverTimestamp(),
    })
    await logActivity(
        'servico_criado',
        `Serviço “${data.titulo}” agendado.`,
        { servicoId: ref.id }
    )
    return ref
}

export const editServico = async (id: string, data: any) => {
    await updateDoc(doc(db, 'servicos', id), {
        ...data,
        updatedAt: serverTimestamp(),
    })
    await logActivity(
        'servico_editado',
        `Serviço “${data.titulo || id}” atualizado.`,
        { servicoId: id }
    )
}

export const finalizarServico = async (id: string) => {
    await updateDoc(doc(db, 'servicos', id), {
        status: 'finalizado',
        finalizadoEm: serverTimestamp(),
    })
    await logActivity(
        'servico_finalizado',
        `Serviço ${id} finalizado.`,
        { servicoId: id }
    )
}

export const fetchServicosPage = async (last: any) => {
    let q = query(col, limit(20))
    if (last) q = query(col, startAfter(last), limit(20))
    const snap = await getDocs(q)
    return {
        lastDoc: snap.docs[snap.docs.length - 1],
        data: snap.docs.map(d => ({ id: d.id, ...d.data() })),
    }
}

/**
 * Busca **todos** os serviços (autocomplete)
 */
export async function buscarServicos() {
    const snap = await getDocs(col)
    return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
