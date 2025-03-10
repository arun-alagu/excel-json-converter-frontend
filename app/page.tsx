"use client"
// pages/index.tsx
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import TabSelector from '@/components/TabSelector';
import ExcelToJson from '@/components/ExcelToJson';
import JsonToExcel from '@/components/JsonToExcel';
import Footer from '@/components/Footer';
import { TabType } from '@/types';

const Home = () => {
  const [activeTab, setActiveTab] = useState<TabType>('excel-to-json');
  
  return (
    <>
      <Head>
        <title>Excel-JSON Converter</title>
        <meta name="description" content="Convert between Excel and JSON formats with ease" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
      </Head>
      
      <div className="container">
        <Header />
        
        <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab === 'excel-to-json' ? (
          <ExcelToJson />
        ) : (
          <JsonToExcel />
        )}
        
        <Footer />
      </div>
    </>
  );
};

export default Home;