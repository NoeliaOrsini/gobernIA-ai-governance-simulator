import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// API route for AI-powered executive governance consultation
app.post('/api/ai-audit', async (req, res) => {
  try {
    const { companyProfile, scores, decisions, maturityLevel } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        available: false,
        message: 'No GEMINI_API_KEY found, fallback to internal algorithmic engine'
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Actúa como un Auditor Principal y Consultor Senior de Gobernanza de Datos e Inteligencia Artificial (conforme a la Ley 25.326 de Protección de Datos Personales de Argentina, las Resoluciones de la AAIP, el Reglamento Europeo de Inteligencia Artificial - EU AI Act, y normas ISO/IEC 42001 y DAMA DMBOK).
Analiza los resultados de esta simulación corporativa:

Perfil de la empresa:
- Sector: ${companyProfile.sector || 'Tecnología y Servicios'}
- Tamaño: ${companyProfile.size || 'Mediana Empresa'}

Puntuaciones en las Dimensiones Maestras (0-100):
1. Cumplimiento Normativo (Ley 25.326 Argentina / GDPR): ${scores.compliance}/100
2. Ética & Transparencia (EU AI Act / Paridad): ${scores.ethics}/100
3. Eficiencia Operativa & ROI (MLOps / DAMA DMBOK): ${scores.efficiency}/100

Nivel Global de Madurez Alcanzado: ${maturityLevel.name} (${maturityLevel.level}/5)

Decisiones clave tomadas en los escenarios:
${decisions.map((d: any, idx: number) => `${idx + 1}. [Escenario ${d.scenarioNumber || idx + 1}] ${d.title}: Eligió "${d.selectedOptionTitle}" (Dictamen: ${d.verdict})`).join('\n')}

Genera un dictamen ejecutivo en formato JSON estructurado con:
{
  "executiveSummary": "Párrafo conciso con el diagnóstico estratégico del estado de gobernanza enfocado en la normativa argentina y global.",
  "strengths": ["Fortaleza 1", "Fortaleza 2"],
  "criticalGaps": ["Brecha de riesgo 1", "Brecha de riesgo 2"],
  "roadmap": {
    "shortTerm": "Acciones urgentes a 90 días (enfocado en Ley 25.326 y perímetro)",
    "mediumTerm": "Iniciativas de consolidación a 6 meses (MLOps y comités)",
    "longTerm": "Estrategia de escala y liderazgo a 12 meses (certificación ISO 42001)"
  },
  "regulatoryReadiness": {
    "ley25326": "Evaluación breve de riesgo frente a la Ley 25.326 y AAIP",
    "euAiAct": "Evaluación breve frente al AI Act",
    "damaDmbok": "Evaluación de madurez en gestión del dato"
  }
}
Responde ÚNICAMENTE con el objeto JSON válido.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });

    const text = response.text || '{}';
    let parsedData = {};
    try {
      parsedData = JSON.parse(text);
    } catch {
      parsedData = { textOutput: text };
    }

    return res.json({
      available: true,
      auditReport: parsedData
    });
  } catch (error: any) {
    console.error('Error generating AI audit:', error);
    return res.status(500).json({
      available: false,
      error: error.message || 'Error processing AI consultation'
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
