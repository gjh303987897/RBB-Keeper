import { ConfigProvider as AntConfigProvider, theme } from 'antd'
import { useUserConfigSync } from '../hooks/useUserConfigSync'
import React from 'react'
import { useUserConfig } from '../hooks/useUserConfig'

import zhCN from 'antd/locale/zh_CN'
import enUS from 'antd/locale/en_US'
import { Locale } from 'antd/lib/locale'
const antLocaleMap: Record<string, Locale> = {
    'zh': zhCN,
    'en': enUS,
}

export function ConfigProvider({ children }: React.PropsWithChildren) {
    const { config, status } = useUserConfig(true)
    useUserConfigSync()

    if (status !== 'loaded') {
        return null
    }
    const locale = antLocaleMap[config.language] || enUS

    return (
        <AntConfigProvider
            locale={locale}
            theme={{
                algorithm: config.darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
            }}
        >
            {children}
        </AntConfigProvider>
    )
}