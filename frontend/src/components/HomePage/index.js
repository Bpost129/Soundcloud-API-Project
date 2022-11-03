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
                            <img alt='song' src={song.imageUrl} style={{ maxHeight: "176px", maxWidth: "176px"}}></img>
                            <div className='song name'>{song.title}</div>
                            <Link to={`/songs/${song.id}`}>Info</Link>
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