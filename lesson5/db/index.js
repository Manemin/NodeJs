const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

module.exports = (() => {
    let instance;
    const initConnection = () => {
        const client = new Sequelize('auto_shop', 'root', 'root', {
            host: 'localhost',
            dialect: 'mysql',
        });

        const modelsPath = path.join(process.cwd(), 'db', 'models');
        const models = {};

        const getModels = () => {
            fs.readdir(modelsPath, (err, files) => {
                files.forEach((file) => {
                    const [model] = file.split('.');
                    // eslint-disable-next-line import/no-dynamic-require
                    models[model] = (require(path.join(modelsPath, model)))(client, DataTypes);
                });
            });
        };
        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName],
        };
    };

    return {
        getInstance: () => {
            if (!instance) instance = initConnection();
            return instance;
        }
    };
})();
