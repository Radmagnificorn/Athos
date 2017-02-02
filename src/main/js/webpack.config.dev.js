
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
        path: "../../../ext-res",
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
            { test: /\.css$/, loaders: ['style', 'css'] },
            { test: /\.less$/, loader: "style!css!less" }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    }
}

