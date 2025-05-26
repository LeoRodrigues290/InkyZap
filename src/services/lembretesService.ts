import {
    getFirestore,
    collection,
    query,
    orderBy,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    serverTimestamp
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore();
const auth = getAuth();

export function subscribeToLembretes(callback: (arr: { id: string; mensagem: string; createdAt: Date }[]) => void) {
    const user = auth.currentUser;
    if (!user) return () => {};
    const q = query(
        collection(db, "users", user.uid, "lembretes"),
        orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (snap) => {
        const dados = snap.docs.map((d) => {
            const data = d.data() as any;
            return {
                id: d.id,
                mensagem: data.mensagem as string,
                createdAt: data.createdAt?.toDate() ?? new Date()
            };
        });
        callback(dados);
    });
}

export async function addLembrete(mensagem: string) {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado");
    const col = collection(db, "users", user.uid, "lembretes");
    return addDoc(col, {
        mensagem,
        createdAt: serverTimestamp()
    });
}

export async function deleteLembrete(id: string) {
    const user = auth.currentUser;
    if (!user) throw new Error("Usuário não autenticado");
    const docRef = doc(db, "users", user.uid, "lembretes", id);
    return deleteDoc(docRef);
}
