import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import CartProvider from '../Cart';
import {FirebaseContext} from '../Firebase';
import {useState, useContext, useEffect} from 'react';
import PrivateRoute from '../Navigation/PrivateRoute';

function App() {
  const [authUser, setAuthUser] = useState(null);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    if (firebase) {
      const listener = firebase.auth.onAuthStateChanged(user => {
        if (user) {
          setAuthUser(user);
        } else {
          setAuthUser(null);
        }
      });

      // Cleanup function
      return () => listener();
    }
  }, [firebase]);

  // Determine authentication status based on authUser's presence
  const authenticated = !!authUser;

  return (
    <CartProvider>
      <Router>
        <PrivateRoute authUser={authUser} authenticated={authenticated} />
      </Router>
    </CartProvider>
  );
}

export default App;
