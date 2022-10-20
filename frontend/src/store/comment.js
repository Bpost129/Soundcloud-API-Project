import { csrfFetch } from './csrf';

const GET_COMMENTS = 'comments/getComments';
const CREATE_COMMENT = 'comments/createComment';
const DELETE_COMMENT = 'comments/deleteComment';

// get all comments action creator --> reducer
const getComments = (comments) => {
  return {
    type: GET_COMMENTS,
    comments
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
export const deleteComment = (id) => {
  return {
    type: DELETE_COMMENT,
    id
  };
};

// get all songs thunk --> backend and back (send to home page)
export const getAllComents = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${id}/comments`);

    if (response.ok) {
        const comments = await response.json();
        dispatch(getComments(comments));
    }
  };

// create song thunk --> backend and back (send to upload page)
export const createComment = (id, payload) => async (dispatch) => {
    // const { title, description, url, imageUrl } = song;
    // console.log('this is the payload before database:', payload);
    const response = await csrfFetch(`/api/songs/${id}/comments`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    // console.log(response);
    if (response.ok) {
      const comment = await response.json({});
      dispatch(postComment(comment))
      return comment;
    }
}

// remove song thunk --> backend> (send to single song page)
export const removeComment = (id) => async(dispatch) => {
    const response = await csrfFetch(`/api/comments/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
    //   const comment = await response.json();
      dispatch(deleteComment(id));
    }
}

const initialState = {
//   song: {}
};


// song reducer --> index --> upload page & single song page & home page/App
const commentReducer = (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case GET_COMMENTS:
        const allComments = {};
        action.comments.forEach((comment) => {allComments[comment.id] = comment})
        return allComments;
    case CREATE_COMMENT:
        newState[action.comment.id] = action.comment
        return newState;
    case DELETE_COMMENT:
        delete newState[action.id]
        return newState
    default:
      return state;
  }
};

export default commentReducer;