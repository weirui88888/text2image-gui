import { useState, useRef, Dispatch, FC, SetStateAction } from 'react'
import { Modal, Text, useTheme, Dot, Keyboard, Tooltip } from '@geist-ui/core'
import Editor, { Monaco, OnValidate } from '@monaco-editor/react'
import { AlertCircle } from '@geist-ui/icons'
import { editor as MonacoEditor } from 'monaco-editor'
import { useRecoilState } from 'recoil'
import userConfigState from '@/recoil/config'
import { useLocalStorage } from 'react-use'
import defaultConfig from '@/default-config'
import schema from './schema.json'
import SwitchFadeTransition from '../SwitchFadeTransition'
import Smile from './Smile'
import Cry from './Cry'

interface UserSettingModalProps {
  isVisible: boolean
  setIsVisible: Dispatch<SetStateAction<boolean>>
}

const UserSettingModal: FC<UserSettingModalProps> = ({ isVisible, setIsVisible }) => {
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
          uri: 'https://text2image.xdzi8b.cn/anyphoto.config.json',
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
                除了界面，你也可以在这里按照你的喜好进行配置，但是请确保保持“微笑”
              </Text>
              <Text my={0} style={{ whiteSpace: 'nowrap' }}>
                <Dot type="warning" />
                支持快捷键 <Keyboard scale={0.2}>Alt</Keyboard> <Keyboard scale={0.2}>S</Keyboard> 打开配置弹窗，{' '}
                <Keyboard scale={0.2}>ESC</Keyboard> 可关闭当前弹窗并保存配置
              </Text>
              <Text my={0} style={{ whiteSpace: 'nowrap' }}>
                <Dot type="warning" />
                你对于配置的每一个调整都会被缓存记录下来，避免刷新页面后丢失
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
        你可以随意进行配置，但请保持{' '}
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
        取消
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
        重置
      </Modal.Action>
      <Modal.Action
        style={{ fontWeight: 'bold', color: valid ? '#00ff00' : '#ff0000' }}
        placeholder=""
        passive={!valid}
        disabled={!valid}
        onClick={save}
      >
        保存
      </Modal.Action>
    </Modal>
  )
}

export default UserSettingModal
