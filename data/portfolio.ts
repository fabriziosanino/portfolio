export type Branch = "main" | "vineyard" | "projects" | "education";

export interface CommitDetail {
  company?: string;
  role?: string;
  location?: string;
  period?: string;
  description: string;
  skills?: string[];
  link?: string;
  grade?: string;
  thesis?: string;
}

export interface Commit {
  id: string;
  hash: string;
  message: string;
  branch: Branch;
  date: string;
  tag?: string;
  detail: CommitDetail;
}

export const COMMITS: Commit[] = [
  {
    id: "head",
    hash: "a1b2c3d",
    message: "Backend Engineer @ Connect Reply",
    branch: "main",
    date: "Sep 2024 – Present",
    tag: "HEAD",
    detail: {
      company: "Connect Reply",
      role: "Backend Engineer & Cloud Architect",
      location: "Turin, Italy",
      period: "Sep 2024 – Present",
      description:
        "Designing and managing cloud architecture and backend APIs for Yamaha MyRide and MyGLO on AWS, and OCS on Azure. Ensuring performance, scalability, and security across platforms while implementing new features in cross-functional teams.",
      skills: ["C#", ".NET", "Spring Boot", "Python", "AWS", "Azure", "REST APIs"],
    },
  },
  {
    id: "az900",
    hash: "f3e2d1c",
    message: "cert: Azure AZ-900 + AWS Cloud Quest",
    branch: "main",
    date: "2025",
    tag: "certified",
    detail: {
      role: "Certifications",
      period: "2022 – 2025",
      description:
        "Microsoft Certified: Azure Fundamentals (AZ-900) · AWS Cloud Quest: Cloud Practitioner · CCNA R&S: Introduction to Networks · CCNA R&S: Connecting Networks · IELTS Certificate B2 (Score 6.5)",
      skills: ["Azure", "AWS", "Networking", "English B2"],
    },
  },
  {
    id: "divine",
    hash: "b2c3d4e",
    message: "feat(ml): DIVINE — AI grapevine disease detection",
    branch: "projects",
    date: "Mar – May 2024",
    tag: "thesis",
    detail: {
      company: "Gruppo Pro Logic + Politecnico di Torino",
      role: "Research Intern & Thesis Author",
      location: "Turin",
      period: "Mar – May 2024",
      description:
        "Master's thesis project: DIagnosis of grapeVIne diseases through NEural networks and deep learning. Built a computer vision pipeline to detect vineyard diseases from leaf images using deep learning.",
      skills: ["Python", "OpenCV", "PyTorch", "Machine Learning", "Computer Vision"],
      link: "https://github.com/fabriziosanino/grape_leaves_detection",
    },
  },
  {
    id: "master",
    hash: "c3d4e5f",
    message: "grad: Master's Degree 110/110 cum Laude",
    branch: "education",
    date: "Jul 2024",
    tag: "v2.0",
    detail: {
      company: "Politecnico di Torino",
      role: "MSc Computer Engineering — Cloud Computing",
      location: "Turin",
      period: "Sep 2022 – Jul 2024",
      description:
        "Master's degree in Computer Engineering with specialisation in Cloud Computing. Graduated with 110/110 cum Laude. Focus areas: cloud applications, containers, network engineering, ISO26262, Rust, neural networks, Mathlab/Simulink.",
      grade: "110/110 cum Laude",
      thesis: "DIVINE: DIagnosis of grapeVIne diseases through NEural networks and deep learning",
      skills: ["Rust", "Cloud Applications", "Containers", "Neural Networks", "ISO26262"],
    },
  },
  {
    id: "rust",
    hash: "d4e5f6a",
    message: "feat(rust): ONNX interpreter with multi-threading",
    branch: "projects",
    date: "Sep 2023 – Jan 2024",
    detail: {
      role: "Developer",
      period: "Sep 2023 – Jan 2024",
      description:
        "ONNX interpreter built in Rust: model parser, serializer, multi-threaded inference engine, and Python bindings. Multi-threading accelerates inference by parallelizing computations for independent graph nodes.",
      skills: ["Rust", "ONNX", "Multi-threading", "Python bindings", "Protocol Buffers"],
      link: "https://github.com/fabriziosanino/RUST-Interpreter-ONNX",
    },
  },
  {
    id: "sheshield",
    hash: "e5f6a7b",
    message: "feat: SheShield — women's safety platform",
    branch: "projects",
    date: "Sep 2023 – Feb 2024",
    detail: {
      role: "Founder & Developer",
      period: "Sep 2023 – Feb 2024",
      description:
        "Safety platform ensuring the well-being of young women navigating public spaces alone. Features safety communities where users can report concerns, share information, and receive real-time support. Addresses secure transportation, emotional comfort, and risk awareness.",
      skills: ["JavaScript", "React", "Node.js", "Real-time systems"],
      link: "https://github.com/fabriziosanino/SheShield",
    },
  },
  {
    id: "arm",
    hash: "f6a7b8c",
    message: "feat(asm): ARM assembler library for LPC1768",
    branch: "projects",
    date: "Sep 2022 – Jan 2023",
    detail: {
      role: "Developer",
      period: "Sep 2022 – Jan 2023",
      description:
        "Library of ARM assembler and C code for the Computer Architectures exam at Politecnico di Torino. Designed for the Landtiger NXP LPC1768 microcontroller, developed with Keil uVision IDE.",
      skills: ["ARM Assembly", "C", "Embedded Systems", "Keil uVision"],
      link: "https://github.com/fabriziosanino/ARM_assembler",
    },
  },
  {
    id: "bachelor",
    hash: "g7b8c9d",
    message: "grad: Bachelor's Degree 110/110 cum Laude",
    branch: "education",
    date: "Jul 2022",
    tag: "v1.0",
    detail: {
      company: "Università degli Studi di Torino",
      role: "BSc Computer Science and Technology",
      location: "Turin",
      period: "Sep 2019 – Jul 2022",
      description:
        "Bachelor's degree in Computer Science graduated with 110/110 cum Laude. Covered OOP, LAN/WAN, network protocols, Java, JavaScript, Python, C, and relational databases.",
      grade: "110/110 cum Laude",
      thesis: "Time Filtering: analysis and improvement of search functionality on Amazon and e-commerce websites",
      skills: ["Java", "Python", "JavaScript", "C", "SQL", "Network Protocols"],
    },
  },
  {
    id: "cambieri",
    hash: "h8c9d0e",
    message: "feat(web): Web Developer @ cambieri.it",
    branch: "main",
    date: "Jul – Aug 2019",
    detail: {
      company: "cambieri.it",
      role: "Web Developer",
      location: "Bra (CN)",
      period: "Jul – Aug 2019",
      description:
        "Developed web applications in a professional contract role. Built with modern JavaScript stack.",
      skills: ["NodeJS", "React", "Ionic"],
    },
  },
  {
    id: "highschool",
    hash: "i9d0e1f",
    message: "grad: IIS G.Vallauri — Computer Industrial Tech 96/100",
    branch: "education",
    date: "Jul 2019",
    tag: "v0.1",
    detail: {
      company: "IIS G.Vallauri",
      role: "Qualification in Computer Industrial Technology",
      location: "Fossano (CN)",
      period: "Sep 2014 – Jul 2019",
      description:
        "Five-year qualification in computer industrial technology. Foundation in software development, networking, and embedded systems programming.",
      grade: "96/100",
      skills: ["C", "C#", "Python", "NodeJS", "HTML", "Software Development"],
    },
  },
];

