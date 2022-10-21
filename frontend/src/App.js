import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import AudioPlayer from 'react-h5-audio-player';
// import PlayerApp from "./components/AudioPlayer";
// import ReactAudioPlayer from 'react-audio-player';

import HomePage from "./components/HomePage"
import UploadSongPage from "./components/UploadSongPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SingleSongPage from "./components/SingleSongPage";
import UpdateSongPage from "./components/UpdateSongPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  const tracks = [
    {
        name: "stay chilled",
        src: "https://tunetank-production.s3.us-west-2.amazonaws.com/tracks/2161/versions/1324.mp3?AWSAccessKeyId=AKIAVRNTQNFKJKL4O7VE&Expires=1666385286&Signature=wttwGVAXq7Nv7S3a8yyt%2FjUEmhc%3D&response-content-disposition=attachment%3Bfilename%3Dtunetank.com_2161_stay-chilled_by_pillowvibes.mp3"
    }
  ]
  const [trackId, setTrackId] = useState(0);

  // const Player = () => (
  //   <AudioPlayer
  //     autoPlay
  //     src="https://www.free-stock-music.com/music/tubebackr-say-nothing.mp3"
  //     onPlay={e => console.log("onPlay")}
  //     // other props here
  //   />
  // );

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
          <Route path="/songs/:songId/update">
            <UpdateSongPage />
          </Route>
          <Route path="/songs/:songId">
            <SingleSongPage />
          </Route>
          
        </Switch>
        
      )}
        {/* <Player /> */}
        <div>
          <AudioPlayer
            src={tracks[trackId].src}
            autoPlay
            controls
          />
        </div>
        
    </>
  );
}

export default App;