const anyPhotoConfig = {
  avatar: '', // 1
  title: '文字图片创作鸭', // 1
  canvasSetting: {
    width: 750, // 1
    customFontPath: 'https://anyphoto.oss-cn-beijing.aliyuncs.com/fonts/origin/zh-NotoSerifSC.ttf', // 1
    backgroundImage: '', // 1
    backgroundColor: '#feffef',
    linearGradientStop: [],
    linearGradientDirection: '',
    backgroundLineSpacing: 0, // 1
    backgroundLineColor: '#cccccc55', // 1
    color: '#007b43', // 1
    fontSize: 30, // 1
    lineGap: 20, // 1
    x: 40, // 1
    y: 60, // 1
    header: {
      showHeader: true, // 1
      headerAlign: 'center', // 1
      headerPaddingTop: 60, // 1
      headerPaddingBottom: 30, // 1
      showHeaderAvatar: false,
      headerAvatarSize: 80,
      headerAvatarBorderWidth: 4,
      headerAvatarBorderColor: '#ffcc00',
      headerAvatarMarginBottom: 20,
      showHeaderTitle: true,
      headerTitleFontSize: 40,
      headerTitleFontColor: '#007b43',
      headerTitleFontWeight: 'bold',
      headerTitleMarginBottom: 30,
      showHeaderDescription: true,
      headerDescriptionFontSize: 30,
      headerDescriptionFontColor: '#007b43',
      headerDescriptionFontWeight: 'medium',
      showHeaderDescriptionTime: false,
      headerDescriptionTimeFormat: 'YYYY/MM/DD HH:mm:ss',
      headerDescriptionPrefix: '文案排版工具',
      headerDescriptionPrefixIcon: '',
      headerDescriptionPrefixIconGap: 10,
      headerDescriptionPrefixIconOffsetY: 4
      // divider: {
      //   size: 'contentWidth',
      //   color: '#ffffff'
      // }
    },
    footer: {
      showFooter: true,
      paddingY: 160,
      slogan: '文字图片创作鸭小程序',
      sloganPosition: 'left',
      sloganFontSize: 30,
      sloganFontColor: '#007b43',
      sloganFontWeight: 'bold',
      sloganIcon: 'https://text2image.xdzi8b.cn/mini-app/share/channel-web.png',
      sloganIconOffsetY: 0,
      sloganIconPaddingY: 100
      // divider: {
      //   size: 'contentWidth',
      //   color: '#ffffff'
      // }
    },
    from: {
      showFrom: false,
      name: '',
      fromFontSize: 30,
      fromFontColor: '#007b43',
      fromFontWeight: 'bold',
      fromMarginTop: 100
    },
    underline: {
      shape: 'line',
      color: '#007b43',
      lineWidth: 2,
      amplitude: 2,
      wavelength: 180,
      offsetY: 10
    }
  }
}

export default anyPhotoConfig
