var HtmlWebpackPlugin = require('html-webpack-plugin');

var Config =  {
    entry:'./src/index.tsx',
    output:{
        filename: 'index.js',
        path: __dirname+'/dist',
        publicPath: '/',
        devtoolModuleFilenameTemplate:'../[resource-path]'
    },
    devtool:'source-map',
    resolve:{
        extensions:['','.ts','.tsx','.js']
    },
    module:{
        loaders:[
            {test:/\.tsx?$/,include:[__dirname+'/src'],loader:'ts'},
            {test:/\.pug$/,loader:'pug'}
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/index.pug'
        })
    ]
}

module.exports = {Config}