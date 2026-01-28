import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import { HomeOutlined, SettingOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import Settings from './pages/Settings'

import Home from './pages/Home'
import { TaskCfg } from './component/TaskSetting'
import { useNotification } from './hooks/useNotification'
import { useUserConfig } from './hooks/useUserConfig'
import { ConfigProvider } from './provider/ConfigProvider'


const { Sider, Content } = Layout

const App: React.FC = () => {
  const { t } = useTranslation()

  const [currentPage, setCurrentPage] = useState('main')

  const [taskCfg, setTaskCfg] = React.useState<TaskCfg>({
    fileCfg: { method: 'disable' },
    picCfg: { method: 'disable' },
    pathCfgs: []
  })

  const notification = useNotification()

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
  const { config, status } = useUserConfig()
  if(status !== 'loaded'){
    return <p>Loading...</p>
  }

  return (
    <ConfigProvider>
      {notification.container}
      <Layout style={{ minHeight: '100vh' }}>
        <Sider style={{background: config.darkMode ? '#222222':'#eaeaea'}}
          breakpoint="md"
          collapsedWidth="0"
        >
          <Menu style={{background: config.darkMode ? '#222222':'#eaeaea'}}
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
                background: config.darkMode ? '#141414' : '#ffffff',
              }}
            > 
              {currentPage === 'main'  && (
                <Home 
                  taskCfg={taskCfg}
                  setTaskCfg={setTaskCfg}
                />
              )}
              {currentPage === 'settings' && (
                <div style={{ padding: 24 }}>
                  <Settings/>
                </div>
              )}
            </div>
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default App
