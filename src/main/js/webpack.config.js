
module.exports = {
    debug: true,
    devtool: 'inline-source-map',
    noInfo: false,
    entry: {
        player: "./App/nav.js",
        admin: "./AdminPanel/admin.jsx"
    },
    target: "web",
    output: {
        path: "../resources/static",
        publicPath: "/",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['react']
                }
            },
            {
                test: /\.css$/, loaders: ['style', 'css']
            }
        ]
    }
}

