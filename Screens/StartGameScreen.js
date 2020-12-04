import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import BodyText from '../Components/BodyText';
import Card from '../Components/Card';
import Input from '../Components/Input';
import MainButton from '../Components/MainButton';
import NumberContainer from '../Components/NumberContainer';
import Colors from '../Constants/Colors';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        // Replace all char that is not a number to an empty string (Only allow number values)
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        // Validate so that only valid number is allowed
        const chosenNumber = parseInt(enteredValue);
        
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number!', 
                'Number has to be a number between 1 and 99.', 
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            )
            return;
        }
        setConfirmed(true);
        setSelectedNumber(enteredValue);
        setEnteredValue('');
        Keyboard.dismiss(); // Close the keyboard
    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = 
            <Card style={styles.summaryContainer}>
                <BodyText>You selected</BodyText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>START GAME</MainButton>
            </Card>
    }

    return(
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a New Game!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                    <Input style={styles.input} blurOnSubmit autoCapitalize='none' 
                        autoCorrect={false} keyboardType="number-pad" maxLength={2}
                        onChangeText={numberInputHandler} value={enteredValue} />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Reset" color={Colors.acent} onPress={resetInputHandler} />
                        </View>
                        <View style={styles.button}>
                            <Button title="Confirm" color={Colors.primary} onPress={confirmInputHandler} />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    inputContainer: {
        width: '80%',
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
        paddingHorizontal: 15
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    button: {
        width: 100,
    },
    input: {
        width: 80,
        textAlign: "center"
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;