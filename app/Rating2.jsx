import React ,{ Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import StarRating from 'react-native-star-rating';

class GeneralStarExample extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      starCount: props.starCount
    };
  }
 
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
 
  render() {
    return (
      <StarRating
        disabled={false}
        maxStars={5}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        starSize={5}
        fullStarColor='#6495ED'
        emptyStarColor='grey'
        containerStyle={{
            // justifyContent:'flex-end',
            // width:'50%',
            // marginLeft:'40%',
            // paddingRight: 10
        }}
      />
    );
  }
}
 
export default GeneralStarExample;