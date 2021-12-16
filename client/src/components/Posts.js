import { useState, useEffect } from "react";
import AddPost from "./AddPost";
import { Link } from "react-router-dom";
import Highlight from "react-highlight";

function Posts({user, jwt}) {
    // Store all posts to useState
    const [posts, setPosts] = useState([]);

    // Get all posts available
    useEffect(() => {
        setPosts([]);
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
            <AddPost posts={posts} setPosts={setPosts} jwt={jwt} user={user}/>
            <hr />
            <h2>Posts</h2>
            <p>Click to open post and see the comments!</p>
            {posts && posts.map((post) => (
                <Link key={post._id} to={"/post/" + post._id} ><Highlight>{post.post}</Highlight></Link>
            ))}
        </div>
    )
}

export default Posts;