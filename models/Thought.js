const {Schema, Types, model} = require('mongoose');
const reactionSchema = require("./Reaction");



const thoughtSchema = new Schema(
    {
        thoughtText:{
            Type: String,
            required: true,
            maxLength: 280,
            minLength: 1
        },
        createdAt: {
            Type: Date,
            default: new Date,
            get: queryDate
        },
        username: {
            Type: String,
            required: true,
            get: queryDate
        },
        reactions: [reactionSchema]
    },
    {
        id: false
    }
)

function queryDate(){
    return this.createdAt.toLocalDateString();
}

thoughtSchema.virtual('reactCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought',thoughtSchema);

module.exports = Thought;