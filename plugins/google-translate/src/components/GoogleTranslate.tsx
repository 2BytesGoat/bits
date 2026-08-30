import { GlobalConfiguration } from "@quartz-community/types"
import styleText from "./styles/google-translate.css?raw"
import inlineScript from "./scripts/google-translate.script.txt?raw"

export interface GoogleTranslateOptions {
  /**BCP 47 code of the language your content is written in (default "en") */
  pageLanguage?: string
  /**Comma-separated list of language codes to offer; empty = all Google Translate languages */
  includedLanguages?: string
}

const TRANSLATE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m12.87 15.07-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04ZM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12Zm-2.62 7 1.62-4.33L19.12 17h-3.24Z"/></svg>`

export function GoogleTranslate(opts?: GoogleTranslateOptions) {
  const pageLanguage = opts?.pageLanguage
  const includedLanguages = opts?.includedLanguages ?? ""

  const GoogleTranslate = ({ cfg }: { cfg?: GlobalConfiguration }) => {
    // fall back to the site locale when pageLanguage is not explicitly set
    const resolvedPageLanguage = pageLanguage ?? (cfg?.locale?.split("-")[0] as string) ?? "en"
    return (
      <div class="gt-wrapper">
        <button
          class="google-translate-button"
          type="button"
          aria-label="Translate page"
          data-page-language={resolvedPageLanguage}
          data-included-languages={includedLanguages}
          dangerouslySetInnerHTML={{ __html: TRANSLATE_ICON }}
        />
        <div id="google-translate-root" class="gt-hidden-host" aria-hidden="true" />
      </div>
    )
  }

  GoogleTranslate.css = styleText
  GoogleTranslate.beforeDOMLoaded = inlineScript

  return GoogleTranslate
}

export default GoogleTranslate