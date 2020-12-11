module.exports = {
    // eslint-disable-next-line no-unused-vars
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('users', [
            {
                id: 1,
                name: 'Alex',
                email: 'alex@gmail.com',
                password: '1233412'
            },
            {
                id: 2,
                name: 'Diana',
                email: 'diana@gmail.com',
                password: '3453412'
            }
        ]);

        await queryInterface.bulkInsert('cars', [
            {
                id: 1,
                model: 'Mazda',
                price: 10000,
                year: 1998,
                user_id: 1
            },
            {
                id: 2,
                model: 'Honda',
                price: 8000,
                year: 2000,
                user_id: 2
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        const op = Sequelize.Op;

        await queryInterface.bulkDelete('users', { id: { [op.lt]: 3 } });
        // await queryInterface.bulkDelete('cars', { id: { [op.lt]: 3 } });
    }
};
