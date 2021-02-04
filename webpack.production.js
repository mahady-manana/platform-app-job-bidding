const path = require("path");

const CURRENT_WD = process.cwd();

const config = {
    name : "Mahady Manana - Official website",
    target : "node",
    entry : path.join(CURRENT_WD, "client/index.js"),
    output : {
        path : path.join(CURRENT_WD, "/build/"),
        filename : "bundle.js",
        publicPath : "/build/"
    },
    module : {
        rules : [
            {test : /\.(js|jsx)$/, exclude : /node_modules/, use : ["babel-loader"]},
            {test : /\.(css|scss)$/, use : ["style-loader","css-loader"]},
            {test : /\.(png|jpg|jpeg|svg|gif|pdf)$/, use : ["file-loader"]},
            {test : /\.(woff|woff2|eot|ttf|otf)$/,
				loader : 'file-loader',
				options : {name : '[name][hash].[ext]'}
			}
        ]
    },

}
module.exports = config; 