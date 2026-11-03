import { DbClient, RunContext } from 'vlquery';
import { DbContext } from './managed/database';

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

(async () => {
	for (let connection of [localConnection, ...remoteConnections]) {
		const client = new DbClient({
			host: connection.host,
			database: connection.database,
			user: connection.user,
			password: connection.password
		});

		await client.connect();

		const database = new DbContext(client, new RunContext());
		const accounts = await database.account.toArray();

		console.group(connection.tag);

		for (let account of accounts) {
			console.log(account.id, account.username, account.bio);
		}

		console.groupEnd();
	}
})();
