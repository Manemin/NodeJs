const { fileService, userService } = require('../services');

module.exports = {
    changeAvatar: async (req, res, next) => {
        try {
            const { avatar: oldAvatar, id } = req.dbUser;

            await fileService.delFile(oldAvatar);

            const pathForDb = await fileService.saveFile(req.avatar, id);

            await userService.updateUserData(id, { avatar: pathForDb });

            res.json('Avatar updated');
        } catch (e) {
            next(e);
        }
    },
};
