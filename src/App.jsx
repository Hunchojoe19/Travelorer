import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProcessSection from './components/ProcessSection';
import Discover from './components/Discover';
import Evaluate from './components/Evaluate';
import CombinedFooter from './components/Footer';

function App() {
    return (
        <div className="min-h-screen bg-white font-sans selection:bg-brand-blue selection:text-white">
            <Navbar />
            <Hero />
            <ProcessSection />
            <Discover />
            <Evaluate />
            {/* Footer includes the Earn section now for overlap layout */}
            <CombinedFooter />
        </div>
    );
}

export default App;
