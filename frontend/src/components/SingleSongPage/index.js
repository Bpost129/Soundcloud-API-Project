import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeSong } from '../../store/song';
import { getSingleSong, getAllSongs } from '../../store/song'
import UpdateFormModal from '../UpdateSongModal';
import './SingleSongPage.css';
import CommentSection from '../CommentSection';
import play from './images/play2.png'

const SingleSongPage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { songId } = useParams();
    // const song = useSelector(state => state.songs[songId]);
    const sessionUser = useSelector(state => state.session.user);
    const song = useSelector((state) => state.songs['singleSong'])
    // const user = useSelector((state) => state.songs['singleSong'])
    // const userObj = Object.values(user);
    // const finalUser = userObj['User'];

    useEffect(() => {   
        // dispatch(getAllSongs())
        
        dispatch(getSingleSong(songId))
    }, [dispatch, songId])

    // const song = useSelector((state) => state.songs.singleSong)

    // need user permissions
    // const changeSong = async (e) => {
    //     history.push(`/songs/${songId}/update`)
    // }
    
    const removeaSong = async (e) => {
        e.preventDefault();
        dispatch(removeSong(song.id))
        history.push("/home")
    }
    
    // if (!song) return (
    //     <Redirect to="/" />
    //   );

    if (!song) return null;

    return (
        <div className="songPage" id="singleSongComps"> 
            <div id="singleSong">
                <div id="songContent">
                    <div id="songInfo">
                        <div id="withPlay">
                            <div id="outterPlayIcon"><img alt="play" src={play} style={{height:"60px", width:"60px"}}></img></div>
                            <div id="songStuff">
                                <div id="songTitle">{song.title}</div>
                                {/* <div id="songArtist">{song.user.id}</div> */}
                            </div>
                        </div>
                        
                        <div id="songDescription"># {song.description}</div>
                    </div>
                    <img alt='song' src={song.imageUrl} style={{ position: "unset", right: "20em", margin: "20px", maxHeight: "300px", maxWidth: "300px"}}></img>
                </div>
                        {/* not actually the right solution */}
                { sessionUser && song.userId === sessionUser.id && 
                <div id="songButtons">
                    <UpdateFormModal song={song}/>     
                    <button id="deleteSongButton" onClick={removeaSong}> <i className="fa-solid fa-trash" style={{marginRight: "3px"}}></i> Delete</button>
                </div> }
                
            </div>
            <CommentSection song={song}/>
        </div>
    );
}


export default SingleSongPage;