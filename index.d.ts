import AutoStatusParams from './src/types/autoStatus';

export class VKTools {
    /**
     * @param token VKToken
     */
    constructor(token: string);

    /**
     * Start endless online
     */
    async endlessOnline(): Promise<void>;

    /**
     * 
     * @param text Status text
     */
    async setStatus(text: string): Promise<void>;

    /**
     * 
     * @param params Status parameters
     */
    async setAutoStatus(params: AutoStatusParams): Promise<void>;
};

export class VKWrapper {
    /**
     * @param token VK Token
     * @param version API version
     */
    constructor(token: string, version?: string);

    /**
     * @param method API method
     * @param params Required method parameters
     */
    async callMethod(method: string, ...params: any[]): Promise<object>;
};

export default VKTools;