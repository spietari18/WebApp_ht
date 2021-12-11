import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddComment from './AddComment';
import Comment from './Comment';

function Post({jwt, user, id}) {
    const [commentList, setCommentList] = useState([]);
    const [post, setPost] = useState({});
    const [author, setAuthor] = useState("");

    useEffect(() => {
        if (id) {
            fetch("/api/post/" + id)
            .then(response => response.json())
            .then(json => {
                console.log("Post:");
                console.log(json.post);
                setPost(json.post);
            })
        }
    }, [id]);

    useEffect(() => {
        if (post.user) {
            fetch("/api/author/" + post.user)
            .then(response => response.json())
            .then(json => setAuthor(json.email))
        }
    }, [post.user]);

    useEffect(() => {
        if (Array.isArray(post.comments)) {
            post.comments.forEach(comment => {
                console.log(comment);
                fetch("/api/comment/" + comment)
                .then(response => response.json())
                .then(json => {
                    const commentObject = json.comment;
                    console.log(commentObject);
                    setCommentList([...commentList, commentObject]);
                })
            });
        }
    }, [post.comments]);

    return (
        <div>
            <hr />
            <h4>Post</h4>
            <p>Author: {author}, posted: {post.timestamp}</p>
            <p>{post.post}</p>
            <hr />
            <h4>Comments:</h4>
            {commentList && commentList.map((comment) => (
                <Comment comment={comment} />
            ))}
            <hr />
            <AddComment comments={commentList} setComments={setCommentList} jwt={jwt} user={user} post_id={post._id} />
        </div>
    )
}

export default Post;