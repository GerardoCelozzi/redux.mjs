import { createStore } from "https://unpkg.com/redux@4.0.5/es/redux.mjs";
import { eventOnFirstButton,eventCloseButtonModel,named_constant } from "./handlersEvents.js";//my module
/**
 * collegamento a url esterna che esporta un file mjs
 * .mjs è il modo cross-compatibile per garantire che i file vengano trattati come moduli.
 * condiderando che 
 * i browser moderni hanno iniziato a supportare la funzionalità dei moduli in modo nativo
 * quindi anziche creare un app test lato client con una libreria come react che cmq si porta dietro tutte le sue dipendenze
 * e altri moduli come webpack etc in questo esempio ottimizziamo  il caricamento dei moduli, 
 * rendendolo più efficiente , utilizzando una risorsa esterna che ci fornisce il modulo redux 
 * che importiamo nella nostra interfaccia per mezzo del tag <script type='module' src='./index.js'></script>
 * è proprio il supporto dei browser moderni che ci permette di utilizzare le importazioni in questo file index.js
 * come modulo in index.html
 */

//NAMED CONSTANT definite in handelrsEvents
const{BUTTON_CLICKED,MODAL_CLOSED}=named_constant

//ACTION CREATORS funzioni che ritorna il messaggio ovvero l oggetto js da inviare allo store
//dobbiamo implementarlo pero nel modulo handleEvents.js e da li che inviamo il dispatch
// function buttonClicked(payload){
//     return{
//         type:BUTTON_CLICKED,
//         payload:payload
//     }
// }

// 1 INIZIALIZZIAMO LO STATE
//quindi lo stato di redux è un grande oggetto js
const initialState = {
    buttonClicked: 'no',
    modalClosed :'no'
}

// 2 CREIAMO IL REDUCER
function rootReducer(state = initialState, action) {//aggiunto action
    //quindi implementiamo la logica di cosa deve fare il reducer con lo stato
    switch(action.type){
        case BUTTON_CLICKED:
            //chage state in modo non corretto andiamo a modificare lo stato iniziale
            //nn facciamo un copia
            state={...initialState}
            state.buttonClicked='yes'
  
           
            return state
      
        case MODAL_CLOSED:
            state={...initialState}
            state.modalClosed='yes'
       
            return state
        default:
            return state;//se non ci sono modifiche allo stato deve ritornare sempre lo stato iniziale
        
    }

}
//3 CREIAMO LO STORE CHE PRENDE LA REFERENZA DEL REDUCER

const dev_Tool=window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = createStore(rootReducer,dev_Tool)
//abbiamo lo store quindi possiamo chiamare delle funzione
//di dispatch o di subscribe


// 4 creato un module js di handler per gli eventi che importo nel modulo index.js che fornisco alla UI 

eventOnFirstButton(store)
//const button = document.getElementsByTagName('button')[0] 
//2 aggiugiamo il gestore dell evento
//tipo evento ,callback,ho creato un modulo di gestione eventi
// button.addEventListener('click', function () {

//     //store.dispatch();//spediamo un messaggio allo store
//     /**
//      * i messaggi sono oggetti js
//      * con prop type che riflette il tipo di azione che stiamo facendo
//      * 
//      */

//     store.dispatch({ type: "BUTTON_CLICKED" })
   
// })

eventCloseButtonModel(store)
// const modalButton=document.getElementById('buttonModal')
// modalButton.addEventListener('click',function(){
//     store.dispatch({type:"MODAL_CLOSED"})
// })
/**poi dobbiamo notificare all interfaccia che l action ha cambiato lo stato
 * l obbiettivo è mostrare il div che sta impostato a dispaly none
 * sottoscriviamo l interfaccia alle notifiche che lo store le puo inviare
 * 
 */

// store.subscribe(function(){
//     const div=document.getElementById('my-div')
//     div.style.display='block'
// })


//se ci sono molti dispatch nel reducer a ogni cambio di stato viene lanciato il subscribe
//ovvero viene sempre notificato all interfaccia
//quindi refresh sempre 
//quindi possiamo controllare il refresh confrontando lo stato ad esempio

//5 SOTTOSCRIVIAMO L INTERFACCIA ALLE NOTICHE CHE LO STORE LE INVIA 
store.subscribe(function () {

    if (store.getState().buttonClicked === 'yes') {//check state  
        //stato con determinato valore riferisce questo cambiamento nell ui
        const div = document.getElementById('my-div')
        div.style.display = 'block'
        console.log(store.getState())
    }
    //add subscrive for modalButton 
    if (store.getState().modalClosed === 'yes') {//check state  
        console.log("ciao")
        //stato con determinato valore riferisce questo cambiamento nell ui
        const div = document.getElementById('my-div')
        div.style.display = 'none'
        console.log(store.getState())
    }
   
})



