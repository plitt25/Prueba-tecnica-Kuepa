import express,{ Application } from 'express'
import sequelize from '../database/connection';
import rrr from '../routes/user';
import { User } from './user';

class Server {
    private app: Application;
    private port: string;
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '5000'
        this.listen();
        this.middlewares();
        this.router();
        this.DBconnet();


    }
    
    listen() {
        this.app.listen(this.port, () => {
            console.log(' se esta ejecutando en: ' + this.port);

        })
    }
    router(){
        this.app.use(rrr)
    }
    middlewares() {
        this.app.use(express.json());
    }
    
    async DBconnet() {
        try {
            //await sequelize.authenticate();
            await User.sync();
            console.log('Conexión Exitosa');

        } catch (error) {
            console.log('Error de conexión: ', error);

        }
    }
}
export default Server