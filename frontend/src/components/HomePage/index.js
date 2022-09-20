import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllSongs } from '../../store/song'

function HomePage() {
    const dispatch = useDispatch();
//   const sessionUser = useSelector(state => state.session.user);
    const { songId } = useParams();

    const songState = useSelector((state) => state.songs)
    const songs = Object.values(songState);

    useEffect(() => {
        dispatch(getAllSongs())
    }, [dispatch])

    if (!songState) return null

  return ( 
    <div>
        <h1>Soundwave</h1>
        <div>
            <h2>Songs</h2>
            <div id="songDiv">
                {songs.map((song) => {
                    return (
                        <div key={song.id} className='song'>
                            <img alt='song' src={song.imageUrl}></img>
                            <div className='song name'>{song.title}</div>
                            {/* <div> artist name </div> */}
                        </div>
                    )
                })}
            </div>
        </div>
        <div>
            <h2>Playlists</h2>
        </div>
    </div>
  );
}

export default HomePage;