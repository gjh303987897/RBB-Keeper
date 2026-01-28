import { useEffect } from "react";
import { useUserConfig } from "./useUserConfig";
import { useTranslation } from "react-i18next";


function useLanguageSync(){
    const {config, status} = useUserConfig(true)
    const {i18n} = useTranslation()
    useEffect(()=>{
        if(status === 'loaded'){
            i18n.changeLanguage(config.language)
        }
    }, [config])
}

export function useUserConfigSync(){
    useLanguageSync()
}