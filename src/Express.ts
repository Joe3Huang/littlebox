import express from 'express';
import apiRouter from './routes/api';
// import Locals from './Locals';
// import Routes from './Routes';
// import Bootstrap from '../middlewares/Kernel';
import ExceptionHandler from './middlewares/Handler';

class Express {
    public express: express.Application;

    constructor() {
        this.express = express();
    }

    private mountLocalsEnv(): void {}

    private mountMiddlewares(): void {}

    private mountRoutes(): void {
        //api
        this.express.use(`/api/v1`, apiRouter);
    }

    public init(): void {
        const port = 3000;
        // Registering Exception / Error Handlers
        this.express.use(ExceptionHandler.logErrors);
        this.express.use(ExceptionHandler.clientErrorHandler);
        this.express.use(ExceptionHandler.errorHandler);
        this.express = ExceptionHandler.notFoundHandler(this.express);
        // Start the server on the specified port
        this.express.listen(port, () => {
            return console.log('\x1b[33m%s\x1b[0m', `Server :: Running @ 'http://localhost:${port}'`);
        });
    }
}

export default new Express();
