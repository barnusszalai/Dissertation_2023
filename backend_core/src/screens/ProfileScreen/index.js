import {FlatList, View, Text, StyleSheet, Button} from 'react-native';
import { Auth } from 'aws-amplify';
import PersonalSettings from '../../components/PersonalSettings'




export default function ProfileScreen() {


    return (
        <View style={styles.container}>
            <View style={{justifyContent: 'flex-start'}}>
                <View style={styles.row}>
                    <Text style={styles.title}>Profile</Text>
                </View>
                <PersonalSettings />
                <Text></Text>
            </View>
            <Button title="Sign out" onPress={() => Auth.signOut()}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 60,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 30,
    },
    title: {
        fontSize: 26,
        adjustFontSizeToFit: true,
        marginHorizontal: 20,
        marginBottom: 20,
        marginTop: 20,
    },
});