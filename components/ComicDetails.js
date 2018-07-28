import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, Image} from 'react-native';
import Moment from 'react-moment';

export default class ComicDetails extends Component {

    render() {

        let itemId = this.props.navigation.getParam('itemId', 'NO-ID');
        let comicLen = this.props.navigation.state.params.comics.length;
        
        
        for(let i=0; i< comicLen;i++) {
            if(itemId === this.props.navigation.state.params.comics[i].id) {
                let imgSrc = this.props.navigation.state.params.comics[i].thumbnail.path+".jpg";
                return (
                    <ScrollView style={styles.container}>
                        <Text style={styles.title}>{this.props.navigation.state.params.comics[i].title}</Text>
                        <Image source={{uri: imgSrc}} style={styles.imgPoster}/>
                        <Text style={{margin: 15, marginBottom: 0,fontSize: 18, fontWeight: 'bold',fontFamily: 'Courier'}}>Synopsis: </Text>
                        <Text style={styles.description}>{this.props.navigation.state.params.comics[i].description}</Text>
                        <View style={styles.wrappy}>
                            <View style={styles.wrappyItem}>
                                <Text style={styles.secondTitle}>Price: </Text>
                                <Text>${this.props.navigation.state.params.comics[i].prices[0].price}</Text>
                            </View>
                            <View style={styles.wrappyItem}>
                                <Text style={styles.secondTitle}>Release date: </Text>
                                <Moment element={Text} format="MMMM, DD, YYYY">{this.props.navigation.state.params.comics[i].dates[0].date}</Moment>
                            </View>
                        </View>
                    </ScrollView>
                )
            } 
        }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5'
    },
    imgPoster: {
      flex:1,
      width: 300,
      height: 450,
      borderRadius: 10,
      alignSelf: 'center',
      resizeMode: 'contain'
    },
    title: {
      textAlign: 'center',
      fontSize: 28,
      fontWeight: 'bold',
      fontFamily: 'Courier',
      marginBottom: 20,
      marginTop: 20
    },
    description: {
      width: '90%',
      margin: 15,
      fontFamily: 'Avenir',
      fontSize: 16
    },
    wrappy: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 15,
      marginBottom: 15
    },
    wrappyItem: {
        width: '45%'
    },
    secondTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Courier'
    }
  });