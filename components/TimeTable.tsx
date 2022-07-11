import { ScrollView, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React, { createContext, useRef } from 'react'
import { Event } from '../types/Event'
import { EventGroup } from '../types/EventGroup';
import { Configs } from '../types/Configs';
import { EVENT_COLORS, THEME } from '../utils/constants';
import getConfigs from '../utils/getConfigs';
import getEventsFromGroup from '../utils/getEventsFromGroup';
import EventCard from './EventCard';
import TimeTableGrid from './TimeTableGrid';
import TimeIndicator from './TimeIndicator';
import WeekdayText from './WeekdayText';
import TimeTableTicks from './TimeTableTicks';

type TimeTableProps = {
    events?: Event[];
    eventGroups?: EventGroup[];
    eventOnPress?: (...args: any[]) => any;
    eventColors?: string[];
    configs?: Partial<Configs>;
    headerStyle?: ViewStyle;
    contentContainerStyle?: ViewStyle;
    theme?: Partial<typeof THEME>;
};

export const ThemeContext = createContext<typeof THEME>(null);
export const ConfigsContext = createContext<Configs>(null);

const TimeTable = (
    {
        events,
        eventGroups,
        eventOnPress,
        headerStyle,
        contentContainerStyle,
        eventColors = EVENT_COLORS,
        configs: propConfigs,
        theme: propTheme,
    }: TimeTableProps) => {
    const weekdayScrollRef = useRef<null | ScrollView>(null);
    const courseHorizontalScrollRef = useRef<null | ScrollView>(null);
    const courseVerticalScrollRef = useRef<null | ScrollView>(null);

    const theme = {
        ...THEME,
        ...propTheme,
    };

    let configs = getConfigs(propConfigs);

    const onHorizontalScroll = (e) => {
        weekdayScrollRef.current?.scrollTo({
            x: e.nativeEvent.contentOffset.x,
        });
    };

    const currentDay = new Date();
    const currentWeekday = currentDay.getDay() ? currentDay.getDay() : 7;
    let weekendEvent = currentWeekday > 5; // Auto horizontal scroll if isWeekend and has weekendEvent
    let earlistGrid = configs.numOfHours; // Auto vertical scroll to earlistGrid

    // Parse eventGroups to events
    if (eventGroups) {
        const parsed = getEventsFromGroup({
            eventGroups,
            eventColors,
            configs,
        });
        events = parsed.events;
        configs = parsed.configs;
        configs.numOfHours = configs.endHour - configs.startHour + 1;
        earlistGrid = parsed.earlistGrid || earlistGrid;
        weekendEvent = weekendEvent && parsed.configs.numOfDays > 5;
    }

    const { cellWidth, cellHeight, timeTicksWidth, numOfHours } = configs;

    const styles = getStyles({ timeTicksWidth, theme });

    return (
        <ConfigsContext.Provider value={configs}>
            <ThemeContext.Provider value={theme}>
                <View style={contentContainerStyle}>
                    <View style={[styles.weekdayRow, headerStyle]}>
                        <View style={styles.placeholder} />
                        <ScrollView
                            scrollEnabled={false}
                            ref={weekdayScrollRef}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            <WeekdayText/>
                        </ScrollView>
                    </View>
                    <ScrollView
                        ref={courseVerticalScrollRef}
                        contentContainerStyle={styles.courseContainer}
                        showsVerticalScrollIndicator={false}
                        onContentSizeChange={() => {
                            if (earlistGrid !== numOfHours) {
                                courseVerticalScrollRef?.current?.scrollTo({
                                    y: earlistGrid * cellHeight,
                                });
                            }
                        }}
                    >
                        <TimeTableTicks />
                        <ScrollView
                            horizontal
                            onScroll={onHorizontalScroll}
                            ref={courseHorizontalScrollRef}
                            contentContainerStyle={styles.courseList}
                            showsHorizontalScrollIndicator={false}
                            onContentSizeChange={() => {
                                weekendEvent &&
                                    courseHorizontalScrollRef?.current?.scrollTo({
                                        x: 2 * cellWidth,
                                    });
                            }}
                        >
                            <TimeTableGrid />
                            <TimeIndicator />
                            {events?.map((event, i) => (
                                <EventCard
                                    key={`${event.courseId}-${i}-${event.day}`}
                                    event={{
                                        ...event,
                                        color: event.color || eventColors[i % eventColors.length],
                                    }}
                                    onPress={eventOnPress && (() => eventOnPress(event))}
                                    backgroundColor={
                                         contentContainerStyle?.backgroundColor || theme.background
                                    }
                                />
                            ))}
                        </ScrollView>
                    </ScrollView>
                </View>
            </ThemeContext.Provider>
        </ConfigsContext.Provider>
    );
}

export default TimeTable

const getStyles = ({ timeTicksWidth, theme }) =>
  StyleSheet.create({
    weekdayRow: {
      flexDirection: 'row',
      height: 32,
      backgroundColor: theme.primary,
    },
    placeholder: {
      width: timeTicksWidth,
    },
    courseContainer: {
      flexDirection: 'row',
      backgroundColor: theme.background,
      width: '100%',
    },
    courseList: {
      flexDirection: 'column',
    },
  });
