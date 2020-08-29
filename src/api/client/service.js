import clientModel from './model';

const clientService = {
    async create(body) {
        return await clientModel.create(body);
    },
    async getClientById(id) {
        return await clientModel.findById(id) || null;
    }
}

export default clientService;