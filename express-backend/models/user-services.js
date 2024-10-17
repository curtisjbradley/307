import mongoose  from 'mongoose';
import userModel from './user.js';

mongoose.set('debug', true);

mongoose.connect('mongodb://localhost:27017/users', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.catch((err) => console.log(err));

async function getUsers(name,job) {
    let promise;
    if (name === undefined && job === undefined) {
        console.log("Searching")
        promise = await userModel.find()
    } else if (name && !job) {
        promise = await findUserByName(name)
    } else if (!name && job) {
        promise = await findUserByJob(job)
    }
    return promise

}

function findUserById(id) {
    return userModel.findById(id)
}

function addUser(user) {
    const userToAdd = new userModel(user);
    const promise = userToAdd.save();
    return promise;
}

function findUserByName(name) {
    return userModel.find({name: name})
}

function findUserByJob(job) {
    return userModel.find( {job: job})
}

function removeUser(id){
    return userModel.deleteOne({_id: id})
}

export default {
    findUserByName,
    getUsers,
    findUserById,
    addUser,
    findUserByJob,
    removeUser
}