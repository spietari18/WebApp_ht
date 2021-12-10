import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import AddPost from "./AddPost";

function Posts({user, jwt}) {
    const [posts, setPosts] = useState([]);
    const [authors, setAuthors] = useState([]);

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

    useEffect(() => {
        let tempAuthorList = [];
        posts.forEach(post => {
            fetch("/api/author/" + post.user)
            .then(response => response.json())
            .then(json => tempAuthorList.push(json.email))
        })
        setAuthors(tempAuthorList);
    }, [posts]);

    return (
        <div>
            {posts && posts.map((postItem, index) => (
                <div id={postItem._id}>
                    <p>Author: {authors && authors[index]}{console.log("Author " + authors[index])} , posted: {postItem.timestamp}</p>
                    <p>{postItem.post}</p>
                    <Link to={"/post/" + postItem._id}>Show comments</Link>
                </div>
            ))}
            <AddPost posts={posts} setPosts={setPosts} jwt={jwt} user={user}/>
        </div>
    )
}

export default Posts;