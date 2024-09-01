const Kavenegar = require('kavenegar');
const api = Kavenegar.KavenegarApi({
    apikey: '504D674D64584E76534461327933345A67366E7576366E3831667A30372F5672683235342B794B4651374D3D'
});

const sendVerificationCode = async (user) => {
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code
    const expirationTime = new Date(Date.now() + 120 * 1000); // Set expiration time to 1 minute from now

    user.verificationCode = verificationCode;
                user.verificationCodeExpires = expirationTime;
                user.verificationRequests += 1; // Increment the request count
                user.save()

    // await new Promise((resolve, reject) => {
    //     api.VerifyLookup({
    //         receptor: user.phoneNumber,
    //         token: verificationCode,
    //         template: 'registerverify'
    //     }, (response, status) => {
    //         if (status === 200) {
    //             user.verificationCode = verificationCode;
    //             user.verificationCodeExpires = expirationTime;
    //             user.verificationRequests += 1; // Increment the request count
    //             user.save((err) => {
    //                 if (err) return reject(err);
    //                 resolve(response);
    //             });
    //         } else {
    //             reject(new Error('Failed to send verification code'));
    //         }
    //     });
    // });
};

module.exports = sendVerificationCode;
