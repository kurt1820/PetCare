<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

# PetCare
Tarea 3 del curso en DMC

Aqui dejo los endpoint para realizar las pruebas en POSTMAN


=== OWNERS ==========================================================================
GET
http://localhost:3000/owners/2

GET (ownerId con 5 mascotas registradas)
http://localhost:3000/pets/owner/3

POST
http://localhost:3000/owners
{
    "name": "Ryan Fire",
    "email": "yryan@mail.com",
    "phone": "985744777",
    "address": "Av Larco 154"
}



=== PETS ==========================================================================
GET
http://localhost:3000/pets/1

POST (lanza error que ownerId tiene 5 mascotas)
http://localhost:3000/pets
{
    "name": "Lassie",
    "species": "cat",
    "age": "8",
    "breed": "gato",
    "ownerId": 3,
    "isVaccinated": "false",
    "lastVaccinationDate": null
}


=== APPOINTMENTS ==========================================================================
GET
http://localhost:3000/appointments/3

POST
http://localhost:3000/appointments (lanza error Conflicto de fecha y hora con el mismo veterinario Dra. Salazar)
{
    "petId": 1,
    "veterinarian": "Dra. Salazar",
    "appointmentDate": "2025-09-25T16:00:00.000Z",
    "service": "surgery"
}

POST
http://localhost:3000/appointments (lanza error para Cirugia debe estar vacunada la mascota)
{
    "petId": 2,
    "veterinarian": "Dra. Salazar",
    "appointmentDate": "2025-09-25T15:34:00.000Z",
    "service": "surgery"
}


POST
http://localhost:3000/appointments (lanza error conflicto de horario)
{
    "petId": 4,
    "veterinarian": "Dra. Salazar",
    "appointmentDate": "2025-09-25T16:00:00.000Z",
    "service": "surgery"
}
