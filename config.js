require('dotenv').config();
const fs = require('fs');
const path = require('path');
var logs = process.env.LOGS || 'development';

var config = {};
config.port = process.env.PORT || '4999';
config.HUE_TOKEN = process.env.HUE_TOKEN;
config.HUE_BRIDGE = process.env.HUE_BRIDGE;
config.HUE_LIGHTID = process.env.HUE_LIGHTID || 1;

config.log = {};
config.log.dir = process.env.LOG_DIR || 'logs';
if (!fs.existsSync(config.log.dir)) {
    fs.mkdirSync(config.log.dir);
}
config.log.filename = path.join(config.log.dir, 'combined.log');
config.log.level = logs === 'production' ? 'warn' : 'debug';
config.log.dlevel = logs === 'production' ? 'debug' : 'silly';

module.exports = config;