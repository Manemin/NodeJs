module.exports = (client, DataTypes) => {
    const Car_Photo = client.define('Car_Photo',
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
            photo: DataTypes.STRING,
        },
        {
            tableName: 'car_photo',
            timestamps: false,
        });

    return Car_Photo;
};
