import { PlantationTypeModelDomain } from './plantation-type-model.domain';

export interface RuralProducerModelDomain {
  id?: number;
  taxId: string; // CPF ou CNPJ
  name: string; // Nome do produtor
  farmName: string; // Nome da Fazenda
  city: string; // Cidade
  state: string; // Estado
  totalAreaHa: number; // Área total em hectares da fazenda
  arableAreaHa: number; // Área agricultável em hectares
  vegetationAreaHa: number; // Área de vegetação em hectares
  plantationTypes?: PlantationTypeModelDomain[]; // Culturas plantadas (Soja, Milho, Algodão, Café, Cana de Açucar)
}
