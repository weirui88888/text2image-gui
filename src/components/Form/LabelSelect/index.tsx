import React, { FC } from 'react'
import { useTheme, Select } from '@geist-ui/core'
import { useSetUserConfig } from '@/hooks/useSetUserConfig'
import './index.css'

interface LabelSelectProps {
  options: {key:string,value:string}[] | Record<string,{key:string,value:string}[]>
  label: string
  keyPath: string
  placeholder?:string
}

{/* <Select.Option label>en</Select.Option>
  <Select.Option value="https://anyphoto.oss-cn-beijing.aliyuncs.com/fonts/en-font1.ttf">EN1</Select.Option>
  <Select.Option value="https://anyphoto.oss-cn-beijing.aliyuncs.com/fonts/en-font2.ttf">EN2</Select.Option>
  <Select.Option label>zh</Select.Option>
  <Select.Option value="https://anyphoto.oss-cn-beijing.aliyuncs.com/fonts/zh-font1.ttf">zh</Select.Option> */}

const CategoryOptions = ({ options }: { options: Record<string, { key: string, value: string }[]> }) => {
  return Object.entries(options).map(([category, categoryOptions]) => {
    return <React.Fragment key={category}>
      <Select.Option label>{category}</Select.Option>
      {
        categoryOptions.map(({ key, value }) => {
          console.log(key,value)
          return <Select.Option value={value} key={key}>{key}</Select.Option>
        })
      }
    </React.Fragment>
  })
  
}

const LabelSelect: FC<LabelSelectProps> = ({ keyPath,label ,options,placeholder}) => {
  const { palette } = useTheme()
  const { value, set } = useSetUserConfig({ keyPath })
  console.log(value)
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        color: '#666',
        backgroundColor: `${palette.accents_1}`,
        borderRadius: '6px',
        border: `1px solid ${palette.border}`,
        height: '36px',
        lineHeight: '36px',
        fontSize: '14px'
      }}
    >
      <label style={{ whiteSpace: 'nowrap', padding: '0 8pt', borderRight: `1px solid ${palette.border}` }}>
        {label}
      </label>
      <Select
        value={value}
        placeholder={placeholder}
        style={{
          flex: 1,
          background: `${palette.background}`,
          border: 'none',
          height: '34px',
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: '6px',
          borderBottomRightRadius: '6px',
          minWidth: 'inherit'
        }}
        onChange={val=>set(val)}
      >
        {
          Array.isArray(options) ? options.map(option => {
            return <Select.Option value={option.value}>{option.key}</Select.Option>
            // @ts-ignore
          }):<CategoryOptions options={options}/>
        }
      </Select>
    </div>
  )
}

LabelSelect.defaultProps = {
  placeholder:''
}

export default LabelSelect
