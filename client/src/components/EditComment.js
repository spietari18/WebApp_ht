import { useState } from "react";
import Highlight from "react-highlight";
import { useNavigate } from "react-router";

function EditComment({comment, setComment, id, jwt}) {
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({});
    const nav = useNavigate();

    const toggleEdit = () => {
        if (edit) {
            setEdit(false);
        } else if (!edit) {
            setEdit(true);
        }
    }

    const submit = (e) => {
        e.preventDefault();

        // Send data with post
        fetch("/api/comment/edit/" + id, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "authorization": "bearer " + jwt
            },
            body: JSON.stringify(formData),
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
                setEdit(false);
                setComment({
                    ...comment,
                    comment: formData.comment
                });
            }
        })
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return(
        <div>
            {edit ?
            <>
                <form onSubmit={submit} onChange={handleChange} >
                    <textarea name="comment" className="field" defaultValue={comment.comment}/>
                    <input type="submit" className="btn" />
                </form>
                <button onClick={toggleEdit}>Close</button>
            </>
            :
            <>
            <Highlight className="language-plaintext">
                {comment.comment}
            </Highlight>
            <button onClick={toggleEdit}>Edit</button>
            </>
            }
        </div>
    )
}

export default EditComment;