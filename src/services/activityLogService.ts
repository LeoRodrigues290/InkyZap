// src/services/activityLogService.ts
import {
    collection, addDoc, query, where, orderBy, onSnapshot,
    serverTimestamp, Timestamp, DocumentData
} from 'firebase/firestore';
import { db, auth } from 'src/firebase/config';
import { getUserName } from 'src/utils/userMap';

export const logActivity = async (
    type: string,
    description: string,
    metadata: Record<string, any> = {}
) => {
    await addDoc(collection(db, 'activityLogs'), {
        type,
        description,
        metadata,
        userId: auth.currentUser!.uid,
        userName: getUserName(auth.currentUser!.uid),
        timestamp: serverTimestamp(),
    });
};

export const onTodayActivities = (cb: (logs: DocumentData[]) => void) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    const q = query(
        collection(db, 'activityLogs'),
        where('timestamp', '>=', Timestamp.fromDate(start)),
        where('timestamp', '<',  Timestamp.fromDate(end)),
        orderBy('timestamp', 'desc')
    );
    return onSnapshot(q, snap => cb(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
};
