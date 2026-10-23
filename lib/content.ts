// Everything the site says about Haroon. Facts come from his resume and the profile
// behind ask.haroonriasat.com (resume-chatbot/src/profile.ts); keep the two in sync and
// never add a claim here that isn't in his resume.

export const site = {
  name: "Haroon Riasat",
  url: "https://haroonriasat.com",
  title: "Haroon Riasat · Full-Stack & AI Software Engineer",
  description:
    "Full-stack and AI software engineer in Turku, Finland. 4.5+ years shipping web, mobile and AI products: RAG assistants, transcription pipelines and document extraction used by real customers.",
  email: "haroonriasatali@gmail.com",
  linkedin: "https://linkedin.com/in/haroon-riasat-82659b1a7",
  github: "https://github.com/HaroonRiasat1",
  medium: "https://medium.com/@haroonriasatali",
  askUrl: "https://ask.haroonriasat.com",
  cv: "/Haroon_Riasat_Resume.pdf",
  location: "Turku, Finland",
};

export const rotating = ["Full-Stack Applications", "AI-Powered Products", "SaaS Platforms", "Intelligent Automation"];

export const stats = [
  { value: "4.5+", label: "years shipping production software" },
  { value: "60+", label: "products delivered at Exitech" },
  { value: "20+", label: "production apps at QUEST Lab" },
  { value: "6", label: "engineers led" },
];

export interface Role {
  company: string;
  url?: string;
  role: string;
  dates: string;
  place: string;
  summary: string;
  highlights: string[];
  tech: string[];
  current?: boolean;
}

