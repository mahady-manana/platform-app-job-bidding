import React from "react";
import {hydrate} from "react-dom";
import Application from "./Application"
import "../public/css/style.main.css"
import "../public/css/fonts.css"
import "../public/css/slideshow1.css"
import 'bootstrap/dist/css/bootstrap.min.css'

hydrate(<Application/>, document.getElementById("root"))