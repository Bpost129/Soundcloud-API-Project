import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSong } from '../../store/song';
import './SingleSongPage.css';

const SingleSongPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { songId } = useParams();
    const song = useSelector(state => state.songs[songId]);

    const removeSong = async (e) => {
        e.preventDefault();
        dispatch(deleteSong(song.id))
        history.push("/")
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
            <button>Update</button>
            <button onClick={removeSong}>Delete</button>
        </div>
    );
}


export default SingleSongPage;