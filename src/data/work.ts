// Projects shown in the My Work section, in this order.
// To add a project, copy one block and edit it.
// `link` is optional — add a URL (GitHub, live demo…) and the card shows a "View project" link.

export type Project = {
  emoji: string
  title: string
  description: string
  tech: string[]
  link?: string
}

export const projects: Project[] = [
  {
    emoji: '🤖',
    title: 'AI Loan Assistant',
    description:
      'A multi-agent system that reads loan documents and handles servicing tasks on its own, cutting about 40% of the manual work. Documents stream in through Kafka, get chunked, and feed a RAG pipeline that LLMs use for extraction and summaries. I also built the chat front end.',
    tech: ['Python', 'FastAPI', 'Microsoft Agent Framework', 'Kafka', 'Claude / Gemini / Azure OpenAI', 'Docker', 'Kubernetes', 'React'],
  },
  {
    emoji: '🩺',
    title: 'Medline Search Engine',
    description:
      'A search engine for medical articles, built with a team of four. We scraped about 4,500 MedlinePlus articles, cleaned them, and built an inverted index with over 1.4 million entries. Results are ranked with TF-IDF and cosine similarity. My favorite part: the first version took over an hour per search, and rewriting the database queries brought it down to near-instant.',
    tech: ['Node.js', 'Puppeteer', 'MongoDB', 'MySQL', 'Next.js', 'NLP'],
  },
  {
    emoji: '📜',
    title: 'Presidential Speech Search',
    description:
      'I scraped every State of the Union address into SQL Server, then built my own search over them from scratch: stop-word removal, stemming, an inverted index, and TF-IDF scoring. Type in a query like “freedom peace” and it ranks the speeches that match best.',
    tech: ['Python', 'BeautifulSoup', 'NLTK', 'SQL Server', 'Pandas'],
  },
  {
    emoji: '🍔',
    title: 'Yelp Review Analytics API',
    description:
      'Loaded Yelp’s dataset (150K businesses and about 7 million reviews) into MongoDB and built a Flask API on top of it. The endpoints run aggregation pipelines and joins to pull things like top-rated restaurants by city or the worst reviews for fast food spots, and return results as JSON or a downloadable CSV.',
    tech: ['Python', 'Flask', 'MongoDB', 'Pandas'],
  },
  {
    emoji: '⚡',
    title: 'Amazon Catalog Speedup',
    description:
      'At Amazon, I worked on backend services for a multi-region product catalog handling heavy global traffic. I profiled the APIs under real production load, fixed how they read from DynamoDB, and tuned JVM memory, which made them 40% faster. I also added data validation across millions of catalog records, cutting downstream data issues by about 25%, and built CloudWatch dashboards that helped the on-call team fix incidents about 30% faster.',
    tech: ['Java', 'Spring Boot', 'DynamoDB', 'AWS CloudWatch'],
  },
]
