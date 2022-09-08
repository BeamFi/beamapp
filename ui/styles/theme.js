import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  fonts: {
    heading: "Poppins",
    body: "Poppins"
  },
  colors: {
    beam_blue: "#D8F2FF",
    beam_green: "#C2FFB8",
    beam_pink: "#FFC0B8",
    black: "#5C5660",
    black_2: "#484848",
    black_3: "#131F2B",
    black_4: "#131515",
    black_5: "#393440",
    dark_black: "#000000",
    black_gray: "rgba(72, 72, 72, 0.35)",
    black_gray2: "rgba(72, 72, 72, 0.05)",
    black_gray_3: "#606060",
    black_transparent: "rgba(0, 0, 0, 0.5)",
    black_transparent_2: "rgba(0, 0, 0, 0.85)",
    black_transparent_3: "rgba(0, 0, 0, 0.70)",
    transparent: "rgba(0, 0, 0, 0.0)",
    purple: "#7F2CC6",
    purple_2: "#9C49F2",
    purple_3: "#AC62E3",
    purple_light: "#E2D2F1",
    purple_light2: "#E5E1F8",
    purple_background: "#F8F7FC",
    gray_light: "#F0EDF2",
    gray_light2: "#7D8497",
    gray_light3: "#F5F5F7",
    gray_light4: "#CFD3DD",
    gray_light5: "#E2E8EF",
    gray_light6: "#F0F0F0",
    gray_light7: "#ECEFF8",
    green_2: "#66FC32",
    green_scheme: {
      50: "#e6ffde",
      100: "#c4ffb0",
      200: "#9ffd7f",
      300: "#7bfc4e",
      400: "#56fc1d",
      500: "#66FC32",
      600: "#2db000",
      700: "#1e7e00",
      800: "#0e4c00",
      900: "#001a00"
    },
    purple_scheme: {
      50: "#f7e8ff",
      100: "#ddbff5",
      200: "#c396ea",
      300: "#aa6de0",
      400: "#9243d5",
      500: "#782abc",
      600: "#5e1f93",
      700: "#43166a",
      800: "#290c42",
      900: "#10031b"
    },
    mobile_menu_gray: "#575B65",
    orange_1: "#FCA532",
    orange_2: "#f78e04",
    blue_1: "#4299F5",
    blue_2: "#4299F7",
    blue_3: "#427FED",
    blue_4: "#3F95EF",
    blue_5: "#3EA5EE",
    blue_light: "#28E9E5",
    blue_dark: "#4373F0",
    red_1: "#DD2773",
    brand: {
      priamary: "#4299F5"
    },
    gradient: {
      purple: {
        1: "linear-gradient(90deg, #AC62E3 0%, #7F2CC6 100%, #7F2CC6 100%)",
        2: "linear-gradient(90deg, #FB9230 -29.29%, #8C39DE 29.09%, #436EF0 81.87%, #33EEEB 124.26%)",
        3: "linear-gradient(180deg, #FFFFFF -200%, rgba(236, 234, 240, 1) 140%)",
        4: "linear-gradient(90deg, #9F49C1 0%, #7F43E2 100%)",
        5: "linear-gradient(90deg, #AC62E3 0%, #7F2CC6 100%)",
        6: "linear-gradient(90deg, #C28DE9 0%, #A469D5 100%)",
        7: "linear-gradient(90deg, #C1648C 0%, #A44DB9 25%, #7F44E2 55%, #4A6AEF 75%, #3DA1EF 100%)",
        8: "linear-gradient(90deg, #34EFEC 0%, #4361EE 25%, #9542EA 50%, #D61865 75%, #FB9130 100%)"
      }
    }
  },
  initialColorMode: "light",
  icons: {},
  components: {
    Link: {
      baseStyle: {
        color: "#4299F5"
      }
    }
  }
})

export default theme
