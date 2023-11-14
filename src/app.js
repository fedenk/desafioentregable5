import express from 'express';
import session from 'express-session';
//import cookieParser from 'cookie-parser';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
//import FileStore from 'session-file-store';
import MongoStore from 'connect-mongo';
import sessionsRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.router.js';
import mongoose from 'mongoose';
import productsRouter from './routes/products.router.js';

//const fileStore = FileStore(session);

try {
    await mongoose.connect('mongodb+srv://fedenkoptv:86VUQzMmgjkJQ26Z@cluster55575fgs.es4ndyh.mongodb.net/desafio5?retryWrites=true&w=majority');
    console.log('DB connected');
} catch (error) {
    console.log(error.message);
}

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 3600
    }),
    secret: 'Coder55755Secret',
    resave: true,
    saveUninitialized: true,
    //cookie: {
    //    maxAge: 30000
    //}
}))

app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);

//app.use(cookieParser('Coder55575secret'));

/*app.use(session({
    store: new fileStore({
        path: `${__dirname}/sessions`,
        ttl: 360,
        retries: 0
    }),
    secret: 'Coder55755Secret',
    resave: true,
    saveUninitialized: false,
    //cookie: {
    //    maxAge: 30000
    //}
}))*/



app.listen(8080, ()=> console.log('Server Running'));

/*
function auth(req, res, next) {
    if(req.session?.user === 'pepe' && req.session?.admin){
        return next();
    }

    return res.status(401).send('Error de validacion');
}

app.get('/session', (req,res) => {
    if(req.session.counter){
        req.session.counter++;
        res.send(`Se ha visitado el sitio ${re.session.counter} veces`)
    }else{
       req.session.counter = 1;
       res.send('Bienvenido'); 
    }
});

app.get('/login', (req,res) => {
    const { username, password } = req.query;

    if(username !== 'pepe' || password !== 'pepepass'){
        return res.status(401).send('Login failed');
    }

    req.session.user = username;
    req.session.admin = true;
    res.send('Login exitoso');
});

app.get('/private', auth, (req,res) => {
    res.send('Tienes permisos para acceder a este servicio');
})

app.get('/logout', (req,res) =>{
    req.session.destroy(error => {
        if(!error) res.send('Logout exitoso')
        else res.send({ status: 'error', message: error.message });
    })
});*/



/*app.get('/', (req,res) => {
    res.render('cookies');
});

app.post('/cookie', (req,res) => {
    const data = req.body;
    res.cookie('CoderCookie', data, { maxAge: 10000 }).send({ status: 'success', message: 'CookieConfig'});
});
app.get('/cookies', (req,res) => {
    res.cookie('CoderCookie', 'Cookie super poderosa', { maxAge: 30000 })
       .send('Cookie configurada correctamente');
});

app.get('/all-cookies', (req,res) => {
    res.send(req.cookies);
});

app.get('/delete-cookies', (req,res) => {
    res.clearCookie('CoderCookie').send('Cookie eliminada');
});

app.get('/set-signed-Cookies', (req,res) => {
    res.cookie('CoderSignedCookie', 'SuperSignedCookie', { maxAge: 30000, signed: true })
       .send('cookie configurada correctamente');
});

app.get('/all-signed-cookies', (req,res) => {
    res.send(req.signedCookies);
});*/