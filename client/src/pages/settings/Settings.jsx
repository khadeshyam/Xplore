import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import API from "../../utils/axios";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };


  const [updatedUser, setUpdatedUser] = useState({
    username: user.username,
    email: user.email
  });

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    try {
      const data = new FormData();
      if (file) {
        data.append("file", file);
      }
      data.append("username", updatedUser.username);
      data.append("email", updatedUser.email);

      const res = await API.put("/users/" + user._id, data);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setSuccess(true);
      setError(null);
      setFile(null);
    } catch (err) {
      console.log(err);
      dispatch({ type: "UPDATE_FAILURE" });
      setError(err?.response?.data?.error);
      setSuccess(false);
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
          {user && <span className="settingsDeleteTitle" onClick={handleLogout}>Logout</span>}
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : user.profilePic}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={updatedUser.username}
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleChange}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: "green", textAlign: "center", marginTop: "20px" }}
            >
              Profile has been updated...
            </span>
          )}
          {error && (
            <span
              style={{ color: "red", textAlign: "center", marginTop: "20px" }}
            >
              {error}
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}