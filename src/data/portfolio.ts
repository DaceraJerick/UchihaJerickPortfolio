export const techStack = [
  {
    category: "Frontend",
    items: ["JavaScript", "TypeScript", "React", "React Native", "Next.js", "Vue.js", "Tailwind CSS", "Vite"],
  },
  {
    category: "Mobile",
    items: ["React Native", "Expo"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Supabase", "MySQL", "Express.js", "PHP"],
  },
  {
    category: "AI & Machine Learning",
    items: ["OpenAI", "Anthropic"],
  },
  {
    category: "Developer Tools",
    items: ["Git", "GitHub", "GitLab", "PyCharm", "Discord"],
  },
] as const;

export const certifications = [
  {
    title: "HTML Fundamentals",
    issuer: "CodeCred",
    url: "https://www.codecred.dev/verify/e86d3a21-078f-445b-8cf6-3b4bb8d30139",
    code: "e86d3a21-078f-445b-8cf6-3b4bb8d30139",
  },
  {
    title: "Claude 101",
    issuer: "Skilljar",
    url: "https://verify.skilljar.com/c/fisc5ew97jvz",
    code: "fisc5ew97jvz",
  },
  {
    title: "Claude Code in Action",
    issuer: "Skilljar",
    url: "https://verify.skilljar.com/c/b2yin7enbfkw",
    code: "b2yin7enbfkw",
  },
  {
    title: "AI Fluency: Framework & Foundations",
    issuer: "Skilljar",
    url: "https://verify.skilljar.com/c/gn66udk5cutn",
    code: "gn66udk5cutn",
  },
] as const;

export interface Project {
  title: string;
  description: string;
  status: string;
  tags: readonly string[];
  /** Live site link. */
  url?: string;
  /** Short line shown in the detail view, e.g. what kind of project it is. */
  type?: string;
  defense?: string;
  features?: readonly string[];
  /** Download link for an Android build. */
  buildUrl?: string;
  buildNote?: string;
  /** Optional screenshot: put the file in public/projects/ and set its file name here. */
  image?: string;
}

export const projects: readonly Project[] = [
  {
    title: "BoardEase",
    description:
      "A live full-stack web app for streamlined boarding house and rental management — built and shipped end-to-end.",
    status: "Live",
    tags: ["React", "Supabase", "Tailwind"],
    url: "https://board-ease-fawn.vercel.app/",
  },
  {
    title: "EduTrack",
    description:
      "An education tracking platform that helps students and teachers monitor academic progress and stay organized.",
    status: "Live",
    tags: ["React", "Vercel", "Tailwind"],
    url: "https://edutrack-bay.vercel.app/",
  },
  {
    title: "MySocorro",
    description:
      "An AI-powered tourism, ferry and community app for the Municipality of Socorro, Surigao del Norte (Bucas Grande Island), with an ISLA chatbot and a desktop admin app for LGU staff.",
    status: "Capstone",
    type: "Mobile app + desktop admin app · BSIT capstone, NEMSU Cantilan Campus",
    defense: "October 29, 2026",
    features: [
      "Tourist and resident accounts with email OTP",
      "Tourism content and ferry information",
      "ISLA, an AI chatbot",
      "Business and ferry owners are residents with extra screens",
      "Chat with businesses",
      "Map on business pages",
      "Home search",
      "Desktop app for the System Administrator and LGU staff (Municipal Tourism Office, MDRRMO, Office of the Municipal Mayor), with permissions enforced in the database",
    ],
    tags: [
      "React Native",
      "Expo",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Row Level Security",
      "Edge Functions",
      "Electron",
      "Vite",
      "React",
      "PayMongo (test mode)",
      "Brevo SMTP",
      "Groq (ISLA chatbot)",
      "EAS Update",
    ],
    buildUrl:
      "https://expo.dev/accounts/uchihajerick/projects/MySocorro/builds/061d6780-0207-42be-989b-1dde61019060",
    buildNote: "Build link may expire.",
    // image: "mysocorro-home.png", // add a real screenshot to public/projects/ and uncomment
  },
];

export const recommendations = [
  {
    content: "Jerick is the one we rely on when it comes to coding. He helps the team understand the system and makes sure our project works properly. He’s easy to work with and very responsible.",
    author: "Classmate",
  },
  {
    content: "During our project, Jerick handled most of the development and made sure everything was functional. He listens to suggestions and improves the system step by step.",
    author: "Project Teammate",
  },
  {
    content: "A dedicated student developer who builds functional and user-friendly systems.",
    author: "Student Developer",
  },
  {
    content: "Jerick is always willing to learn new technologies and apply them in his projects. His passion for development is clear in his work.",
    author: "Classmate",
  },
] as const;
