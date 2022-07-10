import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type HomePageNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
	navigation: HomePageNavigationProp;
}

const HomePage = () => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Schedule</Text>
        <Pressable style={styles.headerButton}>
          <Text>+</Text>
        </Pressable>
      </View>


    </View>
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
    padding: 20, 
  }
})