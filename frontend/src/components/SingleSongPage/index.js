import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeSong, editSong } from '../../store/song';
import './SingleSongPage.css';

const SingleSongPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { songId } = useParams();
    const song = useSelector(state => state.songs[songId]);

    const removeaSong = async (e) => {
        e.preventDefault();
        dispatch(removeSong(song.id))
        history.push("/")
    }

    const changeSong = async (e) => {
        e.preventDefault();
        dispatch(editSong(song.id))
        history.push(`/songs/${songId}`)
    }

   
    // if (!song) return (
    //     <Redirect to="/" />
    //   );

    return (
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
    );
}


export default SingleSongPage;