import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert, ScrollView, FlatList } from 'react-native';
import Card from '../Components/Card';
import MainButton from '../Components/MainButton';
import NumberContainer from '../Components/NumberContainer';

import { Ionicons } from '@expo/vector-icons';
import BodyText from '../Components/BodyText';

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

const renderListItem = (value, numOfRounds) => {
    return (
        <View key={value} style={styles.listItem}>
            <BodyText>#{numOfRounds}</BodyText>
            <BodyText>{value}</BodyText>
        </View>
    );
}

const GameScreen = props => {
    // useState only runs once so the generateRandomBetween will only run once
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    // Runs after the component has been rerendered
    useEffect(() => {
        if (currentGuess == userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGameHandler = direction => {
        if ((direction === "LOWER" && currentGuess < userChoice) || 
            (direction === "GREATER" && currentGuess > userChoice)) {
                Alert.alert("Don't lie", "You know that this is wrong", [{ text: "Sorry", style: "cancel" }]);
                return;
        }
        if (direction === "LOWER") {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }

        const nextNum = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNum);
        // setRounds(curRounds => curRounds + 1);
        setPastGuesses(currPastGuess => [nextNum, ...currPastGuess])
    }

    return(
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={() => nextGameHandler("LOWER")}>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MainButton>
                <MainButton onPress={() => nextGameHandler("GREATER")}>
                    <Ionicons name="md-add" size={24} color="white"/>        
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
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
    }, 
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10, 
        backgroundColor: 'white',
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: '70%'
    },
    listContainer: {
        flex: 1,
        width: '80%'
    },
    list: {
        alignItems: 'center'
    }
});

export default GameScreen;