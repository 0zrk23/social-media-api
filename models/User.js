const {Schema, Types, model} = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            Type: String,
            unique: true,
            required: [true, 'Username is required'],
            trim: true
        },
        email: {
            Type: String,
            required: [true, 'Email is required'],
            unique: true,
            validation: {
                validator: function (emailString){
                    return /^[\w\.-]+@[\da-z\.-]+\.[a-z\.]{2,6}$/.test(emailString);
                },
                message: emailString => `${emailString} is not a valid email`
            }
        },
        thoughts: [
            {
                Type: Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                Type: Types.ObjectId,
                ref: 'User',
            }
        ]
    },
    {
        id: false
    }
)

userSchema.virtual('friendCount').get(function (){
    return this.friends.length;
})

const User = model('user',userSchema)

module.exports = User;