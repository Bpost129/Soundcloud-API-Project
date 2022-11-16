import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import { Modal } from "../../context/Modal";
import SignupForm from "./SignupForm";

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} style={{height: "27.5px", width:"125px", backgroundColor: "rgb(255, 77, 0)", color: "white", border: "none", borderRadius: "3px"}}>Create account</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupForm />
        </Modal>
      )}
    </>
  )
}

export default SignupFormModal;



// function SignupFormPage() {
//   const dispatch = useDispatch();
//   const sessionUser = useSelector((state) => state.session.user);
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errors, setErrors] = useState([]);

//   if (sessionUser) return <Redirect to="/" />;

//   // handle submit for signup (dispatch thunk with new entry)
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password === confirmPassword) {
//       setErrors([]);
//       return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
//         .catch(async (res) => {
//           const data = await res.json();
//           if (data && data.errors) setErrors(data.errors);
//         });
//     }
//     return setErrors(['Confirm Password field must be the same as the Password field']);
//   };

//   return (
//     <div>
//     <form id="signupForm" onSubmit={handleSubmit}>
//       <ul>
//         {errors.map((error, idx) => <li key={idx}>{error}</li>)}
//       </ul>
//       <label>
//         Email
//         <input
//           type="text"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Username
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         First Name
//         <input
//           type="text"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Last Name
//         <input
//           type="text"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Password
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </label>
//       <label>
//         Confirm Password
//         <input
//           type="password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//       </label>
//       <button type="submit">Sign Up</button>
//     </form>
//     </div>
    
//   );
// }

// export default SignupFormPage;