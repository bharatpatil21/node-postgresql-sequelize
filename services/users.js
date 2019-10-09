
let _ = require('lodash');
let Promise = require('bluebird');

let customError = require('../shared/custom-error');
let UserModel = require('../models/Users');

const sequelize = require('../middlewares/dbconnect');

module.exports = {
	getUsersNoSql: getUsersNoSql,
	getUsersSql: getUsersSql,
	getUser: getUser
}

// Sequelize with No SQL Queries 
function getUsersNoSql(cb) {
	return UserModel.findAll()
		.then((dbUsers) => {
			if (!dbUsers) {
				cb(new customError({ 'custom_error': 'notFound', 'message': 'Users not found.' }));
			} else if (dbUsers) {
				return UserModel.count()
					.then((totalCount) => {
						let responses = {
							users: dbUsers,
							total: totalCount
						};
						cb(null, responses);
					});
			}
		})
}

// Sequelize with SQL Queries 
function getUsersSql(cb) {
	return sequelize.query("SELECT * FROM users", { type: sequelize.QueryTypes.SELECT })
		.then(dbUsers => {
			if (!dbUsers) {
				cb(new customError({ 'custom_error': 'notFound', 'message': 'Users not found.' }));
			} else if (dbUsers) {
				return UserModel.count()
					.then((totalCount) => {
						let responses = {
							users: dbUsers,
							total: totalCount
						};
						cb(null, responses);
					});
			}
		})
}

function getUser(userId, cb) {
	return UserModel.findAll({ where: { id: Number(userId) } })
		.then((user) => {
			if (!user) {
				cb(new customError({ 'custom_error': 'notFound', 'message': 'User not found.' }));
			} else if (user) {
				let userObj;
				user.map((user) => {
					userObj = user;
				})
				cb(null, userObj);
			}
		})
}

Promise.promisifyAll(module.exports);


