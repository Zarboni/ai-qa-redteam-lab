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
        mono: ['"Share Tech Mono"', 'monospace'],
        orbitron: ['Orbitron', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 10px rgba(0,245,255,0.4), 0 0 20px rgba(0,245,255,0.2)',
        'neon-purple': '0 0 10px rgba(168,85,247,0.4), 0 0 20px rgba(168,85,247,0.2)',
        'neon-green': '0 0 10px rgba(0,255,157,0.4), 0 0 20px rgba(0,255,157,0.2)',
        'neon-amber': '0 0 10px rgba(251,191,36,0.4), 0 0 20px rgba(251,191,36,0.2)',
        'neon-red': '0 0 10px rgba(255,51,102,0.4), 0 0 20px rgba(255,51,102,0.2)',
      },
    },
  },
  plugins: [],
}
