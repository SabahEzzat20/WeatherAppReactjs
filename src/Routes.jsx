import React from "react";
import { createBrowserRouter } from "react-router-dom";
import {App} from './App';
export const Routes = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
])