import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { PetLimitExceededException } from "src/exceptions/pet.exceptions";
import { Request, Response } from "express";


@Catch(PetLimitExceededException)
export class PetLimitExceededFilter implements ExceptionFilter {
    catch(exception: PetLimitExceededException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        
        const status = HttpStatus.FORBIDDEN;

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            error: 'Propietario excede 5 mascotas',
            message: exception.message,
            details: {
                ownerName: exception.ownerName,
                suggestion: 'Intenta eliminar el registro de una mascota a su nombre'
            }
        });
        
    }
}
