import React, { useContext, useState } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    Modal,
    StyleSheet,
} from "react-native";
import Header from "../../components/Header";
import { ItemsContext } from "../context/ItemsContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LostScreen() {
    const { items } = useContext(ItemsContext);
    const [selected, setSelected] = useState(null);

    const lostItems = items.filter((it) => it.status === "Lost");

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => setSelected(item)} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.cardText}>{item.location}</Text>
                <Text style={styles.cardText}>{item.date ? new Date(item.date).toLocaleString() : ""}</Text>
                <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
            <Header title="My Lost Items" />
            <FlatList
                data={lostItems}
                keyExtractor={(i) => i.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            />

            <Modal visible={!!selected} animationType="slide" transparent onRequestClose={() => setSelected(null)}>
                <View style={styles.overlay}>
                    <View style={styles.modalCard}>
                        {selected?.image ? <Image source={{ uri: selected.image }} style={styles.modalImage} /> : null}
                        <Text style={styles.modalTitle}>{selected?.title}</Text>
                        <Text style={styles.modalMeta}>Location: {selected?.location}</Text>
                        <Text style={styles.modalMeta}>
                            Date: {selected?.date ? new Date(selected.date).toLocaleString() : ""}
                        </Text>
                        <Text style={styles.modalDesc}>{selected?.description}</Text>

                        <TouchableOpacity onPress={() => setSelected(null)} style={styles.closeBtn}>
                            <Text style={styles.closeText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        elevation: 2,
        alignItems: "center",
    },
    cardImage: { width: 100, height: 100, borderRadius: 8 },
    cardContent: { flex: 1, marginLeft: 12 },
    cardTitle: { fontWeight: "700", fontSize: 16, marginBottom: 4 },
    cardText: { color: "#4B5563", fontSize: 14, marginBottom: 2 },
    cardDesc: { color: "#374151", marginTop: 4 },

    overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center", padding: 16 },
    modalCard: { width: "100%", maxWidth: 720, backgroundColor: "#fff", borderRadius: 12, padding: 16 },
    modalImage: { width: "100%", height: 220, borderRadius: 10, marginBottom: 12 },
    modalTitle: { fontSize: 20, fontWeight: "800", marginBottom: 10 },
    modalMeta: { color: "#6B7280", marginBottom: 6 },
    modalDesc: { color: "#374151", marginBottom: 16 },
    closeBtn: { backgroundColor: "#882345", paddingVertical: 12, borderRadius: 10 },
    closeText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
