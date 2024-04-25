import { Concessionaria } from "../libs/concessionaria";

export interface TarifaGrupoAModel{
    id: number;
    ano: number;
    //concessionaria: Concessionaria[];
    subgrupo: string;
    modalidade: string;
    acessante: string;
    posto: string;
    taTusdKw: number;
    taTusdMw: number;
    taTeMw: number;
    bEcoTusdKw: number;
    bEcoTusdMw: number;
    bEcoTeMw: number;
}