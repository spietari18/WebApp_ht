import { useEffect, useState } from 'react';
import AddComment from './AddComment';
import Comment from './Comment';
import Highlight from 'react-highlight';
import { useParams } from 'react-router';
import EditPost from './EditPost';

function Post({jwt, user}) {
    const id = useParams();
    // useState array for comment objects
    const [commentList, setCommentList] = useState([]);
    // useState object for post to render
    const [post, setPost] = useState({});
    // useState string for posts authors email 
    const [author, setAuthor] = useState("");
    // useState that loads newly added comments
    const [newComments, setNewComments] = useState([]);

    // Get post data by id, store to useState
    useEffect(() => {
        if (id) {
            fetch("/api/post/" + id.id)
            .then(response => response.json())
            .then(json => {
                setPost(json.post);
            })
        }
    }, [id]);

    // Get posts author, store email
    useEffect(() => {
        if (post.user) {
            fetch("/api/author/" + post.user)
            .then(response => response.json())
            .then(json => setAuthor(json.email))
        }
    }, [post.user]);

    // Get all comments, store to useState
    useEffect(() => {
        setCommentList([]);
        if (Array.isArray(post.comments)) {
            post.comments.forEach(comment => {
                fetch("/api/comment/" + comment)
                .then(response => response.json())
                .then(json => {
                    const commentObject = json.comment;
                    setCommentList(prev => [...prev, commentObject]);
                });
            });
            newComments.forEach(comment => {
                setCommentList(prev => [...prev, comment]);
            });
        }
    }, [post.comments, newComments]);

    // Render Author, timestamp, post
    // Loop through comments and render them with comment component
    return (
        <div>
            <hr />
            <h4>Post</h4>
            <p>Author: {author}, posted: {post.timestamp}, last edit: {post.lastedit}</p>
            {!jwt ? <Highlight>{post.post}</Highlight> : <EditPost post={post} setPost={setPost} jwt={jwt} id={id.id} />}
            <hr />
            <h4>Comments:</h4>
            {commentList && commentList.map((comment, index) => (
                <Comment key={index} originalComment={comment} jwt={jwt} />
            ))}
            <hr />
            <AddComment setNewComments={setNewComments} setComments={setCommentList} jwt={jwt} user={user} post_id={post._id} />
        </div>
    )
}

export default Post;