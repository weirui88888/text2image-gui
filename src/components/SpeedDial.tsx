import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import ChatIcon from '@mui/icons-material/Chat'
import ElderlyWomanIcon from '@mui/icons-material/ElderlyWoman'
import SendIcon from '@mui/icons-material/Send'
import LoadingButton from '@mui/lab/LoadingButton'
// import makeStyles from '@mui/styles/makeStyles'
import { useTheme } from '@mui/material/styles'

// Dialog
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { useSnackbar } from 'notistack'

import { sleep } from '../util'
import { pen } from '../api/pen'

export default function BasicSpeedDial() {
  const { enqueueSnackbar } = useSnackbar()
  const theme = useTheme()
  const [penVisible, setPenVisible] = useState(false)
  const [penContent, setPenContent] = useState('')
  const [isPen, setIsPen] = useState(false)
  const actions = [
    {
      icon: <ElderlyWomanIcon />,
      name: 'Pen',
      click() {
        setPenVisible(true)
      }
    },
    { icon: <ChatIcon />, name: 'Chat', click() {} }
  ]
  return (
    <>
      <Box sx={{ position: 'fixed', bottom: 32, right: 16 }}>
        <SpeedDial
          ariaLabel="SpeedDial"
          icon={<SendIcon />}
          sx={{
            '& .MuiButtonBase-root': {
              backgroundColor: theme.palette.button.main,
              '&:hover': {
                backgroundColor: theme.palette.button.dark
              }
            },
            '& #SpeedDial-actions .MuiButtonBase-root': {
              backgroundColor: theme.palette.button.main,
              '&:hover': {
                backgroundColor: theme.palette.button.dark
              }
            }
          }}
        >
          {actions.map(action => (
            <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={action.click} />
          ))}
        </SpeedDial>
      </Box>
      <Dialog
        open={penVisible}
        onClose={() => {
          setPenVisible(false)
        }}
      >
        <DialogTitle>Pen</DialogTitle>
        <DialogContent>
          <DialogContentText>Record some moments that make you feel uncomfortable.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            // inputProps={{ maxLength: 10 }}
            id="pen-content"
            label="Pen Content"
            fullWidth
            multiline
            maxRows={4}
            variant="standard"
            onChange={e => {
              setPenContent(e.target.value)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setPenVisible(false)
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            size="small"
            onClick={async () => {
              await pen(penContent)
              setIsPen(true)
              await sleep()
              enqueueSnackbar('Don’t always be a troll!', {
                variant: 'success'
              })
              setIsPen(false)
              setPenVisible(false)
            }}
            endIcon={<SendIcon />}
            loading={isPen}
            loadingPosition="end"
            variant="contained"
          >
            <span>Pen it</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}
