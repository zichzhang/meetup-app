interface Event {
    courseId: string;
    day: number;
    startTime: string;
    endTime: string;
    color?: string;
    title?: string;
    location?: string;
    section?: string;
    groupIndex?: number;
}

export { Event };