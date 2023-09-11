import { React, useState } from "react";
import { Canvas } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { MyModel } from "./Home";

function Preview () {

    
    return (
        <div>
        
            

                <div>
                    <div className="bg-white rounded">
                        <div>
                            <span className="customPadding fs-4">Preview</span>
                          
                                <Canvas>
                                    <ambientLight intensity={0.8} />
                                    <pointLight position={[10, 10, 10]} />
                                    <MyModel />
                                    <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                                    <OrbitControls />
                                </Canvas>
                            
                        </div>
                    </div>
                </div>
            
            
            </div>
    )

}

export default Preview