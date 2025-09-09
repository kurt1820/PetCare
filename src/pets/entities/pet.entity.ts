export class Pet {
    id: number;
    name: string;
    species: 'dog' | 'cat' | 'bird' | 'other';
    age: number; // en meses
    breed: string;
    ownerId: number;
    isVaccinated: boolean;
    lastVaccinationDate?: Date;
    createdAt: Date;
}
