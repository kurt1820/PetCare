export class Appointment {
    id: number;
    petId: number;
    veterinarian: string;
    appointmentDate: Date;
    service: 'consultation' | 'vaccination' | 'surgery' | 'grooming';
    notes?: string;
    status: 'scheduled' | 'completed' | 'cancelled';
    createdAt: Date;
}
