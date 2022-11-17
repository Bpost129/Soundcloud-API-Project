import { useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllComments, createComment, removeComment } from '../../store/comment';
// import { getSingleSong } from '../../store/song'
import './CommentSection.css';

const CommentSection = ({ song }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [body, setBody] = useState("");
    const [errors, setErrors] = useState([]);

    const { songId } = useParams();

    const sessionUser = useSelector(state => state.session.user);
    // let comment = useSelector(state => state.songs[songId].comments);

    const commentState = useSelector((state) => state.comments)
    const comments = Object.values(commentState);
    // const song = songs[songId]
    // const user = useSelector((state) => state.session.user)
    // const currentUserId = user.id;

    // const songComments = useSelector((state) => {
    //     return song.comments.map(commentId => state.comments[commentId])
    // })

    useEffect(() => {
        dispatch(getAllComments(songId))
    }, [dispatch, songId])


    // need signed in permission
    const createaComment = async (e) => {
        e.preventDefault();
        setErrors([]);
        let comment = {
            body
        }

        let newComment = await dispatch(createComment(song.id, comment))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });

        const commentInput = document.getElementById('commentInput');
        commentInput.value = '';
    }

    // const removeaComment = async (e) => {
    //     e.preventDefault();
    //     dispatch(removeComment(comment.id))
    //     history.push(`/songs/${songId}`)
    // }


    return (
        <div id="commentSection">
            <form id="commentInputForm" onSubmit={createaComment}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div id="commentInputDiv">
                    <input
                        id="commentInput"
                        type="text"
                        value={body}
                        placeholder="Write a comment"
                        onChange={(e) => setBody(e.target.value)}
                        required
                    />
                    <button id="commentSubmitButton" type="submit">Post</button>
                </div>

            </form>
            <div id="underCommentInput" style={{display:"flex", flexDirection:"row"}}>
                <div id="artist-section" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    {/* <img alt='artist' src={user.imageUrl} style={{marginTop:"10px", height:"100px", width:"100px", borderRadius:"50px", border:"2px solid black"}}></img>
                    <div>{user.username}</div> */}
                </div>
                <div id="listedComments">
                    <ul>
                        {comments.map((comment) => {
                            return (
                                <div key={comment.id} id="singleComment">
                                    {/* <img alt='user' src={user.imageUrl} style={{marginRight:"5px", border:"1px solid black", height:"30px", width:"30px", borderRadius:"15px"}}></img> */}
                                    <div id="mainContent">
                                        <li id="commentBody">{comment.body}</li>
                                        { sessionUser && comment.userId === sessionUser.id && <button id="deleteCommentButton" onClick={() => dispatch(removeComment(comment.id))}><i className="fa-solid fa-trash"></i></button> }
                                    </div>
                                        
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </div>

        </div>
    );
}


export default CommentSection;