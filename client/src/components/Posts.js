import { useState, useEffect } from "react";
import AddComment from "./AddComment";

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(/api/post)
        .then(response => response.json())
        .then(postsJson => setPosts(postsJson))
    }, []);

    return (
        <div id="posts">
            {posts.map((post) => (
                <div id={post._id}>
                    <p>Author: {post.author.email}, posted: {post.timestamp}</p>
                    <p>{post.post}</p>
                    <a href='/post/{post_id}'>Show comments</a>
                </div>
            ))}
            <AddComment />
        </div>
    )
}

export default Posts;