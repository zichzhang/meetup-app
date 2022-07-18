import { Alert, Button, Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import TimeTable from '../components/TimeTable';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'AddEvent'>;

type Props = {
	navigation: HomePageNavigationProp;
}

const HomePage = ({ navigation }: Props) => {
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
      eventGroups={[
        {
          courseId: 'MGCR 331',
          title: 'Information Systems',
          sections: {
            'A - LEC': {
              days: [1, 3],
              startTimes: ['8:00', '8:00'],
              endTimes: ['10:00', '10:00'],
              locations: ['BRONF 01', 'BRONF 01'],
            },
          },
        },
        {
          courseId: 'FINE 470',
          title: 'Fintech For Business and Finance',
          sections: {
            'B - LEC': {
              days: [1, 3],
              startTimes: ['10:15', '10:15'],
              endTimes: ['12:15', '12:15'],
              locations: ['BRONF 02', 'BRONF 02'],
            },
          }
        },
        {
          courseId: 'FINE 447',
          title: 'Venture Capital and Entrepreneurial Finance',
          sections: {
            'C-LEC': {
              days: [1],
              startTimes: ['12:25'],
              endTimes: ['14:25'],
              locations: ['BRONF 68'],
            }
          }
        },
        {
          courseId: 'BUSA 250',
          title: 'Expressive Analysis for Management',
          sections: {
            'D-LEC': {
              days: [4, 5],
              startTimes: ['13:25', '9:00'],
              endTimes: ['14:25', '10:00'],
              locations: ['BRONF 61', 'BRONF 61'],
            }
          }
        }
      ]}
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