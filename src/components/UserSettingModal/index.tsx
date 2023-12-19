import { useState, useRef, Dispatch, FC, SetStateAction } from 'react'
import { Modal, Text, useTheme, Dot, Keyboard, Tooltip } from '@geist-ui/core'
import Editor, { Monaco, OnValidate } from '@monaco-editor/react'
import { AlertCircle } from '@geist-ui/icons'
import { editor as MonacoEditor } from 'monaco-editor'
import { useRecoilState } from 'recoil'
import userConfigState from '@/recoil/config'
import { useLocalStorage } from 'react-use'
import defaultConfig from './default-config'
import schema from './schema.json'
import SwitchFadeTransition from '../SwitchFadeTransition'
import Smile from './Smile'
import Cry from './Cry'

interface SchemaModalProps {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
}

const SchemaModal: FC<SchemaModalProps> = ({ isVisible, setIsVisible }) => {
  const [userConfig, setUserConfig] = useRecoilState(userConfigState)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userLocalConfig, setUserLocalConfig] = useLocalStorage<Record<string, any>>('user-config', undefined, {
    raw: true
  })
  const { type: themeType } = useTheme()
  const [valid, setValid] = useState(true)
  const monacoRef = useRef<Monaco | null>(null)
  const editorRef = useRef<MonacoEditor.IStandaloneCodeEditor | null>(null)

  const handleEditorWillMount = (monaco: Monaco) => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      allowComments: true,
      schemaValidation: 'error',
      enableSchemaRequest: true,
      schemas: [
        {
          uri: 'https://static.anyphoto.space/anyphoto.config.json',
          fileMatch: ['*'],
          schema
        }
      ]
    })
  }

  const handleEditorDidMount = (editor: MonacoEditor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor
    monacoRef.current = monaco
  }

  const handleEditorValidation: OnValidate = markers => {
    setValid(!markers.length)
  }

  const save = () => {
    try {
      const stringConfig = editorRef.current!.getValue()
      const userConfig = JSON.parse(stringConfig)
      setUserConfig(userConfig)
      setUserLocalConfig(userConfig)
      setIsVisible(false)
    } catch (error) {
      setIsVisible(false)
    } finally {
      setValid(true)
    }
  }
  return (
    <Modal
      visible={isVisible}
      disableBackdropClick={true}
      onClose={() => {
        if (valid) {
          save()
        } else {
          setIsVisible(false)
          setValid(true)
        }
      }}
      width="80vw"
    >
      <Modal.Title style={{ position: 'relative' }}>
        <SwitchFadeTransition valid={valid} children1={<Smile />} children2={<Cry />} />
        <Tooltip
          scale={0.5}
          text={
            <>
              <Text my={0} style={{ whiteSpace: 'nowrap' }}>
                <Dot type="warning" />
                You can configure it however you like, but make sure to keep smiling
              </Text>
              <Text my={0} style={{ whiteSpace: 'nowrap' }}>
                <Dot type="warning" />
                Try press{' '}
                <Keyboard command scale={0.5}>
                  S
                </Keyboard>{' '}
                to open setting modal and <Keyboard scale={0.5}>ESC</Keyboard> to close and save setting
              </Text>
              <Text my={0} style={{ whiteSpace: 'nowrap' }}>
                <Dot type="warning" />
                Your configuration will be saved for next time use. If you want to start over, you can click reset
                button
              </Text>
            </>
          }
          className="config-tip"
          placement="left"
        >
          <AlertCircle size={20} className="svg-cursor-pointer" />
        </Tooltip>
      </Modal.Title>
      <Modal.Subtitle style={{ textTransform: 'lowercase' }} className="smile-tip">
        You can configure it however you like, but make sure to keep{' '}
        <SwitchFadeTransition
          valid={valid}
          children1={
            <>
              <Text span type="success">
                s
              </Text>
              <Text span type="warning">
                m
              </Text>
              <Text span type="secondary">
                i
              </Text>
              <Text span type="error">
                l
              </Text>
              <Text span type="warning">
                i
              </Text>
              <Text span type="success">
                n
              </Text>
              <Text span type="error">
                g
              </Text>
            </>
          }
          children2={'smiling'}
        />
      </Modal.Subtitle>
      <Modal.Content>
        <Editor
          onValidate={handleEditorValidation}
          height="60vh"
          theme={themeType === 'dark' ? 'vs-dark' : 'light'}
          language="json"
          loading="text2image config loading..."
          defaultValue={JSON.stringify(userConfig, null, 2)}
          options={{
            fontSize: 16,
            lineHeight: 24,
            scrollBeyondLastLine: false,
            lineNumbers: 'off',
            smoothScrolling: true,
            formatOnType: true,
            linkedEditing: true,
            cursorBlinking: 'blink',
            cursorSmoothCaretAnimation: 'on'
          }}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
        />
      </Modal.Content>
      <Modal.Action
        passive
        placeholder=""
        style={{ fontWeight: 'bold' }}
        onClick={() => {
          setIsVisible(false)
          setValid(true)
        }}
      >
        cancel
      </Modal.Action>
      <Modal.Action
        style={{ fontWeight: 'bold' }}
        placeholder=""
        onClick={() => {
          editorRef.current?.setValue(JSON.stringify(defaultConfig))
          editorRef.current?.trigger(undefined, 'editor.action.formatDocument', 'undefined') //自动格式化代码
          editorRef.current?.setValue(editorRef.current?.getValue()) //再次设置
          setValid(true)
          localStorage.removeItem('user-config')
        }}
      >
        reset
      </Modal.Action>
      <Modal.Action
        style={{ fontWeight: 'bold', color: valid ? '#00ff00' : '#ff0000' }}
        placeholder=""
        passive={!valid}
        disabled={!valid}
        onClick={save}
      >
        save
      </Modal.Action>
    </Modal>
  )
}

export default SchemaModal
