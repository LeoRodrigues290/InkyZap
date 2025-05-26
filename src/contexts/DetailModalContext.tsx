import React, { createContext, useState, useContext, ReactNode } from 'react'

export type Category = 'produtos' | 'servicos' | 'pedidos' | 'vendas'

interface ModalContextType {
    isOpen: boolean
    category?: Category
    id?: string
    openModal: (category: Category, id: string) => void
    closeModal: () => void
}

const DetailModalContext = createContext<ModalContextType>({
    isOpen: false,
    openModal: () => {},
    closeModal: () => {},
})

export function DetailModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const [category, setCategory] = useState<Category>()
    const [id, setId] = useState<string>()

    function openModal(cat: Category, recordId: string) {
        setCategory(cat)
        setId(recordId)
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
        setCategory(undefined)
        setId(undefined)
    }

    return (
        <DetailModalContext.Provider value={{ isOpen, category, id, openModal, closeModal }}>
            {children}
        </DetailModalContext.Provider>
    )
}

export function useDetailModal() {
    return useContext(DetailModalContext)
}
