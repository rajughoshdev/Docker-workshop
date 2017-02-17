var models = require('../models'),
	tableName = 'users';
		
class Users
{
	static getAllUsers(){
		return new Promise( (resolve, reject) => {
			models.find(tableName).then( (users) => {
				resolve(users);
			}, (e) => {
				reject("error");
			});
		});	
	}
	
	static getUserById(id){
		return new Promise( (resolve, reject) => {
			models.find(tableName, {'_id' : id}).then( (user) => {
				resolve(user);
			}, (e) => {
				reject("error");
			});
		});
	}
	
	static getUserByUserName(username){
		return new Promise( (resolve, reject) => {
			models.find(tableName, {'username' : username}).then( (user) => {
				resolve(user);
			}, (e) => {
				reject("error");
			});
		});
	}
	
	static getUserByUsernameAndPassword(username, password){
		return new Promise( (resolve, reject) => {
			models.find(tableName, {'username' : username, 'password' : password}).then( (user) => {
				resolve(user);
			}, (e) => {
				reject("error");
			});
		});
	}
	
	static insert(data){
		return new Promise( (resolve, reject) => {
			models.insert(tableName, data).then( (results) => {
				resolve(results);
			}, (e) => {
				reject("error");
			});
		});
	}
	
	static update(data){
		return new Promise( (resolve, reject) => {
			models.update(tableName, data).then( (results) => {
				resolve(results);
			}, (e) => {
				reject("error");
			});
		});
	}
	
	static remove(id){
		return new Promise( (resolve, reject) => {
			models.remove(tableName, {'_id' : id}).then( (results) => {
				resolve(results);
			}, (e) => {
				reject("error");
			});
		});
	}
}

module.exports = Users;