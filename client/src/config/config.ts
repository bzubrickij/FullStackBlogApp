const { REACT_APP_FIREBASE_API_KEY } = process.env;
const { REACT_APP_FIREBASE_AUTH_DOMAIN } = process.env;
const { REACT_APP_FIREBASE_PROJECT_ID } = process.env;
const { REACT_APP_FIREBASE_STORAGE_BUCKET } = process.env;
const { REACT_APP_FIREBASE_MESSAGING_SENDER_ID } = process.env;
const { REACT_APP_FIREBASE_APP_ID } = process.env;

if (REACT_APP_FIREBASE_API_KEY === undefined
  || REACT_APP_FIREBASE_AUTH_DOMAIN === undefined
  || REACT_APP_FIREBASE_PROJECT_ID === undefined
  || REACT_APP_FIREBASE_STORAGE_BUCKET === undefined
  || REACT_APP_FIREBASE_MESSAGING_SENDER_ID === undefined
  || REACT_APP_FIREBASE_APP_ID === undefined) throw new Error('Please declare variables in /.env.local');

const config = {
  firebase: {
    apiKey: `${REACT_APP_FIREBASE_API_KEY}`,
    authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: REACT_APP_FIREBASE_APP_ID,
  },
  server: {
    url: 'http://localhost:1337',
  },
};

export default config;
