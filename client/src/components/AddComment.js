import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function AddComment({setNewComments, setComments, jwt, user, post_id}) {
    // Store formData to useState
    const [commentData, setCommentData] = useState({});
    const nav = useNavigate();

    // Comment submitting
    const submit = (e) => {
        e.preventDefault();

        // Send comments data with post, save to given useState
        fetch("/api/comment/" + post_id, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "authorization": "bearer " + jwt
            },
            body: JSON.stringify(commentData),
            mode: "cors"
        })
        .then(response => {
            if (response.status === 401) {
                console.log("Not authorized!")
                nav("/logout");
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data) {
                // setComments(oldComments => [...oldComments, data.comment]);
                setNewComments(prev => [...prev, data]);
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
                <textarea name="comment" className="field" />
                <input type="submit" className="btn" />
            </form>
        </div>
    )
}

export default AddComment;