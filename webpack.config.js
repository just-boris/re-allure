/*eslint-env node*/
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const postcssLoader = {
    loader: 'postcss-loader',
    options: {
        plugins: [
            require('autoprefixer')
        ]
    }
};

module.exports = (env) => {
    const development = env && env.development;
    return {
        entry: './src/index.tsx',
        output: {
            path: path.join(__dirname, 'build'),
            pathinfo: development,
            filename: 'app.js'
        },
        resolve: {
            extensions: [".js", ".tsx", ".ts"]
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }, {
                test: /\.scss$/,
                use: development
                    ? ['style-loader', 'css-loader', postcssLoader, 'sass-loader']
                    : ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            postcssLoader,
                            'sass-loader'
                        ]
                    })
            }]
        },
        devtool: development ? 'eval' : false,
        plugins: [
            new ExtractTextPlugin('styles.css'),
            new CaseSensitivePathsPlugin()
        ],
        devServer: {
            disableHostCheck: true,
            contentBase: 'public',
            stats: {colors: true},
            host: '0.0.0.0',
            port: 3000,
            inline: true,
            hot: true
        }
    };
};
