// type from local
type DatabaseConnection = {
	tag: string;
	host: string;
	database: string;
	user: string;
	password: string;
}

// demo
const localConnection: DatabaseConnection = {
	tag: 'eu',
	host: 'localhost',
	database: 'local-europe',
	user: 'local-europe',
	password: 'local-europe'
};

const remoteConnections: DatabaseConnection[] = [
	{
		tag: 'us',
		host: 'localhost',
		database: 'local-america',
		user: 'local-america',
		password: 'local-america'
	},
	{
		tag: 'ap',
		host: 'localhost',
		database: 'local-asia',
		user: 'local-asia',
		password: 'local-asia'
	}
];
