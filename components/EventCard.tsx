import { ColorValue, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Configs } from '../types/Configs'
import { Event } from '../types/Event'
import addOpacityToColor from '../utils/addOpacityToColor'
import { ConfigsContext } from './TimeTable'
import colorMixing from '../utils/colorMixing'

const TITLE_LINE_HEIGHT = 12;
const SUBTITLE_LINE_HEIGHT = 12;

type EventCardProps = {
    event: Event;
    backgroundColor: ColorValue;
    onPress?: (...args: any[]) => any;
};

const EventCard = (
    {
        event,
        onPress,
        backgroundColor,
    }: EventCardProps) => {
    const configs = useContext(ConfigsContext);
    const { styles, numOfLines } = getStyles(event, configs, backgroundColor);

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.courseCard, styles.innerCard]}
            onPress={onPress}
        >
            <Text
                style={styles.courseCardTitle}
                numberOfLines={3}
                ellipsizeMode="clip"
            >
                {`${event.courseId}`}
            </Text>
            {Boolean(numOfLines) && (
                <Text style={styles.courseCardLocation} numberOfLines={numOfLines}>
                    {event.location}
                </Text>
            )}
        </TouchableOpacity>
    )
}

export default EventCard

const getStyles = (event: Event, configs: Configs, backgroundColor: ColorValue) => {
    const { cellWidth, cellHeight, startHour } = configs;
    const sTime = event.startTime.split(':').map((x) => parseInt(x, 10));
    const eTime = event.endTime.split(':').map((x) => parseInt(x, 10));
    const topMarginValue =
        (sTime[0] - startHour) * cellHeight + (sTime[1] / 60.0) * cellHeight;
    const durationHeight =
        cellHeight * (eTime[0] - sTime[0] + (eTime[1] - sTime[1]) / 60.0);
    const textColor = addOpacityToColor(event.color, 0.8);
    const numOfLines = Math.floor(
        (durationHeight - 2 * TITLE_LINE_HEIGHT - 10) / SUBTITLE_LINE_HEIGHT
    );
    const bgColor = colorMixing(addOpacityToColor(event.color, 0.15), backgroundColor);
    const styles = StyleSheet.create({
        courseCard: {
            position: 'absolute',
            borderRadius: 4,
            zIndex: 2,
            width: cellWidth - 3,
            marginLeft: cellWidth * (event.day - 1),
            height: durationHeight,
            marginTop: topMarginValue,
        },
        innerCard: {
            flex: 1,
            overflow: 'hidden',
            borderRadius: 12,
            padding: 4,
            backgroundColor: bgColor,
            justifyContent: 'center',
            alignItems: 'center',
        },
        courseCardTitle: {
            fontSize: 10,
            lineHeight: TITLE_LINE_HEIGHT,
            fontWeight: 'bold',
            color: textColor,
        },
        courseCardLocation: {
            marginTop: 2,
            fontSize: 10,
            color: textColor,
        },
    });
    return { styles, numOfLines };
};