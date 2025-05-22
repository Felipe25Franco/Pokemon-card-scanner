import React from 'react';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/stylesHome';

export function Home({ navigation }) {
  
  function irParaScanner() {
    navigation.navigate('Scanner');
  }

  function irParaHistorico() {
    navigation.navigate('HitoryScreen');
  }

  function sair() {
    navigation.navigate('Login');
  }

   return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/fundo.jpeg')}
        style={styles.imageBackground}
      >
        <Text style={styles.appName}>LOVE PLAY</Text>

        <View style={styles.container}>
          <View style={styles.overlay}>
            <Text style={styles.text}>Bem-vindo ao seu gerenciador de cartas Pokémon!</Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'red', marginTop: 20 }]}
              onPress={sair}
            >
              <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Rodapé fixo */}
        <View style={styles.footer}>
          <TouchableOpacity style={[styles.footerButton, { backgroundColor: '#2a75bb' }]} onPress={irParaScanner}>
            <Icon name="camera" size={20} color="#fff" />
            <Text style={styles.footerText}>Escanear</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.footerButton, { backgroundColor: '#3b9e3b' }]} onPress={irParaHistorico}>
            <Icon name="history" size={20} color="#fff" />
            <Text style={styles.footerText}>Histórico</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}