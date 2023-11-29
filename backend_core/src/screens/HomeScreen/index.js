import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { listScheduledMeetings, getUser, listUserScheduledMeetings, getMeeting } from '../../graphql/queries';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import MeetingItem from '../../components/MeetingItem'

import { DataContext } from '../../DataContext/DataContext';

const screenWidth = Dimensions.get('window').width;
const blockHeight = 60;


async function getMeetings() {
   const testBackendResponse = await API.get('testBackend', '/testFunction');
   return testBackendResponse;
}



const HomeScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentUser, setCurrentUser] = useState();
  const [test, setTest] = useState(null);
  async function fetchTest() {
    // const data = await API.put('schedulingalg', '/test', {
    //   body: {"message": "test"}
    // })
    // setTest(data.message);
    console.warn("testttt")
  }

  const myDataContext = useContext(DataContext);
  //myDataContext.updateUser(currentUser);
  //console.warn(myDataContext.currentUser);
  


  const [meetingUsers, setMeetingUsers] = useState([]);
  const [meetings, setMeetings] = useState(new Map());



  const authUser = Auth.currentAuthenticatedUser({
    bypassCache: true
  });
  useEffect(() => {
    

  }, []);

  useEffect(() => {

    const syncUser = async () => {
      // get Auth user
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true
      });

      // query the database using Auth user id
      const userData = await API.graphql(
        graphqlOperation(getUser, { id: authUser.attributes.sub })
      );


      // check if user exists
      if (userData.data.getUser) {
        //console.warn(userData.data.getUser);
        myDataContext.updateUser(userData.data.getUser)
        setCurrentUser(userData.data.getUser)
        userData.data.getUser.meetings.items.forEach(mUser => {
          API.graphql(graphqlOperation(getMeeting, { id: mUser.meetingId })).then((result) => {
    
              // map each meeting to an hour slot !!!
              //setMeetings(prev => [...prev, result.data.getScheduledMeeting]);
              setMeetings(meetings => new Map(meetings.set(result.data.getMeeting.start_time, result.data.getMeeting)));
              console.warn(result.data.getMeeting.start_time)
          }).catch(function(error) {
            console.warn("errorrr")
        });
        })
        return;
      }


    };

    syncUser();
    fetchTest();
    console.warn(test)
    API.graphql(graphqlOperation(listScheduledMeetings)).then((result) => {
        //setMeetings(result.data?.listScheduledMeetings?.items.filter(item => !item._deleted));
    }).catch(function(error) {
        console.log("errorrr")
    });

}, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const currentMinutePercentage = (currentMinute / 60) * 60;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.date}>{currentDate.toDateString()}</Text>
      </View>
      <ScrollView style={styles.calendarContainer}>
        {Array.from({ length: 24 }, (_, i) => (
            <View key={i} style={styles.timeBlockContainer}>
                <Text style={[styles.hourLabel, ( (i===currentHour+1 && currentMinute>50) || (i===currentHour && currentMinute<10)) ? {opacity: '0%'} : {}]}>{i}:00</Text>
                <View style={styles.eventContainer}>

                  {/* Add event */}
                  {meetings.has(i+":00") ? (
                    <View style={[styles.blockedEvent]}>
                      <Text style={[{fontWeight: '500', fontSize: 14}, styles.blockedEventText]}>{meetings.get(i+":00").title}</Text>
                      <Text style={[{opacity: 0.7, fontSize: 12}, styles.blockedEventText]}>{meetings.get(i+":00").location}</Text>
                    </View>
                  ) : (<View></View>)
                  }
                  {/* <MeetingItem meeting={meetings[0]} /> */}

                  {i === currentHour && (
                  <View style={styles.currentTimeIndicatorContainer}>
                      <Text style={[styles.currentTimeIndicatorLabel, { top: currentMinutePercentage }]}>
                          {currentTime.toLocaleTimeString().substr(0, 5)}
                      </Text>
                      <View style={[styles.currentTimeIndicator, { top: currentMinutePercentage }]} />
                      <View style={[styles.currentTimeIndicatorCircle, {top: currentMinutePercentage-3.5}]} />
                  </View>
                  )}
                </View>
            </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFEFE'
  },
  header: {
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  date: {
    fontSize: 20
  },
  calendarContainer: {
    paddingTop: 20,
  },
  timeBlockContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    height: blockHeight,
  },
  hourLabel: {
    width: 60,
    fontSize: 16,
    color: '#333',
  },
  eventContainer: {
    flex: 1,
    marginTop: 9,
    height: '100%',
    //backgroundColor: '#F5F5F5',
    //borderBottomWidth: StyleSheet.hairlineWidth,
    borderTopWidth: StyleSheet.hairlineWidth,
    marginLeft: 0,
    borderRadius: 5,
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  currentTimeIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    marginRight: -1000,
    backgroundColor: 'red',
    marginLeft: -15,
  },
  currentTimeIndicatorCircle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: 'red',
    position: 'absolute',
    left: 0,
  },
  currentTimeIndicatorContainer: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 100,
  },
  currentTimeIndicatorLabel: {
    marginLeft: -55,
    marginTop: -7,
    fontSize: 12,
    color: 'red',
    fontWeight: '600',
  },
  blockedEvent: {
    flex: 1,
    marginVertical: 2,
    backgroundColor: 'pink',
    borderRadius: 10,
    padding: 8,
    zIndex: 5,
  },
  blockedEventText: {
    marginBottom: 0,
    color: '#800020',
  },
});

export default HomeScreen
