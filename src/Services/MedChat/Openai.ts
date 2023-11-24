import axios, { AxiosRequestConfig } from 'axios';

export const openAI = {
  async generateMedicalResponse(prompt: string): Promise<string> {
    const API_KEY = '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';
    const OPENAI_API_MEDICAL_ENDPOINT =
      'https://api.openai.com/v1/engines/davinci/medical/completions';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    };

    const requestData: AxiosRequestConfig = {
      method: 'post',
      url: OPENAI_API_MEDICAL_ENDPOINT,
      headers,
      data: {
        prompt,
        max_tokens: 50, // Adjust the number of tokens for the response length
      },
    };

    try {
      const response = await axios(requestData);
      if (
        response.data &&
        response.data.choices &&
        response.data.choices.length > 0
      ) {
        const medicalResponse = response.data.choices[0].text.trim();
        return medicalResponse;
      } else {
        throw new Error('Invalid response from OpenAI API');
      }
    } catch (error) {
      console.error('Error generating medical response from OpenAI:', error);
      throw new Error('Failed to generate medical response');
    }
  },
};
