import {Text, StyleSheet, Platform} from "react-native";


function Title({children, style}) {
 return(
    <Text style={[styles.title, style]}>{children}</Text>
 )
}

export default Title;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
       // fontWeight: "bold",
        color: "white",
        textAlign: "center",
        padding: 12,
       // borderWidth: Platform.OS === 'android' ? 2 : 0,//2,
       borderWidth: Platform.select({ios: 0, android: 2}),
        borderColor: "white",
        fontFamily: "open-sans-bold",
        maxWidth: "80%"
    }
})