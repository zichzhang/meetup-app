import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { Semester, SemesterType } from '../types/Semester';
import { RadioGroup, RadioButton, Incubator, DateTimePicker } from 'react-native-ui-lib';

type AddEventPageNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: AddEventPageNavigationProp;
}

const {TextField} = Incubator;

const AddEventPage = ({ navigation }: Props) => {

  const [semester, setSemester] = useState<SemesterType>(Semester.FALL);
  const [courseTitle, setCourseTitle] = useState('');

  return (
    <View style={styles.addEventContainer}>
      {/* Semester Container */}
      <View style={styles.semesterContainer}>
        <Text style={styles.title}>
          Semester:
        </Text>
        <RadioGroup
          marginT-5
          initialValue={semester}
          onValueChange={(value: SemesterType) => setSemester(value)}
        >
          <RadioButton marginT-5 value={Semester.FALL} label={'Fall'} color={'gray'} size={18} />
          <RadioButton marginT-5 value={Semester.WINTER} label={'Winter'} color={'gray'} size={18} />
          <RadioButton marginT-5 value={Semester.SUMMER} label={'Summer'} color={'gray'} size={18} />
        </RadioGroup>
      </View>

      {/* Course Title Container */}
      <TextField
        placeholder={'Course Code'}
        floatingPlaceholder
        floatingPlaceholderColor={{
          focus: '#777777',
          default: '#777777',
        }}
        containerStyle={styles.courseTitleContainer}
        onChangeText={(text: string) => setCourseTitle(text)}
        maxLength={8}
      />

    </View>
  )
}

export default AddEventPage

const styles = StyleSheet.create({

  addEventContainer: {
    flexDirection: 'column',
  },

  semesterContainer: {
    padding: 8,
  },

  title: {
    fontSize: 16,
  },

  courseTitleContainer: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#D9F9FB',
    borderRadius: 10,
    marginHorizontal: 24,
    marginTop: 24,
    paddingHorizontal: 12,
    height: 48,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1, 
  },

})