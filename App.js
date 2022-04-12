import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Dimensions, ScrollView, Image } from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Calendar from './app/GridView.jsx';
import CarouselCards from './app/CarouselCards.jsx';
import Icons from 'react-native-vector-icons/MaterialIcons';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './app/CarouselCardItem.jsx';
import { data, months, year } from './app/Items.js';

const windowHeight = Dimensions.get('window').height+40;


export default function App() {
  const [mon, setMonth]=useState('Jan');

function handleScroll(event){
  const h=event.nativeEvent.contentOffset.y/windowHeight;
  if(h<4)
  {
      setMonth(months[Math.ceil(h)].name);  
  }
  else
  {
    setMonth(months[Math.ceil(h+(0.7*h/5))].name);  
  }
  
}  
  return (
    
    <SafeAreaProvider>
    <View style={{ flex: 1 }}>
      <Header
        placement="left"
        leftComponent={<Icons name={'arrow-back'} size={28} color='#000' style={{marginLeft: '3%'}}/>}
        centerComponent={<View>
                          <Text style={{ color: '#3498db', fontSize: 20, fontWeight:'bold'}}>
                          my
                          <Text style={{ color: '#6F6765', fontSize: 20, fontWeight:'bold'}}>  hair diary</Text>
                          </Text>
                         </View>
                        }
        rightComponent={<Text style={{ fontSize: 17}}><Text style={{ fontSize: 17,fontWeight:'bold' }}>{mon}</Text> 2020</Text>}
        
        containerStyle={{
                          backgroundColor: '#fff',
                          justifyContent: 'space-around',
                        }}
      />

      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10}}>
        <Text style={{ color: '#000', fontSize: 15 ,fontWeight:'bold' }}>S</Text>
        <Text style={{ color: '#000', fontSize: 15 ,fontWeight:'bold' }}>M</Text>
        <Text style={{ color: '#000', fontSize: 15 ,fontWeight:'bold' }}>T</Text>
        <Text style={{ color: '#000', fontSize: 15 ,fontWeight:'bold' }}>W</Text>
        <Text style={{ color: '#000', fontSize: 15 ,fontWeight:'bold' }}>T</Text>
        <Text style={{ color: '#000', fontSize: 15 ,fontWeight:'bold' }}>F</Text>
        <Text style={{ color: '#000', fontSize: 15 ,fontWeight:'bold' }}>S</Text>
      </View>

      <ScrollView onScroll={handleScroll}
          contentOffset={{x:0, y:400}}      
      >
     <Calendar />
     </ScrollView>
    
    </View>
    <Image 
                style={{
                    width:60,
                    height:60,
                    position: 'absolute',
                    bottom: 50,
                    right:10,
                }}
                source={require('./assets/plus-icon.png')}
             />
      <View style={{ width:'100%', height:50, backgroundColor: '#fff', position:'absolute', bottom:0, flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
          <Icons name={'home'} size={28} color='#000' style={{marginLeft: '3%'}}/>
          <Icons name={'search'} size={28} color='#000' style={{marginLeft: '3%'}}/>
          <Icons name={'add'} size={28} color='#000' style={{marginLeft: '3%'}}/>
          <Icons name={'event'} size={28} color='#3498db' style={{marginLeft: '3%'}}/>
          <Icons name={'person'} size={28} color='#000' style={{marginLeft: '3%'}}/>
      </View>
    </SafeAreaProvider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
