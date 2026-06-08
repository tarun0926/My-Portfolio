"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function WebGLShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene | null
    camera: THREE.OrthographicCamera | null
    renderer: THREE.WebGLRenderer | null
    mesh: THREE.Mesh | null
    uniforms: any
    animationId: number | null
  }>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
    animationId: null,
  })

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const { current: refs } = sceneRef

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      // Hash function for noise
      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      // Draw a grid of twinkling realistic stars
      vec3 drawStars(vec2 uv, float threshold, float twinkleSpeed, float maxOpacity) {
        vec2 id = floor(uv);
        vec2 gv = fract(uv) - 0.5;
        
        float n = hash(id); // random value between 0 and 1
        
        // Only draw if above threshold
        float starMask = step(threshold, n);
        
        // Random offset inside the grid cell
        vec2 offset = vec2(fract(n * 15.3), fract(n * 94.7)) - 0.5;
        float d = length(gv - offset * 0.7);
        
        // Twinkle effect (sine wave based on time and individual offset)
        float twinkle = sin(time * twinkleSpeed + n * 62.8) * 0.45 + 0.55;
        
        // Realistic star shape: sharp core + soft glow corona
        float core = smoothstep(0.06, 0.0, d);
        float glow = exp(-d * 18.0) * 0.35;
        float intensity = (core + glow) * twinkle * maxOpacity * starMask;
        
        // Multi-color star temperatures (light blue, light orange, and bright white)
        float colorSelect = fract(n * 43.1);
        vec3 blueStar = vec3(0.65, 0.85, 1.0);
        vec3 orangeStar = vec3(1.0, 0.82, 0.62);
        vec3 whiteStar = vec3(1.0, 1.0, 1.0);
        
        vec3 starColor = mix(whiteStar, blueStar, step(0.5, colorSelect));
        starColor = mix(starColor, orangeStar, step(0.82, colorSelect));
        
        return starColor * intensity;
      }

      // Slow nebula flow
      float nebulaFlow(vec2 p, float t) {
        float val = 0.0;
        float strength = 1.0;
        float accum = 0.0;
        
        for (int i = 0; i < 4; i++) {
          p.x += sin(p.y + t) * strength;
          p.y += cos(p.x + t) * strength;
          accum += strength;
          val += sin(p.x + p.y) * strength;
          strength *= 0.6;
        }
        return abs(val / accum);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        
        // Extra slow-motion factor (movement speed is extremely gentle)
        float t = time * 0.04; 
        
        // 1. NEBULA LAYER (Deep cosmic background)
        float flowVal = nebulaFlow(uv * 0.8, t * 0.2);
        vec3 darkSpace = vec3(0.043, 0.067, 0.125); // #0B1120 matching portfolio base
        vec3 nebulaCyan = vec3(0.01, 0.13, 0.19); // Subtle cyan gas
        vec3 nebulaPurple = vec3(0.06, 0.03, 0.11); // Subtle purple gas
        
        vec3 background = mix(darkSpace, nebulaPurple, flowVal * 0.55);
        background = mix(background, nebulaCyan, pow(flowVal, 2.0) * 0.35);
        
        // 2. STARS LAYERS (Parallax movement in slow motion)
        vec3 starsColor = vec3(0.0);
        
        // Layer A: High-density tiny, distant stars, very slow drift
        vec2 uvA = uv * 32.0 + vec2(t * 0.08, t * 0.05);
        starsColor += drawStars(uvA, 0.85, 1.6, 0.35);
        
        // Layer B: Medium density stars, slow drift
        vec2 uvB = uv * 18.0 + vec2(t * -0.05, t * 0.1);
        starsColor += drawStars(uvB, 0.92, 1.1, 0.6);
        
        // Layer C: Bright foreground stars
        vec2 uvC = uv * 8.0 + vec2(t * 0.12, t * -0.07);
        starsColor += drawStars(uvC, 0.96, 0.7, 0.9);
        
        // Combine background and colored stars
        vec3 finalColor = background + starsColor;
        
        // Apply vignette for premium layout
        vec2 screenUv = gl_FragCoord.xy / resolution;
        float vignette = screenUv.x * screenUv.y * (1.0 - screenUv.x) * (1.0 - screenUv.y);
        vignette = clamp(pow(16.0 * vignette, 0.25), 0.0, 1.0);
        finalColor *= vignette;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

    const initScene = () => {
      refs.scene = new THREE.Scene()
      refs.renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
      refs.renderer.setPixelRatio(window.devicePixelRatio)
      refs.renderer.setClearColor(new THREE.Color(0x000000), 0.0) // Transparent clear color to merge with dark navy bg

      refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

      refs.uniforms = {
        resolution: { value: [window.innerWidth, window.innerHeight] },
        time: { value: 0.0 },
        xScale: { value: 1.0 },
        yScale: { value: 0.5 },
        distortion: { value: 0.05 },
      }

      const position = [
        -1.0, -1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0,  1.0, 0.0,
      ]

      const positions = new THREE.BufferAttribute(new Float32Array(position), 3)
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", positions)

      const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: refs.uniforms,
        side: THREE.DoubleSide,
        transparent: true,
      })

      refs.mesh = new THREE.Mesh(geometry, material)
      refs.scene.add(refs.mesh)

      handleResize()
    }

    const animate = () => {
      if (refs.uniforms) refs.uniforms.time.value += 0.01
      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera)
      }
      refs.animationId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms) return
      const width = window.innerWidth
      const height = window.innerHeight
      refs.renderer.setSize(width, height, false)
      refs.uniforms.resolution.value = [width, height]
    }

    initScene()
    animate()
    window.addEventListener("resize", handleResize)

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId)
      window.removeEventListener("resize", handleResize)
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh)
        refs.mesh.geometry.dispose()
        if (refs.mesh.material instanceof THREE.Material) {
          refs.mesh.material.dispose()
        }
      }
      refs.renderer?.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full block -z-50 pointer-events-none"
    />
  )
}
