import React from 'react';
import { StyleSheet, Text,TextInput, View, TouchableOpacity,Image,ScrollView} from 'react-native';
import axios from 'axios';
import './shim.js';
import ComicDetails from './components/ComicDetails.js';
import { createStackNavigator } from 'react-navigation';
var crypto = require("crypto-js");

const REQUEST_URL = 'https://gateway.marvel.com:443/v1/public/comics';

class App extends React.Component {

  constructor (props) {
    super(props)
    this.state =  { 
      query: 'Thor',
      comics: [],
      text: 'Enter a comic name'
    }
    this.timestamp = 1;
    this.public_key = '7db6ef89ac98e1a615b902a069b08e27';
    this.private_key = '7bceb30a04b9a76e6a0059c5a85d3c0ccda7119d'
   this.searchComics()
  }

searchComics() {
  var hash = crypto.MD5(this.timestamp+this.private_key+this.public_key);
    //axios.get(`https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${this.state.query}&limit=28&apikey=7db6ef89ac98e1a615b902a069b08e27`)
    axios.get(REQUEST_URL+'?ts='+this.timestamp+'&apikey='+this.public_key+'&hash='+hash+'&titleStartsWith='+this.state.query+'&limit=28')  
    .then(res => {
        let comicsRes = res.data.data.results;
        this.setState({comics : comicsRes})
      })
      
  }

  handleInputChange = (text) => {
    this.setState({
      query: text
    }, () => {
      if (this.state.query && this.state.query.length >= 3) {
          this.searchComics()
      } 
    })
  }


  render() {
    
    return (
      <View style={styles.container}>
      
      <Text style={styles.mainTitle}>Welcome to Marvel Comics!</Text>
      <TextInput
        placeholder="Enter a comic name"
        onChangeText={(text) =>this.handleInputChange(text)}
        style={styles.searchbar}
        clearButtonMode={'while-editing'}
      />

      <ScrollView horizontal={true}>
                {this.state.comics.map((comic) => { 
          
                  let imgSrc = comic.thumbnail.path+".jpg";
                  let comicId = comic.id;
                  
                  return( 
                    <TouchableOpacity proppy={comic.id} key={comic.id} style={styles.wrappImg} onPress={() => this.props.navigation.navigate('Details', {itemId: comicId, comics: this.state.comics})}>
                        
                        <Image source={{uri: imgSrc}} style={styles.imgPoster}/>
                       
                        <Text style={styles.title}>{comic.title}</Text>
                      
                    </TouchableOpacity>
              
                  )})}
                </ScrollView>
      
      
      </View>
    );
  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader:{
    marginTop: '100%'
  },
  mainTitle:{
    width: '100%',
    height: 50,
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'center',
    fontFamily: 'Courier'
  },
  searchbar: {
    width: '100%',
    height: 50,
    borderBottomWidth: 5,
    borderBottomColor: 'red',
    paddingLeft: 10,
    backgroundColor: 'white',
    fontSize: 18,
    fontFamily: 'Courier'
  },
  imgPoster: {
    flex:1,
    alignSelf: 'center',
    width: 320,
    height: 370,
    borderRadius: 10
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    maxWidth: 250,
    marginLeft: 50
  },
  wrappImg: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    margin: 20
  }
});

const ModalStack = createStackNavigator({
  GridComics: {
    screen:  App
  },
  Details: {
      screen: ComicDetails
  }
});

export default ModalStack;

