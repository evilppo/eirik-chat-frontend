import logo from './logo.svg';
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDgBvjjrvV7TJywOxlRX9YvZovA_DyNk5c",
    authDomain: "eirik-chat.firebaseapp.com",
    projectId: "eirik-chat",
    storageBucket: "eirik-chat.appspot.com",
    messagingSenderId: "165015298457",
    appId: "1:165015298457:web:4430bb5b6d2a4692da3308"
};

// Initialize Firebase
// eslint-disable-line
const app = initializeApp(firebaseConfig); // eslint-disable-line



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
