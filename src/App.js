import './App.css';
import { useCallback } from 'react';

import Dropzone from './Dropzone.js'; 

function App() {

  useCallback((acceptedFiles) => {

    acceptedFiles.map((file) => {
      const reader = new FileReader();

      

      reader.onload = function (e) {
        //console.log('dere', e);
      };

      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  return (
    <div className="App">

      <Dropzone accept={[".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]}/>

    </div>
  );
}

export default App;
