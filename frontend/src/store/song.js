import { csrfFetch } from './csrf';

const GET_SONGS = 'songs/getSongs';
const GET_SONG = 'songs/getSong'
const CREATE_SONG = 'songs/createSong';
const UPDATE_SONG = 'songs/updateSong';
const DELETE_SONG = 'songs/deleteSong';

// get all songs action creator --> reducer
const getSongs = (songs) => {
  return {
    type: GET_SONGS,
    songs
  };
};

const getSong = (song) => {
  return {
    type: GET_SONG,
    song
  }
}

// create a song action creator --> reducer
const postSong = (song) => {
    return {
        type: CREATE_SONG,
        song
    };
};

//update song action creator ---> reducer
const updateSong = (song) => {
    return {
        type: UPDATE_SONG,
        song
    }
}

// remove song action creator --> reducer
export const deleteSong = (id) => {
  return {
    type: DELETE_SONG,
    id
  };
};

// get all songs thunk --> backend and back (send to home page)
export const getAllSongs = () => async (dispatch) => {
    const response = await csrfFetch("/api/songs");
    if (response.ok) {
        const songs = await response.json();
        dispatch(getSongs(songs));
    }
  };

export const getSingleSong = (id) => async (dispatch) => {
  const response = await csrfFetch(`/api/songs/${id}`);
  if (response.ok) {
    const song = await response.json();
    dispatch(getSong(song));
  }
}

// create song thunk --> backend and back (send to upload page)
export const createSong = (payload) => async (dispatch) => {
   
    const response = await csrfFetch("/api/songs", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
      const song = await response.json({});
      dispatch(postSong(song))
      return song;
    }
}

// update song thunk --> backend and back (send to single song page)
export const editSong = (payload) => async (dispatch) => {
 
    const response = await csrfFetch(`/api/songs/${payload.id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
    if (response.ok) {
      const newSong = await response.json({});
      dispatch(updateSong(newSong));
      return newSong;
    }
}

// remove song thunk --> backend> (send to single song page)
export const removeSong = (id) => async(dispatch) => {
    const response = await csrfFetch(`/api/songs/${id}`, {
        method: 'DELETE',
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
      dispatch(deleteSong(id));
    }
}

const initialState = { singleSong: {} };


// song reducer --> index --> upload page & single song page & home page/App
const songReducer = (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case GET_SONGS:
        const allSongs = {};
        action.songs.forEach((song) => {allSongs[song.id] = song})
        return allSongs;
    case GET_SONG:
        return {
          ...newState,
          singleSong: {
            ...action.song
            // ...state[action.song.id]
          }
        }
        // const song = {};
        // action.songs.forEach((song) => {allSongs[song.id] !== song.id ? null : 
        // return song;
    case CREATE_SONG:
        newState[action.song.id] = action.song
        return newState;
    case UPDATE_SONG:
        newState[action.song.id] = { ...state[action.song.id] }
        return newState
        // return {
        //   ...newState,
        //   [action.song.id]: action.song
        // }
    case DELETE_SONG:
        delete newState[action.id]
        return newState
    default:
      return state;
  }
};

export default songReducer;