import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableOpacity, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; // Importa NavigationContainer
import ProfileIcon from '../assets/user-icon.png';
import EventsIcon from '../assets/event-icon.png';
import Profile from './Profile';
import Events from './Events';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
    return (
        <View style={{ flex: 1 }}>
            
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => {
                        let iconName;

                        if (route.name === 'Profile') {
                            iconName = focused ? ProfileIcon : ProfileIcon;
                        } else if (route.name === 'Events') {
                            iconName = focused ? EventsIcon : EventsIcon;
                        }

                        return <Image source={iconName} style={{ width: 20, height: 20 }} />;
                    },
                    tabBarActiveTintColor: '#000', // Color de las pestañas activas
                    tabBarInactiveTintColor: 'gray', // Color de las pestañas inactivas
                    tabBarStyle: {
                        backgroundColor: '#B02A37', // Color de fondo de la barra de pestañas
                        height: 60, // Ajusta la altura de la barra de pestañas
                    },
                    tabBarShowLabel: false, // Oculta el texto de las pestañas
                    headerStyle: { // Establece el estilo del encabezado
                        backgroundColor: '#B02A37', // Cambia el color del encabezado a verde
                    },
                    headerTitleStyle: { // Establece el estilo del texto del encabezado
                        color: 'white', // Cambia el color del texto a blanco
                        fontFamily: 'Joti One', // Establece la fuente del texto a Joti One
                        fontWeight: 'bold'
                    },
                    headerTitleAllowFontScaling: false, // Evita que el tamaño del texto se ajuste automáticamente
                    headerTitle: 'ALTAIR', // Establece el texto del encabezado
                })}
                tabBar={(props) => (
                    <View style={{ flexDirection: 'row', height: 50 }}>
                        {props.state.routes.map((route, index) => {
                            const isFocused = props.state.index === index;
                            let color = isFocused ? (route.name === 'Profile' ? '#842029' : '#B02A37') : '#B02A37'; // Color de fondo predeterminado

                            if (route.name === 'Events' && isFocused) {
                                // Cambia el color de fondo de la primera mitad de la barra de pestañas si la ruta actual es 'Events'
                                color = '#842029';
                            }

                            return (
                                <TouchableOpacity
                                    key={route.key}
                                    onPress={() => props.navigation.navigate(route.name)}
                                    style={{
                                        flex: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: color,
                                    }}
                                >
                                    {props.descriptors[route.key].options.tabBarIcon({ focused: isFocused })}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                )}
            >
                <Tab.Screen name="Events" component={Events} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        </View>
    );
}
