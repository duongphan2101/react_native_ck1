import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import service from '../connect/api';
export default function App({navigation}) {

  const [userName, setUserName] = useState();
  const [passWord, setPassWord] = useState();

  const handleLogin = async () => {
    try {
      const users = await service.getResources();
      const user = users.find(
        (u)=> u.username === userName && u.password ===passWord);
        if(user.id === '1'){
          navigation.navigate('Admin', {userData: user})
        }else if(user){
          navigation.navigate('Home', {userData: user})
        }
    } catch (error) {
      console.log("Loi ! "+error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 40, fontWeight: 'bold'}}>Login</Text>
      <TextInput style={styles.textInputStyle} placeholder='Username' value={userName} onChangeText={setUserName}/>
      <TextInput style={styles.textInputStyle} placeholder='Password' value={passWord} onChangeText={setPassWord}
        secureTextEntry={true}/>
      <TouchableOpacity style={styles.touch} onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{marginTop: 20}} onPress={()=>{navigation.navigate('Register')}}>
        <Text>Register</Text>
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
