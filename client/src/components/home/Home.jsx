import React from 'react'
import './hme.css'
import { Link } from 'react-router-dom'

export const Home = () => {
    const textstyle ={
        marginTop:"30px",
    }
    return (
        <>
            <div className="container">
                <div className="detail">
                    <h1 >Hello, Welcome to our system</h1>
                    <p style={textstyle}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos tempore odit, ea facere possimus fugit porro reprehenderit laboriosam similique. Quae, voluptates quas unde nemo corrupti accusantium quo. Reiciendis corporis, rerum quam nam assumenda repellendus sapiente magnam ab laboriosam voluptatibus? Nobis animi totam aliquam magni eius tenetur beatae natus commodi, voluptatem, ab officiis necessitatibus quas sunt maiores, enim consequuntur corrupti voluptas odit. Rem mollitia deleniti culpa esse commodi accusantium magnam id ea nihil eligendi incidunt consequatur, quasi inventore nobis facere quos quae iusto voluptatibus pariatur, corrupti aspernatur fugit optio maiores laboriosam! Aperiam exercitationem facilis reiciendis assumenda suscipit doloremque sequi, qui ipsa.</p>
                    <h1 style={textstyle}>Please login to continue</h1>
                    <div style={textstyle} className="press">
                        <Link to={"/login"}>Login Here</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
