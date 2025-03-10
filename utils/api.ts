// utils/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ;

export const checkServiceHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/status`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000) // Timeout after 5 seconds
    });
    return response.ok;
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
};

export const convertExcelToJson = async (formData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/excel-to-json`, {
    method: 'POST',
    body: formData
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to convert Excel to JSON');
  }
  
  return response.json();
};

export const convertJsonToExcel = async (jsonData: any, fileType: string, filename?: string): Promise<Blob> => {
  // Set URL parameters
  let url = `${API_BASE_URL}/json-to-excel`;
  const params = new URLSearchParams();
  
  if (filename) {
    params.append('filename', filename);
  }
  
  params.append('fileType', fileType);
  
  if (params.toString()) {
    url += '?' + params.toString();
  }
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to convert JSON to Excel');
  }
  
  return response.blob();
};