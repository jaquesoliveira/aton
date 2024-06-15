import { Contato } from "./contato.model";
import { Endereco } from "./endereco.model";

export interface Cliente{
    id: number;
    nome: string;
    cpfCnpj: number;
    rg: number;
	endereco: Endereco;
	contatos: Contato[];
    tipo: string;
}