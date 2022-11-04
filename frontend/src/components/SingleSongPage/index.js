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


    // need user permissions
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
        <div class="Page" id="singleSongComps"> 
            <div id="singleSong">
                <div id="songContent">

                    <div id="songTitle">{song.title}</div>
                    <div id="songDescription">{song.description}</div>
                    <img alt='song' src={song.imageUrl} style={{ position: "unset", right: "20em", margin: "20px", maxHeight: "300px", maxWidth: "300px"}}></img>
                </div>
                        {/* not actually the right solution */}
                <div id="songButtons">
                    <button id="spUpdateSongButton" onClick={changeSong}> <i class="fa-solid fa-pen-to-square" style={{marginRight: "3px"}}></i> Update</button>   
                    <button id="deleteSongButton" onClick={removeaSong}> <i class="fa-solid fa-trash" style={{marginRight: "3px"}}></i> Delete</button>
                </div>
                
            </div>
            <CommentSection song={song}/>
        </div>
    );
}


export default SingleSongPage;