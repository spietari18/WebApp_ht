import { useState, useEffect } from "react";
import EditComment from "./EditComment";

function Comment({originalComment, jwt}) {
    // useState for comments author
    const [author, setAuthor] = useState({});
    const [comment, setComment] = useState({});

    useEffect(() => {
        setComment(originalComment);
    }, [originalComment])

    // Get author of comment by user id
    useEffect(() => {
        if (comment.user) {
            fetch("/api/author/" + comment.user)
            .then(response => response.json())
            .then(json => setAuthor(json))
        }
    }, [comment.user])

    // Render comment
    return (
        <div>
            <p>Author: {author.email}, timestamp: {comment && comment.timestamp}, last edit: {comment && comment.lastedit} </p>
            {jwt ? <EditComment comment={comment} setComment={setComment} jwt={jwt} id={comment._id} /> : <p>{comment.comment}</p>}
        </div>
    )
}

export default Comment;