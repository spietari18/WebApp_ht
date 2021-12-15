import { useState, useEffect } from "react";

function Comment({comment}) {
    // useState for comments author
    const [author, setAuthor] = useState({});

    console.log(comment);

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
            <p>Author: {author.email}, timestamp: {comment.timestamp}</p>
            <p>{comment.comment}</p>
        </div>
    )
}

export default Comment;