CREATE TABLE account (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	username TEXT NOT NULL,
	bio TEXT
);

CREATE TABLE picture (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	uploaded TIMESTAMP WITHOUT TIME ZONE NOT NULL,
	data bytea NOT NULL,
	mime_type text NOT NULL,

	account_id UUID CONSTRAINT account__pictures REFERENCES account (id) NOT NULL,
);

CREATE TABLE chat (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	created TIMESTAMP WITHOUT TIME ZONE NOT NULL,

	from_account_id UUID CONSTRAINT from_account__chats REFERENCES account (id) NOT NULL,
	to_account_id UUID CONSTRAINT from_account__chats REFERENCES account (id) NOT NULL
);

CREATE TABLE message (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

	sent TIMESTAMP WITHOUT TIME ZONE NOT NULL,
	content TEXT NOT NULL,

	chat_id UUID CONSTRAINT chat__messages REFERENCES chat (id) NOT NULL
);
