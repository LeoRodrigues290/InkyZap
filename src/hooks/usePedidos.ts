import { useState, useEffect } from "react";
import { onPedidosChange } from "src/services/pedidosService";

export function usePedidos() {
    const [pedidos, setPedidos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onPedidosChange((list) => {
            setPedidos(list);
            setLoading(false);
        });
        return () => unsub();
    }, []);

    return { pedidos, loading };
}
