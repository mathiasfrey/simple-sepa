import React, {useCallback} from "react";
import { useDropzone } from "react-dropzone";
import "./index.css";
import { CSV2XML } from "./csv-2-xml.js";


function callback (result) {
    // console.log(result);

    const xmlString = CSV2XML(result);
    
    // Create blob link to download
    const url = window.URL.createObjectURL(
        new Blob([xmlString], { type: 'text/xml' }),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `FileName.xml`,
      );
  
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);

}

function Dropzone() {
    const onDrop = useCallback((acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader()
        reader.readAsText(file);

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onload = () => {
            callback(reader.result);
        };
        

      })
      
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
    return (
      <div id="wrapper">
        <div {...getRootProps()} id="dropzone" className={`${isDragActive ? "dragging" : ""}`}>

          <div className="icon" />

          <input {...getInputProps()} />
          <p>Simply drag 'n' drop your csv here, or
            

          </p><button>Browse</button>
        </div>
        <a href="https://github.com/mathiasfrey/simple-sepa">Instructions, sample CSV &amp; license</a>
      </div>
    )
  }

export default Dropzone;