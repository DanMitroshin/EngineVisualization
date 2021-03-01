import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {HashRouter} from 'react-router-dom';
import MainRouter from "./routers";



ReactDOM.render(
    <HashRouter basename={process.env.PUBLIC_URL}>
        <MainRouter/>
    </HashRouter>
,
document.getElementById('root'));

