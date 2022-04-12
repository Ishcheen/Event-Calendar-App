import React from 'react';
import { View, Text, Modal } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CarouselCardItem, { cd, SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem.jsx';




function CarouselCards(){
     const isCarousel = React.useRef(null);
     
  return (
      
    <View>
    
      <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        style={{justifyContent:'center', alignItems:'center'}}
        renderItem={ ({item}) => CarouselCardItem(item)}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={0}
        useScrollView={true}
    />
    </View>
  );
}


export default CarouselCards;