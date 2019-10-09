const Sequelize = require('sequelize');
const db = require('../middlewares/dbconnect');

const Users = db.define('users', {
	name: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING
	},
	createdAt: {
		type: Sequelize.STRING
	},
	updatedAt: {
		type: Sequelize.STRING
	},
});

module.exports = Users;