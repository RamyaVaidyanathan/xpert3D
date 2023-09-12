import { React, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Mynav from "../Mynav";
import { Canvas, useLoader } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Button, Dropdown } from "react-bootstrap";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const outputFormats = ["OBJ", "GLB", "GLTF"];

export function MyModel() {
    const obj = useLoader(OBJLoader, 'C:/Users/desai/AppData/Local/Temp/output_3d_0.obj');

    return (
        <primitive object={obj} />
    )
}

function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState(null);
    const [selectedOutput, setSelectedOutput] = useState("Output Format");
    const [downloadFileName, setDownloadFileName] = useState(null);

    const downloadImage = () => {

        
         const url = 'http://localhost:8085/download?keyName='+ downloadFileName;
          fetch(url, {
            method : 'GET',
            headers: {"content-disposition": "attachment; fileName = "},
            mode: 'no-cors'
        }).then(res => {
            return res.blob();
        }).then(blob => { 
            window.open(url, '_self')
        }).catch(err => console.error(err));

    }

    const uploadImage = () => {


        const submitForm = new FormData();
        submitForm.append('file', file);

        fetch('http://localhost:8085/file/upload', {
            method: 'POST',
            body: submitForm,
            mode: 'no-cors'
        }).then(response => console.log(response)).catch(error => console.log(error))
    }
    return (
        <div className="px-3">
            <Mynav />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm p-4 bg-white rounded">
                       <div>
                            <span className="fs-4">1. Upload Images</span>
                            <br />
                            <br />
                            <span className="fs-8">Upload one or more Images</span>
                            <br />
                            <br />

                            <input type="file" onChange={(event) => setFile(event.target.files[0])} />
                            <br />
                            <br />
                            <Button onClick={() => uploadImage()}>Upload</Button>
                            <br />
                            <br />
                            
                            </div>
                    </div>
                    <div className="col-sm">
                        <div className="p-4 bg-white rounded">
                            <div>
                                <div className="col-sm">
                                    
                                    <label className="me-3 fs-4">2. Preview Model</label>
                                    <br />
                                    <br />
                                    <span className="fs-8">Click on the switch below to preview the model</span>
                                    <br />
                                    <br />
                                    <label className='switch'>
                                        <input type='checkbox' checked={isOpen} onClick={() => setIsOpen(!isOpen)} />
                                        <span className='slider' />
                                    </label>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm">
                        <div className="p-4 bg-white rounded">
                            <div>
                                <div className="col-sm">
                                    <span className="fs-4">3. Generate Model</span>
                                    <br />
                                    <br />
                                    <span className="fs-8">Select the output format and click on generate button below to generate and download the model</span>
                                    <br />
                                    <br />

                                    <label>Input the File Name to download model</label>
                                    <input type='text' onChange={(event) => setDownloadFileName(event.target.value)} />
                                    <br />
                                    <br />
                                    <br />

                                    <Dropdown>
                                        <Dropdown.Toggle>
                                        {selectedOutput}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {outputFormats.map((output) => (
                                                <Dropdown.Item onClick={() => setSelectedOutput(output)}>{output}</Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>

                                    <br />

                                    

                                    
                                    
                                    <Button onClick={() => downloadImage()}>Generate</Button>
                                    <br />
                                    <br />

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {isOpen &&
                <div className="row g-3 my-2">

                    <div>
                        <div className="bg-white rounded">
                            <div>
                                <span className="customPadding fs-4">Preview</span>
                              
                                    <Canvas>
                                        <ambientLight intensity={1.0} />
                                        <pointLight position={[10, 10, 10]} />
                                        <MyModel />
                                        <PerspectiveCamera makeDefault position={[10, 10, 10]} />
                                        <OrbitControls />
                                    </Canvas>
                                
                            </div>
                        </div>
                    </div>
                </div>
                }


            </div>
        </div>
    )
}

export default Home