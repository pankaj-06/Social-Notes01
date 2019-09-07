import React from "react";
import { BrowserRouter as Router, Route, } from "react-router-dom";
import login from "./components/login";
import App from "./components/App";



function AppRouter() {
    return (
        <Router>
            <div>
                <Route path="/" exact component={login} />
                <Route path="/notes" component={App} />
            </div>
        </Router>
    );
}

export default AppRouter;