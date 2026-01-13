
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  longDescription?: string;
  features?: string[];
  methodology?: string;
  outcomes?: string[];
}

export interface Client {
  id: number;
  name: string;
  url: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  imageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  bio?: string;
  avatar?: string;
  phone?: string;
  location?: string;
  website?: string;
  jobTitle?: string;
  skills?: string[];
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  challenge: string;
  solution: string;
  technologies: string[];
}

export interface Opportunity {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  salary?: string;
  postedDate: string;
  status: 'Open' | 'Closed' | 'Interviewing';
  description: string;
  requirements: string[];
}

export const types = true;
