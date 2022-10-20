import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeSong } from '../../store/song';
import { getSingleSong } from '../../store/song'
import './SingleSongPage.css';
import CommentSection from '../CommentSection';

const SingleSongPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { songId } = useParams();
    // const song = useSelector(state => state.songs[songId]);

    const song = useSelector((state) => state.songs[songId])
    // const songs = Object.values(songState);
    // const song = songs[songId]

    useEffect(() => {
        dispatch(getSingleSong(songId))
    }, [dispatch, songId])


    const changeSong = async (e) => {
        history.push(`/songs/${songId}/update`)
    }

    const removeaSong = async (e) => {
        e.preventDefault();
        dispatch(removeSong(song.id))
        history.push("/")
    }
    
    // if (!song) return (
    //     <Redirect to="/" />
    //   );

    return (
        <div id="singleSongComps"> 
            <div id="singleSong">
                <img alt='song' src={song.imageUrl}></img>
                <div>Title: {song.title}</div>
                <div>Description: {song.description}</div>
                <a href={song.url}>URL</a>

                {/* <audio 
                    controls
                    src={song.url}
                ></audio> */}
                        {/* not actually the right solution */}
                <button onClick={changeSong}>Update</button>   
                <button onClick={removeaSong}>Delete</button>
            </div>
            <CommentSection />
        </div>
    );
}


export default SingleSongPage;