export const experience: Role[] = [
  {
    company: "Amplon",
    url: "https://amplon.io",
    role: "Software Engineer",
    dates: "Sep 2024 – Present",
    place: "Turku, Finland",
    current: true,
    summary:
      "Builds Amplon's Hoshin Kanri strategic planning platform across the stack, from Laravel APIs to the React frontend and the AI features inside the product.",
    highlights: [
      "Designed and shipped a RAG assistant (Python/Flask, OpenAI API, AWS) that ingests product manuals and YouTube tutorial transcripts and answers users' questions inside the product, owning it from the retrieval pipeline to the React integration.",
      "Builds backend features and APIs in PHP/Laravel and the matching React frontend work, so features ship end to end in a production SaaS product.",
      "Integrated Contentful with the React frontend so release notes and in-app content update without code deploys.",
      "Works daily with product, design and backend colleagues on performance and reliability, turning user feedback into scoped releases.",
    ],
    tech: ["React", "PHP / Laravel", "Python / Flask", "OpenAI API", "RAG", "AWS", "Contentful"],
  },
  {
    company: "Exitech",
    role: "Co-Founder & Software Engineer",
    dates: "Nov 2023 – Present",
    place: "Remote",
    current: true,
    summary:
      "Co-founded a product engineering consultancy that has delivered 60+ products for international clients across SaaS, e-commerce, AI and automation.",
    highlights: [
      "Owns architecture, implementation, cloud deployment and operations end to end, and the technical trade-offs on cost, speed and reliability with client stakeholders.",
      "Ships containerised AWS deployments with Docker, Kubernetes and CI/CD pipelines.",
      "Led the Exitech AI Internship Program: in three months, final-year students built 12 fully functional AI web products, backend to frontend.",
    ],
    tech: ["React", "Next.js", "Node.js", "TypeScript", "Python", "PostgreSQL", "AWS", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    company: "QUEST Lab",
    role: "Software Engineer",
    dates: "Feb 2023 – Jun 2024",
    place: "Islamabad, Pakistan",
    summary:
      "Promoted early to lead a team of 6 engineers delivering and maintaining 20+ production AI-based full-stack web and iOS applications.",
    highlights: [
      "Owned client-facing products from requirements and architecture through testing and deployment, including client communication and project management.",
      "Fine-tuned LLMs on client data and integrated them into the products.",
      "Built and ran products on AWS, with web scraping pipelines feeding the apps and their AI features, and native iOS apps alongside the web products.",
    ],
    tech: ["LLM fine-tuning", "Full-stack web", "iOS / Swift", "AWS", "Web scraping"],
  },
];

export const earlier = [
  { role: "Software Engineering Intern", company: "MRS Technologies", dates: "Jul – Sep 2022", text: "MERN carpooling MVP on AWS Amplify, EC2 and S3. Proposed the idea, designed the domain model and helped design ride matching." },
  { role: "Software Engineering Intern", company: "QUEST Lab", dates: "Aug – Oct 2021", text: "Internal audit system with React, PostgreSQL and Laravel." },
];

export interface Project {
  slug: string;
  name: string;
  category: string;
  kind: "Client work" | "Side project" | "Personal project" | "Team project";
  problem: string;
  role: string;
  tech: string[];
  outcome?: string;
  image?: string;
  imageAlt?: string;
  visual?: "transcript" | "inspection" | "salesforce";
  demo?: string;
  repo?: string;
  // For projects with more than one repository (shown instead of repo).
  repos?: { label: string; href: string }[];
  // A write-up hosted elsewhere, such as on the Exitech site.
  external?: { label: string; href: string };
  confidential?: boolean;
  caseStudy?: CaseStudy;
}

export interface CaseStudy {
  intro: string;
  problem: string[];
  solution: string[];
  architecture: { step: string; detail: string }[];
  challenges: { title: string; text: string }[];
  responsibilities: string[];
  outcome: string[];
}

export const projects: Project[] = [
  {
    slug: "legal-transcription-ai",
    name: "Legal Transcription AI",
    category: "Legal AI",
    kind: "Client work",
    problem: "Lawyers needed usable notes from long, noisy court-hearing recordings.",
    role: "Led the architecture and delivery.",
    tech: ["Python", "Deepgram", "Claude", "MERN", "AWS"],
    visual: "transcript",
    confidential: true,
    caseStudy: {
      intro: "An AI pipeline that turns court-hearing audio into structured, lawyer-ready notes.",
      problem: [
        "Court hearings run long and the recordings are noisy. Lawyers needed notes they could actually work from, not hours of audio.",
      ],
      solution: [
        "A pipeline that transcribes the hearing audio with Deepgram, then uses Claude to turn the transcript into structured notes for lawyers, delivered through a MERN web app running on AWS.",
      ],
      architecture: [
        { step: "Recording", detail: "Court-hearing audio comes into the web app." },
        { step: "Transcription", detail: "Deepgram turns the long, noisy audio into a transcript." },
        { step: "Structuring", detail: "Claude turns the transcript into structured, lawyer-ready notes." },
        { step: "Delivery", detail: "Notes are served through the MERN application, running on AWS." },
      ],
      challenges: [
        { title: "Long, noisy audio", text: "Hearing recordings are long and far from studio quality, so transcription had to hold up on real-world input." },
        { title: "Notes lawyers can use", text: "The output had to be structured for legal work, not a raw transcript dump." },
      ],
      responsibilities: ["Architecture of the transcription-to-notes pipeline", "Delivery of the product", "AWS deployment"],
      outcome: ["This is client work under NDA, so screenshots, metrics and client results aren't public."],
    },
  },
  {
    slug: "kinwell",
    name: "Kinwell",
    category: "Health platform",
    kind: "Side project",
    problem: "Families living abroad had no clear view of their parents' health back home.",
    role: "Designed and built the platform, including a Node.js MCP server for Claude.",
    tech: ["MongoDB", "Express", "React", "Node.js", "LLMs", "MCP", "Claude"],
    outcome: "Live demo with family, parent, nutritionist and admin roles.",
    image: "/projects/kinwell.png",
    imageAlt: "Kinwell family dashboard showing a parent's health summary and today's nutrition plan",
    demo: "https://kinwell-sepia.vercel.app",
    caseStudy: {
      intro: "Home nutrition care for parents in Lahore, with plain-language updates for their children abroad.",
      problem: [
        "Families living abroad had no clear view of their parents' health back home.",
      ],
      solution: [
        "Nutritionists log home visits. Lab reports uploaded as PDFs or phone photos become structured results with healthy ranges and trends. Families get plain-language updates and an alert only when something needs them.",
        "A Node.js MCP server lets Claude use the platform directly, with tools scoped to each user's role and human approval before any message reaches a family.",
      ],
      architecture: [
        { step: "Four roles", detail: "Family members, parents (6-digit SMS code sign-in and a simple large-text view), nutritionists and admins each get their own app." },
        { step: "Document extraction", detail: "LLMs turn uploaded lab reports, PDFs or photos, into structured results with ranges and trends." },
        { step: "MCP server", detail: "Role-scoped tools let Claude read and act on the platform, with a human approving anything sent to a family." },
        { step: "Stack", detail: "MERN, deployed on Vercel with the database on MongoDB Atlas." },
      ],
      challenges: [
        { title: "AI that can't overstep", text: "Claude gets only the tools a user's role allows, and nothing reaches a family without a person approving it." },
        { title: "Built for older parents", text: "Parents sign in with a phone code and get a simple, large-text view. The app follows Apple's Human Interface Guidelines with colour pairs that meet WCAG AA." },
      ],
      responsibilities: ["Product and UX design", "Full-stack implementation", "LLM document extraction", "MCP server design", "Deployment"],
      outcome: ["Live and explorable with demo accounts at kinwell-sepia.vercel.app."],
    },
  },
  {
    slug: "field-inspection-ai",
    name: "Field Inspection AI",
    category: "Field operations AI",
    kind: "Client work",
    problem: "Field teams were filling in inspections and writing reports by hand.",
    role: "Led development, owned the core implementation and the AWS deployment.",
    tech: ["MERN", "OpenAI", "Embeddings", "AWS"],
    visual: "inspection",
    confidential: true,
    caseStudy: {
      intro: "An AI-powered CRM forms and reporting platform for field teams.",
      problem: ["Field teams were filling in inspections and checklists and writing their reports by hand."],
      solution: ["A platform that automates inspections, checklists and report generation, using OpenAI models and embeddings on a MERN stack."],
      architecture: [
        { step: "Forms", detail: "Inspections and checklists captured as structured CRM forms." },
        { step: "AI", detail: "OpenAI models and embeddings power report generation." },
        { step: "Platform", detail: "MERN application deployed on AWS." },
      ],
      challenges: [{ title: "From manual to automated", text: "Turning hand-written inspection work into structured data that reports can be generated from." }],
      responsibilities: ["Led development", "Core implementation", "AWS deployment"],
      outcome: ["This is client work under NDA, so screenshots, metrics and client results aren't public."],
    },
  },
  {
    slug: "ai-resume-assistant",
    name: "AI Resume Assistant",
    category: "RAG system",
    kind: "Personal project",
    problem: "A PDF resume can't answer a recruiter's follow-up question.",
    role: "Designed and built it end to end.",
    tech: ["TypeScript", "Vercel Functions", "Upstash Vector", "OpenAI", "OpenRouter"],
    outcome: "Live at ask.haroonriasat.com and on this page; it says \"I don't know\" instead of guessing.",
    image: "/projects/ai-resume.png",
    imageAlt: "The AI resume assistant at ask.haroonriasat.com with a question box and topic buttons",
    demo: "https://ask.haroonriasat.com",
    repo: "https://github.com/HaroonRiasat1/resume-chatbot",
    caseStudy: {
      intro: "A RAG assistant grounded only in my public resume. It powers the chat and the job-fit checker on this site.",
      problem: [
        "Recruiters and hiring managers have specific questions (\"Has he shipped RAG in production?\") that a static resume answers slowly or not at all.",
        "A general chatbot would happily invent experience. For a resume, a confident wrong answer is worse than no answer.",
      ],
      solution: [
        "Every resume line is stored in an Upstash Vector index. Each question runs a semantic search plus a keyword match, and only the closest lines reach the model, so it can't mix details between entries.",
        "Guards before and after the model: private details, off-topic tasks and things the resume never mentions get \"I don't know\" without an AI call, and answers that drift from the resume are replaced by the matching resume lines.",
      ],
      architecture: [
        { step: "Knowledge", detail: "One TypeScript profile file is the single source of truth; each deploy re-indexes it into Upstash Vector (text-embedding-3-small)." },
        { step: "Routing", detail: "A keyword router classifies the question as answerable, private, off-topic or unknown before any model call." },
        { step: "Retrieval", detail: "Hybrid vector + keyword search; an answer needs a keyword match or a vector score of at least 0.74." },
        { step: "Generation", detail: "OpenAI (gpt-5.4-mini) streams the answer; free OpenRouter models take over if OpenAI fails." },
        { step: "Checks", detail: "A drift check compares the answer's wording with the resume. Fit-check evidence is re-checked line by line." },
      ],
      challenges: [
        { title: "Small corpus, overlapping scores", text: "With about 30 short resume lines, off-resume questions scored close to real ones. A tuned threshold plus the keyword router separates them." },
        { title: "Honest job-fit reports", text: "Strengths with more than two words that aren't in the resume are downgraded to gaps, so the report can show real gaps but never invented strengths." },
        { title: "Public and affordable", text: "CORS allow-list, per-visitor rate limits and caching keep a public AI endpoint cheap." },
      ],
      responsibilities: ["Retrieval and guard design", "Serverless API", "Frontend", "Evaluation and tests"],
      outcome: ["Live at ask.haroonriasat.com, open source on GitHub, and wired into this site's chat and fit checker."],
    },
  },
  {
    slug: "scrub",
    name: "SCRUB",
    category: "Salesforce integration",
    kind: "Client work",
    problem: "Sales-management features that extend Salesforce, built as a custom app.",
    role: "Engineering work on the app; details are under NDA.",
    tech: ["React", "TypeScript", "Express", "PostgreSQL", "OAuth", "Salesforce"],
    visual: "salesforce",
    confidential: true,
  },
  {
    slug: "wild-frequencies",
    name: "Wild Frequencies",
    category: "Interactive music",
    kind: "Side project",
    problem: "What if a live rock concert ran entirely in your browser, with friends joining from their phones?",
    role: "Designed and built it solo.",
    tech: ["React", "TypeScript", "Tone.js", "Canvas 2D", "WebRTC"],
    outcome: "Live, playable, and open source.",
    image: "/projects/wild-frequencies.png",
    imageAlt: "Wild Frequencies concert stage with an animal crowd and a Doors open button",
    demo: "https://wild-frequencies.vercel.app",
    repo: "https://github.com/HaroonRiasat1/wild-frequencies",
    caseStudy: {
      intro: "A 7-piece animal band with lights, fog, an LED wall and a crowd you can join, all in the browser.",
      problem: ["A playful brief: make a concert that feels live, sounds generated rather than sampled, and that friends can share in real time."],
      solution: [
        "Every song, every meow and every crowd roar is generated live in the browser with Tone.js: no samples, no API keys. Upload your own track and the band learns its beats and choruses.",
        "Party mode lets friends join from their phones by link, QR code or a 4-letter code, peer-to-peer over WebRTC.",
      ],
      architecture: [
        { step: "Audio", detail: "Tone.js synthesises the music and effects in real time." },
        { step: "Stage", detail: "Canvas 2D renders the band, lights, fog and crowd." },
        { step: "Party", detail: "The host's browser is the room's server; friends connect over WebRTC, with PeerJS only for the handshake." },
        { step: "Sync", detail: "Clients measure their clock offset by ping, and the host announces each song's start time ahead of playback." },
      ],
      challenges: [
        { title: "Staying in sync", text: "Everyone hears the same song at the same moment because the host schedules starts on a shared clock." },
        { title: "Flaky connections", text: "Dropped friends reconnect automatically while the music keeps playing; a host refresh gets the same room code back with the setlist restored." },
        { title: "Safe by default", text: "Strobe is off by default, with a reduced-motion option, and friends' messages are type-checked and rate-limited." },
      ],
      responsibilities: ["Concept and design", "Audio engine", "Rendering", "Real-time networking"],
      outcome: ["Live at wild-frequencies.vercel.app and open source on GitHub."],
    },
  },
  {
    slug: "fridge",
    name: "Fridge",
    category: "Mobile app",
    kind: "Team project",
    problem: "Groceries get forgotten until they expire. Fridge scans them, tracks expiry dates and suggests recipes.",
    role: "Part of the Åbo Akademi University team that built it.",
    tech: ["Flutter", "Django", "PostgreSQL", "AWS RDS", "Firebase"],
    outcome: "ICT Showroom 2025 finalist: Best UI from the jury, plus 1st in Best Technical Content and Best Presentation by public vote.",
    image: "/projects/fridge.png",
    imageAlt: "Fridge app screens: grocery categories with a Let's Cook button, the splash screen, and a vegetables list with quantities",
    demo: "https://fridgelogic.lovable.app",
    repos: [
      { label: "App", href: "https://github.com/HaroonRiasat1/fridge_flutter" },
      { label: "Backend", href: "https://github.com/HaroonRiasat1/fridge_backend" },
    ],
  },
  {
    slug: "sunridge",
    name: "Sunridge Medical",
    category: "Healthcare iPad & iOS app",
    kind: "Client work",
    problem: "Clinical workflows ran on manual processes and disconnected tools. The app brings a clinic's day into one place: patients, procedures, vitals, labs, dispensed items and treatment scheduling.",
    role: "One of four engineers at Exitech. Built the Today view, patient list, labs and dispensed modules, vendor labs and treatment scheduling.",
    tech: ["Swift", "SwiftUI", "Combine", "REST APIs"],
    image: "/projects/sunridge.png",
    imageAlt: "Sunridge Medical iPad app: the dashboard with appointment calendar, and the Today view with a patient's procedures, labs and dispensed items",
    external: { label: "Exitech case study", href: "https://exitech.org/work/sunridge-ios-app-48" },
  },
];

export const moreOnGithub = ["event-map-scraper", "tripstitch", "airplane-runner", "a Mario-style platformer in x86 Assembly"];

export const expertise = [
  {
    group: "Frontend",
    icon: "layout",
    core: ["React", "Next.js", "TypeScript"],
    also: ["Tailwind CSS", "Contentful", "React Native", "SwiftUI"],
    usage: "React frontends for Amplon's production SaaS platform, and React/Next.js for Exitech's client products.",
  },
  {
    group: "Backend",
    icon: "server",
    core: ["Node.js", "Python", "Laravel"],
    also: ["Express", "Flask", "Django", "REST APIs"],
    usage: "Laravel APIs at Amplon, a Flask service behind its RAG assistant, and a Node.js MCP server in Kinwell.",
  },
  {
    group: "AI Engineering",
    icon: "brain",
    core: ["OpenAI", "Claude", "RAG", "Embeddings", "Vector databases", "MCP"],
    also: ["LLM fine-tuning", "LangChain", "LlamaIndex", "Pinecone", "pgvector", "Deepgram"],
    usage: "RAG in production at Amplon, Claude-structured court transcripts for a legal client, and LLMs fine-tuned on client data at QUEST Lab.",
  },
  {
    group: "Databases",
    icon: "database",
    core: ["PostgreSQL", "MongoDB"],
    also: ["SQL", "Upstash Vector"],
    usage: "PostgreSQL in Exitech's stack and SCRUB; MongoDB behind Kinwell and two client AI platforms.",
  },
  {
    group: "Cloud & DevOps",
    icon: "cloud",
    core: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    also: ["EC2", "S3", "Amplify", "Bedrock", "SageMaker", "Linux"],
    usage: "Containerised AWS deployments with Docker, Kubernetes and CI/CD at Exitech. AWS Certified Cloud Practitioner (2023).",
  },
];

// Courses in progress: tools being learned, kept apart from shipped experience.
export const learning = [
  {
    course: "AI FDE: The Forward Deployed Engineer & Agentic AI Architect",
    by: "Ed Donner, Udemy",
    url: "https://www.udemy.com/course/ai-fde-forward-deployed-engineer-agentic-ai-architect/",
    summary:
      "A three-week build of a production agent system: agent harnesses, evals, durable workflows with human sign-off, agent swarms, and deployment on AWS Bedrock AgentCore.",
    groups: [
      { name: "Agent frameworks", tools: ["LangGraph", "LangChain Deep Agents", "Claude Agent SDK"] },
      { name: "Evals & observability", tools: ["Langfuse", "LLM as a judge"] },
      { name: "Memory & data", tools: ["Agentic RAG over MCP", "Qdrant", "Supabase"] },
      { name: "Production on AWS", tools: ["Bedrock AgentCore", "AgentCore Gateway & Memory", "Cedar policies", "Lambda"] },
      { name: "Models & inference", tools: ["Ollama", "OpenRouter", "Open-weight models"] },
    ],
  },
  {
    course: "AI Engineer Production Track: Deploy LLMs & Agents at Scale",
    by: "Ligency and Ed Donner, Udemy",
    url: "https://www.udemy.com/course/generative-and-agentic-ai-in-production/",
    summary:
      "Shipping LLM apps and multi-agent systems to production on Vercel, AWS, Azure and GCP, with infrastructure as code, CI/CD, monitoring and guardrails.",
    groups: [
      { name: "App stack", tools: ["FastAPI", "Clerk"] },
      { name: "AWS", tools: ["Lambda", "CloudFront", "API Gateway", "SQS", "App Runner", "Aurora"] },
      { name: "Agents on AWS", tools: ["AgentCore", "Strands Agents"] },
      { name: "Infra & delivery", tools: ["Terraform", "GitHub Actions"] },
      { name: "Multi-cloud", tools: ["Azure Container Apps", "GCP Cloud Run"] },
    ],
  },
];

export const education = [
  {
    degree: "M.Sc. Information Technology",
    school: "Åbo Akademi University",
    place: "Turku, Finland",
    years: "2024 – 2026",
    grade: "GPA 4.7 / 5.0",
    text: "Scalable Software Systems. Thesis: TaskLint, an AI-powered Chrome extension that audits project-board tasks for clarity, ownership, deadlines and delivery risk.",
    link: { label: "Read the thesis", href: "https://www.doria.fi/handle/10024/194918" },
  },
  {
    degree: "B.Sc. Computer Science",
    school: "FAST-NUCES",
    place: "Islamabad, Pakistan",
    years: "2019 – 2023",
    grade: "GPA 3.49 / 4.0",
    text: "Major in Software Engineering. Dean's List of Honor three times.",
  },
];

export const leadership = [
  { title: "Chair, IEEE Computer Society FAST Islamabad Chapter", when: "2022 – 2023", text: "Led the chapter and organised technical events and workshops; 80+ tech events organised during my bachelor's." },
  { title: "Deputy Chairman, Society for Advanced Studies and Research", when: "2021 – 2022", text: "Ran research seminars and FAST's first postgraduate research symposium." },
  { title: "Teaching Assistant, FAST-NUCES", when: "2021 – 2022", text: "Operating Systems, grading for 180+ students." },
];

export const awards = [
  { title: "1st place, Microsoft, Nokia & Elisa Hackathon", text: "A 5G/6G drone network for healthcare in remote areas." },
  { title: "ICT Showroom 2025", text: "Best UI from the jury, plus 1st in Best Technical Content and Best Presentation by public vote." },
  { title: "Runner-up, Softec Web Development Competition", text: "A MERN clinic management system, FAST Lahore 2022." },
  { title: "Dean's List of Honor ×3", text: "FAST-NUCES, Spring 2021, Fall 2021 and Spring 2023." },
];

export const certifications = ["AWS Certified Cloud Practitioner (2023 – 2026)", "Foundation Certificate in Project Management, PRY"];

export const beyond = [
  { icon: "plane", title: "Travelling", text: "Favourite place so far: Lofoten." },
  { icon: "mountain", title: "Hiking", text: "The best reason to travel." },
  { icon: "book", title: "Reading", text: "Books, in whatever free time is left." },
  { icon: "paw", title: "Animals", text: "Animal lover; three cats so far." },
];

export const askExamples = [
  "What AI projects has Haroon built?",
  "What is his experience with React and AWS?",
  "Has he worked on production RAG systems?",
  "What makes him suitable for a full-stack role?",
];

export const fitExample = `Full-Stack Engineer (AI products), hybrid in Helsinki.
You will build customer-facing web apps and LLM features end to end.
Requirements:
- 3+ years with React and TypeScript
- Backend experience with Node.js or Python
- Building RAG or other LLM features in production
- AWS or Azure, Docker and CI/CD
- Experience leading or mentoring engineers
- Fluent Finnish
- Experience with Go microservices`;
