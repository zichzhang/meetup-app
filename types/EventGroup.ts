import { Events } from './Events'

interface Sections {
    [section: string]: Events;
}

interface EventGroup {
    courseId: string;
    sections: Sections;
    title?: string;
}

export { EventGroup, Sections };