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
	database: 'local-eu',
	user: 'local-eu',
	password: 'local-eu'
};

const remoteConnections: DatabaseConnection[] = [
	{
		tag: 'us',
		host: 'localhost',
		database: 'local-us',
		user: 'local-us',
		password: 'local-us'
	},
	{
		tag: 'ap',
		host: 'localhost',
		database: 'local-ap',
		user: 'local-ap',
		password: 'local-ap'
	}
];
