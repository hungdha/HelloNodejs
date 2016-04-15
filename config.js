var DBConfig = function() {
	this.prefix = 'wp_';
	this.host = 'localhost';
	this.port = 3306;
	this.mysql_user  = 'root';
	this.mysql_pass  = '';
	this.database = 'hellonodejs_db';
}
module.exports = new DBConfig();