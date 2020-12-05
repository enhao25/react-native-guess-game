import React from 'react';
import { StyleSheet, View, Text, Button, Image, Dimensions, ScrollView } from 'react-native';
import BodyText from '../Components/BodyText';
import MainButton from '../Components/MainButton';
import TitleText from '../Components/TitleText';
import Colors from '../Constants/Colors';

const GameOverScreen = props => {
    return(
        <ScrollView>
            <View style={styles.screen}>
                <TitleText>Game Over!</TitleText>
                <View style={styles.imageContainer}>
                    {/* Local Images */}
                    {/* <Image style={styles.image} resizeMode="cover" source={require("../assets/success.png")} />  */}
                    {/* Network Image */}
                    <Image style={styles.image} resizeMode="cover" source={{uri: "https://cdn.mos.cms.futurecdn.net/ntFmJUZ8tw3ULD3tkBaAtf.jpg"}} /> 
                </View>
                <View style={styles.resultContainer}>
                    <BodyText style={styles.resultText}>Your phone needed <Text style={styles.highlight}>{props.numOfRounds}</Text> 
                    &nbsp;to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>.
                    </BodyText>
                </View>
                <MainButton onPress={props.newGameHandler}>NEW GAME</MainButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3, 
        borderColor: 'black',
        overflow: "hidden",
        marginVertical: Dimensions.get('window').height / 30 
    },
    image: {
        width: '100%',
        height: '100%'
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginBottom: Dimensions.get('window').height / 60 
    },
    resultText: {
        textAlign: "center",
        fontSize: Dimensions.get('window').height < 400 ? 14 : 16
    }
});

export default GameOverScreen;