/* jshint node: true */

module.exports = function(environment) {
    var ENV = {
        modulePrefix: 'osfpages-admin',
        environment: environment,
        rootURL: '/',
        apiBaseUrl: 'https://limitless-atoll-95289.herokuapp.com',
        locationType: 'auto',
        osfAPIUrl: 'https://api.osf.io',
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            }
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        }

    };

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'prod') {
         ENV.locationType = 'hash';
         ENV.rootURL = '/osfpages/';

    }

    if (process.env.BACKEND === 'stage') {
        ENV.osfHostUrl = 'https://api.osf.io';
    }

    ENV['simple-auth'] = {
        crossOriginWhitelist: ['https://limitless-atoll-95289.herokuapp.com/homes', 'localhost:4200'],
    };


    return ENV;
};
