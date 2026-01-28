import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react"
import { GetUserConfig } from "../../wailsjs/go/main/App"
import { backend } from "../../wailsjs/go/models"
import { EventsOn } from "../../wailsjs/runtime/runtime"

type UserConfigStatus = 'loading' | 'loaded' | 'error'

const USER_CONFIG_STORAGE_KEY = "user_config_cache"

let globalUserConfigCache = (()=>{
    const value =  localStorage.getItem(USER_CONFIG_STORAGE_KEY)
    if(value){
        try{
            return JSON.parse(value) as backend.Config
        }catch{
            return null
        }
    }
    return null
})()

type UserConfig = {
    config: backend.Config
    status: 'loaded'
    update: (newConfig: backend.Config) => void
    reload: () => Promise<backend.Config>
} | {
    config: null
    status: 'loading' | 'error'
    update: (newConfig: backend.Config) => void
    reload: () => Promise<backend.Config>
}

export function useUserConfig(immediate: boolean = false): UserConfig {
    const [config, setConfig] = useState<backend.Config | null>(immediate ? globalUserConfigCache : null)

    const [status, setStatus] = useState<UserConfigStatus>(
        immediate ? (globalUserConfigCache ? 'loaded' : 'loading') : 'loading'
    )

    const reload = useCallback(async () => {
        if(status !== 'loaded'){
            setStatus('loading')
            setConfig(null)
        }
        try {
            const cfg = await GetUserConfig()
            setConfig(cfg)
            setStatus('loaded')
            globalUserConfigCache = cfg
            return cfg
        } catch (err) {
            setStatus('error')
            throw err
        }
    }, [status])

    const update = useCallback((newConfig: backend.Config) => {
        setConfig(newConfig)
        localStorage.setItem(USER_CONFIG_STORAGE_KEY, JSON.stringify(newConfig))
    }, [])

    useLayoutEffect(()=>{
        reload()
    }, [])

    useEffect(() => {
        const offSaveSuccess = EventsOn("saveConfigSuccess", () => {
            reload()
        })
        return () => {
            offSaveSuccess()
        }
    }, [])

    const value = useMemo(()=>({
        config,
        status,
        reload,
        update
    }), [config, status, reload, update])

    return value as UserConfig
}