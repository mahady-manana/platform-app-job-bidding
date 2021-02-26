import express from "express";
import favicon from "serve-favicon";
import config from "./configs/config";
import webpackBundler from "./webpackBundler";
import mongoose from "mongoose";
import path from "path";
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import React from "react";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/core";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import theme from "../client/theme";
import SharedRouter from "../client/SharedRouter";
import AuthFreelancerRouter from "./routers/user.authentication";
import FreelancerRouters from "./routers/freelancer.router";
import SinglePhotoRouter from './routers/single.photo';
import SendMailRouter from './routers/user-email-verify';
const CURRENT_WD = process.cwd();
const app = express();

webpackBundler.Bundler(app);

app.use(favicon(path.join(CURRENT_WD, "public", 'images', "icon.png")))
app.use(express.static(path.join(CURRENT_WD, '/build/')))
app.use(express.static(path.join(CURRENT_WD, '/public/')))
app.use("*", express.static(path.join(CURRENT_WD, '/build/')))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser())
app.use('/', SendMailRouter)
app.use("/", AuthFreelancerRouter);
app.use("/", FreelancerRouters);
app.use('/', SinglePhotoRouter)
app.get("*", (req, res) => {
    const sheets = new ServerStyleSheets();
    const context = {};
    const html = ReactDOMServer.renderToString(
        sheets.collect(
            <StaticRouter location={req.url} context={context}>
                <ThemeProvider theme={theme}>
                    <SharedRouter/>
                </ThemeProvider>
            </StaticRouter>
        )
    )
    if (context.url) {
        return res.redirect(303, context.url)
    }
    const MuiCss = sheets.toString();
    let bundleFile;
    if (process.env.NODE_ENV === 'development') {
        bundleFile = '/build/bundle.js';
    } else {
        bundleFile = '/bundle.js';
    }
    res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <base href="/">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sharing platform - Share and Share</title>
        <meta name="description" content="Sharing platform for everyone.">
        <meta name="keywords" content="Reactjs, Nodejs, Jsx, Express, MongoDB, JavaScript, Mern">
        <meta name="author" content="Mahady Manana">
        <base href="/">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <!-- CSS only -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
        <!-- JavaScript Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
        <style id="js-server">${MuiCss}</style>
        <link rel="stylesheet" href="/css/style.main.css" type="text/css"/>
        <link rel="stylesheet" href="/css/fonts.css" type="text/css"/>
        <link rel="stylesheet" href="/css/slideshow1.css" type="text/css"/>
    </head>
    <body>
        <div id="root">${html}</div>
        <script src=${bundleFile}></script> 
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>  
    </body>
    </html>
    `)
})

mongoose.Promise = global.Promise
mongoose.connect(config.mongoURI, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false })
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoURI}`)
})
app.listen(config.port, error => {
    if (error) {
        console.log(error)
    }
    console.log(`Server running at : ${config.port}\nVisit : http://localhost:${config.port}`)
})
