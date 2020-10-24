import React, { useState } from 'react';
import { Image, ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';

interface handlerparams{
  position:{
    latitude: number;
    longitude: number;
  }
}

export default function OrphanageData() {
  const [name, setname] = useState('');
  const [about, setabout] = useState('');
  const [instrucao, setinstrucao] = useState('');
  const [funcionamento, setfuncionamento] = useState('');
  const [finaldesemana, setfinaldesemana] = useState(true);
  const [images, setimages] = useState<string[]>([]);
  const route = useRoute();
  const routeParams = route.params as handlerparams;
  const navigation = useNavigation();

  async function createorphanage(){
    const {latitude, longitude} = routeParams.position;
    const data = new FormData();
    data.append('name',name);
    data.append('about',about);
    data.append('latitude',String(latitude));
    data.append('longitude',String(longitude));
    data.append('instrucao',instrucao);
    data.append('funcionamento',funcionamento);
    data.append('finaldesemana',String(finaldesemana));
    images.forEach((image, index)=>{
      data.append('images',{
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,
      } as any)
    })

    await api.post('/orfanatos',data);
    navigation.navigate('OrfanatoMapa');
  }

  async function handlerSelectedImg(){
    const {status} = await ImagePicker.requestCameraRollPermissionsAsync();
    if(status !== 'granted'){
      alert('É necessário permissão para acesso à galeria.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if(result.cancelled){
      return;
    }
    const {uri: imagem}=result;
    setimages([...images, imagem]);
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setname}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={setabout}
      />
      {/*
      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
      />*/}

      <Text style={styles.label}>Fotos</Text>

      <View style={styles.FotosSelecionadas}>
        {images.map(image=>{
          return(
            <Image
              key={image}
              source={{uri:image}}
              style={styles.imagemselecionada}
            />
          );
        })}
      </View>

      <TouchableOpacity style={styles.imagesInput} onPress={handlerSelectedImg}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instrucao}
        onChangeText={setinstrucao}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={funcionamento}
        onChangeText={setfuncionamento}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={finaldesemana}
          onValueChange={setfinaldesemana}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={createorphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  FotosSelecionadas:{
    flexDirection: 'row',
  },
  imagemselecionada:{
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8,
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})