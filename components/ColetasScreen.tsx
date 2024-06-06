import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { useGlobalState } from '../hooks/useGlobalState'; // Importa o hook de estado global

interface ItemType {
  [key: string]: ImageSourcePropType;
}

// Tipos de itens e suas respectivas imagens
const itemTypes: ItemType = {
  Plastico: require('../assets/plastic-icon.png'), 
  Papel: require('../assets/paper-icon.png'), 
  Metal: require('../assets/metal-icon.png'), 
  Vidro: require('../assets/glass-icon.png'), 
  NaoReciclavel: require('../assets/non-recyclable-icon.png')
};

const ColetasScreen = () => {
  const [items, setItems] = useState([
    { id: 1, type: 'Plastico', quantity: 1 },
    { id: 2, type: 'Papel', quantity: 2 },
    { id: 3, type: 'Metal', quantity: 1 },
    { id: 4, type: 'Vidro', quantity: 3 },
    { id: 5, type: 'NaoReciclavel', quantity: 0 },
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
          <TouchableOpacity style={styles.button} onPress={() => handleSaveItem(item.type, item.quantity)}>
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
    backgroundColor: '#F7F7F9', // Cor de fundo do retângulo
    width: 327, // Largura do retângulo
    height: 72, // Altura do retângulo
    borderRadius: 4, // Borda arredondada
    marginVertical: 10, // Espaçamento vertical entre os itens
    paddingHorizontal: 10, // Padding horizontal interno
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemText: {
    flex: 1,
    fontSize: 16, // Tamanho do texto
    color: '#000000', // Cor do texto
  },
  quantityText: {
    fontSize: 16, // Tamanho do texto da quantidade
    color: '#000000', // Cor do texto
    marginRight: 10,
  },
  changeQuantityButton: {
    padding: 10,
    backgroundColor: '#e0e0e0', // Cor do botão para alterar quantidade
    borderRadius: 5,
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff', // Cor do botão
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Cor do texto do botão
    fontSize: 14, // Tamanho do texto do botão
  }
});

export default ColetasScreen;
