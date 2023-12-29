import getUniqueName from '@/utils/getUniqueName'
import { atom, selector } from 'recoil'
// default theme config
import defaultConfig from '@/default-config'

const getIntegratedThemes = () => {
  return new Promise(res => {
    setTimeout(() => {
      res([
        {
          name: 'Default',
          description:
            'This is the default theme and the easiest to use. You only need to fill in the content you care about.',
          preview: 'https://static.anyphoto.space/theme-demo/10001.png',
          config: defaultConfig,
          tags: ['default', 'focus on content']
        },
        {
          name: 'No Avatar Required',
          description: 'No need to show avatar when you don’t follow avatar',
          preview: 'https://static.anyphoto.space/theme-demo/10002.png',
          options: [
            {
              key: 'defaultTitle',
              component: 'Input',
              label: 'Title'
            },
            {
              key: 'headerDescriptionPrefix',
              component: 'Input',
              label: 'Description Prefix'
            },
            {
              key: 'slogan',
              component: 'Input',
              label: 'Slogan'
            },
            {
              key: 'name',
              component: 'Input',
              label: 'From'
            }
          ],
          config: {
            ...defaultConfig,
            defaultTitle: '标题'
          },
          tags: ['title', 'description', 'content', 'from', 'slogan']
        },
        {
          name: 'Custom Image Width',
          description: 'You can custom set image width by adjusting the slider',
          preview: 'https://static.anyphoto.space/theme-demo/10003.png',
          options: [
            {
              key: 'width',
              component: 'Slider',
              label: 'Width'
            }
          ],
          config: {
            ...defaultConfig,
            defaultTitle: '标题',
            defaultAvatar: 'https://static.anyphoto.space/theme-demo/10004.png'
          },
          tags: ['title', 'description', 'content', 'from', 'slogan']
        },
        {
          name: 'theme3',
          description: 'this is theme1',
          preview: 'https://static.anyphoto.space/theme-demo/10005.png',
          options: [
            {
              key: 'defaultTitle',
              component: 'Input'
            },
            {
              key: 'defaultAvatar',
              component: 'upload'
            }
          ],
          config: {
            ...defaultConfig,
            defaultTitle: '标题',
            defaultAvatar: 'https://static.anyphoto.space/theme-demo/10006.png'
          },
          tags: ['title', 'description', 'content', 'from', 'slogan']
        },
        {
          name: 'theme4',
          description: 'this is theme1',
          preview: 'https://static.anyphoto.space/theme-demo/10007.png',
          options: [
            {
              key: 'defaultTitle',
              component: 'Input'
            },
            {
              key: 'defaultAvatar',
              component: 'upload'
            }
          ],
          config: {
            ...defaultConfig,
            defaultTitle: '标题',
            defaultAvatar: 'https://static.anyphoto.space/theme-demo/10008.png'
          },
          tags: ['title', 'description', 'content', 'from', 'slogan']
        },
        {
          name: 'theme5',
          description: 'this is theme1',
          preview: 'https://static.anyphoto.space/theme-demo/10009.png',
          options: [
            {
              key: 'defaultTitle',
              component: 'Input'
            },
            {
              key: 'defaultAvatar',
              component: 'upload'
            }
          ],
          config: {
            ...defaultConfig,
            defaultTitle: '标题',
            defaultAvatar: 'https://static.anyphoto.space/core/themes/default/avatar.jpg'
          },
          tags: ['title', 'description', 'content', 'from', 'slogan']
        },
        {
          name: 'theme6',
          description: 'this is theme1',
          preview: 'https://static.anyphoto.space/theme-demo/10009.png',
          options: [
            {
              key: 'defaultTitle',
              component: 'Input'
            },
            {
              key: 'defaultAvatar',
              component: 'upload'
            }
          ],
          config: {
            ...defaultConfig,
            defaultTitle: '标题',
            defaultAvatar: 'https://static.anyphoto.space/core/themes/default/avatar.jpg'
          },
          tags: ['title', 'description', 'content', 'from', 'slogan']
        },
        {
          name: 'theme7',
          description: 'this is theme1',
          preview: 'https://static.anyphoto.space/theme-demo/10010.png',
          options: [
            {
              key: 'defaultTitle',
              component: 'Input'
            },
            {
              key: 'defaultAvatar',
              component: 'upload'
            }
          ],
          config: {
            ...defaultConfig,
            defaultTitle: '标题',
            defaultAvatar: 'https://static.anyphoto.space/core/themes/default/avatar.jpg'
          },
          tags: ['title', 'description', 'content', 'from', 'slogan']
        },
        {
          name: 'theme8',
          description: 'this is theme1',
          preview: 'https://static.anyphoto.space/theme-demo/10011.png',
          options: [
            {
              key: 'defaultTitle',
              component: 'Input'
            },
            {
              key: 'defaultAvatar',
              component: 'upload'
            }
          ],
          config: {
            ...defaultConfig,
            defaultTitle: '标题',
            defaultAvatar: 'https://static.anyphoto.space/core/themes/default/avatar.jpg'
          },
          tags: ['title', 'description', 'content', 'from', 'slogan']
        },
        {
          name: 'theme9',
          description: 'this is theme1',
          preview: 'https://static.anyphoto.space/theme-demo/10012.png',
          options: [
            {
              key: 'defaultTitle',
              component: 'Input'
            },
            {
              key: 'defaultAvatar',
              component: 'upload'
            }
          ],
          config: {
            ...defaultConfig,
            defaultTitle: '标题',
            defaultAvatar: 'https://static.anyphoto.space/core/themes/default/avatar.jpg'
          },
          tags: ['title', 'description', 'content', 'from', 'slogan']
        }
      ])
    }, 500)
  })
}

// 所有支持的主题
export const integratedThemes = selector({
  key: getUniqueName('IntegratedThemesState'),
  get: async () => {
    const themes = await getIntegratedThemes()
    return themes
  }
})

// 当前所属主题
export const pickedThemeName = atom({
  key: getUniqueName('PickedThemeNameState'),
  default: 'Default'
})

export const pickedTheme = selector({
  key: getUniqueName('PickedThemeState'),
  get: ({ get }) => {
    const theme = get(pickedThemeName)
    const themes: any = get(integratedThemes)
    return themes.find((t: any) => t.name === theme)
  }
})

// 当前主题的配置
export const pickedThemeConfig = selector({
  key: getUniqueName('pickedThemeConfigState'),
  get: ({ get }) => {
    const theme = get(pickedTheme)
    return theme.config
  }
})

// 当前主题的配置项
export const pickedThemeOptions = selector({
  key: getUniqueName('pickedThemeOptionsState'),
  get: ({ get }) => {
    const theme = get(pickedTheme)
    return theme.options
  }
})
