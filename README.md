<div align="center">
  <h1>
    :syringe: <i>covid19-api</i>
  </h1>

  <p>
    Coronavirus RESTful API for current cases by country - extracting data from Worldometers
  </p>

  <p align="center">
  <a href="https://www.codacy.com/manual/danielccunha/covid19-api?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=danielccunha/covid19-api&amp;utm_campaign=Badge_Grade"><img src="https://app.codacy.com/project/badge/Grade/9453e192d7d742f7bc84ac069efefbb9"/></a>
    <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/danielccunha/covid19-api?color=%233a86ff">
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/danielccunha/covid19-api?color=%233a86ff">
    <a href="https://www.linkedin.com/in/daniel-cunha-53053816b/">
      <img alt="Made by Daniel Cunha" src="https://img.shields.io/badge/made%20by-Daniel%20Cunha-%23?color=%233a86ff">
    </a>
    <a href="https://github.com/danielccunha/covid19-api/commits/master">
      <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/danielccunha/covid19-api?color=%233a86ff">
    </a>
    <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?color=%233a86ff">
  </p>
</div>

## :computer: Project

Simple COVID19 API developed with Node.js and TypeScript. It periodically extracts cases from [Worldometers][source] and store it on a MongoDB database. This project is under development, and contains only a [simple documentation](docs/Insomnia.json) in the docs folder.

## :rocket: Technologies

- [TypeScript][typescript]
- [Node.js][nodejs]
- [Express][express]
- [Cheerio][cheerio]
- [MongoDB][mongodb]
- [Docker][docker]
- [Dayjs][dayjs]

## :fire: Usage

To use this project you'll basically have to clone it using [Git][git] and run it using [Docker][docker].

```sh
# Cloning the repository
git clone https://github.com/danielccunha/covid19-api.git
cd covid19-api

# Setting up environment variables (MongoDB credentials basically)
cp .env.example .env
nano .env

# Running it with Docker on http://localhost:3333
docker-compose up -d
```

In case you don't want to use Docker, you'll need to also have installed on your machine [Node.js][nodejs], [Yarn][yarn] and [MongoDB][mongodb]. Also, you'll need to fill all `.env` variables, including commented ones.

```sh
# Cloning the repository
git clone https://github.com/danielccunha/covid19-api.git
cd covid19-api

# Setting up environment variables (you'll need to fill all MongoDB variables)
cp .env.example .env
nano .env

# Installing dependencies
yarn

# Running worker which will extract cases hourly
yarn dev:worker

# Finally, running the serve on port 3000
yarn dev:server
```

## :thinking: Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## :memo: License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

[source]: https://www.worldometers.info/coronavirus/
[git]: https://git-scm.com/
[docker]: https://www.docker.com/
[nodejs]: https://nodejs.org/
[mongodb]: https://www.mongodb.com/
[yarn]: https://yarnpkg.com/
[express]: http://expressjs.com/
[cheerio]: https://cheerio.js.org/
[typescript]: https://www.typescriptlang.org/
[dayjs]: https://github.com/iamkun/dayjs
