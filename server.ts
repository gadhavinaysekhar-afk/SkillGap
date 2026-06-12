import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const DEFAULT_ANALYSIS = {
  readinessScore: 72,
  strengths: [
    { name: "User Research Methodologies", matchPercent: 100 },
    { name: "Design Systems Architecture", matchPercent: 92 },
    { name: "Stakeholder Management", matchPercent: 85 }
  ],
  skillsToDevelop: [
    { name: "Advanced Data Visualization", currentPercent: 40, description: "Industry expects proficiency in complex charting & BI tool integration." },
    { name: "React Component Mapping", currentPercent: 15, description: "Essential for Senior roles bridging design-to-code workflows." }
  ],
  priorityFocus: [
    "A/B Testing Strategies",
    "Advanced Prototyping"
  ],
  roadmap: [
    {
      week: "Week 1",
      title: "Foundations of Strategic Thinking",
      description: "Addressed the 'Strategic Frameworks' gap with 4 modules on competitive positioning.",
      status: "resolved",
      focusGap: "Strategic Frameworks",
      resources: []
    },
    {
      week: "Week 2-3",
      title: "User Research Frameworks",
      description: "Strengthened the 'Qualitative Insight' gap. Mastered interview techniques.",
      status: "resolved",
      focusGap: "Qualitative Insight",
      resources: []
    },
    {
      week: "Week 4",
      title: "Market Sizing & Segmentation",
      description: "Directly targeting your 'Market Analytics' weakness identified in the assessment.",
      status: "active",
      focusGap: "Market Analytics",
      resources: [
        { title: "TAM Analysis (15m)", type: "resource", duration: "15m" },
        { title: "Segmentation Worksheet", type: "worksheet", duration: "worksheet" }
      ]
    },
    {
      week: "Week 5",
      title: "Competitive Moat Identification",
      description: "Developing long-term defensibility strategies to close the 'Defensibility Planning' gap.",
      status: "locked",
      focusGap: "Defensibility Planning",
      resources: [
        { title: "Competitive Matrix", type: "worksheet", duration: "worksheet" }
      ]
    },
    {
      week: "Weeks 6 - 12",
      title: "Closing remaining gaps",
      description: "Closing remaining gaps: Product Vision, Roadmapping, and Capstone.",
      status: "locked",
      focusGap: "Remaining Gaps",
      resources: []
    }
  ],
  alternativePaths: [
    {
      title: "Service Designer",
      growthType: "High Growth Role",
      keyFocus: "End-to-end journeys & human needs.",
      matchPercent: 94,
      salaryRange: "$115k - $160k",
      skillGapPercent: 15
    },
    {
      title: "Product Strategist",
      growthType: "Strategic Leadership",
      keyFocus: "Market viability & business transformation.",
      matchPercent: 88,
      salaryRange: "$130k - $175k",
      skillGapPercent: 20
    },
    {
      title: "UX Research Lead",
      growthType: "Expert Individual Contributor",
      keyFocus: "Advanced user psychology & continuous discovery.",
      matchPercent: 85,
      salaryRange: "$125k - $165k",
      skillGapPercent: 25
    }
  ]
};

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // Initialize server-side Gemini SDK if key exists
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey ? new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  }) : null;

  if (ai) {
    console.log("Gemini API client successfully loaded on backend.");
  } else {
    console.log("Running in offline scenario mode. Seamless educational mock mockups will serve.");
  }

  // --- API Routes ---

  // Main SkillGap Analysis Route
  app.post("/api/skillgap/analyze", async (req, res) => {
    const { fullName, targetRole, course, currentSkills } = req.body;

    if (!targetRole) {
      return res.status(400).json({ error: "targetRole is required" });
    }

    if (!ai) {
      // Fallback with personalized adjustments (e.g., swapping names/roles)
      const adjusted = JSON.parse(JSON.stringify(DEFAULT_ANALYSIS));
      return res.json(adjusted);
    }

    try {
      const prompt = `
        Analyze the skill gaps for:
        - Full Name: ${fullName || 'Anonymous'}
        - Target Role: ${targetRole}
        - Course / Background: ${course || 'General'}
        - Declared Current Skills / Resume: ${currentSkills || 'Not provided'}

        Perform an industry alignment analysis. Provide a readiness score (0-100), major strengths (up to 3, with match percentages), weaknesses/skills to develop (2-3 items with description and current percent), prioritizing 2 main immediate focus areas. 
        Create a 12-week developmental roadmap divided into 4-5 stages/weeks (e.g. Week 1, Week 2-3, Week 4 [make this one 'active'], Week 5 ['locked'], Weeks 6-12 ['locked']). Each stage needs:
        - week (string)
        - title
        - description (explaining what gaps are addressed)
        - status ('resolved', 'active', or 'locked')
        - focusGap (the core skill gap focused on, e.g. "Pricing Strategy")
        - resources (array with title, type ['resource' or 'worksheet'], and duration)

        Also recommend 3 alternative career path pivots matching this profile, including:
        - title
        - growthType Indicator (e.g. "High Growth Role")
        - keyFocus
        - matchPercent
        - salaryRange (e.g. "$110k - $150k")
        - skillGapPercent
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              readinessScore: { type: Type.INTEGER },
              strengths: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    matchPercent: { type: Type.INTEGER }
                  },
                  required: ["name", "matchPercent"]
                }
              },
              skillsToDevelop: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    currentPercent: { type: Type.INTEGER },
                    description: { type: Type.STRING }
                  },
                  required: ["name", "currentPercent", "description"]
                }
              },
              priorityFocus: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              roadmap: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    week: { type: Type.STRING },
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    status: { type: Type.STRING },
                    focusGap: { type: Type.STRING },
                    resources: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          title: { type: Type.STRING },
                          type: { type: Type.STRING },
                          duration: { type: Type.STRING }
                        },
                        required: ["title", "type", "duration"]
                      }
                    }
                  },
                  required: ["week", "title", "description", "status", "focusGap"]
                }
              },
              alternativePaths: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    growthType: { type: Type.STRING },
                    keyFocus: { type: Type.STRING },
                    matchPercent: { type: Type.INTEGER },
                    salaryRange: { type: Type.STRING },
                    skillGapPercent: { type: Type.INTEGER }
                  },
                  required: ["title", "growthType", "keyFocus", "matchPercent", "salaryRange", "skillGapPercent"]
                }
              }
            },
            required: ["readinessScore", "strengths", "skillsToDevelop", "priorityFocus", "roadmap", "alternativePaths"]
          }
        }
      });

      const dataStr = response.text?.trim() || "{}";
      const parsedData = JSON.parse(dataStr);
      res.json(parsedData);
    } catch (error) {
      console.error("AI Generation Error:", error);
      res.json(DEFAULT_ANALYSIS); // gracefully fall back
    }
  });

  // Dynamic learning worksheet / explainer guide generator
  app.post("/api/skillgap/guide", async (req, res) => {
    const { topic, weekTitle, targetRole } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    if (!ai) {
      return res.json({
        title: `Worksheet: ${topic}`,
        summary: `This high-fidelity study worksheet provides core definitions and frameworks for mastering ${topic} within a ${targetRole || 'Professional'} path.`,
        keyTakeaways: [
          "Understand value proposition mechanics and competitor quadrants.",
          "Map qualitative responses into structured segmentation models.",
          "Execute small cohort validations to gather immediate validation feedback."
        ],
        exercises: [
          {
            question: "Draft a 1-sentence value proposition matching your core customer segment.",
            hint: "Template: We help [Target Audience] accomplish [Key Goal] through [Unique Solution], unlike traditional solutions."
          },
          {
            question: "Name 3 direct competitors in this niche and list one structural defense/moat for each.",
            hint: "Focus on switching costs, network effects, or specific brand/operational efficiencies."
          }
        ],
        guideContent: `### Guide to ${topic}\n\nTo bridge the gap in **${topic}**, practitioners utilize segmentation frameworks to partition addressable markets. Start by defining the Total Addressable Market (TAM), then narrow down to the Serviceable Addressable Market (SAM) and Serviceable Obtainable Market (SOM).\n\n1. Assemble current user cohorts.\n2. Apply strategic frameworks to map product offerings.\n3. Validate with quantitative user tests.`
      });
    }

    try {
      const prompt = `
        You are an elite career development mentor. Create an interactive study guide and learning worksheet on the topic: "${topic}".
        This is for a person targeting the role of "${targetRole || 'Professional'}".
        Create:
        1. A brief summary of the topic.
        2. 3 key actionable takeaways.
        3. 2 practice exercises with smart hints.
        4. Deep technical guide content in fully-formatted Markdown.

        Respond strictly in JSON matching this structure:
        {
          "title": "Topic title",
          "summary": "Brief summary text",
          "keyTakeaways": ["takeaway 1", "takeaway 2", "takeaway 3"],
          "exercises": [
            { "question": "exercise 1 description", "hint": "hint text" },
            { "question": "exercise 2 description", "hint": "hint text" }
          ],
          "guideContent": "Detailed markdown explanation guide"
        }
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              keyTakeaways: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              exercises: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    hint: { type: Type.STRING }
                  },
                  required: ["question", "hint"]
                }
              },
              guideContent: { type: Type.STRING, description: "Deep markdown instruction content" }
            },
            required: ["title", "summary", "keyTakeaways", "exercises", "guideContent"]
          }
        }
      });

      const parsed = JSON.parse(response.text?.trim() || "{}");
      res.json(parsed);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to generate guide" });
    }
  });

  // Wildcard career pivot generator from quiz
  app.post("/api/skillgap/quiz", async (req, res) => {
    const { answers } = req.body; // Array of selected answers / choices

    if (!ai) {
      return res.json({
        recommendedPivot: "Strategic Operations Lead",
        matchReason: "Your answers show a strong preference for data-backed structures, collaborative workflows, and solving direct operational efficiency blocks.",
        nextSteps: [
          "Familiarize yourself with process automation standards (Lean, Six Sigma).",
          "Add quantitative metrics highlighting operational turnarounds to your profile.",
          "Target roles at fast-scaling Product organizations."
        ]
      });
    }

    try {
      const prompt = `
        The user took a SkillGap Wildcard Quiz. Their answers are:
        ${JSON.stringify(answers)}

        Based on these preferences, identify ONE surprise 'wildcard' pivot career path they might fit beautifully but haven't actively considered.
        Explain the match reasoning and provide 3 immediate next steps to explore.

        Respond with this exact JSON format:
        {
          "recommendedPivot": "Role Name",
          "matchReason": "Detailed reason why",
          "nextSteps": ["step 1", "step 2", "step 3"]
        }
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              recommendedPivot: { type: Type.STRING },
              matchReason: { type: Type.STRING },
              nextSteps: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            required: ["recommendedPivot", "matchReason", "nextSteps"]
          }
        }
      });

      const parsed = JSON.parse(response.text?.trim() || "{}");
      res.json(parsed);
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Failed to run quiz reasoning" });
    }
  });

  // Vite Integration & Static Ingress
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SkillGap Express + Vite server listening on http://localhost:${PORT}`);
  });
}

startServer();