export const VINEYARD_COMMIT: Commit = {
  id: "vineyard",
  hash: "v1n3y4rd",
  message: "life: Co-Owner @ Sanino Bruno Vini, Barolo",
  branch: "vineyard",
  date: "Jan 2018 – Present",
  tag: "ongoing",
  detail: {
    company: "Sanino Bruno Vini",
    role: "Co-Owner, Tractor Driver, Vineyard Worker",
    location: "Vergne Barolo (CN)",
    period: "Jan 2018 – Present",
    description:
      "Responsible for vineyard and winery operations in the Barolo wine region. Activities include tractor driving, viticulture, guided tours for visitors, invoicing, and workflow coordination. This branch runs in parallel — it never merges.",
    skills: ["Team Management", "Budgeting", "Guided Tours", "Invoicing", "Financial Reporting"],
  },
};

export const SKILLS = {
  "Cloud & Infrastructure": ["AWS", "Azure", "Docker", "Containers", "Cloud Architecture"],
  "Backend Development": ["C#", ".NET", "Spring Boot", "Java", "REST APIs", "Python"],
  "Systems & Low-level": ["Rust", "C", "ARM Assembly", "Embedded Systems"],
  "AI / ML": ["PyTorch", "OpenCV", "Computer Vision", "Deep Learning", "Neural Networks"],
  "Frontend & Tools": ["TypeScript", "React", "Node.js", "Vue", "Git"],
  "Networking": ["CCNA", "LAN/WAN", "Network Protocols", "ISO26262"],
};

export const CONTACT = {
  email: "fabrizio.sanino@outlook.it",
  phone: "+39 334 236 2257",
  github: "https://github.com/fabriziosanino",
  linkedin: "https://www.linkedin.com/in/fabrizio-sanino-334307143",
  location: "Narzole (CN), Piedmont, Italy",
};
