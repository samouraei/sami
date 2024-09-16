const Country = require('../../models/countryModel');
const Visa = require('../../models/visaModel');
const VisaOrder = require('../../models/visaOrderModel');
const {message,msgList} = require('../../utils/messages_user');
const AppError = require('../../utils/appError'); // Adjust path as needed

// Function to create or update a user profile
const visaOrdering = async (req,res,next) => {
    const visaId = req.body.visaId;
    
  const visa = await Visa.findById(visaId);

  if (!visa) {
    // return message('error','error_13', req, res);
    return next(new AppError(msgList.error.wrong_input_visa.msg, msgList.error.wrong_input_visa.status));

  }

  const visaOrder = new VisaOrder({
    name: req.body.name,
    mobile: req.body.mobile,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    paymentKind: req.body.paymentKind,
    birthday: req.body.birthday ,
    passportExpirationDate: req.body.passportExpirationDate,
    createdAt: Date.now(),
    refVisa: visaId
  });

  await visaOrder.save();

    // Add the visa ID to the country's visas array and update the country
    //country.visas.push(visa._id);
    //await country.save(); // Save the updated country with the new visa ID
 
  // console.log(visa);
  return visaOrder;
};

module.exports = {
  visaOrdering
};
