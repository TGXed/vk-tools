interface AutoStatusParams {
    /**
     * Status language
     */
    lang?: string,

    /**
     * If set, status will be set into group
     */
    groupId?: number,

    /**
     * Set current date
     */
    currentDate?: boolean,

    /**
     * Set current time
     */
    currentTime?: boolean,

    /**
     * Set count of subscribers
     */
    subscribers?: boolean,

    /**
     * Set count of likes on avatar
     */
    avatarLikes?: boolean
};

export = AutoStatusParams;