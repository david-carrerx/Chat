import React from 'react';
import { View, Text } from 'react-native';

export default function Events({ navigation }) {
    // Aquí va el contenido de la pantalla Events

    return (
        <View>
            <Text>Events Screen</Text>
        </View>
    );
}

// Configuración de navegación
Events.navigationOptions = ({ navigation }) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false, // Oculta el encabezado de la pantalla
        });
    }, [navigation]);

    return {};
};
