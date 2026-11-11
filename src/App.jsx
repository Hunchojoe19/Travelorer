import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './components/Signup';
import Waitlist from './pages/Waitlist';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <Router>
            <Toaster />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/waitlist" element={<Waitlist />} />
            </Routes>
        </Router>
    );
}

export default App;
