import React, {useState} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import mapMarker from '../images/marker/marker.png';
import { Feather } from '@expo/vector-icons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

import api from '../services/api';

interface Ophanage{
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrfanatoMap(){
  const navigation = useNavigation();
  const [orfanatos, setOrfanatos] = useState<Ophanage[]>([]);
  useFocusEffect(()=>{
    api.get('orfanatos').then(response=>{
      setOrfanatos(response.data);
    });
  });
  function HandlerNavigationToPageDetail(id:number){
    navigation.navigate('OrfanatoDetalhes', {id});
  }
  function HandlerNavigationToPageCreate(){
    navigation.navigate('OrfanatoPosition');
  }
    return(
        <View style={styles.container}>
        <MapView 
          provider={PROVIDER_GOOGLE} 
          style={styles.map}
          initialRegion={{
            latitude: -24.0328825,
            longitude: -46.5113868,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008,
          }}
        >
          {orfanatos.map(item=>{
            return(
              <Marker
              key={item.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
            >
              <Callout tooltip onPress={()=>HandlerNavigationToPageDetail(item.id)}>
                <View style={styles.callutContainer}>
                  <Text style={styles.calloutText}>
                    {item.name}
                  </Text>
                </View>
              </Callout>
            </Marker>
            );
          })}
        </MapView>
  
        <View style={styles.footer}>
        <Text style={styles.footerText}>{orfanatos.length} Orfanatos encontrados</Text>            
              <RectButton style={styles.criarorfanato} onPress={HandlerNavigationToPageCreate}>
                <Feather name="plus" size={20} color="#FFF"/>
              </RectButton>
        </View>    
  
      </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#C14242",
    },
    map:{
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    callutContainer:{
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: 16,
      justifyContent: 'center',
    },
    calloutText:{
      color: '#0089a5',
      fontSize: 14,
    },
    footer:{
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#FFF',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3,
    },
    footerText:{
      color: '#8fa7b3',
  
    },
    criarorfanato:{
      width: 56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  