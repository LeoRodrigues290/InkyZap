import { useState, useEffect } from "react"
import {
    subscribeToListaCompras,
} from "src/services/listaComprasService"

export function useListaCompras() {
    const [items, setItems] = useState<
        { id: string; nome: string; valor: number; quantidade: number; createdAt: Date }[]
        >([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsub = subscribeToListaCompras(arr => {
            setItems(arr)
            setLoading(false)
        })
        return () => unsub()
    }, [])

    return { items, loading }
}
