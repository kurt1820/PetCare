import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { AppointmentConflictException, VaccinationRequiredException } from "src/exceptions/appointment.exceptions";

@Catch(AppointmentConflictException)
export class AppointmentConflictFilter implements ExceptionFilter{
    catch(exception: AppointmentConflictException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const status = HttpStatus.CONFLICT;

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: 'Conflicto de horario',
            message: exception.message,
            details: {
                appointmentDate: exception.appointmentDate,
                suggestion: 'Intenta registrar Appointment en otro horario'
            }
        });
    }
}


@Catch(VaccinationRequiredException)
export class VaccinationRequiredFilter implements ExceptionFilter {
    catch(exception: VaccinationRequiredException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        
        const status = HttpStatus.BAD_REQUEST;

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: 'Mascota no está vacunada para cirugía',
            message: exception.message,
            details: {
                ownerName: exception.petName,
                suggestion: 'Antes de pasar por cirugia debe vacunar a la mascota'
            }
        });



    }

}

















