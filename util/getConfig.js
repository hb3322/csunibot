// Promise based module to get and return the contents of `config.js`
module.exports = () => {
	return new Promise((resolve, reject) => {
		try {
			const config = require("../config");
			resolve(config);
		} catch {
			reject("No config file found.");
		}
	}).catch(err => {
		console.log(err);
	});
};
