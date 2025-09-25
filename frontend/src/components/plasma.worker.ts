// plasma.worker.ts
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import type { OGLRenderingContext } from 'ogl';
let renderer: Renderer;
let program: Program;
let mesh: Mesh;
let gl: OGLRenderingContext;
let startTime: number;

const vertex = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uOpacity;
out vec4 fragColor;

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution;
  float c = 0.5 + 0.5 * sin(iTime + uv.x*10.0 + uv.y*10.0);
  vec3 color = mix(vec3(c), uCustomColor, 0.5);
  fragColor = vec4(color, uOpacity);
}`;

// Listen for messages from React
self.onmessage = (e: MessageEvent) => {
  const data = e.data;

  if (data.type === 'init') {
    const { canvas, width, height, dpr, color, opacity } = data;

    renderer = new Renderer({ canvas, dpr });
    gl = renderer.gl;

    const geometry = new Triangle(gl);
    program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([width, height]) },
        uCustomColor: { value: new Float32Array(color) },
        uOpacity: { value: opacity },
      },
    });
    mesh = new Mesh(gl, { geometry, program });

    startTime = performance.now();

    const loop = (t: number) => {
      program.uniforms.iTime.value = (t - startTime) * 0.001;
      renderer.render({ scene: mesh });
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  if (data.type === 'resize') {
    renderer.setSize(data.width, data.height);
    (program.uniforms.iResolution.value as Float32Array)[0] = data.width;
    (program.uniforms.iResolution.value as Float32Array)[1] = data.height;
  }

  if (data.type === 'update') {
    if (data.color) {
      (program.uniforms.uCustomColor.value as Float32Array).set(data.color);
    }
    if (data.opacity !== undefined) {
      program.uniforms.uOpacity.value = data.opacity;
    }
  }
};
