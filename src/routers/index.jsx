import React from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import {MAIN_URL} from "../constants";
import SuccessPage from "../pages/SuccessPage";
import FailPage from "../pages/FailPage";

const MainRouter = () => {
        return <Switch>
                <Route exact path={MAIN_URL.SUCCESS} component={SuccessPage}/>
                {/*<Route exact path={MAIN_URL.FAIL} component={FailPage}/>*/}

                <Redirect to={MAIN_URL.SUCCESS}/>
        </Switch>
};


export default MainRouter;
