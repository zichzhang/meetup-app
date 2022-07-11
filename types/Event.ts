interface Event {
    courseId: string;
    day: number;
    startTime: string;
    endTime: string;
    color?: string | undefined;
    title?: string;
    location?: string;
    section?: string;
    groupIndex?: number;
}

export { Event };