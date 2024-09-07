const ThemeModel = require('../../database/model/theme')

function uuidv4() {
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
  });
  if (/\d/.test(uuid[0])) {
      uuid = uuid.replace(/^(\d)/, 'a'); 
  }
  return uuid;
}

const addTheme = async (req,res)=>{
  const theme = req.body
  const id = uuidv4()
  const newTheme = new ThemeModel({
    id,
    ...theme
  })
  await newTheme.save()
  res.send({
    code: 200,
    message: 'success'
  })
}

const removeTheme = async (req, res) => {
  const { id } = req.params;
  await ThemeModel.findOneAndDelete({ id }); 
  res.send({
    code: 200,
    message: '移除主题成功'
  });
};

const getThemes = async (req, res) => {
  const allThemes = await ThemeModel.find().lean()
  const themesConfig = {
    light:{
      title:'浅色',
      themes:[]
    },
    dark:{
      title:'深色',
      themes:[]
    },
    lightGradient:{
      title:'浅色渐变',
      themes:[]
    },
    darkGradient:{
      title:'深色渐变',
      themes:[]
    },
  }
  
  const themes = allThemes.reduce((acc,cur)=>{
    const {type,...other} = cur
    acc[type].themes = [...(acc[type].themes||[]),{...other}]
    return acc
  },themesConfig)
  
  res.send({
    code: 200,
    message: 'success',
    data: themes
  })
}

module.exports = {
  getThemes,
  addTheme,
  removeTheme
}