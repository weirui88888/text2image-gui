const anyPhotoConfig = {
  defaultAvatar: '',
  defaultTitle: '',
  canvasSetting: {
    width: 1000,
    customFontPath: 'https://anyphoto.oss-cn-beijing.aliyuncs.com/fonts/zh-font1.ttf',
    backgroundImage: '',
    backgroundColor: '#000000',
    linearGradientStop: [0.8, 1],
    linearGradientDirection: 'to left bottom',
    backgroundLineSpacing: 0,
    backgroundLineColor: '#cccccc55',
    color: '#ffffff',
    fontSize: 40,
    lineGap: 15,
    x: 40,
    y: 60,
    header: {
      showHeader: false,
      headerAlign: 'center',
      headerPaddingTop: 100,
      headerPaddingBottom: 30,
      showHeaderAvatar: false,
      headerAvatarSize: 80,
      headerAvatarBorderWidth: 4,
      headerAvatarBorderColor: '#ffcc00',
      headerAvatarMarginBottom: 20,
      showHeaderTitle: false,
      headerTitleFontSize: 30,
      headerTitleFontColor: '#ffffff',
      headerTitleFontWeight: 'bold',
      headerTitleMarginBottom: 30,
      showHeaderDescription: false,
      headerDescriptionFontSize: 25,
      headerDescriptionFontColor: '#ffffff',
      headerDescriptionFontWeight: 'medium',
      showHeaderDescriptionTime: true,
      headerDescriptionTimeFormat: 'YYYY/MM/DD HH:mm:ss',
      headerDescriptionPrefix: '',
      headerDescriptionPrefixIcon: 'https://static.anyphoto.space/emojis/food/emoji_u1f36c.png',
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
      sloganFontSize: 25,
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
      fromFontSize: 25,
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
