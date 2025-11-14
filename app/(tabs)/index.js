import React, { useContext } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import ItemCard from "../../components/ItemCard";
import { ItemsContext } from "../context/ItemsContext";

export default function HomeScreen() {
    const { items } = useContext(ItemsContext);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
            <Header title="AggieFind" />
            <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 12 }}>
                <FlatList data={items} keyExtractor={(i) => i.id.toString()} renderItem={({ item }) => (
                    <ItemCard
                        title={item.title}
                        status={item.status}
                        place={item.location}
                        timeText={item.date ? `Posted on ${new Date(item.date).toLocaleString()}` : ""}
                        imageUri={item.image}
                    />
                )} showsVerticalScrollIndicator={false} />
            </View>
        </SafeAreaView>
    );
}
