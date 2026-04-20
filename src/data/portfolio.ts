export const techStack = [
  {
    category: "Frontend",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "Vue.js", "Tailwind CSS", "Vite"],
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

export const projects = [
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
    title: "Project Three",
    description:
      "A collaborative platform for school project teams — task tracking, file sharing, and real-time updates.",
    status: "Coming Soon",
    tags: ["Vue.js", "Express", "MySQL"],
  },
] as const;

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
