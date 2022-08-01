import { Alert, Button, Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import TimeTable from '../components/TimeTable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { EventGroup } from '../types/EventGroup';

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'AddEvent'>;
type HomePageRouteProp = RouteProp<RootStackParamList, 'Home'>

type Props = {
	navigation: HomePageNavigationProp;
  route: HomePageRouteProp;
}

const HomePage = ({ navigation, route }: Props) => {

  const eventGroups = useState<EventGroup[]>([]);

  useEffect(() => {
    if (route.params?.eventGroups) {
      console.log(route.params.eventGroups);
    }
  }, [route.params?.eventGroups])

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          My Schedule
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddEvent', { name: 'AddEvent' })}
          style={styles.headerButton}
        >
          <Text style={styles.headerButtonIcon}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      <TimeTable
      eventGroups={ route.params ? route.params.eventGroups : undefined }
        eventOnPress={(event) => Alert.alert(`${JSON.stringify(event)}`)}
      />
    </SafeAreaView>
  )
}

export default HomePage

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  headerText: {
    padding: 20,
  },

  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c1e8eb',
    borderRadius: 50,
    marginVertical: 10,
    marginHorizontal: 20,
  },

  headerButtonIcon: {
    fontSize: 16,
    fontWeight: '500',
  }

})