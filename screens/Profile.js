import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Profile({ navigation }) {
    // Función para cerrar sesión
    const handleLogout = () => {
        // Aquí puedes agregar la lógica para cerrar la sesión
        // Por ejemplo, puedes limpiar el estado de autenticación o redirigir a la pantalla de inicio de sesión
        // Después de cerrar la sesión, navega a la pantalla de inicio de sesión
        navigation.navigate('Login');
    };

    return (
        <View>
            <TouchableOpacity onPress={handleLogout}>
                <Text style={{ color: 'blue', fontSize: 16 }}>Cerrar sesión</Text>
            </TouchableOpacity>
            {/* Otro contenido de la pantalla Profile */}
        </View>
    );
}
