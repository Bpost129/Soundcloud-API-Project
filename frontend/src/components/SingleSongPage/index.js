import { Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSong } from '../../store/song';
import './SingleSongPage.css';

const SingleSongPage = () => {
    const dispatch = useDispatch();
    const { songId } = useParams();
    const song = useSelector(state => state.songs[songId]);

    const removeSong = (e) => {
        e.preventDefault();
        dispatch(deleteSong(song.id))
    }

   
    if (!song) return (
        <Redirect to="/" />
      );

    return (
        <div id="singleSong">
            <img alt='song' src={song.imageUrl}></img>
            <div>Title: {song.title}</div>
            <div>Description: {song.description}</div>
            <button>Update</button>
            <button onClick={removeSong}>Delete</button>
        </div>
    );
}


export default SingleSongPage;