export interface SocialLinks {
	github: string;
	linkedin: string;
}

export interface Personal {
	name: string;
	nickname: string;
	phonetic: string;
	imageAlt: string;
}

export interface HeroButton {
	text: string;
	socialKey: keyof SocialLinks;
	icon: string;
	type: string;
}

export interface Hero {
	buttons: HeroButton[];
}

export interface Experience {
	id: number;
	title: string;
	company: string;
	period: string;
	location: string;
	description: string;
	current: boolean;
}

export interface Project {
	id: number;
	title: string;
	description: string;
	image: string;
	imageAlt: string;
	technologies: string[];
	liveUrl: string;
	githubUrl: string;
}

export interface Language {
	id: number;
	name: string;
	proficiency: string;
	level: number;
}

export interface Education {
	degree: string;
	institution: string;
	year: string;
	icon: string;
}

export interface Certification {
	id: number;
	title: string;
	issuer: string;
	date: string;
	icon: string;
	iconBgColor: string;
	iconColor: string;
	link?: string;
}

export interface FooterSocial {
	name: string;
	socialKey: keyof SocialLinks;
	icon: string;
}

export interface Footer {
	copyright: string;
	social: FooterSocial[];
}

export interface ContentData {
	social_links: SocialLinks;
	personal: Personal;
	hero: Hero;
	experience: Experience[];
	projects: Project[];
	languages: Language[];
	education: Education;
	certifications: Certification[];
	footer: Footer;
}
