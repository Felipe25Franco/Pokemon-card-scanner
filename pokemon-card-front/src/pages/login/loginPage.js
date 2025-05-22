import React, { useEffect } from 'react';
import { Text, View, ImageBackground, TextInput, TouchableOpacity, Button } from 'react-native';
import styles from '../../styles/login/stylesLogin';


export function Login({ navigation }) {

  function login() {
    navigation.navigate('Home');
  }

  function registrar() {
    navigation.navigate('Registro');
  }

  function esquecisenha() {
    navigation.navigate('RedefinirSenha');
  }







  return (
    <View >
      <ImageBackground
        source={require("../../../assets/fundo.jpeg")}
        style={styles.imageBackground}>
        <Text style={styles.appName}>LOVE PLAY</Text>
        <View style={styles.container}>
          <View style={styles.overlay}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
            />
            <Text style={styles.label}>Senha:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: 'blue' }]}
                onPress={login}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: 'green' }]}
                onPress={registrar}
              >
                <Text style={styles.buttonText}>Registrar</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={esquecisenha}
            >
              <Text style={styles.label}>Esqueceu a Senha?</Text>
            </TouchableOpacity>
          </View>
        </View>


   


      </ImageBackground>
    </View>
  );
}