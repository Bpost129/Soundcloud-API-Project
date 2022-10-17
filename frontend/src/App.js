import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import AudioPLayer from 'react-h5-audio-player';

import HomePage from "./components/HomePage"
// import LoginFormPage from "./components/LoginFormModal";
// import SignupFormPage from "./components/SignupFormModal";
import UploadSongPage from "./components/UploadSongPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SingleSongPage from "./components/SingleSongPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/upload">
            <UploadSongPage />
          </Route>
          {/* <Route path="/login">
            <LoginFormPage />
          </Route> */}
          {/* <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route path="/songs/:songId">
            <SingleSongPage />
          </Route>
        </Switch>
        
      )}
        <AudioPLayer
          autoPlay
          src="https://www.free-stock-music.com/music/tubebackr-say-nothing.mp3"
          
        />
    </>
  );
}

export default App;