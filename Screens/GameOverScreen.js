import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

const GameOverScreen = props => {
    return(
        <View style={styles.screen}>
            <Text>Game Over!</Text>
            <Text>Number of Rounds: {props.numOfRounds}</Text>
            <Text>The number was: {props.userNumber}</Text>
            <Button title="NEW GAME" onPress={props.newGameHandler} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default GameOverScreen;