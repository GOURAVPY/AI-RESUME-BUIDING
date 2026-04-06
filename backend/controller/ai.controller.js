import ai from "../configs/ai.js";
import Resume from "../models/Resume.js";

let lastRequestTime = 0;

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

export const enhanceProfessionalSummary = async (req, res) => {
  const SYSTEM_PROMPT = `
You are an expert resume writer with deep knowledge of ATS systems and hiring standards.

Write a compelling resume summary that:
- Immediately communicates value
- Highlights core strengths and expertise
- Uses impactful, results-driven language
- Sounds confident and professional

Constraints:
- 3–4 sentences only
- No personal pronouns
- No fluff or generic phrases
- No explanations

Return ONLY the final polished summary.
`;

  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.AI_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userContent },
      ],
    });

    const result = response.choices[0].message.content;

    // ✅ SEND BACK TO FRONTEND
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI generation failed",
    });
  }
};

export const enhanceJobDescription = async (req, res) => {
  const SYSTEM_PROMPT = `
You are an expert resume writer and ATS optimization specialist.

Your task is to enhance and rewrite a job description for a resume.

Guidelines:
- Convert the input into strong resume bullet points
- Use action verbs (Developed, Built, Led, Optimized, etc.)
- Focus on achievements and impact
- Add measurable results when possible (%, numbers, improvements)
- Make it ATS-friendly and professional

Constraints:
- Return EXACTLY 3 to 4 bullet points ONLY
- Each bullet must be 1 short sentence (max 15 words)
- Use bullet format (• or -)
- No personal pronouns (I, my, me)
- No explanations
- No extra text before or after

Return ONLY the bullet points.
`;

   try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // 🔥 COOLDOWN (5 sec)
    const now = Date.now();
    if (now - lastRequestTime < 5000) {
      return res.status(429).json({
        success: false,
        message: "Wait 5 seconds before trying again",
      });
    }
    lastRequestTime = now;

    let response;

    try {
      response = await ai.chat.completions.create({
        model: process.env.AI_MODEL || "gpt-4o-mini",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: userContent },
        ],
        max_tokens: 120,
        temperature: 0.6,
      });
    } catch (err) {
      // 🔁 AUTO RETRY (IMPORTANT)
      if (err?.status === 429) {
        console.log("Retrying after rate limit...");
        await sleep(2000);

        response = await ai.chat.completions.create({
          model: process.env.AI_MODEL || "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userContent },
          ],
          max_tokens: 120,
        });
      } else {
        throw err;
      }
    }

    let result = response?.choices?.[0]?.message?.content || "";

    result = result
      .split("\n")
      .filter(line => line.trim() !== "")
      .slice(0, 4)
      .join("\n");

    return res.status(200).json({
      success: true,
      result,
    });

  } catch (error) {
    console.log("🔥 FINAL ERROR:", error);

    if (error?.status === 429) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "AI generation failed",
    });
  }
};

export const uploadResume = async (req, res) => {
  const SYSTEM_PROMPT = `
You are an expert resume writer and ATS optimization specialist.

Your task is to extract structured data from a resume.

Return JSON in this format:
{
  "personal_info": {
    "full_name": "",
    "email": "",
    "phone": "",
    "location": "",
    "profession": ""
  },
  "skills": [],
  "education": [],
  "experience": []
}
`;

  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing required fields" });
    }

   const userPrompt = `
Extract structured resume data from the following text.

Resume:
${resumeText}

Return JSON in this exact format:

{
  "personal_info": {
    "full_name": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": "",
    "profession": ""
  },
  "professional_summary": "",
  "skills": [],
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": ["", ""],
      "is_current": false
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ],
  "projects": [
    {
      "name": "",
      "type": "",
      "description": ["", ""]
    }
  ]
}

Rules:
- No fake data
- Missing fields = "" or []
- Bullet points must be strong and ATS optimized
- No personal pronouns
`;;

    const response = await ai.chat.completions.create({
      model: process.env.AI_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
    });

    const extractedData = response.choices[0].message.content;

    // ✅ parse JSON correctly
    const parsedData = JSON.parse(extractedData);

    const newResume = await Resume.create({
      userId,
      title,
      ...parsedData,
    });

    res.status(200).json({
      resumeId: newResume._id,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "AI generation failed",
    });
  }
};
