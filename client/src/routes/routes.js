import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {Links} from "../pages/links/Links";
import {Create} from "../pages/create/Create";
import {Detail} from "../pages/detail/Detail";
import {Auth} from "../pages/auth/Auth";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <Links />
                </Route>
                <Route path="/create" exact>
                    <Create />
                </Route>
                <Route path="/detail/:id">
                    <Detail />
                </Route>
                <Redirect to="/create" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <Auth />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}
