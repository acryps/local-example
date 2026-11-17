import { Database, RunContext } from '@acryps/local';
import { DbContext, Message } from './managed/database';

const database = new Database({
	context: DbContext,
	runContext: new RunContext(),

	local: {
		tag: 'eu',
		host: 'localhost',
		database: 'local-europe',
		user: 'local-europe',
		password: 'local-europe'
	},

	remotes: [
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
	]
});

database.connect().then(async () => {
	const accounts = await database.sets.account.toArray();

	for (let account of accounts) {
		console.debug(account.id, account.username, account.bio);
	}

	// stored in 'us', found through its pointer
	// const americanAccount = await database.sets.account.find('00000000-0000-4000-a000-000000000003');
	// console.debug(americanAccount.bio);
	// americanAccount.bio = 'Hiking and photography';
	// await database.update(americanAccount.id, americanAccount);
	// console.debug(americanAccount.bio);

	// children are found through the pointer of their top level entity
	const chat = await database.sets.chat.find('00000000-0000-4000-c000-000000000003');

	const fromAccount = await database.fetch(chat.fromAccount);
	console.debug(fromAccount.username);
	const toAccount = await database.fetch(chat.toAccount);
	console.debug(toAccount.username);

	const messages = await database.related(chat.messages).toArray();

	for (const message of messages) {
		console.debug(message.content);
	}

	// await database.move(accounts[0], 'us');

	// create local
	// const localMessage = new Message();
	// localMessage.sent = new Date();
	// localMessage.content = 'Test Local';
	// localMessage.chat = await database.sets.chat.first();
	// await database.create(localMessage.chat.id, localMessage);

	// create remote
	// const remoteMessage = new Message();
	// remoteMessage.sent = new Date();
	// remoteMessage.content = 'Test Remote';
	// remoteMessage.chat = chat;
	// await database.create(chat.id, remoteMessage);
});
