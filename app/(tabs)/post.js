import React, { useState, useContext } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity, Image, Platform, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import Header from "../../components/Header";
import { ItemsContext } from "../context/ItemsContext";

export default function PostScreen() {
    const { addItem } = useContext(ItemsContext);

    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [place, setPlace] = useState("");
    const [visibility, setVisibility] = useState("public");
    const [dateTime, setDateTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState("date");

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
        });
        if (!result.canceled) setImage(result.assets[0].uri);
    };

    const showDateTimePicker = (mode) => {
        setPickerMode(mode);
        setShowPicker(true);
    };

    const onChange = (event, selected) => {
        if (event?.type === "dismissed") {
            setShowPicker(false);
            return;
        }
        if (selected) {
            setShowPicker(Platform.OS === "ios");
            if (pickerMode === "date") {
                const d = new Date(selected);
                d.setHours(dateTime.getHours());
                d.setMinutes(dateTime.getMinutes());
                setDateTime(d);
            } else {
                const d = new Date(dateTime);
                d.setHours(selected.getHours());
                d.setMinutes(selected.getMinutes());
                setDateTime(d);
            }
        }
    };

    const handleSubmit = () => {
        if (!title.trim()) {
            Alert.alert("Title required");
            return;
        }

        const newItem = {
            id: Date.now(),
            title: title.trim(),
            description: description.trim(),
            image: image || `https://picsum.photos/600/400?random=${Date.now() % 1000}`,
            location: place || "Unknown",
            date: dateTime.toISOString(),
            status: "Lost",
            visibility,
        };

        addItem(newItem);
        setTitle("");
        setDescription("");
        setImage(null);
        setPlace("");
        setVisibility("public");
        setDateTime(new Date());
        Alert.alert("Posted", "Item added successfully");
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <Header title="Post" />
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 12 }}>Post a Found Item</Text>

                <TextInput placeholder="Title" placeholderTextColor="#9CA3AF" value={title} onChangeText={setTitle} style={{ borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 8, padding: 10, marginBottom: 12 }} />

                <TouchableOpacity onPress={pickImage} style={{ height: 180, borderWidth: 2, borderStyle: "dashed", borderColor: "#D1D5DB", borderRadius: 12, backgroundColor: "#F3F4F6", justifyContent: "center", alignItems: "center", marginBottom: 12 }}>
                    {image ? <Image source={{ uri: image }} style={{ width: "100%", height: "100%", borderRadius: 10 }} /> : <Text style={{ color: "#9CA3AF" }}>Tap to add image</Text>}
                </TouchableOpacity>

                <TextInput placeholder="Description" placeholderTextColor="#9CA3AF" value={description} onChangeText={setDescription} multiline style={{ borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 8, padding: 10, marginBottom: 12 }} />

                <View style={{ borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 8, overflow: "hidden", marginBottom: 12 }}>
                    <Picker selectedValue={place} onValueChange={(v) => setPlace(v)}>
                        <Picker.Item label="Select a building" value="" />
                        <Picker.Item label="Zuhl Library" value="Zuhl Library" />
                        <Picker.Item label="Corbett Center" value="Corbett Center" />
                        <Picker.Item label="Student Union Building" value="Student Union Building" />
                        <Picker.Item label="Frenger Mall" value="Frenger Mall" />
                        <Picker.Item label="Other" value="Other" />
                    </Picker>
                </View>

                <View style={{ flexDirection: "row", gap: 10, marginBottom: 12 }}>
                    <TouchableOpacity onPress={() => showDateTimePicker("date")} style={{ flex: 1, borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 8, padding: 12, alignItems: "center" }}>
                        <Text>{new Date(dateTime).toLocaleDateString()}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => showDateTimePicker("time")} style={{ flex: 1, borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 8, padding: 12, alignItems: "center" }}>
                        <Text>{new Date(dateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Text>
                    </TouchableOpacity>
                </View>

                {showPicker && <DateTimePicker value={dateTime} mode={pickerMode} display={Platform.OS === "ios" ? "inline" : "default"} onChange={onChange} />}

                <View style={{ marginBottom: 16 }}>
                    <Text style={{ marginBottom: 6 }}>Visibility</Text>
                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => setVisibility("public")} style={{ padding: 8, marginRight: 8, backgroundColor: visibility === "public" ? "#882345" : "#f0f0f0", borderRadius: 8 }}>
                            <Text style={{ color: visibility === "public" ? "#fff" : "#111827" }}>Public</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setVisibility("nmsu")} style={{ padding: 8, backgroundColor: visibility === "nmsu" ? "#882345" : "#f0f0f0", borderRadius: 8 }}>
                            <Text style={{ color: visibility === "nmsu" ? "#fff" : "#111827" }}>NMSU Only</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity onPress={handleSubmit} style={{ backgroundColor: "#882345", padding: 12, borderRadius: 10 }}>
                    <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>Submit Found Item</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
