import React, { useState,useEffect } from 'react'
import { Layout, Menu, ConfigProvider, theme as antdTheme } from 'antd'
import Icon, { HomeOutlined, SettingOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { GetUserConfig } from "../wailsjs/go/main/App"
import Settings from './pages/Settings'

import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'
import Home from './pages/Home'
import { TaskCfg } from './component/TaskSetting'
import { useNotification } from './hooks/useNotification'

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

  const notification = useNotification()

  useEffect(() => {
    async function loadConfig() {
      try {
        const cfg = await GetUserConfig()
        setDarkMode(cfg.darkMode)
        await i18n.changeLanguage(cfg.language)
        setAntdLocale(cfg.language === 'zh' ? zhCN : enUS)

        notification.open('success',"Success","User config loaded successfully.")
      } catch (err) {
        notification.open('error',"Error","Failed to load user config, using default settings.")
        console.error("err to load user config", err)
      }
    }
    loadConfig()
  }, [i18n, darkMode])
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
      {notification.container}
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
                  notification={notification.open}
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
