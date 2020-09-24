//import Log from '../middlewares/Log';
import express from 'express';
import { HttpError } from 'http-errors';

class Handler {
    /**
     * Handles all the not found routes
     */
    public static notFoundHandler(_express: express.Application): express.Application {
        const apiPrefix = 'api';

        _express.use('*', (req: express.Request, res: express.Response) => {
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

            console.error(`Path '${req.originalUrl}' not found [IP: '${ip}']!`);
            if (req.xhr || req.originalUrl.includes(`/${apiPrefix}/`)) {
                return res.json({
                    error: 'Page Not Found',
                });
            } else {
                res.status(404);
                return res.render('pages/error', {
                    title: 'Page Not Found',
                    error: [],
                });
            }
        });

        return _express;
    }

    /**
     * Handles your api/web routes errors/exception
     */
    public static clientErrorHandler(err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction): express.Response | void {
        console.error(err.stack);

        if (req.xhr) {
            return res.status(500).send({ error: 'Something went wrong!' });
        } else {
            return next(err);
        }
    }

    /**
     * Show undermaintenance page incase of errors
     */
    public static errorHandler(err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction): express.Response | void {
        console.error(err.stack);
        res.status(500);

        const apiPrefix = 'api';
        if (req.originalUrl.includes(`/${apiPrefix}/`)) {
            if (err.name && err.name === 'UnauthorizedError') {
                const innerMessage = err.inner && err.inner.message ? err.inner.message : undefined;
                return res.json({
                    error: ['Invalid Token!', innerMessage],
                });
            }

            return res.json({
                error: err,
            });
        }

        return res.render('pages/error', {
            error: err.stack,
            title: 'Under Maintenance',
        });
    }

    /**
     * Register your error / exception monitoring
     * tools right here ie. before "next(err)"!
     */
    public static logErrors(err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction): void {
        console.error(err.stack);

        return next(err);
    }
}

export default Handler;
