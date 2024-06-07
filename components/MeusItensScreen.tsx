import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { useGlobalState } from '../hooks/useGlobalState';

const itemTypes: { [key: string]: any } = {
  Plástico: require('../assets/images/plastic-icon.png'),
  Papel: require('../assets/images/paper-icon.png'),
  Metal: require('../assets/images/metal-icon.png'),
  Vidro: require('../assets/images/glass-icon.png'),
  NãoReciclável: require('../assets/images/non-recyclable-icon.png'),
};

const MeusItensScreen: React.FC = () => {
  const { coletas, fetchColetas } = useGlobalState();

  useEffect(() => {
    fetchColetas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Itens</Text>
      <FlatList
        data={coletas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={itemTypes[item.tipo_item]} style={styles.itemImage} />
            <Text style={styles.itemText}>{item.tipo_item}</Text>
            <Text style={styles.quantityText}>{item.quantidade}</Text>
            <TouchableOpacity style={styles.removeButton}>
              <Text style={styles.buttonText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum item coletado.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
    marginRight: 10,
  },
  removeButton: {
    padding: 4,
    backgroundColor: '#3F3F3F',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default MeusItensScreen;
