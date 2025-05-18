import React from "react";
import { Route } from "react-router";

function routesLibrary() {
    return(
        <>
        <Route path="/" element={<Home />} />
        </>
    )
}