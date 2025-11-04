declare module "three-stdlib" {
  import * as THREE from "three";
  export class FontLoader extends THREE.Loader {
    parse(json: any): THREE.Font;
  }

  export class TextGeometry extends THREE.ExtrudeGeometry {
    constructor(
      text: string,
      parameters: {
        font: THREE.Font;
        size?: number;
        height?: number;
        curveSegments?: number;
        bevelEnabled?: boolean;
        bevelThickness?: number;
        bevelSize?: number;
        bevelOffset?: number;
        bevelSegments?: number;
      }
    );
  }
}
