import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const connectivity = (WrappedComponent) => {
    return (props) => {
        const [isConnected, setIsConnected] = useState(true);

        useEffect(() => {
            const unsubscribe = NetInfo.addEventListener((state) => {
                setIsConnected(state.isConnected);
            });

            return () => {
                unsubscribe();
            };
        }, []);

        return (
            <>
                {!isConnected && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>
                            No internet connection
                        </Text>
                    </View>
                )}
                <WrappedComponent {...props} />
            </>
        );
    };
};

const styles = StyleSheet.create({
    errorContainer: {
        backgroundColor: 'red',
        padding: 3,
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
        color: 'white',
    },
});

export default connectivity;