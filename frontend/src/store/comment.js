import { csrfFetch } from './csrf';

const GET_COMMENTS = 'comments/getComments';
const CREATE_COMMENT = 'comments/createComment';
const DELETE_COMMENT = 'comments/deleteComment';

// get all comments action creator --> reducer
const getComments = (comments, songId) => {
  return {
    type: GET_COMMENTS,
    comments,
    songId
  };
};

// create a comment action creator --> reducer
const postComment = (comment) => {
    return {
        type: CREATE_COMMENT,
        comment
    };
};

// remove comment action creator --> reducer
export const deleteComment = (commentId) => {
  return {
    type: DELETE_COMMENT,
    commentId,
  };
};

// get all songs thunk --> backend and back (send to home page)
export const getAllComments = (songId) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${songId}/comments`);

    if (response.ok) {
        const comments = await response.json();
        dispatch(getComments(comments, songId));
        return comments;
    }
  };

// create song thunk --> backend and back (send to upload page)
export const createComment = (id, payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${id}/comments`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
      const comment = await response.json({});
      dispatch(postComment(comment))
      return comment;
    }
}

// remove song thunk --> backend> (send to single song page)
export const removeComment = (commentId) => async(dispatch) => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        dispatch(deleteComment(commentId));
    }
}

const initialState = {};


// song reducer --> index --> upload page & single song page & home page/App
const commentReducer = (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case GET_COMMENTS:
        const allComments = {};
        action.comments.forEach((comment) => {allComments[comment.id] = comment})
        return allComments;
    case CREATE_COMMENT:
        return {
            ...newState,
            [action.comment.id]: action.comment
        }
    case DELETE_COMMENT:
        const newwState = { ...newState }
        delete newwState[action.commentId]
        return newwState
    default:
      return state;
  }
};

export default commentReducer;