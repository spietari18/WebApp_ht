import {useState} from 'react';

function AddComment({comments, setComments, jwt, user, post_id}) {
    const [commentData, setCommentData] = useState({});

    const submit = (e) => {
        e.preventDefault();

        fetch("/api/comment/" + post_id, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "authorization": "bearer " + jwt
            },
            body: JSON.stringify(commentData),
            mode: "cors"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
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
                <input type="submit" className="btn" />
            </form>
        </div>
    )
}

export default AddComment;