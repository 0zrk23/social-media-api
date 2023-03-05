const {Schema, Types} = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            Type: Types.ObjectId,
            default: () => new ObjectId
        },
        reactionBody: {
            Type: String,
            required: true,
            maxLength: 280
        },
        username: {
            Type: String,
            required: true
        },
        createdAt: {
            Type: Date,
            default: Date.now,
            get: queryDate
        }
    },
    {
        id: false,
    }
)

function queryDate(){
    return this.createdAt.toLocalDateString();
}


module.exports = reactionSchema;