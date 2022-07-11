import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { ConfigsContext } from './TimeTable';
import { Configs } from '../types/Configs';

const TimeTableTicks = () => {
    const configs = useContext(ConfigsContext);
    const { startHour, endHour } = configs;
    const styles = getStyles(configs);
    return (
        <View style={styles.timeTableTicks}>
            {Array.from(
                { length: endHour - startHour + 1 },
                (_, i) => startHour + i
            ).map((hour) => (
                <View style={styles.timeLineBox} key={`timeline-${hour}`}>
                    {hour !== startHour && (
                        <Text style={styles.timeLineText}>{`${hour > 9 ? '' + hour.toFixed(0) : '0' + hour.toFixed(0)
                            }:00`}</Text>
                    )}
                </View>
            ))}
        </View>
    )
}

export default TimeTableTicks

const getStyles = (configs: Configs) =>
    StyleSheet.create({
        timeTableTicks: {
            marginTop: -12,
            width: configs.timeTicksWidth,
            minWidth: configs.timeTicksWidth,
        },
        timeLineText: {
            marginTop: 1,
            fontSize: 12,
            textAlign: 'center',
            color: 'rgba(131,127,127,0.6)',
        },
        timeLineBox: {
            paddingLeft: 2,
            height: configs.cellWidth,
            backgroundColor: 'transparent',
        },
    });