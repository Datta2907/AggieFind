import React, { useState, useContext } from "react";
import { View, TextInput, FlatList, TouchableOpacity, Text, Modal, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import ItemCard from "../../components/ItemCard";
import { ItemsContext } from "../context/ItemsContext";

export default function SearchScreen() {
    const { items } = useContext(ItemsContext);
    const [query, setQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

    const filtered = query.length >= 3 ? items.filter((it) => (it.title?.toLowerCase() || "").includes(query.toLowerCase()) || (it.location || "").toLowerCase().includes(query.toLowerCase()) || (it.date || "").includes(query)) : [];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
            <Header title="Search" />
            <View style={{ padding: 16 }}>
                <TextInput placeholder="Search by title, location, or date..." value={query} onChangeText={setQuery} placeholderTextColor="#9CA3AF" style={{ borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 999, padding: 12, backgroundColor: "#fff" }} />
            </View>

            <FlatList data={filtered} keyExtractor={(i) => i.id.toString()} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }} renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setSelectedItem(item)}>
                    <ItemCard title={item.title} status={item.status} place={item.location} timeText={`Date: ${new Date(item.date).toLocaleDateString()}`} imageUri={item.image} />
                </TouchableOpacity>
            )} />

            <Modal visible={!!selectedItem} transparent animationType="slide" onRequestClose={() => setSelectedItem(null)}>
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", padding: 16 }}>
                    <View style={{ width: "100%", maxWidth: 720, backgroundColor: "#fff", borderRadius: 12, padding: 16 }}>
                        {selectedItem?.image ? <Image source={{ uri: selectedItem.image }} style={{ width: "100%", height: 180, borderRadius: 8, marginBottom: 12 }} /> : null}
                        <Text style={{ fontSize: 20, fontWeight: "700" }}>{selectedItem?.title}</Text>
                        <Text style={{ color: "#6B7280" }}>Location: {selectedItem?.location}</Text>
                        <Text style={{ color: "#6B7280" }}>Date: {selectedItem?.date}</Text>
                        <TouchableOpacity onPress={() => setSelectedItem(null)} style={{ marginTop: 12, backgroundColor: "#882345", padding: 12, borderRadius: 8 }}>
                            <Text style={{ color: "#fff", textAlign: "center" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
