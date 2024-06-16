import { Cliente } from "./cliente.model";
import { InversorDto } from "./inversor-dto";
import { ModuloFotovoltaico } from "./modulo-fotovoltaico.model";

export interface Proposta {
    cliente: Cliente
    moduloFotovoltaico: ModuloFotovoltaico
    inversor: InversorDto
    consumoMedioMensal: number
    consumoAnual: number
    custoMedioMensal: number
    custoAnual: number
    producaoMediaMensal: number
    producaoAnual: number
    kwhDia: number
    kwpNominal: number
    kwpReal: number
    numModulos: number
}