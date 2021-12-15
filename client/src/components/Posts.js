import { useState, useEffect } from "react";
import Post from "./Post";
import AddPost from "./AddPost";

function Posts({user, jwt}) {
    // Store all posts to useState
    const [posts, setPosts] = useState([]);

    // Get all posts available
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

    // Loop through all posts, render with Post component
    return (
        <div>
            <h2>Posts</h2>
            {posts && posts.map((post) => (
                <Post key={post._id} user={user} jwt={jwt} id={post._id} />
            ))}
            <hr />
            <AddPost posts={posts} setPosts={setPosts} jwt={jwt} user={user}/>
        </div>
    )
}

export default Posts;