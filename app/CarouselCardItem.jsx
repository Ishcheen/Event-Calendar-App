import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { data, months,codes } from './Items.js';
import GeneralStarExample2 from './Rating.jsx';



export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)


function CarouselCardItem(item)
{
     return (
       
       <View style={styles1.container}>
       <Image
          source={{ uri: item.media[0].mediaurl }}
          style={styles1.image}
          
        />
        
        <View style={{ padding:10, flexDirection: 'row', justifyContent: 'space-between', width:'50%', alignItems:'center'}}>
          <View style={{ flexDirection:'row', justifyContent:'space-around'}}>
          {item.typeofday.map(it=> 
                         {let cd=''
                         if(it==='hair cut')
                         {
                            cd='Cu'
                         }
                         else if(it==='protein treatment')
                         {
                           cd='Pr'
                         }
                         else if(it==='hair color')
                         {
                           cd='Hc'
                         }
                         else if(it==='deep conditioning')
                         {
                           cd='Dc'
                         }
                         else
                         {
                           cd='C'
                         }
                         return(
                        <View style={styles1.codeContainer}>
                          <Text style={styles1.codeText}>{cd}</Text>
                        </View>);})}
          </View>
          <GeneralStarExample2 starCount={item.rating} style={{right:10}}/>
        </View>
        <Text style={styles1.header}>{item.calendardatetime.substring(8,10)+" "+months[parseInt(item.calendardatetime.substring(5,7))-1].name}</Text>
        <Text style={styles1.body}>{item.text}</Text>
        <TouchableOpacity style={{ width:'100%', height:20, activeOpacity:0.5, justifyContent:'flex-end',alignItems:'center', borderTopColor:'grey', borderTopWidth:3, marginTop:22}}>
            <Text style={{ fontSize: 20, top:20, fontWeight:'bold'}}>View Full Post</Text>
        </TouchableOpacity>
      </View>
      
     );
}

const styles1 = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    height:630,
    width: ITEM_WIDTH,
    // top:100,
    left:-50,
    paddingBottom: 40,
    top: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  body: {
    color: "#222",
    fontSize: 16,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  codeContainer:{
        backgroundColor: '#FFDAB9',
        height:35,
        width:35,
        borderRadius:100,
        marginRight:10,
        justifyContent: 'center',
        alignItems: 'center',
  },
  codeText:{
      fontSize: 15,
      fontWeight: 'bold',
  },
});

export default CarouselCardItem;
