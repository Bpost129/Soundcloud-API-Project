import { csrfFetch } from './csrf';

const GET_SONG = 'songs/getSongs';
const CREATE_SONG = 'songs/createSong';
// const UPDATE_SONG = 'songs/updateSong';
// const DELETE_SONG = 'songs/deleteSong';

const getSongs = (songs) => {
  return {
    type: GET_SONG,
    songs
  };
};

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

// const deleteSong = () => {
//   return {
//     type: DELETE_SONG,
//   };
// };


export const getAllSongs = () => async (dispatch) => {
    const response = await csrfFetch("/api/songs");
    if (response.ok) {
        const songs = await response.json();
        dispatch(getSongs(songs));
    }
  };


export const createSong = (song) => async (dispatch) => {
    const { title, description, url, imageUrl } = song;
    const response = await csrfFetch("/api/songs", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            title,
            description,
            url,
            imageUrl,
        })
    })
    const data = await response.json();
    dispatch(postSong(data.song))

}

const initialState = {};

const songReducer = (state = initialState, action) => {
//   let newState;
  switch (action.type) {
    case GET_SONG:
        const allSongs = {};
        action.songs.forEach((song) => {allSongs[song.id] = song})
        return allSongs;
    case CREATE_SONG:
        const song = {};
        
    default:
      return state;
  }
};

export default songReducer;