'use client';

import { useState } from 'react';
import { extractHarErrorsSafe } from '@/lib/harAnalyzer';

export function LogUploader() {
  const [errors, setErrors] = useState<any[]>([]);
  const [rawText, setRawText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log('[HAR] handleFileChange вызван');
    const file = e.target.files?.[0];
    if (!file) {
      console.log('[HAR] Файл не выбран');
      return;
    }

    console.log('[HAR] Файл выбран:', file.name, 'размер:', file.size);
    setIsLoading(true);
    setErrors([]);

    const reader = new FileReader();
    
    reader.onload = () => {
      console.log('[HAR] Файл прочитан');
      const text = reader.result as string;
      console.log('[HAR] Файл загружен, размер:', text.length);
      setRawText(text);
    
      try {
        const result = extractHarErrorsSafe(text);
        console.log('[HAR] Обнаружено ошибок:', result.length);
        setErrors(result);
      } catch (error) {
        console.error('[HAR] Ошибка при обработке файла:', error);
        setErrors([]);
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      console.error('[HAR] Ошибка при чтении файла');
      setIsLoading(false);
    };

    reader.readAsText(file);
  }

  return (
    <div className="p-4 border border-gray-700 rounded-xl bg-gray-800/50 m-4 max-w-4xl mx-auto">
      <label className="block font-bold mb-2 text-gray-200">Выбрать лог</label>
      <input 
        type="file" 
        accept=".har,.json" 
        onChange={handleFileChange}
        className="text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
      />

      {isLoading && (
        <div className="mt-4 text-blue-400">
          Обработка файла...
        </div>
      )}

      {rawText && !isLoading && (
        <div className="mt-4 text-green-400">
          Файл загружен ({rawText.length} символов)
        </div>
      )}

      {errors.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold text-red-400">Обнаружены ошибки:</h3>
          <ul className="mt-2 space-y-2">
            {errors.map((err, i) => (
              <li key={i} className="border border-gray-600 p-2 rounded bg-gray-800 shadow">
                <div className="font-mono text-sm break-all text-gray-300">
                  <div><b>URL:</b> {err.url}</div>
                  <div><b>Status:</b> {err.status} {err.statusText}</div>
                  {err.errorMessage && <div><b>Ошибка:</b> {err.errorMessage}</div>}
                  {err.responseSnippet && (
                    <details>
                      <summary className="text-gray-400 cursor-pointer">Фрагмент ответа</summary>
                      <pre className="text-xs text-gray-400 mt-2">{err.responseSnippet}</pre>
                    </details>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
