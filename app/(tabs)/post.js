import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Button, Image, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Header from "../../components/Header";
import { Picker } from '@react-native-picker/picker';

export default function PostScreen() {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [place, setPlace] = useState("");
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [visibility, setVisibility] = useState("public");
    const [selectedStudents, setSelectedStudents] = useState([]);

    const students = [
        { id: 1, name: "Alice", email: "alice@nmsu.edu" },
        { id: 2, name: "Bob", email: "bob@nmsu.edu" },
        { id: 3, name: "Charlie", email: "charlie@nmsu.edu" },
    ];

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const toggleStudent = (id) => {
        setSelectedStudents((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    };

    const submitPost = () => {
        const postData = {
            image,
            description,
            place,
            date,
            visibility,
            selectedStudents,
        };
        console.log("Submitted post:", postData);
        alert("Post submitted! Check console for logged data.");
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="AggieFind" />
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#1F2937", margin: 16 }}>
                Post a Found Item
            </Text>
            <View style={{ flex: 1, padding: 16 }}>
                <TouchableOpacity
                    onPress={pickImage}
                    style={{
                        height: 180,
                        backgroundColor: "#F3F4F6",
                        borderWidth: 2,
                        borderColor: "#D1D5DB",
                        borderStyle: "dashed",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: 16,
                        borderRadius: 12,
                    }}
                >
                    {image ? (
                        <Image source={{ uri: image }} style={{ width: "100%", height: "100%", borderRadius: 12 }} />
                    ) : (
                        <Text style={{ color: "#6B7280", fontSize: 16 }}>Tap to add image</Text>
                    )}
                </TouchableOpacity>

                <TextInput
                    placeholder="Description"
                    placeholderTextColor="#9CA3AF"
                    value={description}
                    onChangeText={setDescription}
                    style={{
                        borderWidth: 1,
                        borderColor: "#D1D5DB",
                        borderRadius: 12,
                        padding: 12,
                        marginBottom: 12,
                        color: "#111827",
                    }}
                />

                <View style={{
                    borderWidth: 1,
                    borderColor: "#D1D5DB",
                    borderRadius: 12,
                    marginBottom: 12,
                    overflow: 'hidden'
                }}>
                    <Picker
                        selectedValue={place}
                        onValueChange={(itemValue) => setPlace(itemValue)}
                        style={{ color: place ? "#111827" : "#9CA3AF" }}
                    >
                        <Picker.Item label="Select a building" value="" />
                        <Picker.Item label="Zuhl Library" value="Zuhl Library" />
                        <Picker.Item label="Corbett Center" value="Corbett Center" />
                        <Picker.Item label="Student Union Building" value="Student Union Building" />
                        <Picker.Item label="Frenger Mall" value="Frenger Mall" />
                        <Picker.Item label="Other" value="Other" />
                    </Picker>
                </View>

                <TouchableOpacity
                    onPress={() => setShowPicker(true)}
                    style={{
                        borderWidth: 1,
                        borderColor: "#D1D5DB",
                        borderRadius: 12,
                        padding: 12,
                        marginBottom: 12,
                    }}
                >
                    <Text style={{ color: "#111827" }}>{date.toLocaleString()}</Text>
                </TouchableOpacity>

                {showPicker && (
                    <DateTimePicker
                        value={date}
                        mode="datetime"
                        display={Platform.OS === "ios" ? "inline" : "default"}
                        onChange={(event, selectedDate) => {
                            if (event.type === "set") {
                                setDate(selectedDate || date);
                            }
                            setShowPicker(Platform.OS === "ios");
                        }}
                    />
                )}

                <Text style={{ fontSize: 14, fontWeight: "500", color: "#374151", marginBottom: 6 }}>
                    Visibility
                </Text>

                <View style={{ flexDirection: "row", marginBottom: 12 }}>
                    <TouchableOpacity
                        onPress={() => setVisibility("public")}
                        style={{
                            paddingHorizontal: 12,
                            paddingVertical: 6,
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: visibility === "public" ? "#A51C30" : "#D1D5DB",
                            backgroundColor: visibility === "public" ? "#A51C30" : "#fff",
                            marginRight: 12,
                        }}
                    >
                        <Text style={{ color: visibility === "public" ? "#fff" : "#111827" }}>Public</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setVisibility("nmsu")}
                        style={{
                            paddingHorizontal: 12,
                            paddingVertical: 6,
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: visibility === "nmsu" ? "#A51C30" : "#D1D5DB",
                            backgroundColor: visibility === "nmsu" ? "#A51C30" : "#fff",
                        }}
                    >
                        <Text style={{ color: visibility === "nmsu" ? "#fff" : "#111827" }}>NMSU Community Only</Text>
                    </TouchableOpacity>
                </View>

                {visibility === "nmsu" && (
                    <View style={{ marginBottom: 12 }}>
                        {students.map((s) => (
                            <TouchableOpacity
                                key={s.id}
                                onPress={() => toggleStudent(s.id)}
                                style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}
                            >
                                <View
                                    style={{
                                        width: 20,
                                        height: 20,
                                        borderWidth: 1,
                                        borderColor: "#D1D5DB",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginRight: 10,
                                        backgroundColor: selectedStudents.includes(s.id) ? "#A51C30" : "#fff",
                                    }}
                                >
                                    {selectedStudents.includes(s.id) && (
                                        <Text style={{ color: "#fff", fontWeight: "bold" }}>✓</Text>
                                    )}
                                </View>
                                <Text style={{ color: "#111827" }}>{s.name} ({s.email})</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}

                <TouchableOpacity
                    onPress={submitPost}
                    style={{
                        backgroundColor: "#A51C30",
                        paddingVertical: 14,
                        borderRadius: 12,
                        alignItems: "center",
                    }}
                >
                    <Text style={{ color: "#fff", fontWeight: "700" }}>Submit Found Item</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
