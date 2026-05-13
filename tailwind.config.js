/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-void': '#06060f',
        'bg-dark': '#0a0a1a',
        'bg-panel': '#0e0e24',
        'neon-cyan': '#00f5ff',
        'neon-purple': '#a855f7',
        'neon-green': '#00ff9d',
        'neon-amber': '#fbbf24',
        'neon-red': '#ff3366',
        'text-primary': '#e2e8f0',
        'text-secondary': '#94a3b8',
        'text-dim': '#64748b',
        'border-neon': '#1e1e4f',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Share Tech Mono"', 'monospace'],
        orbitron: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan':   '0 0 6px rgba(0,245,255,0.12)',
        'neon-purple': '0 0 6px rgba(168,85,247,0.12)',
        'neon-green':  '0 0 6px rgba(0,255,157,0.12)',
        'neon-amber':  '0 0 6px rgba(251,191,36,0.12)',
        'neon-red':    '0 0 6px rgba(255,51,102,0.12)',
      },
    },
  },
  plugins: [],
}
