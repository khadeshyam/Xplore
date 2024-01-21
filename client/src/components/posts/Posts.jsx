import Post from "../post/Post";
import "./posts.css";
import PostSkeleton from "../PostSkeleton/PostSkeleton";

export default function Posts({ posts }) {

  return (
    <div className="posts">
      {posts.length !== 0 && posts.map((p) => (
        <Post post={p} />
      ))}
      {posts.length === 0 &&
        Array.from({ length: 4 }).map((_, index) => (
          <PostSkeleton key={index} />
        ))
      }
    </div>
  );
}
