import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  resources: {
    zh: {
      translation: {
        menu: {
          main: '主页',
          settings: '设置',
        },
        settings: {
          title: '设置',
          darkMode: '暗黑模式',
          language: '语言',
          successTitle:'成功',
          saveUserConfigSuccess:'保存用户配置成功',
          errorTitle: '错误',
          saveUserConfigError: '保存用户配置失败',
        },
        home:{
          card1: {
            title:'任务配置',
          },
          card2: {
            title:'计算结果',
          },
        },
      },
    },
    en: {
      translation: {
        menu: {
          main: 'Home',
          settings: 'Settings',
        },
        settings: {
          title: 'Settings',
          darkMode: 'Dark Mode',
          language: 'Language',
          successTitle:'Success',
          saveUserConfigSuccess:'User configuration saved successfully',
          errorTitle: 'Error',
          saveUserConfigError: 'Failed to save user configuration',
        },
        home: {
          card1: {
            title:'Task Configuration',
          },
          card2: {
            title:'Computation Results',
          },
        },
      },
    },
  },
  lng: 'zh',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
