
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
    return `${lorum[genRandomIndex(lorum)]}`
  }

  const generateRandomUsername = () => {
    let username = '';
    for (let i = 0; i < 3; i++){
        username += `${userPart[genRandomIndex(userPart)]}`
    }
    return username;
  }

  const generateThought = (words) => {
    let post = '';
    for (let i = 0; i < words; i++) {
      post += ` ${getRandomWord()}`;
    }
    return post;
  };

  module.exports = {generateRandomUsername, generateThought}