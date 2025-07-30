'use client';

import { useState } from 'react';
import { extractHarErrorsSafe } from '@/lib/harAnalyzer';

export function LogUploader() {
  const [errors, setErrors] = useState<any[]>([]);
  const [rawText, setRawText] = useState('');

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      setRawText(text);
      const result = extractHarErrorsSafe(text);
      setErrors(result);
    };
    reader.readAsText(file);
  }

  return (
    <div className="p-4 border rounded-xl bg-gray-100">
      <label className="block font-bold mb-2">Выбрать лог</label>
      <input type="file" accept=".har,.json" onChange={handleFileChange} />

      {errors.length > 0 && (
        <div className="mt-4">
          <h3 className="font-bold text-red-600">Обнаружены ошибки:</h3>
          <ul className="mt-2 space-y-2">
            {errors.map((err, i) => (
              <li key={i} className="border p-2 rounded bg-white shadow">
                <div className="font-mono text-sm break-all">
                  <div><b>URL:</b> {err.url}</div>
                  <div><b>Status:</b> {err.status} {err.statusText}</div>
                  {err.errorMessage && <div><b>Ошибка:</b> {err.errorMessage}</div>}
                  {err.responseSnippet && (
                    <details>
                      <summary>Фрагмент ответа</summary>
                      <pre className="text-xs">{err.responseSnippet}</pre>
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
