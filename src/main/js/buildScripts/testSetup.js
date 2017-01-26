require('babel-register')();

//disable webpack features mocah doesn't understand
require.extensions['.css'] = function () {
    
}