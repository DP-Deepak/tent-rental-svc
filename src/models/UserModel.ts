import * as mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
}, { versionKey: false });

//pre save hook
UserSchema.pre('save', function preSave() {
  this.user_id = this._id.toString();
});
const UserModel = mongoose.model('users', UserSchema);

export default UserModel;