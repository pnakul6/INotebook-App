// about i notebook app make something more from it
import React from "react";
import { Link } from "react-router-dom";
const Inotebook = () => {
    return (
        <div className="container">
            <h1>Hello welcome to my Notebook</h1>
            <br></br>
            <p>For using this app you first have to <Link to="/login">Login</Link> if you are an existing user or you can <Link to="/signup">Sign Up</Link> if this is your first time in this app.</p>
            <p>To know more about functionality of this app go to <Link to="/about">About</Link> section</p>
        </div>
    )
}

export default Inotebook