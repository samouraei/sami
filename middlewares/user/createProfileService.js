const {message} = require('../../utils/messages_user');


// Function to create or update a user profile
const createProfile = async (  name, email, userAddress, bankAcc,req, res ) => {

  const tokenUser = req.user;;

  if (!tokenUser) {
    return message('error','not_found_cellphone', req, res);
  }

  tokenUser.name = name;
  tokenUser.email = email;
  tokenUser.userAddress = userAddress;
  tokenUser.bankAcc = bankAcc;
  await tokenUser.save();

return tokenUser;
};

module.exports = {
  createProfile
};
