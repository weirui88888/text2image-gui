const anyPhotoConfig = {
  avatar: '', // 1
  title: '', // 1
  canvasSetting: {
    width: 1000, // 1
    customFontPath: 'https://anyphoto.oss-cn-beijing.aliyuncs.com/fonts/origin/zh-MaShanZheng.ttf', // 1
    backgroundImage: '', // 1
    backgroundColor: '#000000',
    linearGradientStop: [0.8, 1],
    linearGradientDirection: 'to left bottom',
    backgroundLineSpacing: 60, // 1
    backgroundLineColor: '#cccccc55', // 1
    color: '#ffffff', // 1
    fontSize: 40, // 1
    lineGap: 15, // 1
    x: 40, // 1
    y: 60, // 1
    header: {
      showHeader: false, // 1
      headerAlign: 'center', // 1
      headerPaddingTop: 30, // 1
      headerPaddingBottom: 30, // 1
      showHeaderAvatar: false,
      headerAvatarSize: 80,
      headerAvatarBorderWidth: 4,
      headerAvatarBorderColor: '#ffcc00',
      headerAvatarMarginBottom: 20,
      showHeaderTitle: false,
      headerTitleFontSize: 40,
      headerTitleFontColor: '#ffffff',
      headerTitleFontWeight: 'bold',
      headerTitleMarginBottom: 30,
      showHeaderDescription: false,
      headerDescriptionFontSize: 30,
      headerDescriptionFontColor: '#ffffff',
      headerDescriptionFontWeight: 'medium',
      showHeaderDescriptionTime: false,
      headerDescriptionTimeFormat: 'YYYY/MM/DD HH:mm:ss',
      headerDescriptionPrefix: '',
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
      color: '#ffffff',
      lineWidth: 4,
      amplitude: 2,
      wavelength: 180,
      offsetY: 10
    }
  }
}

export default anyPhotoConfig
