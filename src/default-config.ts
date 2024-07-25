const anyPhotoConfig = {
  avatar: '', // 1
  title: '文字转图片', // 1
  canvasSetting: {
    width: 750, // 1
    customFontPath: 'https://anyphoto.oss-cn-beijing.aliyuncs.com/fonts/origin/zh-MaShanZheng.ttf', // 1
    backgroundImage: '', // 1
    backgroundColor: ['#61C695', '#133114'],
    linearGradientStop: [],
    linearGradientDirection: 'to left bottom',
    backgroundLineSpacing: 0, // 1
    backgroundLineColor: '#cccccc55', // 1
    color: '#ffffff', // 1
    fontSize: 30, // 1
    lineGap: 15, // 1
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
      headerTitleFontColor: '#ffffff',
      headerTitleFontWeight: 'bold',
      headerTitleMarginBottom: 30,
      showHeaderDescription: true,
      headerDescriptionFontSize: 30,
      headerDescriptionFontColor: '#ffffff',
      headerDescriptionFontWeight: 'medium',
      showHeaderDescriptionTime: false,
      headerDescriptionTimeFormat: 'YYYY/MM/DD HH:mm:ss',
      headerDescriptionPrefix: '灵感来源于微信读书',
      headerDescriptionPrefixIcon: '',
      headerDescriptionPrefixIconGap: 10,
      headerDescriptionPrefixIconOffsetY: 4
      // divider: {
      //   size: 'contentWidth',
      //   color: '#ffffff'
      // }
    },
    footer: {
      showFooter: false,
      paddingY: 60,
      slogan: '',
      sloganPosition: 'right',
      sloganFontSize: 30,
      sloganFontColor: '#ffffff',
      sloganFontWeight: 'bold',
      sloganIcon: '',
      sloganIconOffsetY: 0,
      sloganIconPaddingY: 10
      // divider: {
      //   size: 'contentWidth',
      //   color: '#ffffff'
      // }
    },
    from: {
      showFrom: false,
      name: '',
      fromFontSize: 30,
      fromFontColor: '#ffffff',
      fromFontWeight: 'bold',
      fromMarginTop: 60
    },
    underline: {
      shape: 'line',
      color: '#ffcc00',
      lineWidth: 2,
      amplitude: 2,
      wavelength: 180,
      offsetY: 10
    }
  }
}

export default anyPhotoConfig
