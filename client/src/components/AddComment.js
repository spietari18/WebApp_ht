import {useState} from 'react';
import {Redirect} from 'react-router-dom';

function AddComment({comments, setComments}) {
    const [commentData, setCommentData] = useState({});

    const submit = (e) => {
        e.preventDefault();

        fetch("/api/comment", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(commentData),
            mode: "cors"
        })
        .then(response => response.json())
        .then(data => {
            if (data.comment) {
                setComments([...comments, data.comment])
            }
        })
    }

    const handleChange = (e) => {
        setCommentData({...commentData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <h4>New comment</h4>
            <form onSubmit={submit} onChange={handleChange}>
                <input type="text-area" name="comment" />
                <input type="submit" />
            </form>
        </div>
    )
}

export default AddComment;