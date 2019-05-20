import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Navigation from "./components/Navigation";
import Routes from "./components/Routes";
import { Auth } from "aws-amplify";

function App() {
  const [loggedIn, setAuthenticated] = useState(false);
  const [isAuthenticating, setAuthenticating] = useState(true);
  useEffect(() => {
    async function load() {
      await Auth.currentSession();
      setAuthenticated(true);

      console.log("success!");
      try {
      } catch (error) {
        if (error !== "No current user") {
          alert(error);
        }
      }
      setAuthenticating(false);
    }
    load();
  }, []);
  function userIsAuthenticated(authenticated) {
    setAuthenticated(authenticated);
  }

  //! handle user logging out
  async function handleLogout(event) {
    await Auth.signOut();
    setAuthenticated(false);
    this.props.history.push("/login");
  }

  const childProps = {
    isAuthenticated: loggedIn,
    userHasAuthenticated: userIsAuthenticated
  };

  return (
    <>
      <div className='App container'>
        <Navigation
          isAuthenticated={childProps.isAuthenticated}
          onLogout={handleLogout}
        />
        <React.Suspense fallback={<div>Loading..</div>}>
          <Routes childProps={childProps} />
        </React.Suspense>
      </div>
      )
    </>
  );
}

export default withRouter(App);
