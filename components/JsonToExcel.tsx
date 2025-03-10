import { useState, FormEvent } from 'react';
import { convertJsonToExcel } from '@/utils/api';

interface StatusMessage {
  text: string;
  isError: boolean;
}

const JsonToExcel = () => {
  const [jsonData, setJsonData] = useState('');
  const [fileType, setFileType] = useState('xlsx');
  const [filename, setFilename] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!jsonData.trim()) {
      setStatusMessage({
        text: 'Please enter JSON data',
        isError: true
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Parse JSON
      const parsedJsonData = JSON.parse(jsonData);
      
      // Convert to Excel
      const blob = await convertJsonToExcel(parsedJsonData, fileType, filename);
      
      // Create download link
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename ? 
        (filename.endsWith('.' + fileType) ? filename : filename + '.' + fileType) : 
        'converted_data.' + fileType;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      setStatusMessage({
        text: 'Conversion successful! File downloaded.',
        isError: false
      });
    } catch (error) {
      setStatusMessage({
        text: `Error: ${error instanceof Error ? error.message : 'Failed to convert JSON to Excel'}`,
        isError: true
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="tab-content active">
      <h2><i className="fas fa-file-code"></i> Convert JSON to Excel</h2>
      <p>Enter JSON data to convert it to an Excel file.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="jsonData">JSON Data</label>
          <textarea 
            id="jsonData" 
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            placeholder='{"data": [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]}'
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="fileType">File Type</label>
          <select 
            id="fileType"
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
          >
            <option value="xlsx">XLSX (Excel 2007+)</option>
            <option value="xls">XLS (Excel 97-2003)</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="filename">Filename (Optional)</label>
          <input 
            type="text" 
            id="filename"
            value={filename}
            onChange={(e) => setFilename(e.target.value)} 
            placeholder="converted_data"
          />
        </div>
        
        <button type="submit" disabled={isLoading}>
          <i className="fas fa-exchange-alt"></i> Convert to Excel
          {isLoading && <span className="loading" style={{ display: 'inline-block' }}></span>}
        </button>
      </form>
      
      {statusMessage && (
        <div className="status-message" style={{ color: statusMessage.isError ? 'red' : 'green' }}>
          {statusMessage.text}
        </div>
      )}
    </div>
  );
};

export default JsonToExcel;