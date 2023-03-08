const {Thought, User} = require('../models');
const {ObjectId} = require('mongoose').Types;

async function getThoughts(req,res,next){
    try{
        //pull all of the thoughts
        const instanceOfAllThoughts = await Thought.find({}).lean();
        //display all of the thoughts
        console.log('Found all thoughts');
        res.status(200).json(instanceOfAllThoughts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

async function getThoughtById(req,res,next){
    try{
        //find the thought if it exists
        const instanceOfThought = await Thought.find({_id: req.params.thoughtId})
        //if the thought does not exists, return 404
        if(!instanceOfThought){
            console.log('No thought with given ID');
            res.status(404).json({statusMessage: "No thought with given ID"});
            return;
        }
        //return data
        console.log(`Found thought by ${instanceOfThought.username}`);
        res.status(200).json(instanceOfThought);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

async function createThought(req,res,next){
    try{
        //check if user exists
        const instanceOfUserData = await User.findOne({_id: req.body.userId}).lean();
        if(!instanceOfUserData){
            res.status(404).json({statusMessage: 'No user with this ID'});
            return;
        }
        //create the thought user req.body
        const instanceOfNewThought = await Thought.create(
            {
                thoughtText: req.body.thoughtText,
                username: req.body.username
            })
        //update user to have the thought
        const instanceOfUpdatedUser = await User.findOneAndUpdate(
            {_id: req.body.userId},
            {$addToSet: {thoughts: instanceOfNewThought._id}},
            {new: true}
        )
        //send response with the created thought
        console.log('Created new Thought')
        res.status(201).json({statusMessage: 'Created new thought', instanceOfNewThought})
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

async function updateThought(req,res,next){
    try{
        //find if thougt exists
        const instanceOfThought = await Thought.findOne({_id: req.params.thoughtId})
        //if doesnt exist, return 404
        if(!instanceOfThought){
            console.log('No though matches ID');
            res.status(404).json({statusMessage: 'No thought matches ID'});
            return;
        }
        //update thought useing req.body
        const instanceOfUpdatedThought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            req.body,
            {new: true}
        );
        //send response with updated thought
        console.log(`Updated thought by ${instanceOfUpdatedThought.username}`);
        res.status(200).json({statusMessage: `Updated thought by ${instanceOfUpdatedThought.username}`,instanceOfUpdatedThought})
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

async function deleteThought(req,res,next){
    try{
        //check if thought exists
        const instanceOfThought = await Thought.findById(req.params.thoughtId);
        //if not, responst with 404
        if(!instanceOfThought){
            console.log('Could not find thought matching ID');
            res.status(404).json({statusMessage: 'Could not find thought matching ID'});
        }
        //delte thought using id
        const instanceOfDeletedThought = await Thought.findOneAndDelete(
            {_id: req.params.thoughtId},
        );
        //update user to remove thought?
        const instanceOfUser = await User.findOneAndUpdate(
            {username: instanceOfThought.username},
            {$pull: {thoughts: instanceOfThought._id}},
            {new: true}
        )
        //respond with deleted thought
        console.log(`Deleted thought by ${instanceOfThought.username}`)
        res.status(200).json({statusMessage: `Deleted thought by ${instanceOfThought.username}`,instanceOfDeletedThought})
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

async function addReaction(req,res,next){
    try{
        //check if thought exists
        const instanceOfThought = await Thought.findById(req.params.thoughtId);
        //respond with 404 if doesnt exist
        if(!instanceOfThought){
            console.log('Could not find thought matching ID');
            res.status(404).json({statusMessage: 'Could not find thought matching ID'});
            return;
        }
        //add reaction to thought
        const instanceOfUpdatedThought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {
                $addToSet: {reactions: req.body}
            },
            {new: true}
        )
        //respond with reaction added
        console.log('Created new reaction')
        res.status(201).json({statusMessage: 'Created new reaction', instanceOfUpdatedThought})
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

async function deleteReaction(req,res,next){
    try{
        //check if thought exists
        const instanceOfThought = await Thought.findById(req.params.thoughtId);
        //return 404 if not
        if(!instanceOfThought){
            console.log('Could not find thought with ID');
            res.status(404).json({statusMessage: 'Could not find thought with ID'});
            return;
        }
        //deleted reaction
        const instanceOfUpdatedThought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.body.reactionId}}},
            {new: true}
        )
        //return updated Thought
        console.log('Deleted reaction');
        res.status(201).json({message: 'Deleted reaction', instanceOfUpdatedThought})
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    getThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
}