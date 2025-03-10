import { useState, useEffect } from 'react';
import { checkServiceHealth } from '@/utils/api';

const Header = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  
  useEffect(() => {
    const checkHealth = async () => {
      try {
        const status = await checkServiceHealth();
        setIsOnline(status);
      } catch (error) {
        setIsOnline(false);
      }
    };
    
    checkHealth();
    
    const interval = setInterval(checkHealth, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <header>
      <h1><i className="fas fa-exchange-alt"></i> Excel-JSON Converter</h1>
      <p>Convert between Excel and JSON formats with ease</p>
      <div className={`health-indicator ${isOnline === null ? '' : isOnline ? 'online' : 'offline'}`}>
        <span className="dot"></span>
        <span>{isOnline === null ? 'Checking service status...' : isOnline ? 'Service Online' : 'Service Offline'}</span>
      </div>
    </header>
  );
};

export default Header;