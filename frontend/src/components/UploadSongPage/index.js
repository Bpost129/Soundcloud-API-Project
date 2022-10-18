import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createSong } from "../../store/song";
import './UploadSong.css';

function UploadSongPage({ song }) {
    const history = useHistory();
    const dispatch = useDispatch();
    // const seshsong = useSelector((state) => state.song);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [albumId, setAlbumId] = useState("")
    const [errors, setErrors] = useState([]);
  
    useEffect(() => {
      console.log(albumId)
    }, [albumId]); 
  
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

      let newSong = await dispatch(createSong(song))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });

      if (newSong) history.push(`/songs/${newSong.id}`);
    };

// if (seshsong) return <Redirect to="/" />;
  
    return (
      <div>
      <form id="uploadSongForm" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          URL
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>
        <label>
          Image URL
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <label>
          Album ID
          <input
            type="number"
            value={albumId}
            onChange={(e) => setAlbumId(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      </div>
      
    );
  }
  
  export default UploadSongPage;