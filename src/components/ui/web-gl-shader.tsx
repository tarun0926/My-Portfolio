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

      // Draw a grid of twinkling stars without dynamic branching
      float drawStars(vec2 uv, float threshold, float twinkleSpeed, float starSize) {
        vec2 id = floor(uv);
        vec2 gv = fract(uv) - 0.5;
        
        float n = hash(id); // random value between 0 and 1
        
        // Twinkle effect (sine wave based on time and individual offset)
        float twinkle = sin(time * twinkleSpeed + n * 6.28) * 0.4 + 0.6;
        
        // Random offset inside the grid cell
        vec2 offset = vec2(fract(n * 15.3), fract(n * 94.7)) - 0.5;
        float d = length(gv - offset * 0.7);
        
        // Smooth star point with falloff
        float intensity = (starSize / d) * twinkle;
        
        // Only keep stars above the threshold
        intensity *= step(threshold, n);
        
        // Apply a cut-off to prevent infinite brightness at center
        return smoothstep(0.0, 1.2, intensity);
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
        
        // Slow time factor for stars and nebula
        float t = time * 0.15;
        
        // 1. NEBULA LAYER (Deep cosmic background)
        float flowVal = nebulaFlow(uv * 0.8, t * 0.3);
        vec3 darkSpace = vec3(0.03, 0.05, 0.1); // Dark space base
        vec3 nebulaCyan = vec3(0.0, 0.15, 0.22); // Deep cyan gas
        vec3 nebulaPurple = vec3(0.06, 0.02, 0.12); // Deep purple gas
        
        vec3 background = mix(darkSpace, nebulaPurple, flowVal * 0.6);
        background = mix(background, nebulaCyan, pow(flowVal, 2.0) * 0.4);
        
        // 2. STARS LAYERS (Parallax movement in slow motion)
        float starsIntensity = 0.0;
        
        // Layer A: Tiny, far away, slow drift
        vec2 uvA = uv * 12.0 + vec2(t * 0.03, t * 0.02);
        starsIntensity += drawStars(uvA, 0.96, 2.5, 0.003) * 0.45;
        
        // Layer B: Medium stars, moderate drift
        vec2 uvB = uv * 7.0 + vec2(t * -0.02, t * 0.04);
        starsIntensity += drawStars(uvB, 0.97, 1.8, 0.006) * 0.7;
        
        // Layer C: Brighter, closer stars, slightly faster
        vec2 uvC = uv * 3.5 + vec2(t * 0.05, t * -0.03);
        starsIntensity += drawStars(uvC, 0.99, 1.2, 0.012) * 1.0;
        
        // Color the stars (mix white, cyan, and slight warm blue)
        vec3 starsColor = vec3(0.9, 0.95, 1.0) * starsIntensity;
        starsColor += vec3(0.0, 0.4, 0.8) * pow(starsIntensity, 1.5) * 0.3;
        
        // Combine background and stars
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
