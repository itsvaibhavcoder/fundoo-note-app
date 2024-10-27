import express, { IRouter } from 'express';
import UserRoutes from './user.routes';
import NoteRoutes from './notes.routes';
const router = express.Router();

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = (): IRouter => {
    router.get('/getmsg', (req, res) => {
        res.json('Welcome vaibhav..');
    });
    
    // Initialize user routes
    router.use('/users', new UserRoutes().getRoutes());
    
    // Initializes note routes
    router.use('/notes', new NoteRoutes().getRoutes());
    return router;
};

export default routes;