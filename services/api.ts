import config from '@/config';

export interface ProductRecommendation {
  id: string;
  score: number;
  name: string;
  price: number;
  image_url: string;
  product_link: string;
  search_query: string;
  explanation_es: string;
  explanation_en: string;
}

export interface RecommendationResponse {
  summary_es: string;
  summary_en: string;
  products: ProductRecommendation[];
}

export async function getRecommendations(formattedQuiz: string): Promise<RecommendationResponse> {
  const response = await fetch(`${config.api.baseUrl}/api/recommend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      formatted_quiz: formattedQuiz
    })
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
}

export function formatQuizAnswers(answers: Record<string, string>, questions: any[]): string {
  return Object.entries(answers)
    .map(([questionId, answer]) => {
      const question = questions.find(q => q.id === questionId);
      return question ? `${question.text.replace("[mascota]", ["Perro", "Gato", "Conejo"].includes(answers.petType) ? answers.petType.toLowerCase() : "mascota")}:${answer}` : '';
    })
    .filter(Boolean)
    .join(',');
}
