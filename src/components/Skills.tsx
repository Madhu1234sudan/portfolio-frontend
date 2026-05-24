const skillCategories = [
  {
    title: "Data Science",
    skills: [
      "Python",
      "Machine Learning",
      "Data Analysis",
      "Data Visualization",
      "Statistical Analysis",
      "Feature Engineering",
    ],
  },

  {
    title: "AI & Machine Learning",
    skills: [
      "NLP",
      "Active Learning",
      "Classification Models",
      "Scikit-learn",
      "Model Evaluation",
      "Deep Learning",
    ],
  },

  {
    title: "Generative AI & AI Agents",
    skills: [
      "LLMs",
      "AI Agents",
      "Prompt Engineering",
      "RAG Pipelines",
      "OpenAI APIs",
      "AI Automation",
    ],
  },

  {
    title: "MLOps & Deployment",
    skills: [
      "MLOps",
      "Model Deployment",
      "REST APIs",
      "Docker",
      "Cloud Deployment",
      "CI/CD",
    ],
  },

  {
    title: "Databases & Analytics",
    skills: [
      "SQL",
      "PostgreSQL",
      "Tableau",
      "PowerBI",
      "Data Pipelines",
      "Query Optimization",
      "Analytics Engineering",
    ],
  },

  {
    title: "Cloud & Infrastructure",
    skills: [
      "AWS",
      "Cloud Systems",
      "Backend APIs",
      "Prisma",
      "Node.js",
      "System Design",
    ],
  },
];

export default function Skills() {
  return (
    <section className="bg-black text-white py-24 px-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-16">
          <p className="text-green-400 uppercase tracking-widest text-sm mb-4">
            Technical Expertise
          </p>

          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            AI, Data Science & Engineering Stack
          </h2>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-green-500 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-6 text-green-400">
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-zinc-800 px-4 py-2 rounded-full text-gray-300 border border-zinc-700 hover:border-green-400 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}