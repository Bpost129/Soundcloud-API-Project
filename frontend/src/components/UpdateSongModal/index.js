import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './UpdateSong.css';
import { Modal } from "../../context/Modal";
import UpdateSong from "./UpdateSong";

function UpdateSongModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="displayUpdateSongButton" onClick={() => setShowModal(true)}> <i className="fa-solid fa-pen-to-square" style={{marginRight: "3px"}}></i> Update</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateSong />
        </Modal>
      )}
    </>
  )
}

export default UpdateSongModal;