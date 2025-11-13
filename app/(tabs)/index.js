// app/tabs/index.tsx
import React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../components/Header";
import ItemCard from "../../components/ItemCard";
import { homeData } from "../data/sample";
export default function HomeScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }} edges={["top", "left", "right"]}>
            <Header title="AggieFind" />
            <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 12 }}>
                <FlatList
                    data={homeData}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ItemCard
                            title={item.title}
                            status={item.status ?? (item.type ?? "Info")}
                            place={item.location ?? item.place ?? "Unknown"}
                            timeText={item.date ? `Posted on ${item.date}` : item.timeText ?? ""}
                            imageUri={item.image}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}
