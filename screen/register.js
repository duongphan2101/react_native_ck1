import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import service from '../connect/api';
export default function App({navigation}) {

  const [userName, setUserName] = useState();
  const [name, setName] = useState();
  const [passWord, setPassWord] = useState();

  const handleRegister = async () => {
    if(!name || !passWord || !userName){
      Alert.alert("Error, pls write full information!");
      console.log("Error, pls write full information!");
      return;
    }else{
      try {
        const check = await service.getResources();
        const userexits = check.find((u)=> u.username === userName)
        if(userexits){
          Alert.alert("Error, Account is already");
          console.log("Error, Account is already");
          return;
        }else{
          const user = {
            username: userName,
            password:passWord,
            name: name,
            avatar: 'https://imgur.com/2SDsjlL.png'
          }
          const response = await service.createResource(user);
          setUserName('')
          setName('')
          setPassWord('')
          navigation.navigate('Login')
        }
      } catch (error) {
        Alert.alert("Error, " +error);
        console.log("Error, " +error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 40, fontWeight: 'bold'}}>Register</Text>
      <TextInput style={styles.textInputStyle} placeholder='Username' value={userName} onChangeText={setUserName}/>
      <TextInput style={styles.textInputStyle} placeholder='Password' value={passWord} onChangeText={setPassWord}
        secureTextEntry={true}/>
            <TextInput style={styles.textInputStyle} placeholder='Enter your name' value={name} onChangeText={setName}/>
      <TouchableOpacity style={styles.touch} onPress={handleRegister}>
        <Text>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop: 20}} onPress={()=>{navigation.goBack()}}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle : {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 10
  },
  touch : {
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f333',
    paddingHorizontal: 80
  }
});
