import { db } from './firebase';
import { collection, getDocs, doc, getDoc, setDoc, deleteDoc, orderBy, query, limit } from 'firebase/firestore';
import type { PortfolioData, Project, Experience, Education, Certification, Skill, HeroContent, AboutContent } from './types';

// This file now fetches data from Firestore.
// The mock data is kept for seeding/reference purposes.

const mockPortfolioData: PortfolioData = {
  hero: {
    name: 'Nasar Ali',
    title: 'Backend and AI Developer',
    intro:
      'I build robust, scalable backend systems and intelligent AI-powered applications.',
    resumeUrl: '/resume.pdf',
    profileUrl: 'https://picsum.photos/seed/profile/400/400',
    profileHint: 'professional headshot',
  },
  about: {
    bio: `Hello! I'm Nasar, a passionate Backend and AI Developer with a knack for building intelligent, scalable systems. My expertise lies in Python, developing robust APIs, and implementing machine learning models. I thrive on solving complex computational problems and turning data into actionable insights. When I'm not coding, you can find me exploring the latest AI research or contributing to open-source projects.`,
    skills: [
      { id: '1', name: 'Python', category: 'Language' },
      { id: '2', name: 'Node.js', category: 'Tool' },
      { id: '3', name: 'Django', category: 'Framework/Library' },
      { id: '4', name: 'Flask', category: 'Framework/Library' },
      { id: '5', name: 'TensorFlow', category: 'Framework/Library' },
      { id: '6', name: 'PyTorch', category: 'Framework/Library' },
      { id: '7', name: 'Docker', category: 'Tool' },
      { id: '8', name: 'PostgreSQL', category: 'Tool' },
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
        title: 'Project Management Tool',
        summary: 'A collaborative project management tool designed to help teams organize tasks, track progress, and meet deadlines, built with React and Firebase.',
        description: 'This tool provides a Kanban-style board where users can create tasks, assign them to team members, set due dates, and move them through different stages of a workflow. It includes features like real-time updates, comments, and file attachments, all powered by Firebase Firestore and Storage.',
        imageUrl: 'https://picsum.photos/seed/proj3/600/400',
        imageHint: 'modern workspace',
        techStack: ['React', 'Firebase', 'Tailwind CSS', ' Zustand'],
        githubUrl: '#',
        liveUrl: '#',
        order: 3,
    }
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
      company: 'Innovate LLC',
      logoUrl: 'https://picsum.photos/seed/logo2/100/100',
      logoHint: 'tech logo',
      title: 'Frontend Developer',
      startDate: 'Jun 2017',
      endDate: 'Dec 2019',
      description: [
        'Developed and maintained responsive user interfaces for various client websites using React and Redux.',
        'Collaborated with designers and backend developers to deliver high-quality products on schedule.',
        'Improved website performance by optimizing assets and implementing code-splitting, reducing load times by 40%.',
      ],
      order: 2,
    }
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
      name: 'Certified JavaScript Developer',
      provider: 'Certified Professionals',
      url: '#',
      order: 2,
    }
  ],
};


async function getDataFromCollection<T>(collectionName: string): Promise<T[]> {
  const q = query(collection(db, collectionName), orderBy('order'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
}

async function getSingletonDoc<T>(collectionName: string, docId: string): Promise<T> {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data() as T;
    }
    // Return mock data if doc doesn't exist in firestore
    if (collectionName === 'singletons') {
        if(docId === 'hero') return mockPortfolioData.hero as T;
        if(docId === 'about') return mockPortfolioData.about as T;
    }
    throw new Error(`Document ${docId} not found in ${collectionName}`);
}


export async function getPortfolioData(): Promise<PortfolioData> {
  // In a real app, you might fetch a single document that holds references
  // or contains all this data. For simplicity, we fetch each collection.
  try {
    const [
      hero,
      about,
      projects,
      experience,
      education,
      certifications
    ] = await Promise.all([
      getSingletonDoc<HeroContent>('singletons', 'hero'),
      getSingletonDoc<AboutContent>('singletons', 'about'),
      getDataFromCollection<Project>('projects'),
      getDataFromCollection<Experience>('experience'),
      getDataFromCollection<Education>('education'),
      getDataFromCollection<Certification>('certifications'),
    ]);

    return { hero, about, projects, experience, education, certifications };
  } catch(error) {
    console.warn("Using mock data because of a Firebase error. Have you set up your project and security rules correctly?");
    return mockPortfolioData;
  }
}


export async function getProjects(): Promise<Project[]> {
  return getDataFromCollection<Project>('projects');
}

export async function getProjectById(id: string): Promise<Project | null> {
    const docRef = doc(db, 'projects', id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Project : null;
}

export async function upsertProject(projectData: Omit<Project, 'id'> & { id?: string }) {
    const { id, ...data } = projectData;
    const docId = id || doc(collection(db, 'projects')).id;
    await setDoc(doc(db, 'projects', docId), data, { merge: true });
}

export async function deleteProject(id: string) {
    await deleteDoc(doc(db, 'projects', id));
}
