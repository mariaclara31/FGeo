/* craco.config.js */
const CracoLessPlugin = require("craco-less");

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { "@primary-color": "#244CD5" },
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
