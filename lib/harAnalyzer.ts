// lib/harAnalyzer.ts
export function extractHarErrorsSafe(text: string): any[] {
    try {
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');
      if (jsonStart === -1 || jsonEnd === -1) return [];
  
      const trimmed = text.slice(jsonStart, jsonEnd + 1);
      const parsed = JSON.parse(trimmed);
  
      return extractHarErrors(parsed);
    } catch (e) {
      console.error('Ошибка при парсинге HAR:', e);
      return [];
    }
  }
  
  export function extractHarErrors(har: any): any[] {
    const entries = har?.log?.entries ?? [];
    const errors = [];
  
    for (const entry of entries) {
      const { response, request } = entry;
      if (!response || !request) continue;
  
      const status = response.status;
      if (status >= 400) {
        errors.push({
          url: request.url,
          status,
          statusText: response.statusText,
          errorMessage: response._error || response.content?.text?.slice(0, 200),
          responseSnippet: response.content?.text?.slice(0, 300),
        });
      }
    }
  
    return errors;
  }
  