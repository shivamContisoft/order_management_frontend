// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  defaultauth: 'costplannerbackend',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: ''
  },
  costplanner: {
       host: 'http://localhost:8001/api',
    // host: 'http://20.193.155.6:8001/api',
      // host: 'http://192.168.10.251:8001/api',
    // host: 'http://triangular.contisofttechno.com:8019/api',
    // host: 'https://contisofttechno.com:8019/api',
    // host: 'https://contisofttechno.com:8007/api',
    // host: 'https://contisofttechno.com:8000/api',


    encryptionKey: 'dataencryptionkey-abcd1234efgh5678ijkl9012mnop!qr@s%tuvwx*yZ/',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
