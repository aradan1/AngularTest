import { Router, Request, Response } from 'express';
import * as express from 'express';

import * as productControler from './../../controllers/productController';
import { auth } from '../middleware';

const router: Router = express.Router();

router.get('/', function(req: Request, res: Response){
    const data = productControler.getAllProducts(); 
    res.status(200).send({data:data});
})

router.post('/', auth, function(req: Request, res: Response){
    if(!(req.body.name && req.body.description)){
        return res.status(422).send({
            message: "Product creation requires 'name' and 'description' fields"
        });
    }

    const data = productControler.createProduct({name: req.body.name, description: req.body.description});
    if(data){
        res.status(200).send({data:data});
    }else{
        return res.status(422).send({
            message: "Product already exists"
    });
}
})

router.delete('/:productid', auth, function(req: Request, res: Response){
    const p_id: string = req.params.productid;
    productControler.deleteProductById(p_id);
    res.status(200).send({message: "success"});
})

router.put('/:productid', auth, function(req: Request, res: Response){
    if(!(req.body.name && req.body.description)){
        return res.status(422).send({
            message: "Product requires 'name' and 'description' fields"
        });
    }
    const p_id: string = req.params.productid;
    const data = productControler.editProductById(p_id , {name: req.body.name, description: req.body.description});
    res.status(200).send({data:data});
})

router.get('/:productid', function(req: Request, res: Response){
    const p_id: string = req.params.productid;
    const data = productControler.getProductById(p_id);
    if(data){
        return res.status(200).send({data:data});
    }else{
        res.status(404).send({message: "Product not found"});
    }
})

export default router;