import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { Semester, SemesterType } from '../types/Semester';
import { Button, RadioGroup, RadioButton, Incubator } from 'react-native-ui-lib';
import DateTimePicker from '@react-native-community/datetimepicker';
import { EventGroup, Sections } from '../types/EventGroup';
import { useEffect } from 'react';

type AddEventPageNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: AddEventPageNavigationProp;
}

const {TextField} = Incubator;

const toTimeString = (hours: number | undefined, minutes: number | undefined): string => {
  return hours?.toString() + '' + minutes?.toString();
}

const AddEventPage = ({ navigation }: Props) => {

  const [semester, setSemester] = useState<SemesterType>(Semester.FALL);
  const [courseCode, setCourseCode] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [courseStartTime, setCourseStartTime] = useState(new Date(1598051730000));
  const [courseEndTime, setCourseEndTime] = useState(new Date(1598051830000));
  const [selectedDays, setSelectedDays] = useState(new Array(5).fill(false));
  const [courseLocation, setCourseLocation] = useState('');

  useEffect(() => {
    console.log(courseStartTime);
  })

  const handleAddCourse = (): EventGroup[] => {
    const eventGroups: EventGroup[] = [];

    const courseSections: Sections = {
      'Section': {
        days: selectedDays.map((day, index) => day ? index+1 : day).filter((day) => day !== false),
        startTimes: new Array(selectedDays.filter(val => val === true).length).fill(courseStartTime),
        endTimes: new Array(selectedDays.filter(val => val === true).length).fill(courseEndTime),
        locations: new Array(selectedDays.filter(val => val === true).length).fill(courseLocation),
      } 
    }

    const courseObj: EventGroup = {
      courseId: courseCode,
      title: courseTitle,
      sections: courseSections,
    }

    eventGroups.push(courseObj);

    return eventGroups;
  }

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
          <RadioButton style={styles.selectedDayRadioButton} marginT-5 value={Semester.FALL} label={'Fall'} color={'#37E5F0'} size={18} />
          <RadioButton style={styles.selectedDayRadioButton} marginT-5 value={Semester.WINTER} label={'Winter'} color={'#37E5F0'} size={18} />
          <RadioButton style={styles.selectedDayRadioButton} marginT-5 value={Semester.SUMMER} label={'Summer'} color={'#37E5F0'} size={18} />
        </RadioGroup>
      </View>

      {/* Course Code Container */}
      <View style={styles.labelContainer}>
        <Text>Course Code</Text>
        <TextField
          placeholder={'COMP 251'}
          containerStyle={styles.textFieldContainer}
          onChangeText={(text: string) => setCourseCode(text)}
          maxLength={9}
        />
      </View>

      {/* Course Title Container */}
      <View style={styles.labelContainer}>
        <Text>Course Title</Text>
        <TextField
          placeholder={'Data Structures and Algorithms II'}
          containerStyle={styles.textFieldContainer}
          onChangeText={(text: string) => setCourseTitle(text)}
          maxLength={24}
        />
      </View>

      {/* Course Time Container */}
      <View style={styles.courseTimeContainer}>
        <Text>From</Text>
        <DateTimePicker
          testID="courseStartTimePicker"
          style={{width: 90, marginHorizontal: 20}}
          value={courseStartTime}
          mode="time"
          minuteInterval={5}
          timeZoneOffsetInMinutes={0}
          onChange={(event, selectedTime) => {
            if (typeof selectedTime !== 'undefined') {
              setCourseStartTime(selectedTime);
            } 
          }}
        />
        <Text>To</Text>
        <DateTimePicker
          testID="courseEndTimePicker"
          style={{width: 90, marginHorizontal: 20}}
          value={courseEndTime}
          mode="time"
          minuteInterval={5}
          timeZoneOffsetInMinutes={0}
          onChange={(event, selectedTime) => {
            if (typeof selectedTime !== 'undefined') {
              setCourseEndTime(selectedTime);
            } 
          }}
        />
      </View>
        
      {/* Course DayOfWeek Frequency Container */}
      <View style={styles.courseFrequencyContainer}>
        <Text>Course Frequency:</Text>
        <View style={styles.courseFrequencyRadioButtonContainer}>
          <RadioButton style={styles.selectedDayRadioButton} marginR-15 contentOnLeft label='Mon' color={'#37E5F0'} size={18} selected={selectedDays[0]} onPress={() => setSelectedDays(selectedDays.map((selectedDay, idx) => idx === 0 ? !selectedDay : selectedDay))}/>
          <RadioButton style={styles.selectedDayRadioButton} marginR-15 contentOnLeft label='Tue' color={'#37E5F0'} size={18} selected={selectedDays[1]} onPress={() => setSelectedDays(selectedDays.map((selectedDay, idx) => idx === 1 ? !selectedDay : selectedDay))}/>
          <RadioButton style={styles.selectedDayRadioButton} marginR-15 contentOnLeft label='Wed' color={'#37E5F0'} size={18} selected={selectedDays[2]} onPress={() => setSelectedDays(selectedDays.map((selectedDay, idx) => idx === 2 ? !selectedDay : selectedDay))}/>
          <RadioButton style={styles.selectedDayRadioButton} marginR-15 contentOnLeft label='Thu' color={'#37E5F0'} size={18} selected={selectedDays[3]} onPress={() => setSelectedDays(selectedDays.map((selectedDay, idx) => idx === 3 ? !selectedDay : selectedDay))}/>
          <RadioButton style={styles.selectedDayRadioButton} marginR-15 contentOnLeft label='Fri' color={'#37E5F0'} size={18} selected={selectedDays[4]} onPress={() => setSelectedDays(selectedDays.map((selectedDay, idx) => idx === 4 ? !selectedDay : selectedDay))}/>
        </View>
      </View>


      {/* Course Location Container */}
      <View style={styles.labelContainer}>
        <Text>Location</Text>
        <TextField
          placeholder={'BROMF 01'}
          containerStyle={styles.textFieldContainer}
          onChangeText={(text: string) => {setCourseLocation(text); console.log(selectedDays)}}
          maxLength={16}
        />
      </View>

      {/* Add Course Button */}
      <Button
        label={'Add Course'}
        enableShadow
        size={Button.sizes.medium}
        onPress={() => console.log(handleAddCourse())}
        style={styles.addCourseButton}
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
    marginHorizontal: 24,
    marginTop: 20,
  },

  title: {
    
  },

  labelContainer: {
    marginHorizontal: 24,
    marginTop: 24,
  },

  textFieldContainer: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#D9F9FB',
    borderRadius: 10,
    padding: 10,
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 1, 
  },

  courseTimeContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginHorizontal: 40
  },

  courseFrequencyContainer: {
    flexDirection: 'column',
    marginHorizontal: 24,
    marginTop: 30,
  },

  courseFrequencyRadioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10,
  },

  selectedDayRadioButton: {
    borderColor: '#37E5F0',
    borderWidth: 1,
  },

  addCourseButton: {
    marginTop: 30,
    marginHorizontal: 80,
    paddingVertical: 10,
    borderRadius: 10,
  }


})