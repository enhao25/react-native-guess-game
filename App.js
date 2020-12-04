import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo';
import Header from './Components/Header';
import StartGameScreen from './Screens/StartGameScreen';
import GameScreen from './Screens/GameScreen';
import GameOverScreen from './Screens/GameOverScreen';

import * as Font from 'expo-font';

// Specific where we get the fonts and what is the name we want to name them as
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/Fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/Fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {

  const [ userNumber, setUserNumber ] = useState();
  const [ guessRounds, setGuessRounds ] = useState(0);
  const [ dataLoaded, setDataLoaded ] = useState(false);

  // Loading Screen if the data in fetchFonts (Must be a promise) has not been loaded
  if (!dataLoaded) {
    return <AppLoading 
      startAsync={fetchFonts} 
      onFinish={() => setDataLoaded(true)} 
      onError={() => console.log("Error in App Loading")} />;
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  }

  const newGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />
  // content = <GameOverScreen numOfRounds={1} userNumber={1} newGameHandler={1} />

  
  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if (guessRounds > 0) {
    content = <GameOverScreen numOfRounds={guessRounds} userNumber={userNumber} newGameHandler={newGameHandler} />
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
