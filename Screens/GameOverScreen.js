import React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import BodyText from '../Components/BodyText';
import MainButton from '../Components/MainButton';
import TitleText from '../Components/TitleText';
import Colors from '../Constants/Colors';

const GameOverScreen = props => {
    return(
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
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3, 
        borderColor: 'black',
        overflow: "hidden",
        marginVertical: 30
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
        marginBottom: 20
    },
    resultText: {
        textAlign: "center",
        fontSize: 16
    }
});

export default GameOverScreen;