/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.listAllUsers = functions.https.onCall(async (data, context) => {
  // List batch of users, 1000 at a time.
  const listAllUsers = nextPageToken => {
    return admin
      .auth()
      .listUsers(1000, nextPageToken)
      .then(listUsersResult => {
        const users = listUsersResult.users.map(userRecord =>
          userRecord.toJSON(),
        );
        return users;
      })
      .catch(error => {
        throw new functions.https.HttpsError(
          'unknown',
          'Error listing users',
          error,
        );
      });
  };

  return listAllUsers();
});
