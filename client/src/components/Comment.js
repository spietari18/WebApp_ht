import { useState, useEffect } from "react";

function Comment(comment) {
    const [author, setAuthor] = useState({});

    useEffect(() => {
        fetch("/api/user/" + comment.author)
        .then(response => response.json())
        .then(json => setAuthor(json))
    }, [comment.author])

    return (
        <div>
            <p>Author: {author.email}, timestamp: {comment.timestamp}</p>
            <p>{comment.comment}</p>
        </div>
    )
}

export default Comment;