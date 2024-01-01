import {Text, View, TouchableOpacity} from "react-native";

export default function BigButton({myText}) {
    return (
        <TouchableOpacity style={styles.BigButtons}>
            <View>
                <Text style={{color: '#FAF1E4'}}>{myText}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create(
    {
        BigButtons: {
            backgroundColor: '#435334',
            color:'#FAF1E4',
            padding: 10,
            borderRadius: 10,
            margin: 5,
            height: '7.5%',
            width: '100%',
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
    }
)