const path = require("path");
const webpack = require("webpack");

const CURRENT_WD = process.cwd();

const config = {
    name : "client",
    mode : "development",
    devtool : "eval-source-map",
    entry : [
        'webpack-hot-middleware/client?reload=true',
        path.join(CURRENT_WD, "client/index.js")
    ],
    output : {
        path : path.join(CURRENT_WD, "/build/"),
        filename : "bundle.js",
        publicPath : "/build/"
    },
    module : {
        rules : [
            {test : /\.(js|jsx)$/, exclude : /node_modules/, use : ["babel-loader"]},
            {test : /\.(css|scss)$/, use : ["style-loader","css-loader"]},
            {test : /\.(png|jpg|jpeg|svg|gif|pdf|doc|docx)$/, use : ["file-loader"]},
            {test : /\.(woff|woff2|eot|ttf|otf)$/,
				loader : 'file-loader',
				options : {name : '[name][hash].[ext]'}
			}
        ]
    },
    plugins : [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
    ],
	resolve : {
		alias : {
			'react-dom' : '@hot-loader/react-dom'
		}
	}

}
module.exports = config;