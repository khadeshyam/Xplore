import { useContext, useState } from "react";
import "./write.css";
import { Context } from "../../context/Context";
import API from "../../utils/axios";
import { useNavigate } from "react-router-dom";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    const filename = file?.name + Date.now();
    data.append("file", file);
    data.append("name", filename);
    data.append("username", user.username);
    data.append("userId", user._id);
    data.append("title", title);
    data.append("desc", desc);
    try {
      const res = await API.post("/posts", data);
      console.log('res', res);
      console.log('res', res?.data?._id);
      res?.data?._id && navigate(`/post/${res?.data?._id}`);
    } catch (err) {
      console.log('err posting file',);
    }
  }; return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
