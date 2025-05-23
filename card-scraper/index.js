const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const port = 3000; // Escolha uma porta qualquer para seu servidor

// Função para fazer scraping do preço da carta
const fetchCardPrice = async (localId, totalInSet) => {
  try {
    const cardPath = `${localId}%2F${totalInSet}`;
    const url = `https://www.ligapokemon.com.br/?view=cards%2Fsearch&card=${cardPath}`;
    const { data } = await axios.get(url);

    // Carregar o HTML da página com Cheerio
    const $ = cheerio.load(data);

    // Encontrar o elemento que contém o preço
    const priceElement = $('.bg-light-grey .container-price-mkp .price-mkp .medium .price'); // Verifique se o seletor está correto
    const price = priceElement.text().trim();

    if (!price) {
      throw new Error('Preço não encontrado');
    }

    return price;
  } catch (error) {
    console.error('Erro ao buscar preço:', error);
    return 'Não disponível';
  }
};

// Endpoint agora espera dois parâmetros: localId e totalInSet
app.get('/get-card-price', async (req, res) => {
  const { localId, totalInSet } = req.query;

  if (!localId || !totalInSet) {
    return res.status(400).json({ error: 'Parâmetros localId e totalInSet são obrigatórios.' });
  }

  const price = await fetchCardPrice(localId, totalInSet);
  res.json({ price });
});

app.listen(port, () => {
  console.log(`✅ Servidor rodando em: http://localhost:${port}`);
});