import React from "react";
import Mobile from "../Components/Mobile";
import { Link } from "react-router-dom";

const Home:React.FC = () =>{
    return(
        <div>
            <Mobile>
                <div>
                    <h1 className="font-bold text-3xl">Swastha Yatra</h1>
                    <p>"We appreciate your time."</p>
                    <Link to='/register' className="btn mt-5" >Get's started!</Link>
                </div>
            </Mobile>
        </div>
    )
}

export default Home;