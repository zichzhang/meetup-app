# Meetup App for Students

This mobile app allows college and university students to identify other students that are 'on break' based on their course schedule.

<p align="center">
  <img width="322" alt="Screen Shot 2022-07-18 at 6 17 36 PM" src="https://user-images.githubusercontent.com/65128992/179627114-b58d8e93-ce26-42b4-aaee-3e07ac3d0576.png">
</p>

## Prerequisites

- [Node.js > 12](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 12](https://developer.apple.com/xcode)
- [Cocoapods 1.10.1](https://cocoapods.org)

## Folder structure

Project Structure:

- `meetup-app`: This folder is the main container of all the code inside your application.
  - `api`: This folder handles connection to Firebase.
  - `assets`: Asset folder to store all images, vectors, etc.
  - `components`: Folder to store any reusable component used through the app.
    - includes weekly timetable component and others. 
  - `controllers`: Folder to store all your network logic (you should have one controller per resource).
  - `localization`: Folder to store the languages files.
  - `navigation`: Folder to store the navigators.
  - `pages`: Folder that contains all application pages/features.
    - `AddEventPage.tsx`: This feature allows the student to add a course to the `HomePage.tsx` schedule.
    - `HomePage.tsx`: This page contains the main interactive timetable displaying the student's schedule. 
    - `LoginPage.tsx`: This page allows the student to login if an account already exists.
    - `RegisterPage.tsx`: This page allows the student to register for a new account.
  - `types`: Folder to store all commonly used models (interfaces, enums, etc.)
  - `ui`: Folder to store all reusable style objects.
  - `App.js`: Main component that starts the whole app.
  - `index.js`: Entry point of the application as per React-Native standards.
