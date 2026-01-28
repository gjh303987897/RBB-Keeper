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
        taskSetting: {
          setTaskFolderWarningMessage: '该目录已存在',
          setTaskFolderErrMessage: '目录添加失败',
          taskSubmitNoPathErrMessage: '请至少添加一个任务目录',
          taskSubmitNoMethodErrMessage: '请为文件或图片选择一种计算方式',
          pageTitle: '任务设置',
          taskMethodOptionDisable: '禁用',
          pathAddButton: '添加目录',
          submitTaskButton: '提交任务',
          pathTableColumnRecursion: '递归子目录',
          pathListEmptyText: '尚未选择目录',
          submitTaskErrMessage: '任务提交失败',
          submitTaskSuccessMessage: '任务提交成功',
        },
        ComputationResultTable: {
          pageTitle:'计算面板',
          default:'未运行',
          processing:'处理中',
          success:'完成',
          backToTaskConfig:'返回上级',
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
        taskSetting: {
          setTaskFolderWarningMessage: 'folder already exists',
          setTaskFolderErrMessage: 'directory addition failed',
          taskSubmitNoPathErrMessage: 'please add at least one task directory',
          taskSubmitNoMethodErrMessage: 'please select a computation method for files or images',
          pageTitle: 'Task Settings',
          taskMethodOptionDisable: 'Disable',
          pathAddButton: 'Add Directory',
          submitTaskButton: 'Submit Task',
          pathTableColumnRecursion: 'Recursively Scan ',
          pathListEmptyText: 'no directories selected',
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
