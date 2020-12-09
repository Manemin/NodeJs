module.exports = (client, dataTypes) => {
    const Car = client.define(
        'Car',
        {
            id: {
                type: dataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            model: {
                type: dataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: dataTypes.STRING,
                allowNull: false,
            },
            year: {
                type: dataTypes.STRING,
                allowNull: false,
            },
            user_id: {
                type: dataTypes.INTEGER,
                allowNull: false,
                foreignKey: true
            },
        },
        {
            tableName: 'cars',
            timestamps: false,
        }
    );
    return Car;
};
