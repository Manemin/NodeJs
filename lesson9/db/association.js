// const { DataTypes } = require('sequelize');
// const { client } = require('./index').getInstance();

// const Car = require('./models/Car')(client, DataTypes);
// const User = require('./models/User')(client, DataTypes);
// const O_auth = require('./models/O_Auth')(client, DataTypes);
// const Garage = require('./models/Garage')(client, DataTypes);
// const Car_Photo = require('./models/Car_Photo')(client, DataTypes);
// const Car_Doc = require('./models/Car_Doc')(client, DataTypes);

const {
    Car,
    Car_Doc,
    Car_Photo,
    Garage,
    O_auth,
    User,
} = require('./models');

const can_drive = User.belongsToMany(Car, {
    foreignKey: 'user_id',
    otherKey: 'car_id',
    through: Garage,
    as: 'can_drive'
});
const drivers = Car.belongsToMany(User, {
    foreignKey: 'car_id',
    otherKey: 'user_id',
    through: Garage,
    as: 'drivers'
});

const user_cars = User.hasMany(Car, { foreignKey: 'user_id', as: 'has_cars' });
const owner = Car.belongsTo(User, { foreignKey: 'user_id', as: 'owner' });
const user_token = O_auth.belongsTo(User, { foreignKey: 'user_id', as: 'current_user' });

const car_photo = Car.hasMany(Car_Photo, { foreignKey: 'car_id', as: 'car_photo' });
const car_doc = Car.hasMany(Car_Doc, { foreignKey: 'car_id', as: 'car_doc' });

module.exports = {
    can_drive,
    drivers,
    user_cars,
    owner,
    user_token,
    car_photo,
    car_doc,
};
