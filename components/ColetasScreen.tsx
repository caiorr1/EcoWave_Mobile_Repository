import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { useGlobalState } from '../hooks/useGlobalState'; // Importa o hook de estado global

interface ItemType {
  [key: string]: ImageSourcePropType;
}

// Tipos de itens e suas respectivas imagens
const itemTypes: ItemType = {
  Plástico: require('../assets/images/plastic-icon.png'), 
  Papel: require('../assets/images/paper-icon.png'), 
  Metal: require('../assets/images/metal-icon.png'), 
  Vidro: require('../assets/images/glass-icon.png'), 
  NãoReciclável: require('../assets/images/non-recyclable-icon.png')
};

const ColetasScreen = () => {
  const [items, setItems] = useState([
    { id: 1, type: 'Plástico', quantity: 1 },
    { id: 2, type: 'Papel', quantity: 2 },
    { id: 3, type: 'Metal', quantity: 1 },
    { id: 4, type: 'Vidro', quantity: 3 },
    { id: 5, type: 'NãoReciclável', quantity: 0 },
  ]);

  const { adicionarColeta } = useGlobalState(); // Usa a função do contexto global

  // Função para incrementar a quantidade de um item
  const handleAddItem = (id: number) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, quantity: Math.min(item.quantity + 1, 50) } : item // Limita a quantidade máxima a 50
    );
    setItems(newItems);
  };

  // Função para decrementar a quantidade de um item
  const handleRemoveItem = (id: number) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item // Limita a quantidade mínima a 0
    );
    setItems(newItems);
  };

  // Função para salvar a coleta no banco de dados
  const handleSaveItem = async (type: string, quantity: number) => {
    if (quantity > 0) { // Só tenta salvar se a quantidade for maior que 0
      await adicionarColeta(type, quantity);
    }
  };

  return (
    <View style={styles.container}>
      {items.map(item => (
        <View key={item.id} style={styles.itemContainer}>
          <Image source={itemTypes[item.type]} style={styles.itemImage} />
          <Text style={styles.itemText}>{item.type}</Text>
          <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.changeQuantityButton}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleAddItem(item.id)} style={styles.changeQuantityButton}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={() => handleSaveItem(item.type, item.quantity)}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20, // Espaçamento do topo
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3F3F3F', // Cor de fundo do retângulo
    width: 250, // Largura do retângulo
    height: 72, // Altura do retângulo
    borderRadius: 4, // Borda arredondada
    marginVertical: 10, // Espaçamento vertical entre os itens
    paddingHorizontal: 10, // Padding horizontal interno
  },
  itemImage: {
    width: 30, // Diminuir tamanho da imagem
    height: 30, // Diminuir tamanho da imagem
    marginRight: 10,
  },
  itemText: {
    flex: 1,
    fontSize: 14, // Diminuir tamanho do texto
    color: 'white', // Cor do texto
  },
  quantityText: {
    fontSize: 14, // Diminuir tamanho do texto da quantidade
    color: 'white', // Cor do texto
    marginRight: 10,
  },
  changeQuantityButton: {
    padding: 4, // Diminuir tamanho do botão de adicionar/remover
    backgroundColor: '#3F3F3F', // Mesma cor do fundo do retângulo
    borderRadius: 5,
  },
  addButton: {
    paddingVertical: 3, // Diminuir tamanho do botão adicionar
    paddingHorizontal: 6,
    backgroundColor: '#3F3F3F', // Cor de fundo cinza
    borderRadius: 5,
    borderWidth: 1, // Borda branca
    borderColor: 'white',
  },
  buttonText: {
    color: 'white', // Cor do texto do botão
    fontSize: 12, // Diminuir tamanho do texto do botão
  }
});

export default ColetasScreen;
