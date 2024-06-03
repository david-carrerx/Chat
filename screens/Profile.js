import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Profile({ navigation }) {
    const handleLogout = () => {
        // Aquí puedes agregar la lógica para cerrar la sesión
        // Por ejemplo, puedes limpiar el estado de autenticación o redirigir a la pantalla de inicio de sesión
        // Después de cerrar la sesión, navega a la pantalla de inicio de sesión
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    button: {
        backgroundColor: '#DC3545',
        borderRadius: 5,
        padding: 10,
        width: 325, 
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});
