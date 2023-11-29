import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Moment from 'moment';

const Calendar = ({ date }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.month}>{Moment(date).format('MMMM YYYY')}</Text>
      <Text style={styles.day}>{Moment(date).format('dddd')}</Text>
      <Text style={styles.date}>{Moment(date).format('DD')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  month: {
    fontSize: 20
  },
  day: {
    fontSize: 16
  },
  date: {
    fontSize: 32,
    fontWeight: 'bold'
    }
});
    
export default Calendar;