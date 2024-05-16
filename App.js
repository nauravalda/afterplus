// Import necessary modules
import React, { useState } from 'react';
import { UserContext } from './app/userContext'; // Import your user context
import App from './app/index'; // Import your main application component

// Define your top-level component
export default function Main() {
    // Define user state here or get it from where you fetch user data
    const [user, setUser] = useState(null);

    // Return your component tree with UserContext.Provider wrapping it
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <App /> {/* Your main application component */}
        </UserContext.Provider>
    );
}
