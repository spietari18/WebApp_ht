import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function AddPost({posts, setPosts, jwt, user}) {
    // Store formData to useState
    const [postData, setPostData] = useState({});
    const nav = useNavigate();

    // Form submit function
    const submit = (e) => {
        e.preventDefault();

        // Send forms data with post, save data to given useState
        fetch("/api/post", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "authorization": "bearer " + jwt
            },
            body: JSON.stringify(postData),
            mode: "cors"
        })
        .then(response => {
            if (response.status === 401) {
                console.log("Not authorized!")
                nav("/logout");
            }
            response.json();
        })
        .then(data => {
            if (data && data.post) {
                setPosts([...posts, data.post])
            }
        })
    }

    const handleChange = (e) => {
        setPostData({...postData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <h4>New Post</h4>
            <form onSubmit={submit} onChange={handleChange}>
                <textarea name="post" className="field" />
                <input type="submit" className="btn" />
            </form>
        </div>
    )
}

export default AddPost;