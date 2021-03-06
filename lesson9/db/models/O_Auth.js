module.exports = (client, DataTypes) => {
    const O_Auth = client.define('O_Auth',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            access_token: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            refresh_token: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
                references: {
                    model: 'users',
                    key: 'id',
                }
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: client.fn('NOW'),
            }
        },
        {
            tableName: 'o_auth',
            timestamps: false
        });

    return O_Auth;
};
