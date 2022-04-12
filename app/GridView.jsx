import React,  { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { year, months } from './Items.js';
import GeneralStarExample from './Rating2.jsx';
import CarouselCards from './CarouselCards.jsx';
import CarouselCardItem, { cd, SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem.jsx';
import Carousel from 'react-native-snap-carousel';

const date1=[]
const date2=[]
const date=[]


function Pic1(itr){
    months.map(function(mon){
        for(let i=1; i<= mon.days ; i++)
        {  
           let d=(i<10)?"0"+i:i;
           let m=('0'+mon.id).slice(-2);
           const str=itr+"-"+m+"-"+d;
                  date1.push(
                       <View style={[styles.itemContainer,{backgroundColor: '#fff'}]} key={str}>
                         <Text style={styles.itemName}>{i}</Text>
                       </View>
                   );
        }
   });
}
function Pic2(item){
                  
               
                date2.push(
                    <View style={[styles.itemContainer,{backgroundColor: '#fff'}]} key={item.calendardatetime.substring(0,10)}>
                    
                      <Text style={styles.itemName}>{item.calendardatetime.substring(8,10)}</Text>
                        <View>
                        <GeneralStarExample 
                            starCount={item.rating}
                        />
                        
                        
                              <Image
                                source={{ uri: (item.media[0].mediaurl)}}
                                style={{ height: 80, width:50, }}
                              />
                       
                        <View style={{ flexDirection:'row', justifyContent:'space-around',alignItems:'flex-start', width:'90%',left:4}}>
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
                        <View style={styles.codeContainer}>
                          <Text style={styles.codeText}>{cd}</Text>
                        </View>);})}
                        </View>
                      </View>
                      
                    </View>
                );
}

function Choose()
{
    let j=0;
    
    for(var i=200;i<300;i++)
    {
        if(date1[i].key===date2[j].key)
        {
          
          date[i]=date2[j];
          j++;
          
        }
        else
        {
          date[i]=date1[i];
        }
        if(j>0 && date2[j].key===date2[j-1].key)
        {
            j++;
            
        }
        
    }
}
 function add(){
   for(var i=0;i<200;i++)
    {
        date[i]=date1[i];
    }
 }



export default function Calendar() {
  const [items, setItems] = React.useState(year);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const isCarousel = React.useRef(null); 
  const [modalVisible, setModalVisible] = useState(false);  
  
 
  const getMovies = async () => {
    try {
      const response = await fetch('http://devapi.quinn.care/graph',requestOptions);
      const json = await response.json();
      await setData(json.responseobjects[0].posts);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);


 
 const requestOptions= {
      method: "POST",
      body: JSON.stringify({
       "requestobjects": [
       {
      "posts": {
        "operationtype": "read",        
        "id": {
          "return": true
        },
        "userid": {
            "searchvalues" : ["41329663-5834-11eb-8e6e-3ca82abc3dd4"],
          "return": true
        },
        "iscalendarentry": {
            "searchvalues" : ["true"],
          "return": true
        },        
        "media": {
          "return": true //contains image url
        },
        "rating": {
          "return": true
        },
        "text": {
          "return": true
        },
        "privacy": {
          "searchvalues": [
            18
          ],
          "return": true
        },
        "typeofday": {
          "return": true
        },

        // Don't change anything above ^^	
        //editable variables start below //

        "calendardatetime": { // Date Time of a particular post
          "return": true  , // please note: there can be multiple posts on a single day
          "sort" : "ascending" // you can sort fetched dates by ascending/descending.
        },
        "maxitemcount": "20",   //you can ask between 1 to 50 posts (max) at a time.
        "continuationtoken": null //replace with the continuation token from response to get the next set
      }
       }
  ]
    }),
      
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
};

  
  
  year.map(Pic1);
  data.slice(0,15).map(Pic2);
//  <ActivityIndicator size="small"/>
  setTimeout(add,500);
 setTimeout(Choose,1200);
  
  // while(true)
  // {
  //     try{
  //       setTimeout(Choose,700);
  //       break;
  //     }
  //     catch(exception){
  //       if(exception instanceof ReferenceError)
  //       {
  //           var message=exception.message;
  //       }
        
  //     }
  // }
  
  

  return (
    <View>
    
    <FlatList
        data={date}
        style={{ marginTop:20, }}
        renderItem={({item }) => ( 
            <View style={{ 
                    flex:1,
                    flexDirection: 'column',
                    
                }}>
               <TouchableOpacity 
                          onPress={() => { setModalVisible(!modalVisible); }}
                        >  
                { item }
                 </TouchableOpacity>
                
            </View>
        )}
        numColumns={7}
       
        
        // keyExtractor={(item)=>item}
    />
    <Modal
          animationType='fade'
          backgroundColor='#000'
          visible={modalVisible}
          onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
          presentationStyle='fullScreen'
          >
          
          <View style={{backgroundColor: 'rgba(0,0,0,0.8)', flex:1, justifyContent:'center'}}>
          
              <Carousel
                  layout="default"
                  layoutCardOffset={9}
                  ref={isCarousel}
                  data={data.slice(0,20)}
                  style={{justifyContent:'center', alignItems:'center'}}
                  renderItem={ ({item}) => CarouselCardItem(item)}
                  sliderWidth={SLIDER_WIDTH}
                  itemWidth={ITEM_WIDTH}
                  inactiveSlideShift={0}
                  useScrollView={true}
                 
              />
          </View>
          
    </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  gridView: {
    
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 0,
    
    height: 150,
    borderWidth:0.3,
    borderColor:'#E3E0DF'
  },
  itemName: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  },
  codeContainer:{
        backgroundColor: '#FFDAB9',
        height:12,
        width:12,
        borderRadius:100,
        top:5,
        marginRight:10,
        justifyContent: 'center',
        alignItems: 'center',
  },
  codeText:{
      fontSize: 5,
      fontWeight: 'bold',
  },
});