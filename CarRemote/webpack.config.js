module.exports = {
    entry: "./scripts/render.jsx",
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                use: ["babel-loader"]
            }
        ]
    }
};