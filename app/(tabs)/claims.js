// app/tabs/claims.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import { claimsData } from '../data/sample';

export default function ClaimsScreen() {
    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ flex: 1, marginLeft: 12 }}>
                <View style={styles.row}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={[styles.status, { backgroundColor: '#A7F3D0', color: '#065F46' }]}>{item.status}</Text>
                </View>
                <Text style={styles.text}>Claimed from: {item.claimedFrom}</Text>
                <Text style={styles.text}>Claimed on: {item.date}</Text>
                <Text style={styles.text}>Status: {item.description}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="AggieFind" />
            <FlatList
                data={claimsData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4
    },
    title: { fontWeight: '700', fontSize: 16 },
    status: { fontSize: 12, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, fontWeight: '600' },
    text: { color: '#4B5563', fontSize: 14, marginTop: 2 }
});
