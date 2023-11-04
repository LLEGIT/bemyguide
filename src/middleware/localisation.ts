import Negotiator from "negotiator";

let headers = { "accept-language": "fr-FR,fr;q=0.5" };
let languages = new Negotiator({ headers }).languages();
let locales = ["fr-FR", "en"];
let defaultLocale = "fr-FR";

export{languages, locales, defaultLocale};
