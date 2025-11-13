import React from 'react';
import { View, Text, Image } from 'react-native';

export default function ItemCard({ title, status, place, timeText, imageUri }) {
    return (
        <View
            style={{
                backgroundColor: '#fff',
                borderRadius: 12,
                overflow: 'hidden',
                marginBottom: 12,
                elevation: 2,
            }}
        >
            <Image source={{ uri: imageUri }} style={{ width: '100%', height: 180 }} />
            <View style={{ padding: 12 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontWeight: '700', fontSize: 16 }}>{title}</Text>
                    <Text
                        style={{
                            backgroundColor: '#FEF3C7',
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            borderRadius: 999,
                            fontSize: 12,
                        }}
                    >
                        {status}
                    </Text>
                </View>
                <Text style={{ color: '#6B7280', marginTop: 8 }}>{place}</Text>
                <Text style={{ color: '#6B7280', marginTop: 2 }}>{timeText}</Text>
            </View>
            <View
                style={{
                    borderTopWidth: 1,
                    borderTopColor: '#F3F4F6',
                    padding: 10,
                }}
            >
                <Text style={{ fontWeight: '600' }}>Posted by: Anonymous</Text>
            </View>
        </View>
    );
}
