const db = require('../db').getInstance();
const { owner } = require('../db/association');

module.exports = {
    createCar: (car) => {
        const carModel = db.getModel('Car');

        return carModel.create(car);
    },

    delCar: (id) => {
        const carModel = db.getModel('Car');

        return carModel.destroy({ where: id });
    },

    findCarById: (id) => {
        const carModel = db.getModel('Car');

        return carModel.findByPk(id);
    },

    findCars: () => {
        const carModel = db.getModel('Car');

        return carModel.findAll();
    },

    findByParams: (param = {}, userParam) => {
        const carModel = db.getModel('Car');

        return carModel.findAll({
            include: [{ association: owner, where: userParam }],
            where: param
        });
    },

    updateCarData: (id, data) => {
        const carModel = db.getModel('Car');

        return carModel.update(data, { where: id });
    },
};
