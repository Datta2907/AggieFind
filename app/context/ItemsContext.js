import React, { createContext, useState, useEffect } from "react";

export const ItemsContext = createContext();

export default function ItemsProvider({ children }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // optional: seed with some static items
        setItems([
            {
                id: 1,
                title: "Red Hydroflask",
                description: "Has a 'Zia' sticker on it.",
                image: "https://picsum.photos/600/400?random=3",
                location: "Corbett Center",
                date: "2025-11-10",
                status: "Lost",
                visibility: "public",
            },
            {
                id: 2,
                title: "Set of Keys",
                description: "Bunch of keys with red keychain.",
                image: "https://picsum.photos/600/400?random=4",
                location: "Zuhl Library",
                date: "2025-11-08",
                status: "Found",
                visibility: "public",
            },
            {
                id: 3,
                title: "Airpods (Gen 2)",
                description: "Left Airpod missing, in black case.",
                image: "https://picsum.photos/600/400?random=8",
                location: "Zuhl Library",
                date: "2025-11-04",
                status: "Claimed",
                visibility: "public",
            },
        ]);
    }, []);

    const addItem = (newItem) => {
        setItems((prev) => [newItem, ...prev]);
    };

    const updateItem = (id, patch) => {
        setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)));
    };

    return (
        <ItemsContext.Provider value={{ items, addItem, updateItem }}>
            {children}
        </ItemsContext.Provider>
    );
}
