// Your résumé, used ONLY by the "Ask my AI" chat to answer questions about you.
// It is not shown anywhere on the website, and it isn't sent to visitors' browsers —
// only the server (api/) reads this file.
// Phone number intentionally left out so the AI never shares it.
// Update this whenever your résumé changes.

type Job = {
  role: string
  company: string
  location?: string
  dates: string
  highlights: string[]
}

type Degree = {
  degree: string
  school: string
  dates?: string
}

export const resume = {
  fullName: 'Aditya Sairam Pullabhatla',
  headline: 'Software Engineer | Backend, Data & AI Platforms',
  availability: 'Open to relocation',

  summary:
    'Software engineer with 5+ years building production backend, data, and AI systems at Amazon, United Health Care, and in enterprise lending. Designs and operates distributed Java/Spring Boot and Python/FastAPI services, Kafka streaming ingestion, and data platforms on BigQuery, DynamoDB, SQL Server, and Elasticsearch; currently ships LLM agents and RAG pipelines on Kubernetes. Delivered 40% faster APIs at Amazon, ~25% fewer downstream data issues across millions of records, and ~40% less manual effort via agentic automation. Owns systems from design through production operations.',

  skills: {
    'Languages': ['Python', 'Java', 'SQL', 'TypeScript', 'C#'],
    'Backend & APIs': ['FastAPI', 'Spring Boot', '.NET', 'REST APIs', 'microservices', 'distributed systems', 'React'],
    'Data Engineering': ['Kafka streaming ingestion', 'ETL pipelines', 'BigQuery data lake', 'data validation & quality', 'schema design', 'Pandas', 'Hadoop MapReduce', 'Hive', 'HDFS'],
    'Databases & Search': ['DynamoDB', 'SQL Server', 'PostgreSQL', 'MongoDB', 'Elasticsearch', 'BigQuery'],
    'AI / LLM': ['LLM integration (Claude, Vertex AI Gemini, Azure OpenAI)', 'agentic workflows', 'multi-agent orchestration (Microsoft Agent Framework)', 'RAG', 'prompt engineering'],
    'Cloud & DevOps': ['Docker', 'Kubernetes', 'CI/CD (GitHub Actions)', 'AWS CloudWatch', 'GCP (Vertex AI, BigQuery)', 'on-call operations'],
  } as Record<string, string[]>,

  experience: [
    {
      role: 'Software Engineer',
      company: 'Perfect Solutions Group',
      dates: 'Apr 2024 – Present',
      highlights: [
        'Designed and built production generative AI microservices for conversational AI across the loan lifecycle, evaluating and integrating multiple foundation models (Claude, Vertex AI Gemini, Azure OpenAI); Python/FastAPI on Docker and Kubernetes.',
        'Built agentic workflows and multi-agent orchestration with Microsoft Agent Framework (Python, C#/.NET) that automate document processing and loan-servicing tasks end-to-end, reducing manual effort by ~40%.',
        'Designed and built a Kafka streaming ingestion and RAG pipeline that pulls documents from content management systems, chunks content, and feeds LLM extraction and summarization.',
        'Integrated a BigQuery loan data lake with SQL Server to serve loan data to AI applications and persist conversation history.',
        'Set up CI/CD in GitHub Actions for containerized Python services and analytics components on Kubernetes, cutting release time by ~30%; built the React/TypeScript conversational front end.',
      ],
    },
    {
      role: 'Software Engineer',
      company: 'Amazon',
      location: 'Chennai, India',
      dates: 'Jun 2021 – Dec 2022',
      highlights: [
        'Developed and operated Java/Spring Boot backend services for Amazon’s multi-region data catalog, supporting high-traffic, globally distributed systems.',
        'Improved backend API performance by 40% by profiling under production load, optimizing DynamoDB access patterns, and tuning JVM memory management.',
        'Implemented data validation and consistency checks across millions of distributed catalog records, reducing data-related issues in downstream systems by ~25%.',
        'Built AWS CloudWatch operational dashboards and served on-call for critical services, reducing incident resolution time by ~30%.',
      ],
    },
    {
      role: 'Software Engineer',
      company: 'United Health Care',
      location: 'Hyderabad, India',
      dates: 'May 2019 – May 2021',
      highlights: [
        'Designed and developed Java REST API backend services powering real-time personalized recommendations for 10,000+ users.',
        'Implemented Elasticsearch-based search, improving result relevance and reducing query response times to sub-second.',
        'Built automated Python data pipelines for data preparation and feature generation feeding internal analytics workflows.',
      ],
    },
  ] as Job[],

  education: [
    { degree: 'M.S., Computer Science', school: 'Cleveland State University', dates: 'Jan 2023 – Dec 2024' },
    { degree: 'Bachelor’s, Computer Science and Engineering', school: 'Jawaharlal Nehru Technological University Hyderabad (JNTUH)' },
  ] as Degree[],

  certifications: [
    'Google Advanced Data Analytics Professional Certificate',
    'OCI 2023 AI Certified Foundations Associate (Oracle)',
  ],
}
