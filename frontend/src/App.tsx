import React, { useState,useEffect } from 'react'
import { Layout, Menu, ConfigProvider, theme as antdTheme } from 'antd'
import Icon, { HomeOutlined, SettingOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { GetUserConfig } from "../wailsjs/go/main/App"
import Settings from './pages/Settings'
import { Button, Flex, notification } from 'antd';

import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'
import Home from './pages/Home'
import { TaskCfg } from './component/TaskSetting'

const { Sider, Content } = Layout

const App: React.FC = () => {
  const { t, i18n } = useTranslation()

  const [darkMode, setDarkMode] = useState<boolean | null>(null)
  const [currentPage, setCurrentPage] = useState('main')
  const [antdLocale, setAntdLocale] = useState(enUS)

  const [taskCfg, setTaskCfg] = React.useState<TaskCfg>({
    fileCfg: { method: 'disable' },
    picCfg: { method: 'disable' },
    pathCfgs: []
  })

  const [api, contextHolder] = notification.useNotification();
  type NotificationType = 'success' | 'info' | 'warning' | 'error';
  const openNotificationWithIcon = (type: NotificationType,title:string,desc:string) => {
    api[type]({
      title: title,
      description: desc,
      placement: 'bottomRight',
      duration: 3,
      showProgress: true,
    });
  };

  useEffect(() => {
    async function loadConfig() {
      try {
        const cfg = await GetUserConfig()
        setDarkMode(cfg.darkMode)
        await i18n.changeLanguage(cfg.language)
        setAntdLocale(cfg.language === 'zh' ? zhCN : enUS)
        openNotificationWithIcon('success',"Success","User config loaded successfully.")
      } catch (err) {
        openNotificationWithIcon('error',"Error","Failed to load user config, using default settings.")
        console.error("err to load user config", err)
      }
    }
    loadConfig()
  }, [i18n,darkMode])
  const menuItems = [
    {
      key: 'main',
      icon: <HomeOutlined />,
      label: t('menu.main'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: t('menu.settings'),
    },
  ]

  return (
    <>
    <ConfigProvider
      locale={antdLocale}
      theme={{
        algorithm: darkMode
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
      }}
    >
    {contextHolder}
      <Layout style={{ minHeight: '100vh' }}>
        <Sider style={{background: darkMode ? '#222222':'#eaeaea'}}
          breakpoint="md"
          collapsedWidth="0"
        >
          <Menu style={{background: darkMode ? '#222222':'#eaeaea'}}
            mode="inline"
            selectedKeys={[currentPage]}
            items={menuItems}
            onClick={(e) => setCurrentPage(e.key)}
          />
        </Sider>

        <Layout>
          <Content style={{ margin: 0 }}>
            <div
              style={{
                height: '100%',
                borderRadius: 0,
                background: darkMode ? '#141414' : '#ffffff',
              }}
            > 
              {currentPage === 'main' && darkMode!==null && (
                <Home 
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  taskCfg={taskCfg}
                  setTaskCfg={setTaskCfg}
                />
              )}
              {currentPage === 'settings' && darkMode!==null && (
                <div style={{ padding: 24 }}>
                <Settings
                  
                  darkMode={darkMode}
                  setDarkMode={setDarkMode}
                  notification={openNotificationWithIcon}
                />
                </div>
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
    </>
  )
}

export default App
