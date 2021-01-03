const {
    errors: {
        WRONG_FILE_EXTENSION,
        TO_BIG_FILE,
        JUST_ONE_PHOTO,
    },
    ErrorHandler,
} = require('../error');
const {
    fileUploadConfig: {
        DOC_MIME_TYPES,
        PHOTO_MIME_TYPES,
        MAX_FILE_SIZE_PHOTO,
        MAX_FILE_SIZE_DOC,
        AVATAR_MAX_COUNT,
    }
} = require('../config');

module.exports = {
    checkUpload: (req, res, next) => {
        try {
            const { files } = req;

            if (files) {
                const photos = [];
                const docs = [];

                const allFiles = Object.values(files);

                allFiles.forEach((file) => {
                    if (PHOTO_MIME_TYPES.includes(file.mimetype)) {
                        if (file.size > MAX_FILE_SIZE_PHOTO) throw new ErrorHandler(TO_BIG_FILE.message, TO_BIG_FILE.code);

                        photos.push(file);
                    } else if (DOC_MIME_TYPES.includes(file.mimetype)) {
                        if (file.size > MAX_FILE_SIZE_DOC) throw new ErrorHandler(TO_BIG_FILE.message, TO_BIG_FILE.code);

                        docs.push(file);
                    } else {
                        throw new ErrorHandler(WRONG_FILE_EXTENSION.message, WRONG_FILE_EXTENSION.code);
                    }
                });

                req.photos = photos;
                req.docs = docs;
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    checkAvatar: (req, res, next) => {
        try {
            if (req.photos.length > AVATAR_MAX_COUNT) throw new ErrorHandler(JUST_ONE_PHOTO.message, JUST_ONE_PHOTO.code);

            [req.avatar] = req.photos;

            next();
        } catch (e) {
            next(e);
        }
    },
};
