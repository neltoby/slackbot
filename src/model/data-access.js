const { User } = require('./user');
const { UserResponse } = require('./response');

module.exports = () => {
  const saveResponse = async function({
    response, id, username, name, team_id 
   }) 
   {
      const user = await User.findOne({ id }).exec();
      console.log(user, 'line 10')
      if (!user) {
        const doc = new User();
        doc.id = id;
        doc.name = name;
        doc.username = username;
        doc.team_id = team_id;
        await doc.save();
      }
      const doc = new UserResponse();
      doc.response = response;
      doc.user = id;
      await doc.save()
      return doc
    }

  const findUserData = async function ({ user }) {
    const response = await UserResponse.find({ user }).exec();
    return response
  }

  const findAllUserData = async function() {
    const allResponse = await UserResponse.find({})
    return allResponse
  }

  return Object.freeze({
    saveResponse,
    findUserData,
    findAllUserData
  })
};
