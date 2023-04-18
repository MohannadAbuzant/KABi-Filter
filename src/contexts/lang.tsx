import { TFunction, i18n } from 'i18next';
import { useTranslation } from 'next-i18next';
import * as React from 'react';

export const LangContext = React.createContext({} as {t:TFunction<"translation", undefined, "translation">,i18n:i18n})

const LangProvider = ({children}:{children:React.ReactNode}) => {
    const {t,i18n} = useTranslation()
    return ( 
        <LangContext.Provider value={{t,i18n}}>
            {children}
        </LangContext.Provider>
     );
}
 
export default LangProvider;