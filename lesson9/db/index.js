const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

const {
    db_config: {
        DB_HOST,
        DB_PWD,
        DB_USER,
        DB_NAME,
        DB_DIALECT
    }
} = require('../config');

module.exports = (() => {
    let instance;
    const initConnection = () => {
        const client = new Sequelize(DB_NAME, DB_USER, DB_PWD, {
            host: DB_HOST,
            dialect: DB_DIALECT,
        });

        const modelsPath = path.join(process.cwd(), 'db', 'models');
        const models = {};

        const getModels = () => {
            fs.readdir(modelsPath, (err, files) => {
                files.forEach((file) => {
                    const [model] = file.split('.');
                    // eslint-disable-next-line import/no-dynamic-require
                    const modelPath = require(path.join(modelsPath, file));

                    models[model] = modelPath(client, DataTypes);
                });
            });
        };
        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName],
            client
        };
    };

    return {
        getInstance: () => {
            if (!instance) instance = initConnection();
            return instance;
        }
    };
})();
