const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const {
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PWD,
    DB_DAILECT
} = require('../config/db.config');

module.exports = (() => {
    let instance;
    const initConnection = () => {
        const client = new Sequelize(DB_NAME, DB_USER, DB_PWD, {
            host: DB_HOST,
            dialect: DB_DAILECT,
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
