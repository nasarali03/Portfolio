export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  order: number;
}

export interface Experience {
  id: string;
  company: string;
  logoUrl: string;
  logoHint: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string[];
  order: number;
}

export interface Education {
  id:string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  description: string;
  order: number;
}

export interface Certification {
  id: string;
  name: string;
  provider: string;
  url: string;
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Language' | 'Framework/Library' | 'Tool' | 'Platform';
}

export interface HeroContent {
  name: string;
  title: string;
  intro: string;
  resumeUrl: string;
  profileUrl: string;
  profileHint: string;
}

export interface AboutContent {
  bio: string;
  skills: Skill[];
  profileUrl: string;
  profileHint: string;
}

export interface PortfolioData {
  hero: HeroContent;
  about: AboutContent;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
}
