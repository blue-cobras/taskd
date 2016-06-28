import * as path from 'path';
import * as fs from 'fs';
import * as _ from 'lodash';

module.exports = {
    API: {
        JWTSecret: '3E5_^7Z%rF5$%c3jxpQ#uA#O0*k5ltB*zK#yrYFeIScFhyHbtW6h&woQM4j49cVU',
        defaultTokenExp: 15 * 60
    },
    mongo: {
        uri: "mongodb://admin:admin@jello.modulusmongo.net:27017/nabeS8ys",
        settings: {
            server: {
                socketOptions: {
                keepAlive: 1,
                connectTimeoutMS: 30000
                }
            }
        },
    }
};