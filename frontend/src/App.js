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
import "react-h5-audio-player/lib/styles.css";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [trackId, setTrackId] = useState(0);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    dispatch(getAllSongs())
  }, [dispatch]);

  // audio player code


  const songState = useSelector((state) => state.songs)
  const songs = Object.values(songState);
  // const tracks =  songs.map((song) => tracks[song.id] = song.url)
  // useEffect(() => {
  //     dispatch(getAllSongs())
  // }, [dispatch])

  const tracks = [
    {
        name: "tech house",
        src: "https://assets.mixkit.co/music/download/mixkit-tech-house-vibes-130.mp3",
        url: "https://www.free-stock-music.com/thumbnails/tubebackr-keep-me.jpg"
    },
    {
        name: "Hazy after hours",
        src: "https://assets.mixkit.co/music/download/mixkit-hazy-after-hours-132.mp3"
    },
    {
        name: "Raising me higher",
        src: "https://assets.mixkit.co/music/download/mixkit-raising-me-higher-34.mp3"
    },
    {
        name: "C.B.P.D",
        src: "https://assets.mixkit.co/music/download/mixkit-cbpd-400.mp3"
    }
  ]

  const handleClickNext = () => {
    setTrackId((currentTrack) => {
      if (currentTrack < songs.length - 1) {
        currentTrack += 1
      } else if (currentTrack === songs.length - 1) {
        currentTrack = 0;
      }
    }
      
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
      <Navigation id="mainNav" isLoaded={isLoaded} />
      {isLoaded && (
        <Switch id="mainContent">
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
          <AudioPlayer id="mainAudio"
            src={tracks[trackId].src}
            style={{ position: "fixed", textAlign:"center", bottom: "0px", paddingRight: "26%", paddingLeft: "26%", backgroundColor: "rgb(240, 240, 240)", borderTop: ".8px solid rgb(150, 150, 150)", boxShadow: "none"}}
            autoPlay
            header={`Now Playing: ${tracks[trackId].name}`}
            showSkipControls={true}
            showJumpControls={false}
            onClickNext={handleClickNext}
          />
        </div>
        
    </>
  );
}

export default App;