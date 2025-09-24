const googlePassport = require('./../utils/googlePassport');
const showGoogleAuthPage = googlePassport.authenticate('google', {
    scope: ['profile', 'email']
});

const redirectUserAfterAuth = googlePassport.authenticate('google', {
    failureRedirect: '/',
    failureMessage: false,
    session: false,
})

module.exports = {
    showGoogleAuthPage,
    redirectUserAfterAuth
};