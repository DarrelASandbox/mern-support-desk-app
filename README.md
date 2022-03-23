## About The Project

- Learn modern React by building 4 projects including a Firebase 9 app and a full stack MERN app
- Tutorial for Support Desk App ([Heroku Demo](https://support-desk-app-22-mar-2022.herokuapp.com/))
- [Originial Repo: Support Desk](https://github.com/bradtraversy/support-desk)
- [Brad Traversy](https://github.com/bradtraversy)
- [Will Adamas](https://github.com/bushblade)

&nbsp;

## Installation

1. Install backend dependencies.

```sh
npm install
```

2. Install client dependencies

```sh
cd frontend
npm install
```

3. Remove '.template' extension from .env.template.

&nbsp;

## Notes

- Refer to frontend folder README.md for notes when creating frontend folder.

### Notes taken from Error & Exception Handling comment section:

> The first worrying thing I see is that you have included cors middleware, why is that?

> Using the cors middleware without configuring it will be setting access control headers to any client that makes requests to your server/api meaning it will share it's resources with any app out there. If you were making a public API then you may want to do this but not in this app. In development we will be using a proxy provided by create-react-app to forward requests from our client, so we won't have CORS issues in development. In production then both API and client are served from the same origin, so no CORS issues there as we won't be breaking the browsers SOP.

> I often see students install the cors middleware as they feel it is 'fixing' something, but in reality it doesn't truly fix the original issue and introduces bigger issues they are unaware of.
