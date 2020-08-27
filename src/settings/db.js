import mongoose from 'mongoose';
import environment from './environment';

mongoose.set('useCreateIndex', true);

const db = {
    connect: () => {
        const { user, pwd, host, database } = environment.mongo;

        const url = `mongodb+srv://${user}:${pwd}@${host}/${database}?retryWrites=true&w=majority`;

        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('Mongo connected!'))
            .catch(e => console.error('Mongo connection error', e));
    },
    disconnect: () => {
        mongoose.disconnect();
    }
};

export default db;