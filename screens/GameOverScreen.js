import { StyleSheet, View, Image, Text, Dimensions } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";

function GameOverScreen({userInput, numRounds, onGameRestart}) {
  return (
    <View style={styles.rootContainer}>
      <Title style={styles.title}>Game Over!</Title>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlightText}>{numRounds}</Text> rounds to
        guess the number <Text style={styles.highlightText}>{userInput}</Text>.
      </Text>

      <PrimaryButton onPress={onGameRestart}>Start New Game</PrimaryButton>
    </View>
  );
}
export default GameOverScreen;

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    paddingHorizontal: 40,
  },

  imageContainer: {
    width: deviceWidth <  380 ? 200 : 300,//300,
    height: deviceWidth < 380 ? 200 : 300,//300,
    borderRadius: deviceWidth < 380 ? 100 : 150,//150,
    borderColor: Colors.primary800,
    borderWidth: 3,
    margin: 30,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  summaryText: {
    fontFamily: "open-sans",
    color: "white",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 24,
  },

  highlightText: {
    fontFamily: "open-sans-bold",
    color: Colors.primary,
  },

});
