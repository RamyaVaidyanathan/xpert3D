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
    const obj = useLoader(OBJLoader, 'ch1.obj');

    return (
        <primitive object={obj} />
    )
}

function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState(null);
    const [selectedOutput, setSelectedOutput] = useState("Output Format");

    const uploadImage = () => {


        const submitForm = new FormData();
        submitForm.append('file', file);

        fetch('http://localhost:8080/uploadImage', {
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

                            <input type="file" multiple onChange={(event) => setFile(event.target.files)} />
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
                                    
                                    
                                    <Button onClick={() => uploadImage()}>Generate</Button>
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