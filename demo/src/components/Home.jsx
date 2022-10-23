import React from "react"
import { ReducerContext } from "../reducer/reducer.js";

const Home = () => {
    const [state, dispatch] = React.useContext(ReducerContext)
    
    return (
        <div>
            <h2>Home</h2>
        </div>
        );
};

export default Home;