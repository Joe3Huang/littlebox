# littlebox
1. Models

```
//User
{
	id: uuid,
	email: string,
	first_name: string,
	last_name: string,
	password: hashstring
	calendar: [Fragment],
	cryptobox: [Secret]
}

//Fragment
{
	id: uuid,
	title: string,
	date: date,
	share_users:[user_id],
	is_encrypted: boolean,
	vi: string
}

//Secret
{
	id: uuid,
	domain: string,
	passphrase: string
	vi: string
}

```
## crypto box

### my calendar

## Slide
[LittleSecretBox](https://slides.com/joe3joe3/deck-5eaeed)
