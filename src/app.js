import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import routes from './routes'; // Certifique-se de que o caminho esteja correto

class App {

    constructor() {
        this.server = express();

        // Conexão com o MongoDB
        mongoose.connect('mongodb+srv://dedefullstack:Andresamara93@devhouse.owgtbeh.mongodb.net/?retryWrites=true&w=majority&appName=devhouse')
            .then(() => console.log('Conectado ao MongoDB'))
            .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors());

      this.server.use(
        '/files',
        express.static(path.resolve(__dirname, '..', 'uploads'))
      );


        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;
