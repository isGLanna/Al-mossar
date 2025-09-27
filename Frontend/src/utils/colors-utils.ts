export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  // Remove o # se existir
  hex = hex.replace('#', '')
  
  // Converte para RGB
  let r = 0, g = 0, b = 0
  
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16) / 255
    g = parseInt(hex[1] + hex[1], 16) / 255
    b = parseInt(hex[2] + hex[2], 16) / 255
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16) / 255
    g = parseInt(hex.substring(2, 4), 16) / 255
    b = parseInt(hex.substring(4, 6), 16) / 255
  }
  
  // Converte RGB para HSL
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    
    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

export function generateColorsVariations(baseColor: string) {
  const hsl = hexToHsl(baseColor)

  const lighter = hslToHex({
    h: hsl.h,
    s: Math.max(0, hsl.s - 10),
    l: Math.min(100, hsl.l + 15)
  })

  const darker = hslToHex({
    h: hsl.h,
    s: Math.min(100, hsl.s + 10),
    l: Math.max(0, hsl.l - 10)
  })

  const darkest = hslToHex({
    h: hsl.h,
    s: Math.min(100, hsl.s + 15),
    l: Math.max(0, hsl.l - 20)
  })

  return {
    color_400: lighter,
    color_500: baseColor,
    color_600: darker,
    color_700: darkest
  }
}

function hslToHex(hsl: { h: number; s: number; l: number }): string {
  const h = hsl.h / 360
  const s = hsl.s / 100
  const l = hsl.l / 100

  let r,g,b

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1/6) return p + (q - p) * 6 * t
      if (t < 1/2) return q
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }

  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}