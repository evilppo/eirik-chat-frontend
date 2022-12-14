import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const firebaseConfig = {
    apiKey: "AIzaSyDgBvjjrvV7TJywOxlRX9YvZovA_DyNk5c",
    authDomain: "eirik-chat.firebaseapp.com",
    projectId: "eirik-chat",
    storageBucket: "eirik-chat.appspot.com",
    messagingSenderId: "165015298457",
    appId: "1:165015298457:web:4430bb5b6d2a4692da3308"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');

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
                            setUserId(user.uid)
                            // ...
                        })
                        .catch((error) => {
                        });
                }}>
                    Log Inn
                </button>

                <h2>User info</h2>
                <p>user ID: {userId}</p>

            </header>
        </div>
    );
}

export default App;
