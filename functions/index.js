const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  //get user and add custom claim
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    })
    .then(() => {
      return {
        message: `success ${data.email} made admin`,
      };
    })
    .catch((err) => {
      return err;
    });
});

exports.findUser = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data)
    .then((user) => {
      console.log(user.toJSON());
      return user.toJSON().data;
    })
    .catch((err) => err);
});

// exports.addUser = functions.https.onCall((data, context) => {
//   return admin.auth().getUserByEmail(data).then((user) => {

//   });
// });
