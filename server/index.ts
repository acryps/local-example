import { LocalDatabase, RemoteDatabase, RunContext } from '@acryps/local';
import { DbContext } from './managed/database';

const localDatabase = new LocalDatabase({
	tag: 'eu',
	host: 'localhost',
	database: 'local-europe',
	user: 'local-europe',
	password: 'local-europe'
}, DbContext, new RunContext());

const remoteDatabases: RemoteDatabase<DbContext>[] = [
	new RemoteDatabase({
		tag: 'us',
		host: 'localhost',
		database: 'local-america',
		user: 'local-america',
		password: 'local-america'
	}, DbContext),
	new RemoteDatabase({
		tag: 'ap',
		host: 'localhost',
		database: 'local-asia',
		user: 'local-asia',
		password: 'local-asia'
	}, DbContext)
];

localDatabase.connect().then(async () => {
	const accounts = await localDatabase.sets.account.toArray();

	console.group(localDatabase.tag);

	for (let account of accounts) {
		console.log(account.id, account.username, account.bio);
	}

	console.groupEnd();
});
