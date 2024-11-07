const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Write a script to generate 30 seconds video on topic: interesting historical story along with Ai image prompt in realistic format for each scene. Give me result in JSON format ONLY with imagePrompt and contextText as field\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "imagePrompt": "A bustling medieval marketplace in 14th century Europe. People are buying and selling goods, and there are many colorful stalls and tents.",\n    "contextText": "In the heart of 14th century Europe, a devastating plague known as the Black Death swept across the continent, wiping out millions of lives."\n  },\n  {\n    "imagePrompt": "A close-up of a person with buboes, the telltale sign of the plague, appearing on their body.",\n    "contextText": "The disease was highly contagious, spreading rapidly through flea-infested rats and human contact."\n  },\n  {\n    "imagePrompt": "A dramatic scene of people collapsing and dying in the streets, with bodies piled up in the corners.",\n    "contextText": "The plague\'s death toll was staggering, with cities and towns losing a significant portion of their populations."\n  },\n  {\n    "imagePrompt": "A somber procession of people carrying a coffin, shrouded in black cloth, through a deserted street.",\n    "contextText": "Fear and despair gripped the populace, as they witnessed the relentless spread of the plague."\n  },\n  {\n    "imagePrompt": "A doctor in a long, black cloak and a mask with a beak, attending to a sick patient.",\n    "contextText": "Doctors at the time, despite their best efforts, were unable to cure the disease, resorting to ineffective treatments."\n  },\n  {\n    "imagePrompt": "A panoramic shot of a graveyard, with countless unmarked graves, symbolizing the massive loss of life caused by the Black Death.",\n    "contextText": "The Black Death, a dark chapter in human history, left an indelible mark on Europe, shaping its social, economic, and cultural landscape."\n  }\n]\n```\n',
        },
      ],
    },
  ],
});
