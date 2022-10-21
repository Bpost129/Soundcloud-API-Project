import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getAllSongs } from './store/song'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // audio player code


  const songState = useSelector((state) => state.songs)
  const songs = Object.values(songState);

  useEffect(() => {
      dispatch(getAllSongs())
  }, [dispatch])


  // const tracks = [
  //   {
  //       name: "tech house",
  //       src: "https://assets.mixkit.co/music/download/mixkit-tech-house-vibes-130.mp3"
  //   }
  // ]
  const [trackId, setTrackId] = useState(0);

  const handleClickNext = () => {
    setTrackId((currentTrack) =>
      currentTrack < songs.length - 1 ? currentTrack + 1 : 0
    );
  };
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
            src={songs[trackId].src}
            autoPlay
            controls
            onClickNext={handleClickNext}
          />
        </div>
        
    </>
  );
}

export default App;