class DBDriver
{
	constructor(){
		if( new.target == DBDriver ) {
		  throw new Error("DBDriver can't be instantiated directly.")
		}
	}
	
	connect(){}
	find(tableName, conditions={}){}
	insert(tableName, data){}
	update(tableName, data){}
	remove(tableName, conditions){}
}

module.exports = DBDriver;