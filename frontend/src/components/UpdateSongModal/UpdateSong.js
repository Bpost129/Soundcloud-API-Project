import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editSong } from "../../store/song";
import './UpdateSong.css';
import { Modal } from "../../context/Modal";

function UpdateSong({ song }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const { songId } = useParams();
    let song2 = useSelector(state => state.songs[songId]);

    const [title, setTitle] = useState(song2.title);
    const [description, setDescription] = useState(song2.description);
    const [url, setUrl] = useState(song2.url);
    const [imageUrl, setImageUrl] = useState(song2.imageUrl);
    const [albumId, setAlbumId] = useState(song2.albumId)
    const [errors, setErrors] = useState([]);
    const [showModal, setShowModal] = useState(true);
    // useEffect for validation errors

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
        id: song2.id,
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

      setShowModal(false);
    };

// if (seshsong) return <Redirect to="/" />;
  
    if (!song2) return null;
    
    return (
      <div>
        <h2 id="updateHeader">Edit Your Song</h2>
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
        <button type="submit" id="submitUpdateSongButton">Submit</button>
      </form>
      </div>
      
    );
  }
  
  export default UpdateSong;