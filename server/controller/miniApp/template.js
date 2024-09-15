const TemplateModel = require('../../database/model/template')
const UserModel = require('../../database/model/user')
const { getRandomInt } = require('../../utils/index')

const getTemplates = async (req, res) => {
  const templates = await TemplateModel.find().sort({ weight: -1 }).lean() // 根据权重降序排序
  const calculateTemplates = templates.map(({ usageCount, beautyCount, ...other }) => {
    return {
      ...other,
      usageCount: usageCount + beautyCount
    }
  })
  res.send({
    code: 200,
    message: 'success',
    data: {
      templates: calculateTemplates
    }
  })
}

const useTemplate = async (req, res) => {
  const { postId } = req.body
  const template = await TemplateModel.findOne({ postId })
  template.usageCount += 1
  template.save()
  res.send({
    code: 200,
    message: 'success'
  })
}

const switchTemplate = async (req, res) => {
  const { id, postId, isTemplate } = req.body
  const user = await UserModel.findOne({ id })
  let posts = [...user.posts]
  const postIndex = posts.findIndex(post => post.postId === postId)
  posts[postIndex].isTemplate = isTemplate
  const { postId: userPostId, url, content, canvasSetting, options } = posts[postIndex]

  if (isTemplate) {
    const maxWeightTemplate = await TemplateModel.findOne({}, { weight: 1 }).sort({ weight: -1 })
    const newTemplateWeight = maxWeightTemplate ? maxWeightTemplate.weight + 100 : 100
    const maxBeautyCountTemplate = await TemplateModel.findOne({}, { beautyCount: 1 }).sort({ beautyCount: -1 })
    const newTemplateBeautyCount = maxBeautyCountTemplate
      ? maxBeautyCountTemplate.beautyCount + getRandomInt(1, 300)
      : getRandomInt(1, 100)

    const newTemplate = new TemplateModel({
      content,
      options,
      canvasSetting,
      postId: userPostId,
      posterId: id,
      url,
      weight: newTemplateWeight,
      beautyCount: newTemplateBeautyCount,
      usageCount: 0
    })
    await newTemplate.save()
  } else {
    // 取消置为模板
    await TemplateModel.deleteOne({ postId: userPostId, posterId: id })
  }

  user.posts = posts
  await user.save()

  res.send({
    code: 200,
    message: 'success',
    data: {
      message: isTemplate ? '已标记为模板' : '已取消标记为模板'
    }
  })
}

module.exports = {
  getTemplates,
  useTemplate,
  switchTemplate
}
