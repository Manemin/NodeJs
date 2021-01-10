const { DataTypes } = require('sequelize');

const { client } = require('../index').getInstance();

module.exports = {
    Car: require('./Car')(client, DataTypes),
    Car_Doc: require('./Car_Doc')(client, DataTypes),
    Car_Photo: require('./Car_Photo')(client, DataTypes),
    Garage: require('./Garage')(client, DataTypes),
    O_auth: require('./O_Auth')(client, DataTypes),
    User: require('./User')(client, DataTypes),
};
