import * as preact from 'preact';
import { GlobalConfiguration } from '@quartz-community/types';

interface GoogleTranslateOptions {
    /**BCP 47 code of the language your content is written in (default "en") */
    pageLanguage?: string;
    /**Comma-separated list of language codes to offer; empty = all Google Translate languages */
    includedLanguages?: string;
}
declare function GoogleTranslate(opts?: GoogleTranslateOptions): {
    ({ cfg }: {
        cfg?: GlobalConfiguration;
    }): preact.JSX.Element;
    css: string;
    beforeDOMLoaded: string;
};

export { GoogleTranslate, GoogleTranslate as default };
