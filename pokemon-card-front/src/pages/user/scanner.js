import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import TesseractOcr from 'react-native-tesseract-ocr';

export function Scanner({ navigation }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = React.useRef(null);

  // Solicita permissão de câmera
  useEffect(() => {
    (async () => {
      const { status } = await RNCamera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Função de escaneamento
  const handleScan = async () => {
    if (!cameraRef.current || isProcessing) return;

    setIsProcessing(true);
    try {
      const options = { quality: 0.8, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);

      // Processa a imagem com o Tesseract OCR
      const ocrConfig = {
        lang: 'eng', // Use o idioma que preferir ou adicione outros idiomas se necessário
      };

      const result = await TesseractOcr.recognize(data.uri, ocrConfig);
      const extractedTexts = result.text.split('\n');
      const cardCode = extractedTexts.find(text => /^[A-Z0-9]+-\d+$/i.test(text));

      if (cardCode) {
        navigation.navigate('CardDetailScreen', { cardCode });
      } else if (extractedTexts.length > 0) {
        Alert.alert('Texto detectado, mas código de carta não encontrado.', extractedTexts.join('\n'));
      } else {
        Alert.alert('Nenhum texto encontrado. Tente novamente.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro ao escanear a imagem.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (hasPermission === null) {
    return <View style={styles.center}><Text>Solicitando permissão da câmera...</Text></View>;
  }

  if (hasPermission === false) {
    return <View style={styles.center}><Text>Permissão da câmera negada.</Text></View>;
  }

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
      />

      <View style={styles.overlay}>
        <TouchableOpacity style={styles.button} onPress={handleScan} disabled={isProcessing}>
          {isProcessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Icon name="search" size={18} color="#fff" />
              <Text style={styles.buttonText}>Escanear</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
          <Icon name="home" size={20} color="#fff" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('HitoryScreen')}>
          <Icon name="history" size={20} color="#fff" />
          <Text style={styles.footerText}>Histórico</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#2a75bb',
    padding: 12,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 50,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
