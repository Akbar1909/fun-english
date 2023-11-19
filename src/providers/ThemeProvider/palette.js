import { alpha } from '@mui/material/styles';

// Invert colors for dark theme
function invertColor(hex) {
  // Remove the "#" symbol
  hex = hex.slice(1);
  // Convert hex to RGB
  const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16).padStart(2, '0');
  const g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16).padStart(2, '0');
  const b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16).padStart(2, '0');
  // Convert RGB back to hex
  return `#${r}${g}${b}`;
}

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24'
};

const PRIMARY = {
  lighter: '#D1E9FC',
  light: '#76B0F1',
  main: '#2065D1',
  dark: '#103996',
  darker: '#061B64',
  contrastText: '#fff'
};

const SECONDARY = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
  contrastText: '#fff'
};

const INFO = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff'
};

const SUCCESS = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: GREY[800]
};

const WARNING = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: GREY[800]
};

const ERROR = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#fff'
};

const common = {
  black: '#000',
  white: '#fff',
  request: '#AAF27F',
  task_done: '#76B0F1',
  bug_report: '#FFA48D',
  file_exchange: '#C4CDD5',
  alert: {
    success: {
      backgroundColor: '#F5FDF2',
      color: '#446032',
      svg: '#66D945'
    },
    error: {
      backgroundColor: '#FFF4F2',
      color: '#664138',
      svg: '#FF5A55'
    },
    warning: {
      backgroundColor: '#FEFCF0',
      color: '#66592A',
      svg: '#FFC735'
    }
  }
};

const palette = {
  common,
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  text: {
    primary: GREY[800],
    secondary: GREY[600],
    disabled: GREY[500]
  },
  background: {
    paper: '#fff',
    default: GREY[100],
    neutral: GREY[200]
  },
  action: {
    active: GREY[600],
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[200], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48
  },
  border: {
    form: '#D7DDE1'
  }
};

const darkPalette = {
  common,
  primary: {
    lighter: PRIMARY.lighter,
    light: PRIMARY.light,
    main: PRIMARY.main,
    dark: '#103996',
    darker: '#103996',
    contrastText: '#fff',
    file_exchange: '#C4CDD5'
  },
  secondary: {
    lighter: invertColor(SECONDARY.lighter),
    light: invertColor(SECONDARY.light),
    main: invertColor(SECONDARY.main),
    dark: invertColor(SECONDARY.dark),
    darker: invertColor(SECONDARY.darker),
    contrastText: '#fff'
  },
  info: {
    lighter: invertColor(INFO.lighter),
    light: invertColor(INFO.light),
    main: invertColor(INFO.main),
    dark: invertColor(INFO.dark),
    darker: invertColor(INFO.darker),
    contrastText: '#fff'
  },
  success: {
    lighter: invertColor(SUCCESS.lighter),
    light: invertColor(SUCCESS.light),
    main: invertColor(SUCCESS.main),
    dark: invertColor(SUCCESS.dark),
    darker: invertColor(SUCCESS.darker),
    contrastText: GREY[0]
  },
  warning: {
    lighter: invertColor(WARNING.lighter),
    light: invertColor(WARNING.light),
    main: invertColor(WARNING.main),
    dark: invertColor(WARNING.dark),
    darker: invertColor(WARNING.darker),
    contrastText: GREY[0]
  },
  error: ERROR,
  grey: {
    0: GREY[800], // Swap black for white
    100: GREY[700],
    200: GREY[600],
    300: GREY[500],
    400: GREY[400],
    500: GREY[300],
    600: GREY[200],
    700: GREY[100],
    800: GREY[0], // Swap white for black
    900: GREY[100] // Slight adjustment for GREY[900]
  },
  divider: alpha(GREY[200], 0.24), // Use the same alpha value for the dark divider
  text: {
    primary: GREY[0], // Swap black for white
    secondary: GREY[100], // Swap white for black
    disabled: GREY[200]
  },
  background: {
    paper: GREY[800], // Swap black for white
    default: GREY[900], // Swap white for black
    neutral: GREY[800] // Use the same color as paper
  },
  action: {
    active: GREY[200], // Swap white for black
    hover: alpha(GREY[300], 0.08), // Slight adjustment for hover
    selected: alpha(GREY[300], 0.16), // Slight adjustment for selected
    disabled: alpha(GREY[700], 0.8), // Swap black for white
    disabledBackground: alpha(GREY[300], 0.24), // Slight adjustment for disabledBackground
    focus: alpha(GREY[300], 0.24), // Slight adjustment for focus
    hoverOpacity: 0.08,
    disabledOpacity: 0.48
  },
  border: {
    form: '#575C62'
  }
};

export const getPalette = (mode) => {
  return mode === 'dark' ? darkPalette : palette;
};

export default getPalette;
