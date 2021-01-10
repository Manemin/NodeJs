require('dotenv').config();

const e = process.env;

module.exports = {
    PHOTO_MIME_TYPES: [
        'image/gif',
        'image/jpeg',
        'image/png',
    ],
    DOC_MIME_TYPES: [
        'application/msword',
        'application/pdf',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    MAX_FILE_SIZE_PHOTO: 2 * 1024 * 1024,
    MAX_FILE_SIZE_DOC: 5 * 1024 * 1024,
    AVATAR_MAX_COUNT: 1,
    DOC_MAX_COUNT: 3,
    PUBLIC_FOLDER: e.PUBLIC_FOLDER || 'public',
    USERS_FOLDER: e.USERS_FOLDER_FOLDER || 'users',
    AVATAR_FOLDER: e.AVATAR_FOLDER || 'avatar',
    CAR_PHOTOS_FOLDER: e.CAR_PHOTOS_FOLDER || 'car-photos',
};
