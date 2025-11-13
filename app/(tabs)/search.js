import React, { useState } from "react";
import {
    View,
    TextInput,
    FlatList,
    TouchableOpacity,
    Text,
    Modal,
    Image,
} from "react-native";
import Header from "../../components/Header";
import ItemCard from "../../components/ItemCard";
import { searchData } from "../data/sample";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SearchScreen() {
    const [query, setQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);

    const filteredData =
        query.length >= 3
            ? searchData.filter((item) => {
                const term = query.toLowerCase();
                return (
                    item.title?.toLowerCase().includes(term) ||
                    item.location?.toLowerCase().includes(term) ||
                    item.date?.includes(term)
                );
            })
            : [];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="AggieFind" />
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#1F2937", margin: 16 }}>
                Search an Item
            </Text>
            <View style={{ padding: 16 }}>
                <TextInput
                    placeholder="Search by title, location, or date..."
                    value={query}
                    onChangeText={setQuery}
                    style={{
                        borderWidth: 1,
                        borderColor: "#E5E7EB",
                        borderRadius: 999,
                        padding: 12,
                        paddingLeft: 16,
                        backgroundColor: "#fff",
                    }}
                />
            </View>

            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedItem(item)}>
                        <ItemCard
                            title={item.title}
                            status={item.found ? "Found" : "Lost"}
                            place={item.location}
                            timeText={`Date: ${item.date}`}
                            imageUri={`https://picsum.photos/200/200?random=${item.id}`}
                        />
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    query.length >= 3 && (
                        <Text style={{ textAlign: "center", color: "#9CA3AF", marginTop: 40 }}>
                            No results found
                        </Text>
                    )
                }
                showsVerticalScrollIndicator={false}
            />

            <Modal
                visible={!!selectedItem}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setSelectedItem(null)}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 16,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#fff",
                            borderRadius: 16,
                            padding: 20,
                            width: "90%",
                        }}
                    >
                        {selectedItem && (
                            <Image
                                source={{
                                    uri: `https://picsum.photos/300/200?random=${selectedItem.id}`,
                                }}
                                style={{
                                    width: "100%",
                                    height: 180,
                                    borderRadius: 12,
                                    marginBottom: 12,
                                }}
                            />
                        )}
                        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 8 }}>
                            {selectedItem?.title}
                        </Text>
                        <Text style={{ color: "#6B7280", marginBottom: 6 }}>
                            Location: {selectedItem?.location}
                        </Text>
                        <Text style={{ color: "#6B7280", marginBottom: 6 }}>
                            Date: {selectedItem?.date}
                        </Text>
                        <Text style={{ color: "#6B7280", marginBottom: 12 }}>
                            Status: {selectedItem?.found ? "Found" : "Lost"}
                        </Text>
                        <TouchableOpacity
                            onPress={() => setSelectedItem(null)}
                            style={{
                                backgroundColor: "#882345",
                                paddingVertical: 10,
                                borderRadius: 999,
                            }}
                        >
                            <Text
                                style={{
                                    color: "#fff",
                                    textAlign: "center",
                                    fontWeight: "600",
                                }}
                            >
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
