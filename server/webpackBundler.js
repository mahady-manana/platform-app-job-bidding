// Webpack development
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../webpack.client.js";
// End module for dev only 

const Bundler = app => {
    const compiler = webpack(config);
    const middleware = webpackDevMiddleware(compiler, {
        publicPath : config.output.publicPath
    })
    const hotMiddleware = webpackHotMiddleware(compiler);
    app.use(middleware)
    app.use(hotMiddleware)
}
export default {Bundler};