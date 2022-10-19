import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { editSong } from "../../store/song";
import './UpdateSong.css';

function UpdateSongPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    
    // const seshsong = useSelector((state) => state.song);
    // const song = useSelector(state => state.songs[songId]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [albumId, setAlbumId] = useState("")
    const [errors, setErrors] = useState([]);
    const { songId } = useParams();
    let song = useSelector(state => state.songs[songId]);

    
  
    // handle submit for uploading song (dispatch thunk with new entry)
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors([]);
      song = {
        title,
        description,
        url,
        imageUrl,
        albumId: albumId === "" ? null : Number(albumId),
      }

      let editedSong = await dispatch(editSong(song))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });

      history.push(`/songs/${editedSong.id}`)
    };

// if (seshsong) return <Redirect to="/" />;
  
    return (
      <div>
      <form id="updateSongForm" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Title
          <input
            type="text"
            value={title}
            placeholder={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            placeholder={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          URL
          <input
            type="text"
            value={url}
            placeholder={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>
        <label>
          Image URL
          <input
            type="text"
            value={imageUrl}
            placeholder={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <label>
          Album ID
          <input
            type="number"
            value={albumId}
            placeholder={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      </div>
      
    );
  }
  
  export default UpdateSongPage;