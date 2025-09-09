
## PetCare
Tarea 3 del curso en DMC

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

