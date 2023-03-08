const {Schema, Types, model} = require('mongoose');
const reactionSchema = require("./Reaction");



const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            maxLength: 280,
            minLength: 1
        },
        createdAt: {
            type: Date,
            default: new Date,
            get: queryDate
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        // toJSON: { getters: true },
        id: false
    }
)

function queryDate(createdAt){
    // console.log(createdAt);
    return 'test';
}

thoughtSchema.virtual('reactCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought',thoughtSchema);

module.exports = Thought;