const userPart = [
    "mon",
    "g0d",
    "succ",
    "trash",
    "69",
    "420",
    "cap",
    "bussin",
    "dorito",
    "cat",
    "dog",
    "potato",
    "panda",
    "sad",
    "sic",
    "fat",
    "cow",
    "ice",
    "frosty",
    "bandit",
    "13",
    "79",
    "aim",
    "pretty",
    "sparkle",
    "fancy",
    "loud",
    "ninja",
    "best",
    "pog",
    "bussin",
    "mighty",
    "sparrow",
    "guardian",
    "knight",
    "champion",
    "expert",
    "master",
    "sage",
    "13",
    "392",
    "2",
    "quan",
    "ch",
    "carl",
    "billy",
    "ham",

]

const possibleReactions = [
    'I disagree!',
    'Your thought succs',
    'This was awesome',
    'Thank you for the great content',
    "I can tell if this you're just a sad human being, or want attention",
    'Love your thougts!! Please make more!!!',
    'This is so lovely!',
    "I can tell you love this topic a ton!",
    "Agreed man!",
    "Straight cap",
    "This thought straight bussin frfr no cap"
];

const lorum = [
    'lorem',
    'imsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'curabitur',
    'vel',
    'hendrerit',
    'libero',
    'eleifend',
    'blandit',
    'nunc',
    'ornare',
    'odio',
    'ut',
    'orci',
    'gravida',
    'imperdiet',
    'nullam',
    'purus',
    'lacinia',
    'a',
    'pretium',
    'quis',
  ];

  const genRandomIndex = (arr) => Math.floor(Math.random() * arr.length);
  
  const getRandomWord = () => `${lorum[genRandomIndex(lorum)]}`;

  const getRandomReaction = () => {
    return `${possibleReactions[genRandomIndex(possibleReactions)]}`
  }

  const generateRandomUsername = () => {
    let username = '';
    for (let i = 0; i < 3; i++){
        if(i>0){
            username += `_`;
        }
        username += `${userPart[genRandomIndex(userPart)]}`
    }
    return username;
  }

  const generateThought = (words) => {
    let thought = '';
    for (let i = 0; i < words; i++) {
      thought += ` ${getRandomWord()}`;
    }
    return thought;
  };

  const generateUsers = () => {

    const users = [{
        username: 'tester1',
        email: 'tester1@mail.com'
      },
      {
        username: 'tester2',
        email: 'tester2@mail.com'
      }
    ];

    for(let i = 0; i < 9; i++){
        const username = generateRandomUsername();
        const email =  `${username}@mail.com`;
        users.push({
          username, email
        })
    }
    return users;
  }

  function getThoughts(){
    const thoughts = []
    for(let i = 0; i < (Math.floor(Math.random()*4)+1);i++) {
      thoughts.push(generateThought(Math.floor(Math.random()*15)+15));
    }
    return thoughts
  }

  function getReactions(users){
    const reactions = [];
    for(let i = 0; i < Math.floor(Math.random() *4) + 1; i++) {
      const randomUserIndex = Math.floor(Math.random()*users.length)
      reactions.push({username: users[randomUserIndex].username, reactionBody: getRandomReaction()});
    }
    return reactions;
  }

  module.exports = {generateUsers, getReactions, getThoughts}