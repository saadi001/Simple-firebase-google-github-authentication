import './App.css';
import app from './firebase/firebase.init';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const [user, setUser] = useState({});

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.error('error: ', error);
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(() => {
        setUser({})
      })
  }

  const githubSignInhandler = () => {

    signInWithPopup(auth, githubProvider)
    .then(result => {
      const user = result.user;
      setUser(user);
      console.log(user);
    })
    .catch(error => {
      console.error('error: ', error);
    })
  }

  return (
    <div className="App">
      {user.uid ? <button onClick={handleSignOut}>sign out</button>
      : <>
        <button onClick={handleGoogleSignIn}>google sign In</button>
        <button onClick={githubSignInhandler}>github sign In</button>
        </>
      
      }
      {
        user.uid && <div>
        <h3>user name: {user.displayName}</h3>
        <p>email: {user.email}</p>
        <img src={user.photoURL} alt="" />
      </div>
      }
    </div>
  );
}

export default App;
