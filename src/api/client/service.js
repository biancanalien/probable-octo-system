import clientModel from './model';

const clientService = {
    async create(body) {
        return await clientModel.create(body);
    }
}

export default clientService;