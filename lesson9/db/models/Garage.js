module.exports = (client, dataTypes) => {
    const Garage = client.define('Garage',
        {
            id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: dataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: 'users',
                    key: 'id',
                }
            },
            car_id: {
                type: dataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: 'cars',
                    key: 'id',
                }
            },
        },
        {
            tableName: 'garage',
            timestamps: false,
            freezeTableName: true,
        });

    return Garage;
};
