**Description:**

This is a simple pomodoro timer with a pixel aesthetic. Users can login and track user statistics.

**Built with:**

This was built with React, Firebase, and Firebase auth. This was my first React App, so bear with me if the code is not the cleanest!

**Installation:**

You'll need to start a Firebase project with Cloud Firestore as well as Firebase Auth to start the project.

Install the app dependencies in package.json, then add your firebase.js config file in the src directory. It should look like this:
```
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "XXXXXXX",
  authDomain: "XXXXX",
  projectId: "XXXX",
  storageBucket: "XXXX",
  messagingSenderId: "XXXX",
  appId: "XXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
```
Then, run the app!

**CREDITS:**

Frontend was inspired by countdowns.live and buildspace.so/home.

The emoji graphics are from the open source project Twemoji. The graphics are copyright 2020 Twitter, Inc and other contributors. The graphics are licensed under CC-BY 4.0. You should review the license before usage in your project.
