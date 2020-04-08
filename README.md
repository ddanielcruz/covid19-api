# Coronavirus API

Coronavirus cases by country, extracted from [Worldometers](https://www.worldometers.info/coronavirus/). Currently there's only a [simple documentation](https://documenter.getpostman.com/view/3882585/SzYewbGg?version=latest) published on Postman, and a demo API hosted on [Heroku](https://covid19-cases-api.herokuapp.com/).

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) for running the project
- [MongoDB](https://www.mongodb.com/download-center) cluster for storing extracted cases

### Installing

1. Clone the repository

```sh
git clone https://github.com/danielccunha/covid19-api.git
cd covid19-api
```

2. Install app dependencies

```sh
npm install # In case you use NPM
yarn        # in case you use Yarn
```

3. Copy `.env.example` file and add your MongoDB URl

```sh
cp .env.example .env
nano .env
```

Finally, run the project using `npm start` or `yarn start` and access `http://localhost:3000/places`. It should return an empty list because you didn't extract any data yet.

### Usage

Last but not least, run `npm run extract` or `yarn extract` to start extracting cases from [Worldometers](https://www.worldometers.info/coronavirus/) and storing it in your database. Whenever you want to fetch updated data just run this script.

After that, accessing `http://localhost:3000/places` again, it should return a list containing all the places around the world which is facing COVID-19, including countries, territories and conveyances.

## Built With

- [Node.js](https://nodejs.org/)
- [Express](http://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Authors

- **Daniel Cunha** - [danielccunha](https://github.com/danielccunha)

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
