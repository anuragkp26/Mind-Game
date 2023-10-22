import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomNumber(min, max, exclude) {
  const rNumber = Math.floor(Math.random() * (max - min) + min);

  if (rNumber === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return rNumber;
  }
}

let minValue = 1;
let maxValue = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialGuess = generateRandomNumber(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [numRound, setNumRound] = useState([initialGuess]);

  const { width, height } = useWindowDimensions();

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(numRound.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minValue = 1;
    maxValue = 100;
  }, []);

  function guessNextNumber(status) {
    // status = "lower" or "greater"

    console.log(
      userNumber + "-" + currentGuess + "-" + minValue + "-" + maxValue
    );

    if (
      (status === "lower" && currentGuess < userNumber) ||
      (status === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Warning", "Enter right command", [
        { text: "OK", style: "destructive" },
      ]);
      return;
    }

    if (status === "lower") {
      maxValue = currentGuess;
    } else {
      minValue = currentGuess + 1;
    }

    const nextGuess = generateRandomNumber(minValue, maxValue, currentGuess);
    setCurrentGuess(nextGuess);
    setNumRound((guesses) => [nextGuess, ...guesses]);
  }

  const listLength = numRound.length;

  const listMarginTop = width > 300 ? 4 : 24

  let content = (
    <>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or Lower?
        </InstructionText>
        <View style={styles.btnContainer}>
          <View style={styles.btnView}>
            <PrimaryButton onPress={guessNextNumber.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.btnView}>
            <PrimaryButton onPress={guessNextNumber.bind(this, "greater")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
    </>
  );

  if (width > 400) {
    content = (
      <>
        <View style={styles.buttonContainerWide}>
          <View style={styles.btnView}>
            <PrimaryButton onPress={guessNextNumber.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.btnView}>
            <PrimaryButton onPress={guessNextNumber.bind(this, "greater")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
      <View style={styles.screen}>
        <Title>Opponent's Guss</Title>
        {content}
        {/* <ScrollView>
        {numRound.map(guess => (
          <Text key={guess}>{guess}</Text>
        ))}
      </ScrollView> */}
        <View style={[styles.list, {marginTop: listMarginTop}]}>
          <FlatList
            data={numRound}
            renderItem={(itemData) => (
              <GuessLogItem
                roundNumber={listLength - itemData.index}
                guess={itemData.item}
              />
            )}
            keyExtractor={(item, index) => item}
          />
        </View>
      </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 24,
    alignItems: "center",
  },

  instructionText: {
    marginBottom: 20,
  },

  btnContainer: {
    flexDirection: "row",
  },

  btnView: {
    flex: 1,
  },

  list: {
    flex: 1,
    width: "80%",
    marginTop: 24,
    paddingBottom: 24,
  },

  buttonContainerWide:{
    flexDirection: "row",
    alignItems: "center"
  }
});
