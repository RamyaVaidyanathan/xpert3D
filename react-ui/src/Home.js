import { React, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Mynav from "./Mynav";
import { Canvas } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Button } from "react-bootstrap";
import './App.css';

export function MyModel() {
    const gltf1 =  useGLTF('abc.gltf');

    return (
        <primitive object={gltf1.scene} />
    )
}

function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState(null);

    const uploadImage = () => {

    
         const submitForm = new FormData();
        submitForm.append('file', file);
        submitForm.append('fileName', 'abcd.jpg');
       fetch('http://localhost:8085/file/upload', {
            method : 'POST',
            body : submitForm,
            mode: 'no-cors'
        }).then(response => console.log(response)).catch(error => console.log(error)) 

      /*   const submitForm2 = new FormData();
        submitForm2.append('keyName', 'abcd.jpg');

        fetch('http://localhost:8085/download?keyName=abcd.jpg', {
            method : 'GET',
            mode: 'no-cors'
        }).then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.jpg"); 
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch((err) => {
        console.log(err);
      });
       /* .then(function(resp) {
            return resp.blob();
          }).then(function(blob) {
            download(blob);
          });*/
        // working code for download starts below  

      /*    const url = 'http://localhost:8085/download?keyName=livan_man_0.obj';
          fetch(url, {
            method : 'GET',
            headers: {"content-disposition": "attachment; fileName = "},
            mode: 'no-cors'
        }).then(res => {
            return res.blob();
        }).then(blob => { 
            window.open(url, '_self')
        }).catch(err => console.error(err));  */
        // working code for download ends here  

        /*    const href = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = href;
            link.setAttribute('download', 'testmodule.jpg'); 
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            //const a = this.linkRef.current;
            //a.download = 'abcd.jpg';
          //  a.href = href;
           // a.click();
            //a.href = '';
        }).catch(err => console.error(err)); */

        
    }
    return (
        <div className="px-3">
            <Mynav />
            <div className="container-fluid">
                <div className="row g-3 my-2">
                    <div className="col-md-3">
                        <div className="p-3 bg-white shadow-sm d-flex justify-content around align-items-center rounded">
                            <div>
                                <span className="fs-4">Uplaod Images</span>
                                <br />
                                <br />

                                <input type="file" onChange={(event) => setFile(event.target.files[0])}/>
                                <br />
                                <br />
                                <Button onClick={() => uploadImage()}>Upload</Button>
                                <br />
                                <br />
                                <label className="me-3 fs-4">Preview Model</label>
                                <label className='switch'>
                                    <input type='checkbox' checked={isOpen} onClick={() => setIsOpen(!isOpen)} />
                                    <span className='slider' />
                                </label>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="p-3 bg-white shadow-sm d-flex justify-content around align-items-center rounded">
                            <div>
                                <span className="fs-4">Preview</span>
                                { isOpen &&
                                <Canvas>
                                    <ambientLight intensity={0.8} />
                                    <pointLight position={[10, 10, 10]} />
                                    <MyModel />
                                    <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                                    <OrbitControls />
                                </Canvas>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home