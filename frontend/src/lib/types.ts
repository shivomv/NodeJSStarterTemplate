export interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  color: string;
  socials: {
    icon: React.ReactNode;
    url: string;
  }[];
}

export interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  color: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  image: string;
  rating: number;
}
