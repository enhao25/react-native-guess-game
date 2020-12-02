import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import Card from '../Components/Card';
import NumberContainer from '../Components/NumberContainer';

// Generate a random number between min and max and the random number cannot be the excluded number
const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

const GameScreen = props => {
    // useState only runs once so the generateRandomBetween will only run once
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const nextGameHandler = direction => {
        if ((direction === "LOWER" && currentGuess < props.userChoice) || 
            (direction === "GREATER" && currentGuess > props.userChoice)) {
                Alert.alert("Don't lie", "You know that this is wrong", [{ text: "Sorry", style: "cancel" }]);
                return;
        }
        if (direction === "LOWER") {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }

        const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNum);
    }

    return(
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={() => nextGameHandler("LOWER")} />
                <Button title="GREATER" onPress={() => nextGameHandler("GREATER")} />
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 20,
        width: '80%'
    }
});

export default GameScreen;