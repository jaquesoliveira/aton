import { TaAplicacaoDto } from "./taAplicacaoDto";

export interface TaAplicacaoResponseDto {

    pontaAzulTarifa: TaAplicacaoDto;
    pontaAzulDemanda: TaAplicacaoDto;
    foraPontaAzulTarifa: TaAplicacaoDto;
    foraPontaAzulDemanda: TaAplicacaoDto;
    pontaVerdeTarifa: TaAplicacaoDto;
    pontaVerdeDemanda: TaAplicacaoDto;
    foraPontaVerdeTarifa: TaAplicacaoDto;
    foraPontaVerdeDemanda: TaAplicacaoDto;
}