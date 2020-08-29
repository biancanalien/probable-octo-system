import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoMock = new MongoMemoryServer();

const dbMock = {
    connect: async () => {
        const uri = await mongoMock.getConnectionString();
        const mongooseOpts = {
            useNewUrlParser: true,
            autoReconnect: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000
        };

        await mongoose.connect(uri, mongooseOpts);
    },

    disconnect: async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongoMock.stop();
    },

    clearDatabase: async () => {
        const collections = mongoose.connection.collections;

        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    }
};

export default dbMock;