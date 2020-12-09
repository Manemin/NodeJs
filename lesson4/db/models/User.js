module.exports = (client, dataTypes) => {
    const User = client.define(
        'User',
        {
            id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: dataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: dataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: dataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: 'users',
            timestamps: false,
        }
    );
    const Car = require('./Car')(client, dataTypes);
    User.hasOne(Car, { foreignKey: 'user_id' });
    return User;
};
