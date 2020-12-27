const { DataTypes } = require('sequelize');
const { client } = require('./index').getInstance();

const Car = require('./models/Car')(client, DataTypes);
const User = require('./models/User')(client, DataTypes);
const O_auth = require('./models/O_Auth')(client, DataTypes);

const can_drive = User.belongsToMany(Car, {
    foreignKey: 'user_id',
    otherKey: 'car_id',
    through: 'garage',
    as: 'can_drive'
});
const drivers = Car.belongsToMany(User, {
    foreignKey: 'car_id',
    otherKey: 'user_id',
    through: 'garage',
    as: 'drivers'
});

const user_cars = User.hasMany(Car, { foreignKey: 'user_id', as: 'has_cars' });
const owner = Car.belongsTo(User, { foreignKey: 'user_id', as: 'owner' });
const user_token = O_auth.belongsTo(User, { foreignKey: 'user_id', as: 'current_user' });

module.exports = {
    can_drive,
    drivers,
    user_cars,
    owner,
    user_token,
};
