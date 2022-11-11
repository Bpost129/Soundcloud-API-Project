import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllSongs } from '../../store/song'
import './HomePage.css'

function HomePage() {
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
        <div className="Page">
            <h2>Songs</h2>
            <div id="songDiv">
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
        <div>
            
        </div>
    </div>
  );
}

export default HomePage;