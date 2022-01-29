import React from 'react';
import GoogleButton from 'react-google-button';
import firebase from 'firebase/compat/app';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';

function Loginpage({ setIsAuth }) {
    let history = useHistory()

    const SignInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
            .then((response) => {
                localStorage.setItem('isAuth', true)
                setIsAuth(true)
                history.push('/')
            })
    }

    const Back = () => {
        history.push('/')
    }

    return <div className='App border border-primary'>
        <h3>To continue</h3>
        <br />
        <GoogleButton onClick={SignInWithGoogle} />
        <br />
        <button className="btn btn-dark" onClick={Back}>Back</button>
    </div>;
}

export default Loginpage;
