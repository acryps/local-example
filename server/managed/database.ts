import { Entity, DbSet, DbClient, DatabaseContext, RunContext, QueryUUID, QueryProxy, QueryString, QueryJSON, QueryTimeStamp, QueryNumber, QueryTime, QueryDate, QueryBoolean, QueryBuffer, QueryEnum, ForeignReference, PrimaryReference, View, ViewSet } from 'vlquery';

export class AccountQueryProxy extends QueryProxy {
	get bio(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get username(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Account extends Entity<AccountQueryProxy> {
	pictures: PrimaryReference<Picture, PictureQueryProxy>;
		bio: string;
	declare id: string;
	username: string;

	$$meta = {
		source: "account",
		columns: {
			bio: { type: "text", name: "bio" },
			id: { type: "uuid", name: "id" },
			username: { type: "text", name: "username" }
		},
		get set(): DbSet<Account, AccountQueryProxy> {
			return new DbSet<Account, AccountQueryProxy>(Account, null);
		}
	};

	constructor() {
		super();

		this.pictures = new PrimaryReference<Picture, PictureQueryProxy>(this, "accountId", Picture);
	}
}
			
export class Account_PointerQueryProxy extends QueryProxy {
	get target(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Account_Pointer extends Entity<Account_PointerQueryProxy> {
	fromChats: PrimaryReference<Chat, ChatQueryProxy>;
		toChats: PrimaryReference<Chat, ChatQueryProxy>;
		declare id: string;
	target: string;

	$$meta = {
		source: "account__pointer",
		columns: {
			id: { type: "uuid", name: "id" },
			target: { type: "text", name: "target" }
		},
		get set(): DbSet<Account_Pointer, Account_PointerQueryProxy> {
			return new DbSet<Account_Pointer, Account_PointerQueryProxy>(Account_Pointer, null);
		}
	};

	constructor() {
		super();

		this.fromChats = new PrimaryReference<Chat, ChatQueryProxy>(this, "fromAccountId", Chat);
		this.toChats = new PrimaryReference<Chat, ChatQueryProxy>(this, "toAccountId", Chat);
	}
}
			
export class ChatQueryProxy extends QueryProxy {
	get fromAccount(): Partial<Account_PointerQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get toAccount(): Partial<Account_PointerQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get created(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get fromAccountId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get toAccountId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Chat extends Entity<ChatQueryProxy> {
	messages: PrimaryReference<Message, MessageQueryProxy>;
		get fromAccount(): Partial<ForeignReference<Account_Pointer>> { return this.$fromAccount; }
	get toAccount(): Partial<ForeignReference<Account_Pointer>> { return this.$toAccount; }
	created: Date;
	fromAccountId: string;
	declare id: string;
	toAccountId: string;

	$$meta = {
		source: "chat",
		columns: {
			created: { type: "timestamp", name: "created" },
			fromAccountId: { type: "uuid", name: "from_account_id" },
			id: { type: "uuid", name: "id" },
			toAccountId: { type: "uuid", name: "to_account_id" }
		},
		get set(): DbSet<Chat, ChatQueryProxy> {
			return new DbSet<Chat, ChatQueryProxy>(Chat, null);
		}
	};

	constructor() {
		super();

		this.messages = new PrimaryReference<Message, MessageQueryProxy>(this, "chatId", Message);
		this.$fromAccount = new ForeignReference<Account_Pointer>(this, "fromAccountId", Account_Pointer);
	this.$toAccount = new ForeignReference<Account_Pointer>(this, "toAccountId", Account_Pointer);
	}

	private $fromAccount: ForeignReference<Account_Pointer>;

	set fromAccount(value: Partial<ForeignReference<Account_Pointer>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.fromAccountId = value.id as string;
		} else {
			this.fromAccountId = null;
		}
	}

	private $toAccount: ForeignReference<Account_Pointer>;

	set toAccount(value: Partial<ForeignReference<Account_Pointer>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.toAccountId = value.id as string;
		} else {
			this.toAccountId = null;
		}
	}

	
}
			
export class Chat_PointerQueryProxy extends QueryProxy {
	get target(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Chat_Pointer extends Entity<Chat_PointerQueryProxy> {
	declare id: string;
	target: string;

	$$meta = {
		source: "chat__pointer",
		columns: {
			id: { type: "uuid", name: "id" },
			target: { type: "text", name: "target" }
		},
		get set(): DbSet<Chat_Pointer, Chat_PointerQueryProxy> {
			return new DbSet<Chat_Pointer, Chat_PointerQueryProxy>(Chat_Pointer, null);
		}
	};
}
			
export class MessageQueryProxy extends QueryProxy {
	get chat(): Partial<ChatQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get chatId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get content(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get sent(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Message extends Entity<MessageQueryProxy> {
	get chat(): Partial<ForeignReference<Chat>> { return this.$chat; }
	chatId: string;
	content: string;
	declare id: string;
	sent: Date;

	$$meta = {
		source: "message",
		columns: {
			chatId: { type: "uuid", name: "chat_id" },
			content: { type: "text", name: "content" },
			id: { type: "uuid", name: "id" },
			sent: { type: "timestamp", name: "sent" }
		},
		get set(): DbSet<Message, MessageQueryProxy> {
			return new DbSet<Message, MessageQueryProxy>(Message, null);
		}
	};

	constructor() {
		super();

		this.$chat = new ForeignReference<Chat>(this, "chatId", Chat);
	}

	private $chat: ForeignReference<Chat>;

	set chat(value: Partial<ForeignReference<Chat>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.chatId = value.id as string;
		} else {
			this.chatId = null;
		}
	}

	
}
			
export class PictureQueryProxy extends QueryProxy {
	get account(): Partial<AccountQueryProxy> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get accountId(): Partial<QueryUUID> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get data(): Partial<QueryBuffer> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get mimeType(): Partial<QueryString> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
	get uploaded(): Partial<QueryTimeStamp> { throw new Error("Invalid use of QueryModels. QueryModels cannot be used during runtime"); }
}

export class Picture extends Entity<PictureQueryProxy> {
	get account(): Partial<ForeignReference<Account>> { return this.$account; }
	accountId: string;
	data: Buffer;
	declare id: string;
	mimeType: string;
	uploaded: Date;

	$$meta = {
		source: "picture",
		columns: {
			accountId: { type: "uuid", name: "account_id" },
			data: { type: "bytea", name: "data" },
			id: { type: "uuid", name: "id" },
			mimeType: { type: "text", name: "mime_type" },
			uploaded: { type: "timestamp", name: "uploaded" }
		},
		get set(): DbSet<Picture, PictureQueryProxy> {
			return new DbSet<Picture, PictureQueryProxy>(Picture, null);
		}
	};

	constructor() {
		super();

		this.$account = new ForeignReference<Account>(this, "accountId", Account);
	}

	private $account: ForeignReference<Account>;

	set account(value: Partial<ForeignReference<Account>>) {
		if (value) {
			if (!value.id) { throw new Error("Invalid null id. Save the referenced model prior to creating a reference to it."); }

			this.accountId = value.id as string;
		} else {
			this.accountId = null;
		}
	}

	
}
			

export class DbContext extends DatabaseContext {
	account = new DbSet<Account, AccountQueryProxy>(Account, this);
	account_Pointer = new DbSet<Account_Pointer, Account_PointerQueryProxy>(Account_Pointer, this);
	chat = new DbSet<Chat, ChatQueryProxy>(Chat, this);
	chat_Pointer = new DbSet<Chat_Pointer, Chat_PointerQueryProxy>(Chat_Pointer, this);
	message = new DbSet<Message, MessageQueryProxy>(Message, this);
	picture = new DbSet<Picture, PictureQueryProxy>(Picture, this);

	constructor(client: DbClient, runContext: RunContext) {
		super(client, runContext);
	}
};