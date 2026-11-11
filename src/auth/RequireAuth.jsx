import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

/** Sends signed-out visitors to the sign-in page, then back here after login. */
export default function RequireAuth({ children }) {
    const { isSignedIn, initializing } = useAuth();
    const location = useLocation();
    if (initializing) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white" role="status" aria-label="Loading">
                <span className="h-8 w-8 animate-spin rounded-full border-4 border-[#2F6FED] border-t-transparent" />
            </div>
        );
    }
    if (!isSignedIn) {
        return <Navigate to="/signup" replace state={{ from: location.pathname, login: true }} />;
    }
    return children;
}
