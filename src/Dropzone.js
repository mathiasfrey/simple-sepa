import React, {useCallback} from "react";
import { useDropzone } from "react-dropzone";
import "./index.css";


function callback (result) {
    console.log(result);

    // https://www.hettwer-beratung.de/sepa-spezialwissen/sepa-technische-anforderungen/camt-format-camt-054/
    
    // Create blob link to download
    const url = window.URL.createObjectURL(
        new Blob([result]),
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `FileName.csv`,
      );
  
      // Append to html link element page
      document.body.appendChild(link);
  
      // Start download
      link.click();
  
      // Clean up and remove the link
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
    const {getRootProps, getInputProps} = useDropzone({onDrop})
  
    return (
      <div id="wrapper">
        <div {...getRootProps()} id="dropzone">

          <div className="icon" />

          <input {...getInputProps()} />
          <p>Simply drag 'n' drop your csv here, or

            

          </p><button>Browse</button>
        </div>
        <a href="https://github.com/mathiasfrey/simple-sepa">Instructions &amp; license</a>
      </div>
    )
  }

export default Dropzone;