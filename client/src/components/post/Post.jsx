import "./post.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Post({ post }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const PF = "http://localhost:5000/images/";
  return (
    <div className="post">
      {post.photo && (
        <img
          className={`postImg ${imgLoaded ? 'loaded' : ''}`}
          src={PF + post.photo}
          alt=""
          onLoad={() => setImgLoaded(true)}
          lazy="true"
        />
      )}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
