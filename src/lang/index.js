import { IntlProvider, FormattedMessage } from "react-intl";
import { np, en, es, ch } from "./data";

var msg_obj = {
  np,
  en,
  es,
  ch,
};

export function serveText(lang, id) {
  return msg_obj[lang][id];
}

export function serveLanguage(lang, id) {
  return (
    <IntlProvider key={lang} messages={msg_obj[lang]} locale="en">
      <FormattedMessage id={id} values="" />
    </IntlProvider>
  );
}
