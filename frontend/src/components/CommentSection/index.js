import { useEffect, useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllComents, createComment, removeComment } from '../../store/comment';
// import { getSingleSong } from '../../store/song'
import './CommentSection.css';

const CommentSection = ({ song }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [body, setBody] = useState("");
    const [errors, setErrors] =useState([]);

    const { songId } = useParams();
    
    let comment = useSelector(state => state.songs[songId].comments);

    const commentState = useSelector((state) => state.comments)
    const comments = Object.values(commentState);
    // const song = songs[songId]
    

    // const songComments = useSelector((state) => {
    //     return song.comments.map(commentId => state.comments[commentId])
    // })
    
    useEffect(() => {
        dispatch(getAllComents(song.id))
    }, [dispatch, song.id])
    

    // need signed in permission
    const createaComment = async (e) => {
        e.preventDefault();
        setErrors([]);
        comment = {
            body
        }

        let newComment = await dispatch(createComment(song.id, comment))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });

        console.log(newComment);
    }

    // const removeaComment = async (e) => {
    //     e.preventDefault();
    //     dispatch(removeComment(comment.id))
    //     // history.push("/")
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
                    placeholder="Enter your comment here"
                    onChange={(e) => setBody(e.target.value)}
                    required
                    />
                    <button id="commentSubmitButton" type="submit">Post</button>
                </div>
                
            </form>
            <div id="listedComments">
                <ul>
                    {comments.map((comment) => {
                        return (
                            <div key={comment.id} id="singleComment">
                                <li id="commentBody">{comment.body}</li>
                                <button id="deleteCommentButton" onClick={() => dispatch(removeComment(comment.id))}>Delete</button>
                            </div>  
                        )
                    })}
                </ul>
            </div>   
        </div>
    );
}


export default CommentSection;