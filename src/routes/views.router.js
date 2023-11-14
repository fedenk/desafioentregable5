import { Router } from 'express';
import Products from '../dao/dbManagers/products.manager.js';

const router = Router();
const productManager = new Products();

const publicAccess = ( req, res, next ) => {
    if(req.session?.user) return res.redirect('/');
    next();
};

const privateAccess = ( req, res, next ) => {
    if(!req.session.user) return res.redirect('/login');
    next();
};

router.get('/register', publicAccess, (req,res) => {
    res.render('register')
});

router.get('/login', publicAccess, (req,res) => {
    res.render('login')
});

router.get('/', privateAccess, async(req,res) => {
    const products = await productManager.getAll();
    res.render('profile', {
        user: req.session.user,
        products
    })
});

export default router;
