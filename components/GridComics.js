import React, {Component} from 'react';
import { StyleSheet, Text, View,Image,ScrollView,ActivityIndicator } from 'react-native';


export default class GridComics extends Component {

   

    render() {
        if (this.props.allstate.comics === undefined || this.props.allstate.comics.length == 0) {
            return (
                <ActivityIndicator size="large" style={styles.loader} />
            )
        } else {
            return (
                <View style={styles.container}>
                
                <ScrollView horizontal={true}>
                {this.props.allstate.comics.map((comic) => { 
          
                  let imgSrc = comic.thumbnail.path+".jpg";
          
                  return( 
                    <View key={comic.id} style={styles.wrappImg}>
                        <Image source={{uri: imgSrc}} style={styles.imgPoster}/>
                        <Text style={styles.title}>{comic.title}</Text>
                      
                    </View>
              
                  )})}
                </ScrollView>
                </View>
            )
        }
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loader:{
      marginTop: '100%'
    },
    imgPoster: {
      flex:1,
      alignSelf: 'center',
      width: 350,
      height: 300,
      borderRadius:10
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
  
  