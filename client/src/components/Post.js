import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddComment from './AddComment';
import Comment from './Comment';

function Post() {
    const post_id = useParams();
    const [comments, setComments] = useState([]);
    const [post, setPost] = useState({});

    useEffect(() => {
        fetch("/api/post/" + post_id)
        .then(response => response.json())
        .then(json => setPost(json))
    }, [post_id]);

    useEffect(() => {
        post.comments.forEach(comment => {
            fetch("api/comment/" + comment._id)
            .then(response => response.json())
            .then(json => setComments(...comments, json))
        });
    }, [post]);

    return (
        <div>
            <p>Author: {post.author.email}, posted: {post.timestamp}</p>
            <p>{post.post}</p>
            {comments.map((comment) => (
                <Comment comment={comment} />
            ))}
            <AddComment comments={comments} setComments={setComments} />
        </div>
    )
}

export default Post;