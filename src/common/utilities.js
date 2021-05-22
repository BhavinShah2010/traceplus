export const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;


export function getTranslatedText(key) {

    let convertedText = key

    let languageData = JSON.parse(localStorage.getItem('languageData'))
    let selectedLanguae = localStorage.getItem('selectedLanguage')

    let data = languageData?.language.find(x => x.en == key)

    if (data) {
        convertedText = data[selectedLanguae]
    }



    return convertedText
}