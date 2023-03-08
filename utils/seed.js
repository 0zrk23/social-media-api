const {getReactions, generateUsers, getThoughts} = require('./data');
const connection = require('../config/connection');
// const {generateUsers} = require('./data')
const {User,Thought} = require('../models');
// const cTable = require('console.table')

connection.on('error', (err) => console.log(err));

// console.log(generateRandomUsername());
connection.once('open', async () => {
  
  console.log('Deleting documents...')
  await User.deleteMany({});
  
  await Thought.deleteMany({});

  const users = generateUsers();
  
  
  console.log('Seeding Users...')
  await User.collection.insertMany(users)
  // await Thought.collection.insertMany(thou)
  
  console.log('Seeding Thoughts...')
  for(let i = 0; i < users.length; i++){
    await createThoughtDoc(users,i);
    await addFriend(users[i],i,users);
  }

  const userDocs = await User.find({}).lean();
  const thoughtDocs = await Thought.find({}).lean();
  
  // console.table(userDocs);
  // console.table(thoughtDocs);
  
  console.info('Seeding complete! 🌱');
  process.exit(0);
});

async function addFriend(user, index, users){
  // console.log(user);
  const newFriends = getFriendIds(user,index,users)
  // console.log(newFriends);
  const filter = {_id: user._id};
  const update = {$addToSet: {friends: newFriends},}
  const userData = await User.findOneAndUpdate(filter,update,{new: true})
  // console.log(userData);
}

function getFriendIds(user, index, users){
  const friends = [];
  let friendIndex = index + 3
  for(let i = 0; i < (Math.floor(Math.random()*4)+1);i++) {
    if(friendIndex > users.length - 1){
      friendIndex -= users.length - 1
    }
    friends.push(users[friendIndex]._id);
    friendIndex += 3;
  }
  // console.log(friends);
  return friends;
}

async function createThoughtDoc(users,userIndex){
  // const thoughtIds = [];
  const thoughtData = getThoughts();
  // console.log(newThoughts);
  // const newThought = Thought.create({thoughtText:})
  for(let i in thoughtData){
    const reactions = getReactions(users);
    // console.log(reactions);
    const newThought = await Thought.create({
      thoughtText: thoughtData[i],
      username: users[userIndex].username,
      reactions: reactions
    })
    const instantceOfUpdatedUser = await User.findOneAndUpdate(
      {_id: users[userIndex]._id},
      {$addToSet: {thoughts: newThought._id}},
      {new: true}
    )
    // console.log(instantceOfUpdatedUser);
  }
}

const tableData = (err, data) => {
  console.table(data);
}
