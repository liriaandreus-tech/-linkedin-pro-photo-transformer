
export enum ProfessionalStyle {
  CORPORATE = 'Corporate (Terno e Gravata)',
  EXECUTIVE = 'Executive (Terno Completo de Luxo)',
  CASUAL_BUSINESS = 'Business Casual (Blazer/Camisa)',
  CASUAL_POLO = 'Casual (Camiseta Polo)',
  TECH_STARTUP = 'Tech Startup (Moderno/Minimalista)',
  CREATIVE = 'Criativo (Estiloso/Artístico)',
  MEDICAL = 'Médico (Jaleco/Profissional de Saúde)',
  ACADEMIC = 'Acadêmico (Professor/Pesquisador)',
  LEGAL = 'Jurídico (Advogado/Tribunal)',
  SPORT_FITNESS = 'Esportivo (Treinador/Atleta)',
  REAL_ESTATE = 'Corretor (Elegante/Acessível)',
  CHEF = 'Chef (Dólmã Profissional)',
  FINANCE = 'Financeiro (Terno Conservador)',
  ARCHITECT = 'Arquiteto (Clean/Estiloso)',
  ENTREPRENEUR = 'Empreendedor (Casual Moderno)'
}

export enum BackgroundType {
  OFFICE = 'Escritório Moderno',
  CONFERENCE_ROOM = 'Sala de Reuniões',
  MINIMALIST = 'Fundo Neutro/Sólido',
  STUDIO_MINIMAL = 'Estúdio Minimalista',
  OUTDOOR_CITY = 'Cidade/Urbano',
  GARDEN_NATURE = 'Jardim/Natureza',
  LIBRARY = 'Biblioteca/Acadêmico',
  STUDIO = 'Estúdio Fotográfico',
  LUXURY_HOTEL = 'Lobby de Hotel de Luxo',
  INDUSTRIAL_LOFT = 'Loft Industrial/Moderno',
  COWORKING = 'Espaço de Coworking',
  ART_GALLERY = 'Galeria de Arte',
  TECH_LAB = 'Laboratório de Inovação',
  SKYLINE = 'Vista de Prédios (Skyline)',
  HOME_OFFICE = 'Home Office Organizado'
}

export interface TransformationConfig {
  style: ProfessionalStyle;
  background: BackgroundType;
  enhanceLighting: boolean;
  cleanSkin: boolean;
  userPrompt: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  style: string;
  timestamp: number;
}

export interface ProcessedImage {
  originalUrl: string;
  processedUrl: string | null;
  timestamp: number;
}
