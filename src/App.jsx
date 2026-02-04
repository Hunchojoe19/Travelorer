import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './components/Signup';
import { auth } from './firebase';
import { isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { Toaster } from 'react-hot-toast';

function App() {
    useEffect(() => {
        // Confirm the link is a sign-in with email link.
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');

            if (!email) {
                // User opened the link on a different device. To prevent session fixation
                // attacks, ask the user to provide the associated email again.
                email = window.prompt('Please provide your email for confirmation');
            }

            if (email) {
                signInWithEmailLink(auth, email, window.location.href)
                    .then((result) => {
                        window.localStorage.removeItem('emailForSignIn');
                        console.log('Successfully signed in with email link!', result.user);
                        window.location.href = '/'; // Clean up the URL and go home
                    })
                    .catch((error) => {
                        console.error('Error signing in with email link:', error);
                    });
            }
        }
    }, []);

    return (
        <Router>
            <Toaster />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
}

export default App;
