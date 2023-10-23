import request from './request'

const pen = async (content: string) => await request.post('pen', { user_pen_content: content })

export { pen }
