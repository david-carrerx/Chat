import React from "react";
import { StyleSheet, View, Image, Dimensions, TextInput, TouchableOpacity, Text } from "react-native";

const { width, height } = Dimensions.get('window');

export default function Login() {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/login-wallpaper.jpeg')} style={styles.image} />
                <View style={styles.overlay}></View>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/altair-logo.png')} style={styles.logo} />
                </View>
            </View>
            <View style={styles.contentContainer}>
                <TextInput placeholder="Correo electrónico" style={styles.input}/>
                <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry/>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Iniciar sesión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.registerButton]}>
                        <Text style={[styles.buttonText, styles.registerButtonText]}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.socialContainer}>
                    <Text style={styles.socialText}>Iniciar sesión con:</Text>
                    <View style={styles.socialButtons}>
                        <TouchableOpacity style={[styles.socialButton, styles.socialButtonMarginRight]}>
                            <Image source={require('../assets/facebook-icon.png')} style={styles.socialIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.socialButton, styles.socialButtonMarginLeft]}>
                            <Image source={require('../assets/google-icon.png')} style={styles.socialIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        width: width,
        height: height / 2,
        position: 'relative', // Asegura que la posición absoluta sea relativa a este contenedor
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(44, 11, 14, 0.8)', // Color oscuro al 80%
    },
    logoContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -(width / 3) }, { translateY: -(height / 4) }], // Ajustar el valor según la mitad del tamaño de la imagen
    },
    logo: {
        width: width / 1.4, // Ajuste el ancho del logo
        height: height / 2, // Ajuste la altura del logo
        resizeMode: 'contain',
        tintColor: '#fff', // Cambiar el color del logo a blanco
    },
    contentContainer: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#DC3545',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    registerButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#DC3545',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500', // Semibold
    },
    registerButtonText: {
        color: '#DC3545',
        fontWeight: '500', // Semibold
    },
    socialContainer: {
        alignItems: 'center',
    },
    socialText: {
        marginBottom: 10,
        color: '#DC3545',
        fontWeight: 'bold'
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '50%',
    },
    socialButton: {
        padding: 1,
    },
    socialButtonMarginRight: {
        marginRight: 0, // Reducido el margen derecho
    },
    socialButtonMarginLeft: {
        marginLeft: 0, // Añadido margen izquierdo
    },
    socialIcon: {
        width: 40,
        height: 40,
    }
});
