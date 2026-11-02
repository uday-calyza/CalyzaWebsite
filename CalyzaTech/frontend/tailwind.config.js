/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Newsreader', 'Georgia', 'serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace']
      },
      colors: {
        /* ---- Unified semantic theme (single source of truth: index.css) ---- */
        t: {
          bg: 'rgb(var(--background) / <alpha-value>)',
          'bg-elev': 'rgb(var(--background-elevated) / <alpha-value>)',
          'bg-sub': 'rgb(var(--background-subtle) / <alpha-value>)',
          surface: 'rgb(var(--surface) / <alpha-value>)',
          'surface-elev': 'rgb(var(--surface-elevated) / <alpha-value>)',
          'surface-hover': 'rgb(var(--surface-hover) / <alpha-value>)',
          fg: 'rgb(var(--text-primary) / <alpha-value>)',
          'fg-sec': 'rgb(var(--text-secondary) / <alpha-value>)',
          'fg-mut': 'rgb(var(--text-muted) / <alpha-value>)',
          'fg-inv': 'rgb(var(--text-inverse) / <alpha-value>)',
          border: 'rgb(var(--border) / var(--border-a))',
          'border-sub': 'rgb(var(--border) / var(--border-a-sub))',
          'border-strong': 'rgb(var(--border) / var(--border-a-strong))',
          acc: 'rgb(var(--accent-primary) / <alpha-value>)',
          'acc-sec': 'rgb(var(--accent-secondary) / <alpha-value>)',
          'acc-ter': 'rgb(var(--accent-tertiary) / <alpha-value>)',
          'acc-wash': 'rgb(var(--accent-wash) / <alpha-value>)',
          btn: 'rgb(var(--button-primary) / <alpha-value>)',
          'btn-hover': 'rgb(var(--button-primary-hover) / <alpha-value>)',
          'btn-text': 'rgb(var(--button-primary-text) / <alpha-value>)',
          'btn-sec': 'rgb(var(--button-secondary) / <alpha-value>)',
          chip: 'rgb(var(--logo-chip) / <alpha-value>)',
          input: 'rgb(var(--input-background) / <alpha-value>)',
          'input-focus': 'rgb(var(--input-focus) / <alpha-value>)',
          success: 'rgb(var(--success) / <alpha-value>)',
          error: 'rgb(var(--error) / <alpha-value>)',
          warning: 'rgb(var(--warning) / <alpha-value>)',
          /* Explicit fixed sections (cinematic scenes, footer bar) */
          'section-light': '#FAF9FF',
          'section-dark': '#1D062B'
        },
        calyza: {
          /* Aliases into the unified system (legacy class names) */
          bg: 'rgb(var(--background) / <alpha-value>)',
          surface: 'rgb(var(--surface) / <alpha-value>)',
          ink: 'rgb(var(--text-primary) / <alpha-value>)',
          lavender: 'rgb(var(--background-subtle) / <alpha-value>)',
          line: 'rgb(var(--border) / <alpha-value>)',
          acc: 'rgb(var(--accent-primary) / <alpha-value>)',
          /* Static brand constants (crystal internals, fixed dark scenes, logos) */
          ivory: '#F5F2EE',
          lilac: '#EFEAE4',
          peach: '#FFB38A',
          peach2: '#FFD0BC',
          violetB: '#9A62F5',
          violet: '#5B1DB8',
          violet2: '#8A4DE8',
          orchid2: '#7438D3',
          blue: '#4169FF',
          cyan: '#27C7D9',
          mint: '#67D8B0',
          rose: '#E99AC2',
          orchid: '#8A4DE8',
          plum: '#1D062B',
          plum2: '#28043D'
        },
        background: 'hsl(var(--background-hsl))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border-hsl))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
