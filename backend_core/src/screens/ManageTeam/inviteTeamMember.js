import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { List, Searchbar, Avatar, IconButton, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createMembership } from "../../graphql/mutations";
import { listUsers, membershipsByTeamID } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

const InviteComponent = (team, members) => {
  const [search, setSearch] = useState("");
  const { colors } = useTheme();
  const [filteredParticipants, setFilteredParticipants] = useState([]);
  const [participants, setParticipants] = useState([])
  const [memberIds, setMemberIds] = useState([])
  const [addedMembers, setAddedMembers] = useState([])

    useEffect(() => {
        console.warn(members)
        setParticipants([])
        setFilteredParticipants([])
        setMemberIds([])

        API.graphql(graphqlOperation(listUsers)).then((result) => {
            //setMemberIds(team.route.params.team.Memberships.items.map((member) => member.userID))
            console.warn(addedMembers)
            API.graphql(graphqlOperation(membershipsByTeamID, {teamID: team.route.params.team.id})).then((result2) => {
                const ids = result2?.data.membershipsByTeamID.items.filter(i => !i._deleted).map(item => item.userID)
                console.warn(ids)
                const getPassedMembers = members
                const filteredResult = result.data?.listUsers.items.filter(item => !(ids.includes(item.id)))
                setParticipants(filteredResult)
                setFilteredParticipants(filteredResult);
            })
            console.warn(participants)
        })
    }, [])

  const updateSearch = (search) => {
    setSearch(search);

    if (search) {
      setFilteredParticipants(
        participants.filter((participant) =>
          (participant.first_name + " " + participant.last_name).toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setFilteredParticipants(participants);
    }
  };

  const renderItem = ({ item }) => (
    <List.Item
      title={`${item.first_name} ${item.last_name}`}
      left={(props) => (
        <Avatar.Text {...props} label={item.first_name.charAt(0)} color="#fff" style={{ backgroundColor: "grey", marginLeft: 20 }} />
      )}
      right={(props) => (
        <IconButton
          {...props}
          icon={() => <Icon name="account-plus" size={24} color="#800020" />}
          onPress={() => inviteToTeam(item)}
        />
      )}
    />
  );

  const inviteToTeam = (participant) => {
    console.log(`Inviting ${participant.first_name} ${participant.last_name} to the team.`);

    if (participant.id in memberIds) {
        console.warn("User is a member already");
        return;
    }
    console.warn(team.route.params.team.id)
    console.warn(participant)

    const newMembership = {
        teamID: team.route.params.team.id,
        userID: participant.id,
        importance: 1,
        department: "Not specified",
        position: "Not specified"
    };

      // if there is no user in db, create one
    API.graphql(
        graphqlOperation(createMembership, { input: newMembership })
    );
    setParticipants(participants.filter(p => p.id != participant.id))
    setFilteredParticipants(filteredParticipants.filter(p => p.id != participant.id))
    setAddedMembers(old => [...old, participant.id]);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search by name..."
        onChangeText={updateSearch}
        value={search}
        style={styles.searchBar}
      />
      <FlatList
        data={filteredParticipants}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchBar: {
    margin: 8,
  },
});

export default InviteComponent;
