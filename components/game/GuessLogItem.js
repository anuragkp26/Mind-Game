import { StyleSheet, View, Text } from "react-native";
import Colors from "../../constants/colors";

function GuessLogItem({roundNumber, guess}) {

    return(
        <View style={styles.rootContainer}>
            <Text style={styles.text}>#{roundNumber} </Text>
            <Text style={styles.text}>Opponent's Guesses: {guess}</Text>
        </View>
    )
}

export default GuessLogItem

const styles = StyleSheet.create({
    rootContainer:{
        flexDirection: "row",
        marginVertical: 8,
        borderColor: Colors.primary800,
        borderWidth: 2,
        borderRadius: 40,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: Colors.accents,
        width: "100%",
        elevation: 4,
        shadowColor: "black",
        shadowOffset: {width:0, height:0},
        shadowOpacity: 0.25,
        shadowRadius: 3,

    },

    text:{
        color: Colors.primary,
        fontSize: 18,
        fontFamily: "open-sans"
    },
})