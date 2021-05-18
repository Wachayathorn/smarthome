const redis = require('redis');
const client = redis.createClient(process.env.REDIS_SERVER);

export async function getValueFromRedis(key: string): Promise<any> {
    return new Promise((resolve) => {
        client.get(key, (error, data) => {
            if (error) {
                resolve(error);
            } else {
                resolve(data);
            }
        });
    })
}

export async function setValueToRedis(key: string, value): Promise<any> {
    return new Promise(async (resolve) => {
        await client.set(key, JSON.stringify(value));
        resolve(true);
    })
}