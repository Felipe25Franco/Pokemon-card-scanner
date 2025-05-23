import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export function Scanner() {
  const [series, setSeries] = useState([]);
  const [sets, setSets] = useState([]);
  const [selectedSerie, setSelectedSerie] = useState('');
  const [selectedSet, setSelectedSet] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardData, setCardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cardPrice, setCardPrice] = useState(null);

  // Fetch series on component mount
  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await axios.get('https://api.tcgdex.net/v2/pt/series');
        setSeries(response.data);
      } catch (error) {
        console.error('Erro ao buscar séries:', error);
        Alert.alert('Erro', 'Não foi possível carregar as séries.');
      }
    };

    fetchSeries();
  }, []);

  // Fetch sets when a serie is selected
  useEffect(() => {
    const fetchSets = async () => {
      if (!selectedSerie) return;
      try {
        const response = await axios.get(`https://api.tcgdex.net/v2/pt/series/${selectedSerie}`);
        setSets(response.data.sets);
      } catch (error) {
        console.error('Erro ao buscar conjuntos:', error);
        Alert.alert('Erro', 'Não foi possível carregar os conjuntos.');
      }
    };

    fetchSets();
  }, [selectedSerie]);

  useEffect(() => {
  console.log('Series:', series);
  console.log('Selected Serie:', selectedSerie);
}, [series, selectedSerie]);

useEffect(() => {
  if (cardData) {
    const cardName = cardData.name;
    const cardNumber = cardData.localId;
    const cardSet = cardData.set.id;

    const fetchPrice = async () => {
      try {
        const response = await axios.get(`https://www.ligapokemon.com.br/?view=cards/search&card=nome=${cardName}&num=${cardNumber}&ed=${cardSet}`);
        const price = response.data.price; // Ajuste conforme a estrutura da resposta
        setCardPrice(price);
      } catch (error) {
        console.error('Erro ao buscar preço:', error);
        setCardPrice('Não disponível');
      }
    };

    fetchPrice();
  }
}, [cardData]);

  const handleSearch = async () => {
    if (!selectedSet || !cardNumber) {
      Alert.alert('Erro', 'Selecione uma série, um conjunto e informe o número da carta.');
      return;
    }

    setLoading(true);
    try {
      const cardId = `${selectedSet}-${cardNumber}`;
      const response = await axios.get(`https://api.tcgdex.net/v2/pt/cards/${cardId.toLowerCase()}`);
      setCardData(response.data);
      console.log('Card Data:', response.data);

    } catch (error) {
      console.error('Erro ao buscar carta:', error);
      Alert.alert('Erro', 'Carta não encontrada ou código inválido.');
      setCardData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Selecione a Série:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedSerie}
          onValueChange={(itemValue) => {
            setSelectedSerie(itemValue);
            setSelectedSet('');
            setCardData(null);
          }}
        >
          <Picker.Item label="Selecione uma série..." value="" />
          {series.map((serie) => (
            <Picker.Item key={serie.id} label={serie.name} value={serie.id} />
          ))}
        </Picker>
      </View>

      {sets.length > 0 && (
        <>
          <Text style={styles.label}>Selecione o Conjunto:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedSet}
              onValueChange={(itemValue) => {
                setSelectedSet(itemValue);
                setCardData(null);
              }}
            >
              <Picker.Item label="Selecione um conjunto..." value="" />
              {sets.map((set) => (
                <Picker.Item key={set.id} label={set.name} value={set.id} />
              ))}
            </Picker>
          </View>
        </>
      )}

      <Text style={styles.label}>Número da Carta:</Text>
      <TextInput
        style={styles.input}
        value={cardNumber}
        onChangeText={setCardNumber}
        placeholder="Ex: 136"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar Carta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.scanButton]} onPress={() => Alert.alert('Scanner', 'Funcionalidade de scanner ainda não implementada.')}>
        <Text style={styles.buttonText}>Escanear Carta</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#2a75bb" style={{ marginTop: 20 }} />}

      {cardData && (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{cardData.name}</Text>

    {cardData.image ? (
  <Image
    source={{ uri: `${cardData.image}/high.webp` }}
    style={styles.cardImage}
  />
) : (
  <Text style={styles.cardText}>Imagem não disponível</Text>
)}

    <Text style={styles.cardText}>Conjunto: {cardData.set?.name || 'N/A'}</Text>
    <Text style={styles.cardText}>Número: {cardData.localId || 'N/A'}</Text>
    <Text style={styles.cardText}>Tipo: {cardData.supertype || 'N/A'}</Text>
     <Text style={styles.cardText}>Preço: {cardPrice || 'Carregando...'}</Text>
  </View>
)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, marginBottom: 5 },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2a75bb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  scanButton: { backgroundColor: '#4e8cff' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  card: { marginTop: 20, alignItems: 'center' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  cardImage: { width: 200, height: 270, resizeMode: 'contain', marginBottom: 10 },
  cardText: { fontSize: 14 },
});
