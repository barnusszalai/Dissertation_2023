import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import profile_icon from '../../../assets/profile_icon.png';
import { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../graphql/queries';
import { useNavigation } from '@react-navigation/native';

const EmployeeItem = ({ membership }) => {
  const [employee, setEmployee] = useState('');
  const [employeeMembership, setEmployeeMembership] = useState(membership)
  const navigation = useNavigation();

  useEffect(() => {
    API.graphql(graphqlOperation(getUser, { id: membership.userID })).then((result) => {
      setEmployee(result?.data?.getUser);
    });
    console.warn(employee);
  }, []);

  const handleEditPress = () => {
    console.warn(membership)
    navigation.navigate('TeamMemberScreen', {member: employee, membership: membership})
    console.log('Edit icon pressed');
  };

  return (
    <View style={styles.container}>
      <Avatar source={profile_icon} size="medium" />
      <View style={styles.content}>
        <View style={styles.info}>
          <Text style={styles.name}>{employee?.first_name} {employee?.last_name}</Text>
          <Text style={styles.position}>{membership.position}</Text>
        </View>
        <View style={styles.importanceContainer}>
          <Text style={styles.importance}>{membership.department}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('TeamMemberScreen', {member: employee, membership: membership})} style={styles.editIcon}>
        <Icon name="edit" type="font-awesome" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 15,
    width: '100%',
    marginBottom: 20,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  info: {
    flexDirection: 'column',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 14,
    marginTop: 5,
  },
  importanceContainer: {
    backgroundColor: '#f1c40f',
    borderRadius: 5,
    padding: 4,
    marginTop: 10,
  },
  importance: {
    fontSize: 12,
    color: '#ffffff',
  },
  editIcon: {
    marginLeft: 'auto',
    marginRight: 10,
  },
});

export default EmployeeItem;
