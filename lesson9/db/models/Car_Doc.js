module.exports = (client, DataTypes) => {
    const Car_Doc = client.define('Car_Doc',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            car_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: 'cars',
                    key: 'id'
                }
            },
            doc: DataTypes.STRING,
        },
        {
            tableName: 'car_doc',
            timestamps: false,
        });

    return Car_Doc;
};
