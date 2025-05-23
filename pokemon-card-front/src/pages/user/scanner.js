import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RNCamera } from 'react-native-camera';
import TesseractOcr from 'react-native-tesseract-ocr';
import axios from 'axios';

export function Scanner() {
  const [cardCode, setCardCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [cardData, setCardData] = useState(null);
  const cameraRef = useRef(null);

  const handleSearch = async () => {
    if (!cardCode) {
      Alert.alert('Erro', 'Digite um código de carta.');
      return;
    }

    try {
      const response = await axios.get(`https://api.tcgdex.net/v2/pt/cards/${cardCode.toLowerCase()}`);
      setCardData(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Carta não encontrada ou código inválido.');
    }
  };

  const handleScan = async () => {
    setIsCameraVisible(true);
  };

  const handleTakePicture = async () => {
    if (!cameraRef.current || isScanning) return;
    setIsScanning(true);

    try {
      const options = { quality: 0.8, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);

      const ocrResult = await TesseractOcr.recognize(data.uri, { lang: 'pt-br' });
      const texts = ocrResult.split('\n');
      const code = texts.find(text => /^[a-zA-Z0-9]+-\d+$/.test(text.trim()));

      if (code) {
        setCardCode(code.trim());
        setIsCameraVisible(false);
        setTimeout(handleSearch, 300); // aguarda o setState e busca
      } else {
        Alert.alert('Código não encontrado', texts.join('\n'));
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Falha ao escanear.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <View style={styles.container}>
      {!isCameraVisible ? (
        <>
          <Text style={styles.label}>Digite o código da carta:</Text>
          <TextInput
            style={styles.input}
            value={cardCode}
            onChangeText={setCardCode}
            placeholder="ex: swsh3-136"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={handleSearch}>
            <Icon name="search" size={18} color="#fff" />
            <Text style={styles.buttonText}>Buscar Carta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.scanButton]} onPress={handleScan}>
            <Icon name="camera" size={18} color="#fff" />
            <Text style={styles.buttonText}>Escanear Código</Text>
          </TouchableOpacity>

          {cardData && (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{cardData.name}</Text>
              <Image
                source={{
                  uri: `https://assets.tcgdex.net/pt/${cardData.set.series.id}/${cardData.set.id}/${cardData.number}/high.webp`,
                }}
                style={styles.cardImage}
              />
              <Text style={styles.cardText}>Conjunto: {cardData.set.name}</Text>
              <Text style={styles.cardText}>Número: {cardData.number}</Text>
              <Text style={styles.cardText}>Tipo: {cardData.supertype}</Text>
            </View>
          )}
        </>
      ) : (
        <RNCamera
          ref={cameraRef}
          style={styles.camera}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
        >
          <View style={styles.cameraOverlay}>
            <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
              {isScanning ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Icon name="camera" size={18} color="#fff" />
                  <Text style={styles.buttonText}>Capturar</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: '#555' }]} onPress={() => setIsCameraVisible(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </RNCamera>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, marginBottom: 10 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 10, marginBottom: 15,
  },
  button: {
    backgroundColor: '#2a75bb',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  scanButton: { backgroundColor: '#4e8cff' },
  buttonText: { color: '#fff', fontWeight: 'bold', marginLeft: 8 },
  card: { marginTop: 20, alignItems: 'center' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  cardImage: { width: 200, height: 270, resizeMode: 'contain', marginBottom: 10 },
  cardText: { fontSize: 14 },
  camera: { flex: 1, justifyContent: 'flex-end' },
  cameraOverlay: { alignItems: 'center', marginBottom: 30 },
});
