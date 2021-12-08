import {useState} from 'react';
import {Redirect} from 'react-router-dom';

function AddPost({posts, setPosts}) {
    const [postData, setPostData] = useState({});

    const submit = (e) => {
        e.preventDefault();

        fetch("/api/post", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(postData),
            mode: "cors"
        })
        .then(response => response.json())
        .then(data => {
            if (data.post) {
                setComments([...posts, data.post])
            }
        })
    }

    const handleChange = (e) => {
        setCommentData({...postData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <h4>New Post</h4>
            <form onSubmit={submit} onChange={handleChange}>
                <input type="text-area" name="post" />
                <input type="submit" />
            </form>
        </div>
    )
}

export default AddPost;