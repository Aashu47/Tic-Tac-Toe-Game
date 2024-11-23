import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; // Ensure this path is correct
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Holds the current user object
  const [name, setName] = useState(''); // Holds the user's name
  const [loading, setLoading] = useState(true); // Indicates if data is being loaded
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the authenticated user

        // Fetch additional user data from Firestore
        try {
          const userDoc = doc(db, "user", currentUser.uid);
          const userSnapshot = await getDoc(userDoc);

          if (userSnapshot.exists()) {
            setName(userSnapshot.data().name); // Set the user's name
          } else {
            setName(''); // Reset name if no data is found
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        // No user is logged in
        setUser(null);
        setName('');
      }
      setLoading(false); // Loading complete
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign the user out
      setUser(null);
      navigate('/'); // Redirect to the homepage after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, name, loading, handleLogout }}>
      {!loading && children} {/* Render children only after loading */}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
