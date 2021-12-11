import {useState} from 'react';

function AddPost({posts, setPosts, jwt, user}) {
    const [postData, setPostData] = useState({});

    const submit = (e) => {
        e.preventDefault();

        fetch("/api/post", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "authorization": "bearer " + jwt
            },
            body: JSON.stringify(postData),
            mode: "cors"
        })
        .then(response => response.json())
        .then(data => {
            if (data.post) {
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
                <input type="text-area" name="post" />
                <input type="submit" className="btn" />
            </form>
        </div>
    )
}

export default AddPost;