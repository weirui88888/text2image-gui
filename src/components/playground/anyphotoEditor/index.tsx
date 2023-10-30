// function AnyphotoEditor() {}
// export default AnyphotoEditor
// Render Prop
import React from 'react'
import { useFormik } from 'formik'
import { object, string } from 'yup'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

const validationSchema = object({
  author: string().required('author is required'),
  avatar: string().url('please set correct avatar url'),
  content: string().required('content is required'),
  outputName: string()
})

interface AnyphotoEditorProps {
  generate: (...args: any[]) => void
}

const AnyphotoEditor: React.FC<AnyphotoEditorProps> = ({ generate }) => {
  const formik = useFormik({
    initialValues: {
      author: 'anyphoto',
      content:
        '余幼时即嗜学。家贫，无从致书以观，每假借于藏书之家，手自笔录，计日以还。天大寒，砚冰坚，手指不可屈伸，弗之怠。录毕，走送之，不敢稍逾约。以是人多以书假余，余因得遍观群书。既加冠，益慕圣贤之道，又患无硕师名人与游，尝趋百里外，从乡之先达执经叩问。先达德隆望尊，门人弟子填其室，未尝稍降辞色。余立侍左右，援疑质理，俯身倾耳以请；或遇其叱咄，色愈恭，礼愈至，不敢出一言以复；俟其欣悦，则又请焉。故余虽愚，卒获有所闻。                                                                                  当余之从师也，负箧曳屣，行深山巨谷中，穷冬烈风，大雪深数尺，足肤皲裂而不知。至舍，四支僵劲不能动，媵人持汤沃灌，以衾拥覆，久而乃和。寓逆旅，主人日再食，无鲜肥滋味之享。同舍生皆被绮绣，戴朱缨宝饰之帽，腰白玉之环，左佩刀，右备容臭，烨然若神人；余则缊袍敝衣处其间，略无慕艳意，以中有足乐者，不知口体之奉不若人也。盖余之勤且艰若此。今虽耄老，未有所成，犹幸预君子之列，而承天子之宠光，缀公卿之后，日侍坐备顾问，四海亦谬称其氏名，况才之过于余者乎？',
      avatar: 'https://m0-file2.bybutter.com/uploaded/toaster/b895c4be-783a-4b76-934a-59a533fce877.png',
      outputName: 'anyphoto'
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
        <TextField
          fullWidth
          id="outputName"
          name="outputName"
          label="outputName"
          value={formik.values.outputName}
          sx={{ mb: 2 }}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.outputName && Boolean(formik.errors.outputName)}
          helperText={formik.touched.outputName && formik.errors.outputName}
        />
        <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 4 }} disabled={!formik.isValid}>
          Submit
        </Button>
      </form>
    </div>
  )
}

export default AnyphotoEditor
