import { useEffect, useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import service from '../connect/api';

export default function App({ navigation }) {
  const [data, setData] = useState([]);

  const fetch = async () => {
    try {
      const response = await service.getResources();
      setData(response); 
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await service.deleteResource(id);
      setData((prevData) => prevData.filter((item) => item.id !== id));
      Alert.alert("Success", "Item deleted successfully");
    } catch (error) {
      console.log("Error deleting item: ", error);
      Alert.alert("Error", "Failed to delete item");
    }
  };

  useEffect(() => {
    fetch();
    console.log(data)
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.avatar+".png" }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.username}>@{item.username}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
