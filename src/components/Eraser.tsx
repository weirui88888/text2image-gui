import { useTheme } from '@geist-ui/core'
import { FC } from 'react'

interface EraserProps {
  onClick(): void
}

const Eraser: FC<EraserProps> = ({ onClick }) => {
  const {
    palette: { foreground: strokeColor }
  } = useTheme()
  return (
    <svg
      onClick={onClick}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      style={{ cursor: 'pointer' }}
    >
      <path
        fill={strokeColor}
        d="M128 938.666667c-25.6 0-42.666667-17.066667-42.666667-42.666667s17.066667-42.666667 42.666667-42.666667h132.266667l-140.8-140.8c-34.133333-34.133333-34.133333-85.333333 0-119.466666L601.6 110.933333c34.133333-34.133333 85.333333-34.133333 119.466667 0l179.2 179.2c34.133333 34.133333 34.133333 85.333333 0 119.466667L460.8 853.333333H896c25.6 0 42.666667 17.066667 42.666667 42.666667s-17.066667 42.666667-42.666667 42.666667H128z m68.266667-298.666667c-8.533333 8.533333-8.533333 21.333333 0 29.866667l106.666666 106.666666c34.133333 34.133333 85.333333 34.133333 119.466667 0l119.466667-119.466666-179.2-179.2L196.266667 640z"
        p-id="3516"
      ></path>
    </svg>
  )
}

export default Eraser
