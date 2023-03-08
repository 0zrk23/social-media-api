const {Schema, Types, model} = require('mongoose');
const mongoose = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'Username is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            validate: {
                validator: function (emailString){
                    console.log(/^[\w\.-]+@[\da-z\.-]+\.[a-z\.]{2,6}$/.test(emailString))
                    return /^[\w\.-]+@[\da-z\.-]+\.[a-z\.]{2,6}$/.test(emailString);
                },
                message: emailString => `${emailString} is not a valid email`
            }
        },
        thoughts: [
            {
                type: Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
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

// userSchema.pre('deleteOne', async function(next){
//     console.log(this.username);
    
//     await mongoose.model('Thought')
    
//         .deleteMany(
//             {username: this.username},
//             (err,response) => {
//                 if(err){
//                     console.log(err);
//                 } else {
//                     console.log('Successfully deleted associated Thoughts')
//                 }
//             });
//             await mongoose.model('Thought').updateMany(
//                 {},
//                 {$pull: {
//                     'reactions': {
//                         'username': this.username
//                     }
//                 }},
//                 {
//                     multi: true
//                 },
//             (err,response) => {
//                 if(err){
//                     console.log(err);
//                     next(err);
//                 } else {
//                     console.log('Successfully deleted associated Reactions')
//                     next();
//                 }
//             })
// });

const User = model('User',userSchema)



module.exports = User;