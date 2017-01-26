module.exports = {
    entry: "./App/nav.js",
    output: {
        path: "../resources/static",
        publicPath: "assets",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    }
}

