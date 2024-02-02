import { useState, useEffect } from 'react';
import { Navbar } from './components/navbar/navbar';
import { Home } from './components/home/home';
import { Facilities } from './components/facilities/facilities';
import { Facilities_info } from './components/facilities/facilities-info/facilities-info';
import { Rooms } from './components/rooms/rooms';
import { Rooms_content } from './components/rooms/rooms-content/rooms-content';
import { Contacts } from './components/contacts/contacts';
import { Contacts_info } from './components/contacts/contacts-info/contacts-info';
import { Login } from './components/login/login';
import { Sign_up } from './components/sign-up/sign-up';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './App.module.css';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51O2gfuJw0dovYyK3ViteKYgwaQz7Fh3fDPUDkqFrzI7zoIQ5c6EcT43rAjU37s4QvJaQJqGqE2uvllPbPS0SoWDI00NywlwgMx");

function App() {
  const [isStripeLoaded, setStripeLoaded] = useState(false);

  useEffect(() => {
    stripePromise.then(() => setStripeLoaded(true));
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className={styles.home}>
              <Navbar />
              <Home />
            </div>
          }
        />

        <Route
          path="/facilities"
          element={
            <div className={styles.facilities}>
              <Navbar />
              <Facilities />
              <Facilities_info />
            </div>
          }
        />

        <Route
          path="/rooms"
          element={
            <div className={styles.rooms}>
              {isStripeLoaded && (
                <Elements stripe={stripePromise}>
                  <Navbar />
                  <Rooms />
                  <Rooms_content />
                </Elements>
              )}
            </div>
          }
        />

        <Route
          path="/contacts"
          element={
            <div className={styles.contacts}>
              <Navbar />
              <Contacts />
              <Contacts_info />
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div className={styles.contacts}>
              <Login />
            </div>
          }
        />
        <Route
          path="/sign-up"
          element={
            <div className={styles.contacts}>
              <Sign_up />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

