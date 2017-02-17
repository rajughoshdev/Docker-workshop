var path = require("path"),
	env	= process.env.NODE_ENV || "development",
	config = require(path.join(__dirname, '..', 'config', 'config.json'))[env],
	defaultDbDriver = require('./'+config.defaultDbDriver);
	
module.exports = new defaultDbDriver(config[config.defaultDbDriver]);