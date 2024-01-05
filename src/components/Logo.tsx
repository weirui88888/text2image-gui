import { useTheme } from '@geist-ui/core'

const Logo = () => {
  const {
    palette: { foreground: strokeColor }
  } = useTheme()
  return (
    <svg width="40px" height="40px" strokeWidth="1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
        stroke={strokeColor}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M8 21.1679V14L12 7L16 14V21.1679"
        stroke={strokeColor}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M8 14C8 14 9.12676 15 10 15C10.8732 15 12 14 12 14C12 14 13.1268 15 14 15C14.8732 15 16 14 16 14"
        stroke={strokeColor}
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}

export default Logo
