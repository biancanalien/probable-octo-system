import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    document: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true }
});

mongoose.model('client', clientSchema);
const clientModel = mongoose.model('client');

export default clientModel;