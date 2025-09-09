export class AppointmentConflictException extends Error {
    //cuando hay conflicto de horario
    constructor(
        public readonly appointmentDate: Date
    ){
        super(`El horario ${appointmentDate} ya se encuentra reservado`);
        this.name = 'AppointmentConflictException'
    }
}


export class VaccinationRequiredException extends Error {
    //cuando mascota no está vacunada para cirugía
    constructor(public readonly petName: string){
        super(`La mascota ${petName} no esta vacunada para cirugia`);
        this.name = 'VaccinationRequiredException'
    }
}







