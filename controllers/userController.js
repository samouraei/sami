const AppError = require('../utils/appError');
const {createProfile}  = require('../middlewares/user/createProfileService');
const { verifyCode, userActivation } = require('../services/userVerificationService');
const {login} = require('../services/loginService');
const catchAsync = require('../utils/catchAsync');
const {message} = require('../utils/messages_user');


exports.login = catchAsync(async (req, res, next) => {

    // return message('error','auth_failed',req,res)
    // return message('success','register_step_one',req,res)
     const phoneNumber = req.body.phoneNumber;

     const user = await login(phoneNumber, res, next);
     verificationCode = user.verificationCode;
    //  console.log(user);

    return message('custom_message',{  msg: "کد اعتبارسنجی ارسال شد", verificationCode, status: 200 },req,res)


    // return message('success','ready_register',req,res)
});

exports.verification = catchAsync(async (req, res, next) => {
    const { verificationCode, phoneNumber } = req.body;
    // console.log('Controller called with:', { verificationCode, phoneNumber });

    const verifiedUser = await verifyCode(phoneNumber ,verificationCode,req,res, next)

    const result = await userActivation(verifiedUser,req,res, next);

        // console.log('result :', result)

    const token = result.token

    return message('custom_message',{  msg: "اعتبارسنجی باموفقیت انجام شد", token, status: 200 },req,res)

    
    // return message('success','register_steptwo',req,res)
    
    });

    exports.createProfile = catchAsync(async (req, res, next) => {
        const { name, email, userAddress, bankAcc } = req.body;
        
        const newUserProfile = await createProfile( name, email, userAddress, bankAcc,req, res );
    
        
        return message('custom_message',{  msg: "پروفایل به روز رسانی شد", newUserProfile, status: 200 },req,res)

    });
    