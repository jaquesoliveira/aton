export interface PropostaDto {
    id: number;
    nome: string;
    tipoPessoa: string;
    cpfCnpj: number;
    dataCadastro: Date;
    dataValidade: Date;
}