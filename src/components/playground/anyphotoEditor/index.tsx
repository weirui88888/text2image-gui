import React, { useRef, useEffect } from 'react'
import { useFormik } from 'formik'
import { styled } from '@mui/material/styles'
import { object, string } from 'yup'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import InputAdornment from '@mui/material/InputAdornment'
import UploadButton from './uploadButton'

const StyledLoadingButton = styled(LoadingButton)(() => ({
  position: 'relative',
  '&.in-generate-button:before, &.in-generate-button:after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    width: 'calc(100% + 10px)',
    height: 'calc(100% + 10px)',
    top: '-5px',
    left: '-5px',
    border: '2px solid #ddd',
    boxSizing: 'border-box',
    animation: 'Clip-Button-Border 4s infinite linear'
  },
  '&.in-generate-button:before': {
    animationDelay: '-2s'
  }
}))

const validationSchema = object({
  author: string(),
  avatar: string().url('please set correct avatar url'),
  content: string().required('content is required')
})

interface AnyphotoEditorProps {
  generate: (...args: any[]) => void
  isGenerate: boolean
}

const AnyphotoEditor: React.FC<AnyphotoEditorProps> = ({ generate, isGenerate }) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleResize = () => {
      const buttonWidth = buttonRef.current!.offsetWidth
      const buttonHeight = buttonRef.current!.offsetHeight
      document.documentElement.style.setProperty('--button-width', `${buttonWidth}px`)
      document.documentElement.style.setProperty('--button-height', `${buttonHeight}px`)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      author: '',
      content:
        '余幼时即嗜学。家贫，无从致书以观，每假借于藏书之家，手自笔录，计日以还。天大寒，砚冰坚，手指不可屈伸，弗之怠。录毕，走送之，不敢稍逾约。以是人多以书假余，余因得遍观群书。',
      avatar: ''
    },
    validationSchema,
    onSubmit: values => {
      generate(values)
    }
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <UploadButton
                  fieldName="avatar"
                  bucketName="anyphoto"
                  directoryName="avatars"
                  onSuccess={avatarUrl => {
                    formik.setFieldValue('avatar', avatarUrl)
                  }}
                />
              </InputAdornment>
            )
          }}
          fullWidth
          id="avatar"
          name="avatar"
          label="avatar"
          value={formik.values.avatar}
          sx={{ mb: 2 }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.avatar && Boolean(formik.errors.avatar)}
          helperText={formik.touched.avatar && formik.errors.avatar}
        />

        <TextField
          fullWidth
          id="author"
          name="author"
          label="author"
          value={formik.values.author}
          sx={{ mb: 2 }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.author && Boolean(formik.errors.author)}
          helperText={formik.touched.author && formik.errors.author}
        />
        <TextField
          multiline
          fullWidth
          id="content"
          name="content"
          label="content"
          value={formik.values.content}
          sx={{ mb: 2 }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.content && Boolean(formik.errors.content)}
          helperText={formik.touched.content && formik.errors.content}
        />
        <StyledLoadingButton
          color="button"
          ref={buttonRef}
          fullWidth
          className={isGenerate ? 'in-generate-button' : ''}
          type="submit"
          sx={{ mt: 4, fontSize: { xs: 13 } }}
          loading={isGenerate}
          loadingIndicator="just wait a moment"
          variant="contained"
          disabled={!formik.isValid || isGenerate}
        >
          <span>generate</span>
        </StyledLoadingButton>
      </form>
    </div>
  )
}

export default AnyphotoEditor
