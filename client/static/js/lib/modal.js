// Closes modals on opening the site 
all_modals = ['addInvestment-modal'
// , 'sellInvestment-modal'
]

all_modals.forEach((modal)=>{
    const modalSelected = document.querySelector('.'+modal);
    modalSelected.classList.remove('fadeIn');
    modalSelected.classList.add('fadeOut');
    modalSelected.style.display = 'none';
})


//updatebuy
// function changeHoldingForm(id){
    //

// Close Modal 
const modalClose = (modal) => {
    const modalToClose = document.querySelector('.'+modal);
    modalToClose.classList.remove('fadeIn');
    modalToClose.classList.add('fadeOut');
    setTimeout(() => {  
        modalToClose.style.display = 'none';
    }, 500);
    let sect = document.getElementById('moreOptions');
    sect.classList.add('hidden');
}

//Open Modal 
const openModal = (modal) => {
    const modalToOpen = document.querySelector('.'+modal);
    modalToOpen.classList.remove('fadeOut');
    modalToOpen.classList.add('fadeIn');
    modalToOpen.style.display = 'flex';
}

function showmoreoptions() {
    let sect = document.getElementById('moreOptions');
    sect.classList.remove('hidden');
}


function hidemoreoptions() {
    let sect = document.getElementById('moreOptions');
    sect.classList.add('hidden');
}

function showautofill() {
    let sect = document.getElementById('Yahoo');
    sect.classList.remove('hidden');
}

function hideautofill() {
    let sect = document.getElementById('Yahoo');
    sect.classList.add('hidden');
}




// const { deleteSell, deleteBuy, updateBuy, createSell} = require('./requests');



// onclick(deleteSellEvent(invest.id))
// function deleteSellEvent(data){
//     const p = document.getElementById('deleteMessage')
//     try{
//         deleteSell(data);
//         p.innerText = 'This past holding has been deleted';
//     }
//     catch(error){}
// }
// //updatebuy
// function changeHoldingForm(id){
// asd
//     //create the modal form
// }

// //deletesell
// function deletePastHoldingModal(id){
//     //create the modal With a button of are you sure?


// }

// function updateBuyEvent(e){
//     e.preventDefault();
//     const data = JSON.stringify(Object.fromEntries(new FormData(e.target)));

// }
// // onclick(deleteSellEvent(invest.id))
// function deleteSellEvent(data){
//     const p = document.getElementById('deleteMessage')
//     try{
//         deleteSell(data);
//         p.innerText = 'This past holding has been deleted';
//     }
//     catch(error)}

// module.exports = {
//     changeHoldingForm,
//    // deletePastHoldingForm
// }

// module.exports={
//     changeHoldingForm,
//     deletePastHoldingForm,
// }

