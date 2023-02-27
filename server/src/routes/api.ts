import { Router, Request, Response, NextFunction }  from 'express';
import * as express from 'express';
const router: Router = express.Router();
import * as cors from 'cors';

import apiUsersRouter from './api/users';
import apiProductsRouter from './api/products';


router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.use(cors());

router.use('/users', apiUsersRouter);
router.use('/products', apiProductsRouter);

router.get('/', (req: Request, res: Response) => {
    res.send({message: 'Hello World!'});
})

router.use((req: Request, res: Response, next: NextFunction) => {
    res.send({message:'404: PAGE NOT FOUND'});
    next();
})

export default router;