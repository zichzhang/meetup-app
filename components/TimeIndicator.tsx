
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import addOpacityToColor from '../utils/addOpacityToColor';
import { ConfigsContext, ThemeContext } from './TimeTable';

type CurrentTime = {
    hour: number;
    minute: number;
    day: number;
};

const TimeIndicator = () => {
  const configs = useContext(ConfigsContext);
  const theme = useContext(ThemeContext);
  const { cellWidth, cellHeight, startHour, endHour } = configs;
  const [currentTime, setCurrentTime] = useState<CurrentTime>({
    hour: 0,
    minute: 0,
    day: 0,
  });

  useEffect(() => {
    const timeUpdater = setInterval(() => {
      const d = new Date();
      setCurrentTime({
        hour: d.getHours(),
        minute: d.getMinutes(),
        day: d.getDay() || 7,
      });
    }, 1000);
    return () => {
      clearInterval(timeUpdater);
    };
  }, []);

  if (currentTime.hour < startHour && currentTime.hour > endHour) {
    return null;
  }
  
  const topMarginValue = (currentTime.hour - startHour + currentTime.minute / 60.0) * cellHeight;

  const styles = getStyles({ currentTime, topMarginValue, cellWidth, theme });

  return <View style={styles.timeIndicator} />;
};

export default TimeIndicator

const getStyles = ({ currentTime, topMarginValue, cellWidth, theme }) =>
  StyleSheet.create({
    timeIndicator: {
      zIndex: 3,
      position: 'absolute',
      height: 1.5,
      backgroundColor: addOpacityToColor(theme.accent, 0.8),
      marginLeft: (currentTime.day - 1) * cellWidth,
      marginTop: topMarginValue,
      width: cellWidth - 2,
    },
  });