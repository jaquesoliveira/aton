import { HttpErrorResponse } from "@angular/common/http"
import { throwError } from "rxjs"

export const httpErrorResponse = (error: HttpErrorResponse) => {
    return (error) => {
        let errorMessage = ''

        if(error.error instanceof ErrorEvent) {
        errorMessage = error.error.message
        } else {
        errorMessage = "Deu ruim"
        }
        return throwError(errorMessage);
    }
}