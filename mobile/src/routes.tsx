import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


const {Navigator, Screen} = createStackNavigator();

import OrfanatoMapa from './pages/orfanatosMap';
import Orfanatodetalhes from './pages/orfanatosdetalhes';
import OrphanagePositionMap from './pages/createOrphanage/SelectMapPosition';
import OrphanageData from './pages/createOrphanage/OrphanageData';
import Header from './components/Header';

export default function Routes(){
    return(
        <NavigationContainer>
            <Navigator screenOptions={{headerShown:false, cardStyle:{backgroundColor:'#f2f3f5'}}}>
                <Screen name="OrfanatoMapa" component={OrfanatoMapa}/>     
                <Screen
                    name="OrfanatoDetalhes"
                    component={Orfanatodetalhes}
                    options={{
                        headerShown: true,
                        header:()=><Header showCancel={false} title="Orfanato Detalhes"/>
                    }}
                />   
                <Screen 
                    name="OrfanatoPosition" 
                    component={OrphanagePositionMap}
                    options={{
                        headerShown: true,
                        header:()=><Header title="Localização do orfanato"/>
                    }}
                /> 
                <Screen 
                    name="OrphanageData" 
                    component={OrphanageData}
                    options={{
                        headerShown: true,
                        header:()=><Header title="Informações do Orfanato"/>
                    }}
                />         
            </Navigator>
        </NavigationContainer>
    );
}