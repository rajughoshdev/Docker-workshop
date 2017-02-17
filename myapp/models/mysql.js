var DBDriver = require("./db_driver");

class Mysql extends DBDriver
{
	constructor(url){
		super();
		this.url = url;
		this.mysql = require('mysql');
		this.assert = require('assert');
	}
	
	connect(){
		return new Promise( (resolve, reject) => {
			this.mysql.createPool(this.url).getConnection((err, db) => {
				if(err) reject("error");
				this.assert.equal(null, err);
				resolve(db);
				console.log("Connected correctly to mysql server.");
			});
		});
	}
	
	find(tableName, conditions={}){
		return new Promise( (resolve, reject) => {
			this.connect().then( (db) => {
				let sql = "SELECT * FROM ?? WHERE 1 ";
				if(conditions){
					for (let key in conditions) {
						if (conditions.hasOwnProperty(key)) {
							sql+=" AND "+db.escapeId(key)+"="+db.escape(conditions[key]);
						}
					}
				}
				
				db.query(sql, [tableName], (err, rows) => {
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
				db.query('INSERT INTO '+db.escapeId(tableName)+' SET ?', data, (err, results) => {
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
				data = JSON.parse(JSON.stringify(data));
				let sql = "UPDATE "+db.escapeId(tableName)+" SET ";
				if(data){
					let i = 0;
					let n = Object.keys(data).length;
					for (let key in data) {
						i++;
						if (data.hasOwnProperty(key)) {
							sql+=db.escapeId(key)+"="+db.escape(data[key]);
							if(i<n) sql+=",";
						}
					}
				}
				
				sql+= " WHERE _id="+db.escape(id);
				
				db.query(sql, (err, results) => {
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
				let sql = "DELETE FROM "+db.escapeId(tableName)+" WHERE 1 ";
				if(conditions){
					for (let key in conditions) {
						if (conditions.hasOwnProperty(key)) {
							sql+=" AND "+db.escapeId(key)+"="+db.escape(conditions[key]);
						}
					}
				}
				
				db.query(sql, (err, rows) => {
					if (err) return reject("error");
					resolve(rows);
				});
			}, (e) => {
				throw new Error("Error: " + e);
			});
		});
	}
}

module.exports = Mysql;