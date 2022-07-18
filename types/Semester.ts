export enum Semester {
    FALL = "FALL",
    WINTER = "WINTER",
    SUMMER = "SUMMER",
}

export type SemesterType = keyof typeof Semester;

