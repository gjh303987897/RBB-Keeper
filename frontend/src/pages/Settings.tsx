import React from 'react'
import { Switch, Select, Space, Typography } from 'antd'
import { useTranslation } from 'react-i18next'
import { backend } from '../../wailsjs/go/models'
import { SaveUserConfig } from '../../wailsjs/go/main/App'

const { Title, Text } = Typography
type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface Props {
  darkMode: boolean
  setDarkMode: (value: boolean) => void
  notification: (type: NotificationType, title: string, desc: string) => void
}

const Settings: React.FC<Props> = ({ darkMode, setDarkMode, notification}) => {
  const { t, i18n } = useTranslation()
  async function saveConfig(lang:string,darkMode:boolean) {
    const newConfig:backend.Config = {
      language: lang,
      darkMode: darkMode,
    }
    try {
      await SaveUserConfig(newConfig)
      notification('success',t('settings.successTitle'),t('settings.saveUserConfigSuccess'))
    }catch(err) {
      notification('error',t('settings.errorTitle'),t('settings.saveUserConfigError'))
    }
  }
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={3} style={{margin:0}}>{t('settings.title')}</Title>

      <Space>
        <Text>{t('settings.darkMode')}</Text>
        <Switch checked={darkMode} onChange={(checked) => { setDarkMode(checked); saveConfig(i18n.language, checked); }} />
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
            i18n.changeLanguage(lang)
            saveConfig(lang, darkMode)
          }}
        />
      </Space>
    </Space>
  )
}

export default Settings
