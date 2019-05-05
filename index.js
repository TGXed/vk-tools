const VKWrapper = require('./src/wrapper');
const emojify = require('./src/emojify');
const { VKToolsError } = require('./src/errors');

class VKTools {
    /**
     * @param {String} token VK Token
     */
    constructor(token) {
        this.vkAPI = new VKWrapper(token, '5.95');
    };

    /**
     * Start endless online
     */
    async endlessOnline() {
        await this.vkAPI.callMethod('account.setOnline');
        console.log('Online has been updated.');

        setTimeout(async() => {
            await this.endlessOnline();
        }, 300000);
    };

    /**
     * Set a new status
     * @param {String} text Status text 
     */
    async setStatus(text) {
        if (!text) throw new VKToolsError('Status message');

        await this.vkAPI.callMethod('status.set', {
            text: text
        });
        console.log('Status has been changed.');
    };

    /**
     * Auto status
     * @param {Object} params Status parameters 
     * @param {String} params.lang Status language
     * @param {Number} params.groupId If set, status will be set into group
     * @param {Boolean} params.currentDate Set current date
     * @param {Boolean} params.currentTime Set current time
     * @param {Boolean} params.subscribers Set count of subscribers
     * @param {Boolean} params.avatarLikes Set count of likes on avatar
     */
    async setAutoStatus(params = {}) {
        if (!params.lang) params.lang = 'ru';
        if (params.lang !== 'en' && params.lang !== 'ru') throw new VKToolsError("Parameter `lang` must be set to 'ru' or 'en'");

        let text = '';

        if (params.currentDate) {
            let day = emojify(new Date().getDate());
            let month = emojify(new Date().getMonth());
            let year = emojify(new Date().getFullYear());

            text += `📆 ${params.lang == 'ru' ? 'Дата:' : 'Date:'} ${day}\.${month}\.${year} | `;
        };

        if (params.currentTime) {
            let hours = emojify(new Date().getHours());
            let minutes = emojify(new Date().getMinutes());

            text += `⏰ ${params.lang == 'ru' ? 'Время:' : 'Time:'} ${hours}\:${minutes} | `;
        };

        if (params.groupId) {
            if (params.groupId < 0) params.groupId = -params.groupId;

            let groupInfo = await this.vkAPI.callMethod('groups.getById', {
                group_id: params.groupId,
                fields: 'members_count'
            });

            if (params.subscribers) {
                text += `👥 ${params.lang == 'ru' ? 'Подписчиков:' : 'Subscribers:'} ${groupInfo[0].members_count}`;
            };

            await this.vkAPI.callMethod('status.set', {
                text: encodeURIComponent(text),
                group_id: params.groupId
            });    
        } else {
            let userInfo = await this.vkAPI.callMethod('users.get', {
                fields: 'followers_count,photo_id'
            });

            if (params.avatarLikes) {                
                if (typeof userInfo[0].photo_id === 'undefined') throw new VKToolsError(`Current user doesn't have an avatar.`);

                let userPhotoInfo = await this.vkAPI.callMethod('photos.getById', {
                    photos: userInfo[0].photo_id,
                    extended: 1
                });

                text += `💌 ${params.lang == 'ru' ? 'На аве:' : 'On avatar:'} ${userPhotoInfo[0].likes.count} ❤ | `
            };

            if (params.subscribers) {
                text += `👥 ${params.lang == 'ru' ? 'Подписчиков:' : 'Subscribers:'} ${userInfo[0].followers_count}`;
            };

            await this.vkAPI.callMethod('status.set', {
                text: encodeURIComponent(text)
            });
        };

        setTimeout(async () => {
            await this.setAutoStatus(params);
        }, 60000);
    };
};

module.exports = { VKTools, VKWrapper };