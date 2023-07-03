import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";

/* eslint-disable */

const firebaseConfig = {
    apiKey: "AIzaSyDgBvjjrvV7TJywOxlRX9YvZovA_DyNk5c",
    authDomain: "eirik-chat.firebaseapp.com",
    databaseURL: "https://eirik-chat-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "eirik-chat",
    storageBucket: "eirik-chat.appspot.com",
    messagingSenderId: "165015298457",
    appId: "1:165015298457:web:4430bb5b6d2a4692da3308"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);


function writeUserData(userInfo, messageText) {
    set(ref(database, 'messages/' + Math.floor(Math.random() * 100000000000000)), {
        "messageAuthor": userInfo.displayName,
        "messageText": messageText,
        "messageTimestamp": Date.now(),
        "messageAuthorId": userInfo.uid
    })
}

const messageDataRef = ref(database, 'messages/');

onValue(messageDataRef, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
});

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userInfo, setUserInfo] = useState({});

    const [message, setMessage] = useState('');

    const [messagesData, setMessagesData] = useState('');

    return (
        <div className="App">
            <header className="App-header">

                <img src={logo} className="App-logo" alt="logo"/>

                <input
                    type="text"
                    onChange={event => setUsername(event.target.value)}
                />
                <input
                    type="password"
                    onChange={event => setPassword(event.target.value)}
                />

                <button onClick={() => {
                    signInWithEmailAndPassword(auth, username, password)
                        .then((userCredential) => {
                            // Signed in
                            const user = userCredential.user;
                            console.log(user)
                            setUserInfo(user)
                            // ...
                        })
                        .catch((error) => {
                        });
                }}>
                    Sign in with e-mail and password
                </button>

                <br/>

                <button onClick={() => {
                    signInWithPopup(auth, provider)
                        .then((result) => {
                            // This gives you a Google Access Token. You can use it to access the Google API.
                            const credential = GoogleAuthProvider.credentialFromResult(result);
                            const token = credential.accessToken;
                            // The signed-in user info.
                            const user = result.user;
                            console.log(user);
                            setUserInfo(user)
                            // ...
                        }).catch((error) => {
                        // Handle Errors here.
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // The email of the user's account used.
                        const email = error.customData.email;
                        // The AuthCredential type that was used.
                        const credential = GoogleAuthProvider.credentialFromError(error);
                        // ...
                    });
                }}>
                    Sign in with Google
                </button>

                <h2>User info</h2>
                <p>User display name: {userInfo.displayName}</p>
                <p>User ID: {userInfo.uid}</p>

                <p>Submit your message to the chat-log:</p>
                <input
                    value={message} // ...force the input's value to match the state variable...
                    onChange={e => setMessage(e.target.value)} // ... and update the state variable on any edits!
                />

                <button onClick={() => writeUserData(userInfo, message)}>Write to database</button>

            </header>
        </div>
    );
}

export default App;
