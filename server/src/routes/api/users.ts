import { Router, Request, Response }  from 'express';
import * as express from 'express';

import * as userControler from './../../controllers/userController';


import * as jwt from 'jwt-simple';
import { auth, CustomRequest } from '../middleware';


const router: Router = express.Router();

router.get('/', function(req: Request, res: Response){
    const data = userControler.getAllUsers(); 
    res.status(200).send({data:data});
})

router.post('/register', function(req: Request, res: Response){
    if(!(req.body.name && req.body.password)){
        return res.status(422).send({
            message: "User requires 'name' and 'password' fields"
        });
    }
    const user = userControler.createUser({name: req.body.name, password: req.body.password});
    if(user){
        const token = jwt.encode({ _id: req.body.name, name: user.name, exp: Date.now()/1000 + +(process.env.TOKEN_LIFE_SECONDS as string)}, (process.env.TOKEN_SECRET as string));
        return res.status(200).send({token: token, username: req.body.name});
    }else{
        return res.status(422).send({
            message: "User already exists"
        });
    }
})

router.post('/login', function(req: Request, res: Response){
    if(!(req.body.name && req.body.password)){
        return res.status(422).send({
            message: "User requires 'name' and 'password' fields"
        });
    }
    const user = userControler.login(req.body.name, req.body.password);
    if (user){
        const token = jwt.encode({ _id: req.body.name, name: user.name, exp: Date.now()/1000 + +(process.env.TOKEN_LIFE_SECONDS as string)}, (process.env.TOKEN_SECRET as string));
        return res.status(200).send({token: token, username: req.body.name});
    }
    res.status(404).send({message: "Failed to login"});
})

// for testing purposes
router.post('/auth', auth, function(req: Request, res: Response){
    
    return res.status(200).send({message: "Successful Authorization"});

})

router.delete('/:userid', auth, function(req: Request, res: Response){
    if((req as CustomRequest).token._id !== req.params.userid){
        return res.status(422).send({
            message: "Need to be logged in to the user to delete it"
        });
    }
    const u_id: string = req.params.userid;
    userControler.deleteUserById(u_id);
    res.status(200).send({message: "success"});
})

router.put('/:userid', auth, function(req: Request, res: Response){
    if((req as CustomRequest).token._id !== req.params.userid){
        return res.status(422).send({
            message: "Need to be logged in to the user to make changes"
        });
    }
    if(!(req.body.name && req.body.password)){
        return res.status(422).send({
            message: "User requires 'name' and 'password' fields"
        });
    }
    const u_id: string = req.params.userid;
    const data = userControler.editUserById(u_id , {name: req.body.name, password: req.body.password});
    res.status(200).send({data:data});
})

router.get('/:userid', function(req: Request, res: Response){
    const u_id: string = req.params.userid;
    const data = userControler.getUserById(u_id);
    if(data){
        return res.status(200).send({data:data});
    }else{
        res.status(404).send({message: "User not found"});
    }
})

export default router;