import { createContext, useState } from "react"
import {hexToHsl, generateColorsVariations} from '../utils/colors-utils'

interface Theme {
  texto: string
  background_color: string
  menu_containers: string

  branding_400: string
  branding_500: string
  branding_600: string

  second_300: string
  second_500: string
  second_700: string

  second_300_a: string
  second_500_a: string
  second_700_a: string
}

interface ThemeContextProps {
  theme: Theme
  loading: boolean
  toggleTheme: (type: "branding" | "second" | "texto" | "background_color" | "menu_containers", color: string) => void
}


const defaultTheme = {
  // Cores de texto e fundo
  texto: '#252525',
  background_color: '#c4cfef',
  menu_containers: '#ebebf8',

  // Cores da marca (branding)
  branding_400: '#c7a137',
  branding_500: '#ffb253',
  branding_600: '#dfa81a',
  branding_700: '#d69147',

  // Cores secundárias
  second_300: '#3b5e3e',
  second_500: '#266823',
  second_700: '#134a0d',

  // Cores secundárias com transparência
  second_300_a: '#3b5e3e80',
  second_500_a: '#26682380',
  second_700_a: '#134a0d80'
}

const themeContext = {
  theme: defaultTheme,
  loading: false,
  toggleTheme: () => {}
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultTheme,
  loading: false,
  toggleTheme: () => {}
})

export const ThemeProvider = ({ children }: {children: React.ReactNode}) => {
  const [theme, setTheme] = useState(defaultTheme)
  const [loading, setIsLoading] = useState(false)

  const toggleTheme = (type: "branding" | "second" | "texto" | "background_color" | "menu_containers", color: string) => {
    if (type === "branding" || type === "second"){
      const variations = generateColorsVariations(color)

      if (type === "branding") {
        setTheme(prev => ({
          ...prev,
          branding_400: variations.color_400,
          branding_500: variations.color_500,
          branding_600: variations.color_600,
          branding_700: variations.color_700
        }))
      }
      else if (type === "second") {
        setTheme(prev =>  ({
          ...prev,
          second_300: variations.color_400,
          second_500: variations.color_500,
          second_700: variations.color_600,

          second_300_a: variations.color_400 + "80",
          second_500_a: variations.color_500 + "80",
          second_700_a: variations.color_600 + "80"
        }))
      } else {
        setTheme(prev => ({
          ...prev,
          [type]: color
        }))
      }
      }
    }

  return (
    <ThemeContext.Provider value={{ theme, loading, toggleTheme }}>{children}</ThemeContext.Provider>
  )
}
