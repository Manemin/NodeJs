const { carService } = require('../services');
const { errors: { CAR_NOT_FOUND } } = require('../error');

module.exports = {
    addNewCar: async (req, res, next) => {
        try {
            req.body.user_id = req.params.userId;

            await carService.createCar(req.body);

            res.json('Car added');
        } catch (e) {
            next(e);
        }
    },
    deleteCar: async (req, res, next) => {
        try {
            const { id } = req.body;
            await carService.delCar({ id });

            res.json(`car with user_id:${req.params.userId} deleted`);
        } catch (e) {
            next(e);
        }
    },
    findByParam: async (req, res, next) => {
        try {
            const { email } = req.body;

            const subParam = () => {
                if (email) {
                    delete req.body.email;
                    return { email };
                }
                return {};
            };

            const result = await carService.findByParams(req.body, subParam());

            if (!result.length) {
                res.json(CAR_NOT_FOUND.message);
                return;
            }

            res.json(result);
        } catch (e) {
            next(e);
        }
    },
    showCars: async (req, res) => {
        const cars = await carService.findCars();

        res.json(cars);
    },
    updateCar: async (req, res, next) => {
        try {
            const selector = () => {
                const { id } = req.body;
                if (id) {
                    return { id };
                }
                return { id: req.params.userId };
            };
            await carService.updateCarData(selector(), req.body);

            res.json('Car updated');
        } catch (e) {
            next(e);
        }
    },
};
