import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageSourcePropType, Modal } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useGlobalState } from '../hooks/useGlobalState';

export type RootStackParamList = {
  LoadingScreen: undefined;
  InitialScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ColetasScreen: undefined;
  MeusItensScreen: undefined;
};

interface ItemType {
  [key: string]: ImageSourcePropType;
}

const itemTypes: ItemType = {
  Plástico: require('../assets/images/plastic-icon.png'), 
  Papel: require('../assets/images/paper-icon.png'), 
  Metal: require('../assets/images/metal-icon.png'), 
  Vidro: require('../assets/images/glass-icon.png'), 
  'Não Reciclável': require('../assets/images/non-recyclable-icon.png')
};

const ColetasScreen: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, type: 'Plástico', quantity: 0 },
    { id: 2, type: 'Papel', quantity: 0 },
    { id: 3, type: 'Metal', quantity: 0 },
    { id: 4, type: 'Vidro', quantity: 0 },
    { id: 5, type: 'Não Reciclável', quantity: 0 },
  ]);

  const { adicionarColeta } = useGlobalState();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    setItems([
      { id: 1, type: 'Plástico', quantity: 0 },
      { id: 2, type: 'Papel', quantity: 0 },
      { id: 3, type: 'Metal', quantity: 0 },
      { id: 4, type: 'Vidro', quantity: 0 },
      { id: 5, type: 'Não Reciclável', quantity: 0 },
    ]);
  }, []);

  const handleAddItem = (id: number) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, quantity: Math.min(item.quantity + 1, 50) } : item 
    );
    setItems(newItems);
  };

  const handleRemoveItem = (id: number) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item 
    );
    setItems(newItems);
  };

  const handleSaveItem = async (type: string, quantity: number) => {
    if (quantity > 0) { 
      try {
        await adicionarColeta(type, quantity);
        setModalMessage(`Item ${type} adicionado com sucesso!`);
        setModalVisible(true);
      } catch (error) {
        setModalMessage('Falha ao adicionar item. Tente novamente.');
        setModalVisible(true);
      }
    } else {
      setModalMessage('A quantidade deve ser maior que zero.');
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coletas</Text>
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
      <TouchableOpacity style={styles.coletarButton} onPress={() => navigation.navigate('MeusItensScreen')}>
        <Text style={styles.coletarButtonText}>Meus Itens</Text>
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Raleway-Regular',
    marginBottom: 10,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3F3F3F',
    width: 250,
    height: 72,
    borderRadius: 4,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  itemImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  itemText: {
    flex: 1,
    fontSize: 14,
    color: 'white',
  },
  quantityText: {
    fontSize: 14,
    color: 'white',
    marginHorizontal: 5,
  },
  changeQuantityButton: {
    padding: 4,
    backgroundColor: '#3F3F3F',
    borderRadius: 5,
  },
  addButton: {
    paddingVertical: 3,
    paddingHorizontal: 6,
    backgroundColor: '#3F3F3F',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
  coletarButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    width: 76,
    height: 31,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  coletarButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ColetasScreen;
