//NAMED CONSTANT
const BUTTON_CLICKED = "BUTTON_CLICKED"
const MODAL_CLOSED = "MODAL_CLOSED"
export const named_constant = { BUTTON_CLICKED, MODAL_CLOSED }
//ACTION CREATORS non possono essere passate per refernza nel dispatch quindi bisogna invocarle
function buttonClicked(payload) {//gli passiamo come informazioni l evento puo essere qualsiasi tipo di dato 
    return {
        type: BUTTON_CLICKED,
        payload: payload
    }
}
function modalClosed(payload) {
    return {
        type: MODAL_CLOSED,
        payload: payload
    }
}


export const eventOnFirstButton = (store) => {
    //QUESTO è L EVENTO CHE INTERCCIAMO DALLA UI CHE INVIERA' L ACTION DA ATTUARE ALLO STORE CHE LA PASSERA AL REDUCER
    const button = document.getElementsByTagName('button')[0] //selezioniamo il primo della collection
    //2 aggiugiamo il gestore dell evento
    //tipo evento ,callback
    button.addEventListener('click', function (event) {

        //store.dispatch();//spediamo un messaggio allo store
        /**
         * i messaggi sono oggetti js
         * con prop type che riflette il tipo di azione che stiamo facendo
         * 
         */

        store.dispatch(buttonClicked(event))

    })
}

export const eventCloseButtonModel = (store) => {

    const button = document.getElementById('buttonModal')

    button.addEventListener('click', function (event) {

        store.dispatch(modalClosed(event))
    })

}

