import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddComment from './AddComment';
import Comment from './Comment';

function Post({jwt, user}) {
    const id = useParams();
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState({});
    const [author, setAuthor] = useState("");

    useEffect(() => {
        fetch("/api/post/" + id.id)
        .then(response => response.json())
        .then(json => {
            console.log("Post:");
            console.log(json.post);
            setPost(json.post);
        })
    }, [id]);

    useEffect(() => {
        fetch("/api/author/" + post.user)
        .then(response => response.json())
        .then(json => setAuthor(json.email))
    }, [post.user]);

    useEffect(() => {
        if (Array.isArray(post.comments)) {
            post.comments.forEach(comment => {
                fetch("api/comment/" + comment._id)
                .then(response => response.json())
                .then(json => setComments(...comments, json))
                console.log(comment);
            });
        }
    }, [post]);

    return (
        <div>
            <p>Author: {author}, posted: {post.timestamp}</p>
            <p>{post.post}</p>
            {comments.map((comment) => (
                <Comment comment={comment} />
            ))}
            <AddComment comments={comments} setComments={setComments} jwt={jwt} user={user} post_id={post._id} />
        </div>
    )
}

export default Post;