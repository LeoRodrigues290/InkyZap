import { useEffect, useState } from "react";
import * as svc from "../services/servicosService";

export function useServicos() {
    const [servicos, setServicos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = svc.onServicosChange(list => {
            setServicos(list);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    return { servicos, loading };
}
