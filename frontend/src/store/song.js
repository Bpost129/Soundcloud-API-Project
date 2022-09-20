import { csrfFetch } from './csrf';

const GET_SONG = 'songs/getSongs';
const CREATE_SONG = 'songs/createSong';
// const UPDATE_SONG = 'songs/updateSong';
const DELETE_SONG = 'songs/deleteSong';

// get all songs action creator --> reducer
const getSongs = (songs) => {
  return {
    type: GET_SONG,
    songs
  };
};

// create a song action creator --> reducer
const postSong = (song) => {
    return {
        type: CREATE_SONG,
        song
    };
};

// const updateSong = (song) => {
//     return {
//         type: UPDATE_SONG,
//         song
//     }
// }

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

// create song thunk --> backend and back (send to upload page)
export const createSong = (payload) => async (dispatch) => {
    // const { title, description, url, imageUrl } = song;
    const response = await csrfFetch("/api/songs", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            payload  
          // title,
            // description,
            // url,
            // imageUrl,
        })
    })

    const song = await response.json();
    dispatch(postSong(song))
    return song;
}


// remove song thunk --> backend> (send to single song page)
// export const removeSong = () => async(dispatch) => {

// }

const initialState = {
  songs: [],
//   song: {}
};




// song reducer --> index --> upload page & single song page & App
const songReducer = (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case GET_SONG:
        const allSongs = { ...newState.songs };
        action.songs.forEach((song) => {allSongs[song.id] = song})
        return allSongs;
    case CREATE_SONG:
        newState[action.song.id] = action.song
        return newState;
    case DELETE_SONG:
        delete newState[action.id]
        return newState
    default:
      return state;
  }
};

export default songReducer;