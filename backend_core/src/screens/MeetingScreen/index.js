import {View, Text} from 'react-native';
import MeetingItem from '../../components/MeetingItem';


const MeetingScreen = ({route, navigation}) => {
    const {meeting} = route.params;
    return (
        <View>
            <MeetingItem meeting={meeting} />
        </View>
    )
}

export default MeetingScreen;