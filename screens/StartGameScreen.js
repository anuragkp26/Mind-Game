import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Alert,
  Text,
  Dimensions,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";

import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({ onPickNumber }) {
  const [enteredNumber, setEnterdedNumber] = useState("");

  const { width, height } = useWindowDimensions();

  function inputHandler(userInput) {
    setEnterdedNumber(userInput);
  }

  function resetInputHandler() {
    setEnterdedNumber("");
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid", "Has to be a number between 1 and 100", [
        { text: "ok", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }

    onPickNumber(chosenNumber);
  }

  const marginTopRoot = height < 380 ? 40 : 100;

  return (
    <ScrollView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1}} behavior="position">
        <View style={[styles.rootContainer, { marginTop: marginTopRoot }]}>
          <Title>Guess My Number</Title>
          <Card>
            <InstructionText>Enter a Number</InstructionText>
            <TextInput
              style={styles.inputText}
              maxLength={2}
              keyboardType="number-pad"
              autoCorrect={false}
              autoCapitalize="none"
              value={enteredNumber}
              onChangeText={inputHandler}
            />
            <View style={styles.btnContainer}>
              <View style={styles.btnView}>
                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
              </View>
              <View style={styles.btnView}>
                <PrimaryButton onPress={confirmInputHandler}>
                  Confirm
                </PrimaryButton>
              </View>
            </View>
          </Card>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

export default StartGameScreen;

//const deviceWidth = Dimensions.get('window').width
//const deviceHeight = Dimensions.get('window').height
//console.log("deviceHeight: " + deviceHeight);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    //marginTop: deviceHeight < 200 ? 20 : 100,//100,
    alignItems: "center",
  },

  inputText: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accents,
    borderBottomWidth: 2,
    color: Colors.accents,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },

  btnContainer: {
    flexDirection: "row",
  },
  btnView: {
    flex: 1,
  },
});
