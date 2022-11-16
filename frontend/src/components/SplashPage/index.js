import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllSongs } from '../../store/song'
import './SplashPage.css'
import bkgrd from './images/concert2.png'

function SplashPage() {
    const dispatch = useDispatch();
//   const sessionUser = useSelector(state => state.session.user);
    // const { songId } = useParams();

    const songState = useSelector((state) => state.songs)
    const songs = Object.values(songState);

    useEffect(() => {
        dispatch(getAllSongs())
    }, [dispatch])

    if (!songState) return null

  return ( 
    <div>
        <div className="Splash">
            {/* <img alt="background" src={bkgrd} style={{maxHeight: "500px"}}></img>
                <button>hello</button>
            <div background></div> */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundImage: `url(${bkgrd})`, backgroundSize: "100% 100%", height: "400px"}}>
                <button style={{backgroundColor: "rgb(255, 77, 0)", color: "white", border: "1px ridge white", height: "30px", width: "75px"}}>hello</button>
            </div>
            <h2 style={{display: "flex", justifyContent: "center", marginTop: "25px"}}>Listen to what's trending on Soundwave</h2>
            <div id="splashSongs">
                {songs.map((song) => {
                    return (
                        <div key={song.id} className='song'>
                            {/* <a href={getSingleSong}>  </a> */}
                            <Link to={`/songs/${song.id}`}><img alt='song' src={song.imageUrl} style={{ maxHeight: "165px", maxWidth: "165px", border: ".5px solid black", boxShadow: ".5px"}}></img></Link>
                            <div className='song-name' style={{fontSize:"14px", marginTop:"3px"}}>{song.title}</div> 
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  );
}

export default SplashPage;