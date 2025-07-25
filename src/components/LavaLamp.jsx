/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: xenadus (https://sketchfab.com/xenadus)
License: CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)
Source: https://sketchfab.com/3d-models/react-logo-circle-540ff21ac0f54a038df6f634c7cce726
Title: React logo circle
*/

import React, { useRef } from 'react'
import { Float, useGLTF } from '@react-three/drei'

const LavaLamp = (props) =>{
  const { nodes, materials } = useGLTF('models/lava_Lamp.glb')
  return (
    <group {...props} dispose={null}>
      <Float>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.model.geometry}
          material={materials.CustomMaterial}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </Float>
    </group>
  )
}

useGLTF.preload('models/lava_Lamp.glb')

export default LavaLamp
