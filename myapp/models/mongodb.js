var DBDriver = require("./db_driver");

class MongoDB extends DBDriver
{
	constructor(url){
		super();
		this.url = url;
		this.mongoClient = require('mongodb').MongoClient;
		this.assert = require('assert');
	}
	
	connect(){
		return new Promise( (resolve, reject) => {
			this.mongoClient.connect(this.url, (err, db) => {
				if(err) reject("error");
				this.assert.equal(null, err);
				resolve(db);
				console.log("Connected correctly to mongodb server.");
			});
		});
	}
	
	find(tableName, conditions={}){
		return new Promise( (resolve, reject) => {
			this.connect().then( (db) => {
				db.collection(tableName).find(conditions).toArray( (err, rows) => {
					if (err) return reject("error");
					resolve(rows);
				});
			}, (e) => {
				throw new Error("Error: " + e);
			});
		});
	}
	
	insert(tableName, data){
		return new Promise( (resolve, reject) => {
			this.connect().then( (db) => {
				db.collection(tableName).insert(data, (err, results) => {
					if (err) return reject("error");
					resolve(results);
				});
			}, (e) => {
				throw new Error("Error: " + e);
			});
		});
	}
	
	update(tableName, data){
		return new Promise( (resolve, reject) => {
			let id = parseInt(data._id);
			delete data._id;
			this.connect().then( (db) => {
				db.collection(tableName).update({ "_id" : id}, { $set: data }, (err, results) => {
					if (err) return reject("error");
					resolve(results);
				});
			}, (e) => {
				throw new Error("Error: " + e);
			});
		});
	}
	
	remove(tableName, conditions){
		return new Promise( (resolve, reject) => {
			this.connect().then( (db) => {
				db.collection(tableName).deleteOne(conditions, (err, results) => {
					if (err) return reject("error");
					resolve(results);
				});
			}, (e) => {
				throw new Error("Error: " + e);
			});
		});
	}
}

module.exports = MongoDB;