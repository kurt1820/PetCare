
export class PetLimitExceededException extends Error {
    //cuando propietario excede 5 mascostas en appointnment
    constructor(
        public readonly ownerName: string
    )
    {
        super(`Sr.(a) ${ownerName} solo puede registrar hasta 5 appointnment`);
        this.name = 'PetLimitExceededException';
    }
}
