import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Post from "./Post";
import AddPost from "./AddPost";

function Posts({user, jwt}) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("/api/post", {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            },
            mode: "cors"
        })
        .then(response => response.json())
        .then(postsJson => {
            setPosts(postsJson.post);
        })
    }, []);

    return (
        <div>
            <h2>Posts</h2>
            {posts && posts.map((post) => (
                <Post user={user} jwt={jwt} id={post._id} />
            ))}
            <hr />
            <AddPost posts={posts} setPosts={setPosts} jwt={jwt} user={user}/>
        </div>
    )
}

export default Posts;