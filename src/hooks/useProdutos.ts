import { useEffect, useState } from "react";
import * as svc from "../services/produtosService";

export function useProdutos() {
    const [produtos, setProdutos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = svc.onProdutosChange(list => {
            setProdutos(list);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    return { produtos, loading };
}
