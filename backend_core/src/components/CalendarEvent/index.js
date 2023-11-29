import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Moment from 'moment';

const Event = ({ start, end, title, date }) => {
const startTime = Moment(start).format('h:mm a');
const endTime = Moment(end).format('h:mm a');

return (
<View style={styles.container}>
<Text style={styles.time}>{startTime} - {endTime}</Text>
<Text style={styles.title}>{title}</Text>
</View>
);
};

const styles = StyleSheet.create({
container: {
padding: 10,
borderBottomWidth: 1,
borderBottomColor: 'lightgray',
flexDirection: 'row',
alignItems: 'center'
},
time: {
fontSize: 16,
marginRight: 10
},
title: {
fontSize: 16
}
});

export default Event;