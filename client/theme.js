import { createMuiTheme } from '@material-ui/core/styles'
import { red, orange } from '@material-ui/core/colors'

const theme = createMuiTheme({
    palette: {
      primary: {
      light: '#52c7b8',
      main: '#009688',
      dark: '#00675b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffd95b',
      main: '#ffa726',
      dark: '#c77800',
      contrastText: '#000',
    },
      openTitle: red['700'],
      protectedTitle: orange['700'],
      type: 'light'
    }
  })

  export default theme  