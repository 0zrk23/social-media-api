const {Thought, User} = require('../models');
const {ObjectId} = require('mongoose').Types;

async function getUsers(req,res,next){
    try {
        const userDocs = await User.find({}).lean();
        // console.log(userDocs)
        res.status(200).json(userDocs);
    } catch (err) {
        res.status(500).json(err);
    }
}

async function getUserById(req,res,next){
    try{
        // console.log(req.params.userId)
        const instanceOfUserData = await User.findOne({_id: req.params.userId}).populate('friends').populate('thoughts').lean();
        // console.log(userData);
        if(!instanceOfUserData){
            res.status(404).json({statusMessage: 'No user with this ID'});
            return;
        }
        res.status(200).json(userData);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

async function createUser(req,res,next){
    try{
        const newUser = await User.create(req.body);
        if(!newUser){
            res.status(400).json({statusMessage: 'Could not create user.\n Select a different username or email and try again'})
        }
        console.log('Created new user')
        res.status(201).json(newUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

async function updateUser(req,res,next){
    try{
        const instanceOfUserData = await User.findOne({_id: req.params.userId}).populate('friends').populate('thoughts').lean();
        if(!instanceOfUserData){
            res.status(404).json({statusMessage: 'No user with this ID'});
            return;
        }
        const instanceOfUpdatedUser = await User.findByIdAndUpdate(req.params.userId,req.body,{new: true});
        if(!instanceOfUpdatedUser){
            console.log('Could not update user')
            res.status(404).json({statusMessage: 'Could not update user.\nCheck if id is correct, or if the properties of the request body are correct'})
        }
        console.log(`Updated the user: ${instanceOfUpdatedUser.username}`);
        res.status(200).json(instanceOfUpdatedUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

async function deleteUser(req,res,next){
    try{
        const instanceOfUserData = await User.findOne({_id: req.params.userId}).populate('friends').populate('thoughts').lean();
        if(!instanceOfUserData){
            res.status(404).json({statusMessage: 'No user with this ID'});
            return;
        }
        //delete the user
        const instanceOfDeletedUser = await User.deleteOne({_id: req.params.userId});
        // console.log(instanceOfDeletedUser)
        //if the user was not deleted, send response
        if(!instanceOfDeletedUser){
            res.status(404).json({statusMessage: 'Could not delete data'})
        }
        await Thought.deleteMany({username: instanceOfUserData.username})
        await Thought.updateMany(
            {},
            {$pull: {
                'reactions': {
                    'username': instanceOfUserData.username
                }
            }},
            {
                multi: true
            }
        )
        //send the deleted user as the json response
        console.log(`Successfully deleted user ${instanceOfUserData.username} along with associations`);
        res.status(200).json({statusMessage: `Successfully deleted user ${instanceOfUserData.username} along with associations`, instanceOfDeletedUser})
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
}

async function addFriend(req,res,next){
    try {
        const instanceOfUserData = await User.findOne({_id: req.params.userId}).populate('friends').populate('thoughts').lean();
        if(!instanceOfUserData){
            res.status(404).json({statusMessage: 'No user with this ID'});
            return;
        }
        const instanceOfFriendData = await User.findOne({_id: req.params.friendId}).populate('friends').populate('thoughts').lean();
        if(!instanceOfFriendData){
            res.status(404).json({statusMessage: 'No user with this ID'});
            return;
        }
        //add friend id
        const instanceOfUpdateUser = await User.updateOne(
            {_id: req.params.userId},
            {$addToSet: {friends: ObjectId(req.params.friendId)}},
            {new: true}
            );
        //respond with success
        console.log('Successfully added friend');
        res.status(201).json({statusMessage: 'Successfully added friend',instanceOfUpdateUser})
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
};