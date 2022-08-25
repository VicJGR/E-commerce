//importamos express y controladores
import express from "express";
import articuloRouter from './rutas/articuloRouter.js';
import indexRouter from './rutas/indexRouter.js';

//instanciamos nueva aplicación express
const app = express();

//necesario para poder recibir datos en json
app.use(express.json());


//las rutas que empiecen por /api/articulo se dirigirán a articuloRouter
app.use('/', indexRouter);
app.use('/api/articulo', articuloRouter);

//arranque del servidor
const port = 3000
app.listen(port, () => console.log(`App listening on port ${port}!`))

