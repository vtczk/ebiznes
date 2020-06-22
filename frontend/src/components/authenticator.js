import React, {useContext, useEffect} from "react";
import {GlobalContext} from "./global-context";
import Redirect from "react-router-dom/es/Redirect";
import {useParams} from "react-router-dom";

export default function SocialAuthenticator() {
    let {token} = useParams();
    const context = useContext(GlobalContext);

    useEffect(() => {
        console.log("got token "+token);
            context.setUser(token)
        }
    );
    return (

        <Redirect to={"/"}/>
    )
}

