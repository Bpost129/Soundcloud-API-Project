import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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
  
    const sessionUser = useSelector(state => state.session.user);
      
    useEffect(() => {
      const errs = [];

      if (!title) {
        errs.push("Title cannot be empty")
      } else if (title.length < 2) {
        errs.push("Title must be at least 3 characters")
      } else if (title.length > 30) {
        errs.push("Title must be less than 30 characters")
      }
  
      if (!description){
        errs.push("Username cannot be empty")
      } else if (description.length < 3) {
        errs.push("Username must be at least 3 characters")
      } else if (description.length > 30) {
        errs.push("Username must be less than 30 characters")
      }
  
      if (!url) {
        errs.push("Url name cannot be empty")
      } else if ((url && !url.includes('.mp3')) || (url && !url.includes('.mp4')) || (url && !url.includes('.wav'))) {
        errs.push("Url must contain .mp3, .mp4, or .wav")
      }
  
      if (albumId < 0) {
        errs.push("Must enter valid album id or choose 0")
      } 
  
      setErrors(errs);
    }, [albumId, url, description, title]); 
  
    

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

      if (newSong) history.push(`/songs/${newSong.id}`)
    };

// if (seshsong) return <Redirect to="/" />;
  
    return (
      <div className="Page">
        <h2 id="uploadHeader" >Upload a Song!</h2>
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
        <button id="uploadSongButton" type="submit" disabled={!sessionUser}>Submit</button>
      </form>
      {!sessionUser && <div style={{textAlign:"center", marginTop:"10px"}}>You must be signed in to upload a song!</div>}
      </div>
      
    );
  }
  
  export default UploadSongPage;