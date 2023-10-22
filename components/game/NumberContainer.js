import { View, Text, StyleSheet, Dimensions, } from "react-native";
import Colors from "../../constants/colors";

function NumberContainer({children}) {
    return(
        <View style={styles.container}>
            <Text style={styles.numberText}>{children}</Text>
        </View>
    )
}

export default NumberContainer

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container:{
        width: "30%",
        borderWidth: 4,
        borderColor: Colors.accents,
        borderRadius: 8,
        padding: deviceWidth < 380 ? 16 : 24,//24,
        margin: deviceWidth < 380 ? 16 : 24,//24,
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "80%"
        
    },

    numberText:{
        fontSize: deviceWidth < 380 ? 28 : 36,//36,
        //fontWeight: "bold",
        color: Colors.accents,
        fontFamily: "open-sans-bold",
    }
})