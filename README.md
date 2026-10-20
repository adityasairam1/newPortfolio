# Hi, I'm Aditya Sairam 👋

**Software Engineer · Backend, Data & AI Platforms**

I build backend systems, data pipelines, and AI tools that hold up in production.

🌐 **Portfolio:** [adityasairam.com](https://adityasairam.com)

[LinkedIn](https://www.linkedin.com/in/adityasairam) · [GitHub](https://github.com/adityasairam1) · [Email](mailto:adityasairamp@outlook.com) · Open to relocation

---

## About me

I've spent 5+ years building the stuff behind the screen 🛠️: APIs, microservices, data pipelines, and lately AI agents that take boring manual work off people's plates. I've worked on systems handling millions of records at **Amazon**, **United Health Care**, and in enterprise lending. Honestly, debugging is my happy place 🐛🔍.

Outside work I'm gaming 🎮 (GTA 5, wrestling games, Tomb Raider, Assassin's Creed, Max Payne) or building websites from scratch, like this one 🚀.

I'm looking for a team where I can keep learning, ship things I'm proud of, and grow with good people 🤝.

## Highlights

- ⚡ **40% faster APIs** at Amazon, by profiling under production load and optimizing DynamoDB access and JVM memory
- 🤖 **~40% less manual work** in loan servicing with multi-agent AI workflows
- ✅ **~25% fewer downstream data issues** across millions of catalog records
- 🚀 **~30% faster releases** with CI/CD for containerized services on Kubernetes

## Tech I work with

| Area | Tools |
| --- | --- |
| **Languages** | Python, Java, SQL, TypeScript, C# |
| **Backend** | FastAPI, Spring Boot, .NET, REST APIs, microservices |
| **Data** | Kafka, ETL pipelines, BigQuery, Pandas, Hadoop, Hive |
| **Databases** | DynamoDB, SQL Server, PostgreSQL, MongoDB, Elasticsearch |
| **AI / LLM** | Claude, Gemini, Azure OpenAI, RAG, multi-agent orchestration |
| **Cloud & DevOps** | Docker, Kubernetes, GitHub Actions, AWS, GCP |

## Featured projects

| Project | What it does | Built with |
| --- | --- | --- |
| 🤖 **AI Loan Assistant** | Multi-agent system that reads loan documents and handles servicing tasks, cutting ~40% of manual work | Python, FastAPI, Kafka, RAG, Kubernetes, React |
| 🩺 **Medline Search Engine** | Search over ~4,500 medical articles with a 1.4M-entry inverted index, from 1+ hour per query down to near-instant | Node.js, MongoDB, MySQL, Next.js, NLP |
| 📜 **Presidential Speech Search** | Search engine built from scratch over every State of the Union address, with TF-IDF ranking | Python, NLTK, SQL Server |
| 🍔 **Yelp Review Analytics API** | API over 150K businesses and ~7M reviews, with results as JSON or CSV | Python, Flask, MongoDB |
| ⚡ **Amazon Catalog Speedup** | Made multi-region catalog APIs 40% faster and cut data issues by ~25% | Java, Spring Boot, DynamoDB, CloudWatch |

---

## About this website

This repository is my portfolio site, designed and built from scratch. It's live at **[adityasairam.com](https://adityasairam.com)**.

**What's inside**

- 🎬 **Animated home page:** letter-by-letter intro, a studio spotlight that follows the mouse, film grain, and a photo that blurs as you scroll
- 🃏 **3D project cards** that tilt toward the cursor
- ✦ **Ask my AI:** a chat assistant that answers visitors' questions about my work, streaming replies from an LLM through a serverless API
- ♿ **Accessible by default:** keyboard support, WCAG AA contrast, and reduced-motion support
- 📱 **Responsive** from phones to wide screens

**Built with:** React, TypeScript, Vite, CSS Modules, Cloudflare Workers, and the Groq and Anthropic SDKs.

### Run it locally

```bash
npm install
cp .dev.vars.example .dev.vars   # then add your GROQ_API_KEY
npm run dev
```

Open http://localhost:5173. The chat's Worker runs in Cloudflare's real runtime locally, via the Cloudflare Vite plugin.

### Where things live

```
src/data/        all site content (text, projects, contact, AI settings)
src/components/  one folder per component, each with its own styles
src/styles/      theme tokens: colours, fonts, spacing, motion
worker/          Cloudflare Worker behind the "Ask my AI" chat
```

To update the site's content, edit the files in `src/data/`. No component code needs to change.

---

<p align="center">Made with ♥ and lots of tea</p>
