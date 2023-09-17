import { React, useState ,useRef, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../index.css';
import Mynav from "../Mynav";
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Button, Dropdown } from "react-bootstrap";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

const outputFormats = ["OBJ", "GLB", "GLTF"];



function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [msg, setMsg] = useState(null);
    //const [selectedOutput, setSelectedOutput] = useState("Output Format");
    const [downloadFileName, setDownloadFileName] = useState(null);
    const [uploadResponse, setUploadResponse] = useState('');


    const MyModel = () => {
        const groupRef = useRef();
        const url = 'http://15.207.203.116:8085/preview?keyName='+ downloadFileName;
        // Use useLoader to load the OBJ model
        const loadedObject = useLoader(OBJLoader, url);

        return (
            <group ref={groupRef}>
                {/* Use the loadedObject directly */}
                {loadedObject && <primitive object={loadedObject} />}
            </group>
        );
    };

    const downloadImage = () => {


        const url = 'http://15.207.203.116:8085/download?keyName='+ downloadFileName;
        fetch(url, {
            method : 'GET',
            headers: {"content-disposition": "attachment; fileName = ","Access-Control-Allow-Origin":"http://15.207.203.116:8085"

            },
            mode: 'no-cors'
        }).then(res => {
            return res.blob();
        }).then(response => {
            console.log(response);
        }).catch(err => console.error(err));
    }

    const uploadImage = () => {


        const submitForm = new FormData();
        submitForm.append('file', file);

        fetch('http://15.207.203.116:8085/file/upload', {
            method: 'POST',
            body: submitForm,
            mode: 'no-cors'
        }).then(response => response.json()).then(json => setUploadResponse(json)).catch(error => console.log(error))
    }
    return (
        <div className="px-3">
            <Mynav />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm p-4 bg-white rounded">
                        <div>
                            <span className="fs-4">Upload Image</span>
                            <br />
                            <br />
                            <span className="fs-8">Upload image to generate 3D model</span>
                            <br />
                            <br />

                            <input type="file" onChange={(event) => setFile(event.target.files[0])} />
                            <br />
                            <br />
                            <Button onClick={() => uploadImage()}>Upload</Button>
                            <br />
                            <br />
                            { uploadResponse &&

                                <div>
                                    {uploadResponse.uploadStatus}
                                </div>

                            }
                        </div>
                    </div>
                    {/*<div className="col-sm">*/}
                    {/*    <div className="p-4 bg-white rounded">*/}
                    {/*        <div>*/}
                    {/*            <div className="col-sm">*/}

                    {/*                <label className="me-3 fs-4">Preview Model</label>*/}
                    {/*                <br />*/}
                    {/*                <br />*/}
                    {/*                <span className="fs-8">Click on the switch below to preview the model</span>*/}
                    {/*                <br />*/}
                    {/*                <br />*/}
                    {/*                <label className='switch'>*/}
                    {/*                    <input type='checkbox' checked={isOpen} onClick={() => setIsOpen(!isOpen)} />*/}
                    {/*                    <span className='slider' />*/}
                    {/*                </label>*/}

                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="col-sm">
                        <div className="p-4 bg-white rounded">
                            <div>
                                <div className="col-sm">
                                    <span className="fs-4">Generate Model</span>
                                    <br />
                                    <br />
                                    <span className="fs-8">Click button below to generate, download and preview the model</span>
                                    <br />
                                    <br />

                                    <input type='text' onChange={(event) => setDownloadFileName(event.target.value)} placeholder="filename" className="italic-placeholder" />
                                    <br />
                                    <br />
                                    <Button onClick={() => {downloadImage();setIsOpen(!isOpen)}}>Generate & Preview</Button>
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
                                    <div style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden', pointerEvents: 'auto', touchAction: 'none' }}>
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
                    </div>
                }


            </div>
        </div>
    )
}

export default Home
