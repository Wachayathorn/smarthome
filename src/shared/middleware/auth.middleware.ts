import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
const redis = require('redis');
const JWTR = require('jwt-redis').default;

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    private readonly redisClient = redis.createClient(process.env.REDIS_SERVER);
    private readonly jwtr = new JWTR(this.redisClient);
    async use(req, res, next) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            const token = req.headers.authorization.split(' ')[1];
            let payload;
            try {
                payload = await this.jwtr.verify(token, process.env.JWT_SECRET);
            } catch (error) {
                const exception = new UnauthorizedException();
                res.status(exception.getStatus()).send(exception.getResponse());
            }
            if (payload) {
                req.payload = payload;
                req.token = token;
                next();
            }
        } else {
            const exception = new UnauthorizedException();
            res.status(exception.getStatus()).send(exception.getResponse());
        }
    }
}