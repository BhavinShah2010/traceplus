
export default (state = {
    selectedLangauge:'en'
}, action) => {

    switch (action.type) {
        case 'selectedLangauge':
            return {
                ...state,
                selectedLangaugeValue: action.data
            }
        default:
            return state
    }
}