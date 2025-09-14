import type { PortfolioData } from './types';

// This file mocks a database connection.
let portfolioData: PortfolioData = {
  hero: {
    name: 'Alex Doe',
    title: 'Senior Frontend Developer',
    intro:
      'I build beautiful, responsive, and performant web applications with a focus on user experience.',
    resumeUrl: '/resume.pdf',
    profileUrl: 'https://picsum.photos/seed/profile/400/400',
    profileHint: 'professional headshot',
  },
  about: {
    bio: `Hello! I'm Alex, a passionate frontend developer with over 8 years of experience creating dynamic and user-friendly web interfaces. My expertise lies in the React ecosystem, particularly with Next.js and TypeScript. I thrive on solving complex problems and turning ideas into high-quality, scalable code. When I'm not coding, you can find me exploring new hiking trails or contributing to open-source projects.`,
    skills: [
      { id: '1', name: 'TypeScript', category: 'Language' },
      { id: '2', name: 'React', category: 'Framework/Library' },
      { id: '3', name: 'Next.js', category: 'Framework/Library' },
      { id: '4', name: 'Tailwind CSS', category: 'Framework/Library' },
      { id: '5', name: 'Firebase', category: 'Platform' },
      { id: '6', name: 'Node.js', category: 'Tool' },
      { id: '7', name: 'GraphQL', category: 'Tool' },
      { id: '8', name: 'Figma', category: 'Tool' },
    ],
    profileUrl: 'https://picsum.photos/seed/profile2/400/400',
    profileHint: 'professional developer',
  },
  projects: [
    {
      id: 'p1',
      title: 'E-Commerce Platform',
      summary:
        'A full-stack e-commerce solution with a modern, clean interface, built using Next.js and Firebase. Features product management, user authentication, and a Stripe-integrated checkout process.',
      description:
        'Developed a feature-rich e-commerce platform from scratch. The application uses Next.js for server-side rendering and static site generation, ensuring optimal performance and SEO. Firebase is utilized for the backend, including Firestore for data storage, Authentication for user management, and Storage for product images. The checkout process is powered by Stripe, providing a secure and seamless payment experience.',
      imageUrl: 'https://picsum.photos/seed/proj1/600/400',
      imageHint: 'tech abstract',
      techStack: ['Next.js', 'Firebase', 'Stripe', 'Tailwind CSS'],
      githubUrl: '#',
      liveUrl: '#',
      order: 1,
    },
    {
      id: 'p2',
      title: 'Real-time Chat Application',
      summary:
        'A responsive real-time chat app built with React and Firestore. Supports multiple chat rooms, user presence indicators, and Google authentication for easy sign-in.',
      description:
        'This project is a real-time messaging application that allows users to communicate instantly. It leverages Firestore\'s real-time capabilities to push updates to clients, ensuring messages are delivered without delay. User authentication is handled via Firebase Authentication with Google Sign-In. The UI is built with React and styled with Tailwind CSS, providing a modern and responsive user experience across all devices.',
      imageUrl: 'https://picsum.photos/seed/proj2/600/400',
      imageHint: 'code screen',
      techStack: ['React', 'Firebase', 'TypeScript'],
      githubUrl: '#',
      liveUrl: '#',
      order: 2,
    },
    {
      id: 'p3',
      title: 'Portfolio CMS Dashboard',
      summary:
        'A secure admin dashboard to dynamically manage portfolio content. Features full CRUD operations, image uploads to Firebase Storage, and role-based access control.',
      description:
        'The admin dashboard for this very portfolio! Built with Next.js App Router and Server Actions, it provides a CMS-like experience for managing all portfolio content. Users can create, update, and delete projects, experiences, and more. Image uploads are handled efficiently via Firebase Storage. This project demonstrates proficiency in building secure, data-driven applications with modern Next.js features.',
      imageUrl: 'https://picsum.photos/seed/proj3/600/400',
      imageHint: 'modern workspace',
      techStack: ['Next.js', 'Server Actions', 'Firebase', 'shadcn/ui'],
      githubUrl: '#',
      order: 3,
    },
  ],
  experience: [
    {
      id: 'e1',
      company: 'Tech Solutions Inc.',
      logoUrl: 'https://picsum.photos/seed/logo1/100/100',
      logoHint: 'minimalist logo',
      title: 'Senior Frontend Developer',
      startDate: 'Jan 2020',
      endDate: 'Present',
      description: [
        'Led the development of a new design system using React and Storybook, increasing team productivity by 30%.',
        'Architected and implemented a scalable frontend for a high-traffic SaaS application using Next.js.',
        'Mentored junior developers and conducted code reviews to maintain high code quality standards.',
      ],
      order: 1,
    },
    {
      id: 'e2',
      company: 'Web Innovators LLC',
      logoUrl: 'https://picsum.photos/seed/logo2/100/100',
      logoHint: 'tech logo',
      title: 'Frontend Developer',
      startDate: 'Jun 2017',
      endDate: 'Dec 2019',
      description: [
        'Developed and maintained responsive user interfaces for various client websites using React and Redux.',
        'Collaborated with designers and backend developers to deliver pixel-perfect and functional web applications.',
        'Improved website performance by optimizing assets and implementing code-splitting, reducing load times by 40%.',
      ],
      order: 2,
    },
  ],
  education: [
    {
      id: 'ed1',
      degree: 'B.S. in Computer Science',
      institution: 'State University',
      startDate: '2013',
      endDate: '2017',
      description:
        'Graduated with honors. Focused on web development, algorithms, and human-computer interaction.',
      order: 1,
    },
  ],
  certifications: [
    {
      id: 'c1',
      name: 'Professional Cloud Developer',
      provider: 'Google Cloud',
      url: '#',
      order: 1,
    },
    {
      id: 'c2',
      name: 'Next.js Conf Certificate',
      provider: 'Vercel',
      url: '#',
      order: 2,
    },
  ],
};

// Simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getPortfolioData() {
  await delay(100); 
  return portfolioData;
}

export async function getProjects() {
  await delay(100);
  return [...portfolioData.projects].sort((a, b) => a.order - b.order);
}

export async function getProjectById(id: string) {
    await delay(100);
    return portfolioData.projects.find(p => p.id === id) || null;
}

export async function upsertProject(projectData: Omit<PortfolioData['projects'][0], 'id'> & { id?: string }) {
  await delay(200);
  if (projectData.id) {
    // Update
    const index = portfolioData.projects.findIndex(p => p.id === projectData.id);
    if (index !== -1) {
      portfolioData.projects[index] = { ...portfolioData.projects[index], ...projectData };
      return portfolioData.projects[index];
    }
  } else {
    // Create
    const newProject = { ...projectData, id: `p${Date.now()}` };
    portfolioData.projects.push(newProject);
    return newProject;
  }
  return null;
}

export async function deleteProject(id: string) {
    await delay(200);
    const initialLength = portfolioData.projects.length;
    portfolioData.projects = portfolioData.projects.filter(p => p.id !== id);
    return portfolioData.projects.length < initialLength;
}
