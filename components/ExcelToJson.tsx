// components/ExcelToJson.tsx
import { useState, useRef, DragEvent, ChangeEvent, FormEvent } from 'react';
import { convertExcelToJson } from '@/utils/api';
import { formatFileSize } from '@/utils/helpers';

const ExcelToJson = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [jsonResult, setJsonResult] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  };
  
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('active');
  };
  
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('active');
  };
  
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('active');
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };
  
  const validateAndSetFile = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    if (extension === 'xlsx' || extension === 'xls') {
      setSelectedFile(file);
      setIsError(false);
    } else {
      setIsError(true);
      setJsonResult('Please select an Excel file with .xlsx or .xls extension');
    }
  };
  
  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setIsError(true);
      setJsonResult('Please select an Excel file');
      return;
    }
    
    try {
      setIsLoading(true);
      
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const result = await convertExcelToJson(formData);
      setJsonResult(JSON.stringify(result, null, 2));
      setIsError(false);
    } catch (error) {
      setIsError(true);
      setJsonResult(error instanceof Error ? error.message : 'Failed to convert Excel to JSON');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopyToClipboard = () => {
    if (jsonResult) {
      navigator.clipboard.writeText(jsonResult);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };
  
  return (
    <div className="tab-content active">
      <h2><i className="fas fa-file-excel"></i> Convert Excel to JSON</h2>
      <p>Upload an Excel file (.xls or .xlsx) to convert it to JSON format.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="excelFile">Upload Excel File</label>
          <div className="file-input-wrapper">
            <div 
              className="file-input-trigger" 
              onClick={handleFileSelect}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <i className="fas fa-cloud-upload-alt"></i>
              <p>Drag & drop your Excel file here or click to browse</p>
            </div>
            <input 
              type="file" 
              id="excelFile" 
              accept=".xls,.xlsx" 
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </div>
          {selectedFile && (
            <div className="selected-file">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fas fa-file-excel" style={{ color: '#217346' }}></i>
                <div>
                  <strong>{selectedFile.name}</strong>
                  <div>{formatFileSize(selectedFile.size)}</div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <button type="submit" disabled={isLoading}>
          <i className="fas fa-exchange-alt"></i> Convert to JSON
          {isLoading && <span className="loading" style={{ display: 'inline-block' }}></span>}
        </button>
      </form>
      
      {jsonResult && (
        <div className={`result ${isError ? 'error' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h3>{isError ? 'Error' : 'JSON Result'}</h3>
            {!isError && (
              <button className="copy-btn" onClick={handleCopyToClipboard}>
                <i className={`fas ${isCopied ? 'fa-check' : 'fa-copy'}`}></i> {isCopied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <pre><code>{jsonResult}</code></pre>
        </div>
      )}
    </div>
  );
};

export default ExcelToJson;