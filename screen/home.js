import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import service from '../connect/api';
export default function App({navigation, route}) {

  const user = route.params.userData;
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState(user.password);
  const [avatar, setAvatar] = useState(user.avatar);

  const handleUpdate = async () => {
    try {
      const newUser = {
        username : user.username,
        password : password,
        name : name,
        avatar : avatar
      }
      await service.updateResource(user.id, newUser);
      Alert.alert("Sucess!, Update information of user sucess")
      console.log("Sucess!, Update information of user sucess")
      navigation.navigate('Login')
    } catch (error) {
      Alert.alert("Error, Update information of user error!" + error)
      console.log("Error, Update information of user error!" + error)
    }
  }

  return (
    <View style={styles.container}>

      <View style={{flexDirection: 'row', alignItems: 'center', padding: 10}}>
        <Image style={{width: 60, height: 60, borderRadius: 60, marginHorizontal: 20}} 
          source={{uri: avatar+'.png'}}/>
        <Text style={{fontSize: 24, fontStyle: 'italic', fontWeight: 'bold'}}>{user.username}</Text>
      </View>

      <View style={{marginTop: 30}}>

        <View style={styles.boxInput}>
          <Text style={{fontWeight: '500'}}>Name: </Text>
          <TextInput style={styles.input} value={name} onChangeText={setName}/>
        </View>

        <View style={styles.boxInput}>
          <Text style={{fontWeight: '500'}}>Password: </Text>
          <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry={true}/>
        </View>

        <View style={styles.boxInput}>
          <Text style={{fontWeight: '500'}}>Avatar: </Text>
          <TextInput style={styles.input} value={avatar} onChangeText={setAvatar}/>
        </View>

        <TouchableOpacity style={{padding: 20, backgroundColor: 'pink', margin: 20, borderRadius: 10,
          alignItems: 'center'
        }} onPress={handleUpdate}>
          <Text style={{fontWeight: '500', color: '#fff'}}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 15, backgroundColor: 'red', margin: 20, borderRadius: 10,
          alignItems: 'center'
        }} onPress={()=>{navigation.navigate('Login')}}>
          <Text style={{fontWeight: '500', color: '#fff'}}>SignOut</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  boxInput: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input : {
    padding: 10,
    flex: 1
  }
});
