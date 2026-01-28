import React from 'react'
import { Switch, Select, Space, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { backend } from '../../wailsjs/go/models'
import { SaveUserConfig } from '../../wailsjs/go/main/App'
import { useUserConfig } from '../hooks/useUserConfig'
import { useNotification } from '../hooks/useNotification'

const { Title, Text } = Typography

const Settings: React.FC<{}> = () => {
  const { t, i18n } = useTranslation()
  const notification = useNotification()
  const { config, status } = useUserConfig(true)

  if(status !== 'loaded'){
    return null
  }
  async function saveConfig(newConfig: Partial<backend.Config>) {
    const value: backend.Config = {
      ...config!,
      ...newConfig,
    }
    try {
      await SaveUserConfig(value)
      notification.open('success',t('settings.successTitle'),t('settings.saveUserConfigSuccess'))
    }catch(err) {
      notification.open('error',t('settings.errorTitle'),t('settings.saveUserConfigError'))
    }
  }
  
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{margin:0}}>{t('settings.title')}</Title>

      <Space>
        <Text>{t('settings.darkMode')}</Text>
        <Switch checked={config.darkMode} onChange={(checked) => { saveConfig({
          darkMode: checked
        }); }} />
      </Space>

      <Space>
        <Text>{t('settings.language')}</Text>
        <Select
          value={i18n.language}
          style={{ width: 120 }}
          options={[
            { label: '中文', value: 'zh' },
            { label: 'English', value: 'en' },
          ]}
          onChange={(lang) => {
            saveConfig({
              language: lang
            })
          }}
        />
      </Space>
    </Space>
  )
}

export default Settings
