import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  ColetasScreen: undefined;
};

type ColetasScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ColetasScreen'>;

const { width, height } = Dimensions.get('window');

const items = [
  { id: '1', name: 'Plástico', icon: '♻️' },
  { id: '2', name: 'Papel', icon: '📄' },
  { id: '3', name: 'Metal', icon: '🛠️' },
  { id: '4', name: 'Vidro', icon: '🍾' },
  { id: '5', name: 'Não-Reciclável', icon: '🚮' },
];

const ColetasScreen: React.FC = () => {
  const navigation = useNavigation<ColetasScreenNavigationProp>();
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Coletas</Text>
        <TouchableOpacity style={styles.profileCircle}>
          <Text style={styles.profileIcon}>⚪</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Procurando um item específico?"
        placeholderTextColor="rgba(0, 0, 0, 0.5)"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemIcon}>{item.icon}</Text>
            <Text style={styles.itemName}>{item.name}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity>
                <Text style={styles.quantityButton}>+</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>1</Text>
              <TouchableOpacity>
                <Text style={styles.quantityButton}>-</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity style={styles.myItemsButton}>
        <Text style={styles.myItemsButtonText}>Meus Itens</Text>
      </TouchableOpacity>
      <View style={styles.navbar}>
        <TouchableOpacity>
          <Text style={styles.navbarIcon}>🏠</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navbarIcon}>♻️</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.navbarIcon}>👤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Raleway-Bold',
  },
  profileCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    fontSize: 20,
    color: '#000',
  },
  searchInput: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: 20,
    fontFamily: 'Raleway-Regular',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  itemIcon: {
    fontSize: 24,
    color: '#fff',
  },
  itemName: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Raleway-Regular',
    flex: 1,
    marginLeft: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    color: '#fff',
    marginHorizontal: 10,
  },
  quantity: {
    fontSize: 18,
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Raleway-Bold',
  },
  myItemsButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 20,
  },
  myItemsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Raleway-Bold',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  navbarIcon: {
    fontSize: 24,
    color: '#000',
  },
});

export default ColetasScreen;
