import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useCallback } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font"
//import AppLoading from "expo-app-loading"
import { preventAutoHideAsync, hideAsync } from "expo-splash-screen"

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";


//preventAutoHideAsync()

export default function App() {
  const [inputNumber, setInputNumber] = useState();
  const [gameOverState, setGameOverState] = useState(true)
  const [rounds, updateRound] = useState();

  const [fontLoaded] = useFonts({
    'open-sans': require("./assets/fonts/OpenSans-Regular.ttf"),
    'open-sans-bold': require("./assets/fonts/OpenSans-Bold.ttf"),
  })

  // if(!fontLoaded){
  //   return <AppLoading />
  // }

  useEffect(() => {
    async function prepare() {
      await preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontLoaded) {
      await hideAsync();
    }
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null;
  }

  function inputNUmberHandler(number) {
    setInputNumber(number);
    setGameOverState(false)
  }

  function gameOverHandler(numRound) {
    updateRound(numRound)
    setGameOverState(true)
  }

  let screen = <StartGameScreen onPickNumber={inputNUmberHandler} />;

  function gameRestartHandler() {
    updateRound(0)
    setGameOverState(false)
    setInputNumber(null);

  }

  

  if (inputNumber) {
    screen = <GameScreen userNumber={inputNumber} onGameOver={gameOverHandler}/>;
  }

  if(gameOverState && inputNumber){
    screen = <GameOverScreen userInput={inputNumber} numRounds={rounds} onGameRestart={gameRestartHandler}/>
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient colors={[Colors.primary700, Colors.accents]} style={styles.rootScreen} onLayout={onLayoutRootView}>
        <ImageBackground
          style={styles.rootScreen}
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          imageStyle={styles.imgBackground}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    // backgroundColor: "#DDB52F",
  },

  imgBackground: {
    opacity: 0.18,
  },
});
