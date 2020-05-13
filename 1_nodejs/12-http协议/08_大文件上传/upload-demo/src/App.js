import React from 'react';
import './App.css';
import { Button } from 'antd';
import FileUpload from "./components/FileUpload"
function App() {
  return (
    <div className='app'>
      <Button type='primary'>hello App</Button>
      <FileUpload />
    </div>
  );
}

export default App;
