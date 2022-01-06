const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const webpack = require("webpack");
const dotenv = require('dotenv');

module.exports = (env, options) => {

    const envPath = `${path.join(__dirname)}/.env.${options.mode}`;
    const fileEnv = dotenv.config({ path: envPath }).parsed;
  
    // reduce it to a nice object, the same as before
    const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
      prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
      return prev;
    }, {});
  

    
    return {
        entry: './src/index.js',
        output: {
            path: path.join(__dirname, '/dist'),
            filename: 'index_bundle.js',
            publicPath: '/',
        },
        module: {
            rules: [
                {
                    test: /\.js$|jsx/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test:  /\.(scss|css)$/, 
                    use: [ 'style-loader', 'css-loader', 'sass-loader' ] 
                },
            ],
        },
        
        plugins: [
            new HtmlWebPackPlugin({template: './src/index.html'}),
            new webpack.DefinePlugin(envKeys)
        ],
        devServer: {
            historyApiFallback: true
        },
        resolve: {
            alias: {
                '@Src': path.resolve(__dirname, 'src/'),
                '@Components': path.resolve(__dirname, 'src/components/'),
                '@Themes': path.resolve(__dirname, 'src/themes/')
            }
        }
    }
}