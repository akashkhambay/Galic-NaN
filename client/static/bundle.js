(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";function e(e){this.message=e}e.prototype=new Error,e.prototype.name="InvalidCharacterError";var r="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(r){var t=String(r).replace(/=+$/,"");if(t.length%4==1)throw new e("'atob' failed: The string to be decoded is not correctly encoded.");for(var n,o,a=0,i=0,c="";o=t.charAt(i++);~o&&(n=a%4?64*n+o:o,a++%4)?c+=String.fromCharCode(255&n>>(-2*a&6)):0)o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);return c};function t(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(r(e).replace(/(.)/g,(function(e,r){var t=r.charCodeAt(0).toString(16).toUpperCase();return t.length<2&&(t="0"+t),"%"+t})))}(t)}catch(e){return r(t)}}function n(e){this.message=e}function o(e,r){if("string"!=typeof e)throw new n("Invalid token specified");var o=!0===(r=r||{}).header?0:1;try{return JSON.parse(t(e.split(".")[o]))}catch(e){throw new n("Invalid token specified: "+e.message)}}n.prototype=new Error,n.prototype.name="InvalidTokenError";const a=o;a.default=o,a.InvalidTokenError=n,module.exports=a;


},{}],2:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],3:[function(require,module,exports){
module.exports={
    "buys": [
        {
            "id": "12345",
            "ticker": "BTC/USDT",
            "fee": "1.5",
            "buy_level": "3012.36",
            "num_shared": "0.04",
            "stored_price": "3012.36",
            "user_id": "123456",
            "date_of_purchase": "1627313660218"
        }
    ],
    "sells": [
        {
            "id": "12345",
            "ticker": "EU/USDT",
            "fee": "1.5",
            "buy_level": "0.75",
            "num_shared": "1000",
            "stored_price": "0.0069",
            "user_id": "123456",
            "date_of_purchase": "1627113674551"
        }
    ]

}
},{}],4:[function(require,module,exports){
const { login, showError,showPortfolio } = require('./lib/layout');

const { showAddInvest, showAddSell } = require('./lib/modal');
const { requestLogin, requestRegistration } = require('./lib/requests.js');


//window.addEventListener('hashchange', updateContent);
if(window.location.pathname == '/index.html' || window.location.pathname == '/'){

    
    document.addEventListener('DOMContentLoaded', redirectWhenLogedIn);
    window.addEventListener('hashchange', redirectWhenLogedIn);
}
//document.getElementById('login')
    
    //if().addEventListener('submit', requestLogin);
else if(window.location.pathname == '/register.html'){
    document.getElementById('register').addEventListener('submit', requestRegistration);
    document.addEventListener('DOMContentLoaded', redirectWhenLogedIn);
    window.addEventListener('hashchange', redirectWhenLogedIn);
}
//if(window.location=)
//document.addEventListener('DOMContentLoaded', updateContent);

function redirectWhenLogedIn(){
    const token = localStorage.getItem('token')
    console.log(token);
    if(token){
        //login(token);
        window.location.pathname = '/portfolio.html';
        showPortfolio();
    }
}

if(window.location.pathname.startsWith('/portfolio.html')){
    window.addEventListener('hashchange', showPortfolio());
}




/*
function updateContent(){
    if(window.location.pathname==){

    }
}

*/
/*

showPortfolio();
if(hash == '#' || hash == '' || hash == "#home" || hash == "#portfolio"){
   
} else if (hash == '#logout'){
    doLogout();
    hash = '#'
}    
else if (hash == "#invest"){
    showPortfolio();
    showAddInvest();
} else if (hash.startsWith("#sell/#")){
    let sellId = hash.slice(7);
    showPortfolio();
    showAddSell(sellId);
}
}
*/
},{"./lib/layout":5,"./lib/modal":6,"./lib/requests.js":7}],5:[function(require,module,exports){
const jwt_decode = require('jwt-decode');
const { getAll } = require('./requests');

// portfolio
function createTable(id, data){

    let table = document.getElementById(id);
    //table.innerHTML = '';
    let row = document.createElement('tr');


    for(invest of data){
        row = document.createElement('tr');
        row.setAttribute('id', invest.id);
        row.className= 'bg-indigo-100';

        //base
        let ticker = document.createElement('td');
        ticker.innerText= invest.ticker;
        
        let num_shared = document.createElement('td');
        num_shared.innerText= Number(invest.num_shared).toFixed(2);


        let buy_level = document.createElement('td');
        buy_level.innerText= Number(invest.buy_level).toFixed(2);
        buy_level.className = 'p-1';

        let fee = document.createElement('td');
        fee.innerText= Number(invest.fee).toFixed(2);
        fee.className = 'p-1';

        //Fetched externally // needs and external function or something
        let name = document.createElement('td');
        name.innerText= invest.ticker;

        let sector = document.createElement('td');
        sector.innerText= invest.ticker;
        sector.className = 'p-3 font-bold';

        let actual_price = document.createElement('td');
        actual_price.innerText= Number(invest.stored_price).toFixed(2);
        actual_price.className = 'p-1';

        //calulated
        let total_cost = document.createElement('td');
        total_cost.innerText= (invest.buy_level*invest.num_shared).toFixed(2);
        total_cost.className = 'p-1';

        let transaction_cost = document.createElement('td');
        transaction_cost.innerText= (invest.buy_level*invest.num_shared).toFixed(2);
        transaction_cost.className = 'p-3';
        
        let retn = document.createElement('td');
        retn.innerText = invest.fee+'%';
        retn.className = 'p-1';

        row.append(ticker);
        row.append(name);
        row.append(sector);
        row.append(fee);
        row.append(transaction_cost);
        row.append(total_cost);
        row.append(buy_level);         
        row.append(num_shared);
        row.append(actual_price);
        row.append(retn);

        if(id=='holdings'){
            let cellButton = document.createElement('td');
            let button = document.createElement('button');
            button.setAttribute('href',"/#sell/"+invest.id);
            button.addEventListener("click", function(){
                changeHolding(invest.id);
            })
            button.className = 'holdingButt';
            
            let img = document.createElement('img');
            img.setAttribute('src','assets/sell.svg');
            button.append(img);
            cellButton.append(button);
            row.append(cellButton);

        }else if(id=='pastHoldings'){
            let cellButton = document.createElement('td');
            let button = document.createElement('button');
            button.addEventListener("click", function(){
                deletePastHolding(invest.id);
            })            
            button.className = 'pastHoldingButt';
            
            let img = document.createElement('img');
            img.setAttribute('src','assets/sell.svg');
            button.append(img);
            cellButton.append(button);
            row.append(cellButton);;
        }
        
        table.append(row);
    }
}

function updateMain(data){    
    createTable('holdings', data.buys);
    createTable('pastHoldings', data.sells);
}

async function showPortfolio(){
    try{
        const data = await getAll();
        console.log(data);
        if (!data) {throw new Error('Problem in the database')}
        updateMain(data);
    }catch(e){
        console.log(e);
    }
}

//login
function login(token){
    const user = jwt_decode(token);
    localStorage.setItem("token", token);
    localStorage.setItem("username", user.username);
    localStorage.setItem("userEmail", user.email);
    window.location.pathname = '/porfolio.html';
}

function logout(){
    localStorage.clear();
    window.location.pathname = '/index.html';
}

//logout

module.exports = {
    showPortfolio,
    login,
    logout
};
},{"./requests":7,"jwt-decode":1}],6:[function(require,module,exports){
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


},{}],7:[function(require,module,exports){
(function (process){(function (){
const { doLogout } = require('./layout');

const portfolioData = require('../_data.example/portfolio.json');

const url = process.env.SERVER_URL || 'http://localhost:5000/';



async function requestLogin(e){
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`${url}auth/login`, options)
        const data = await r.json()
        if (!data.success) { throw new Error('Login not authorised'); }
        login(data.token);
    } catch (err) {
        console.warn(err);
    }
}

async function requestRegistration(e) {
    e.preventDefault();
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.fromEntries(new FormData(e.target)))
        }
        const r = await fetch(`${url}auth/register`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        requestLogin(e);
    } catch (err) {
        console.warn(err);
    }
}



async function getAll(){
    try {
        const options = { headers: new Headers({'token': localStorage.getItem('token')}) }
        const response = await fetch(`${url}users/${localStorage.getItem('id')}`, options);
        const data = await response.json();
        if(data.err){
            //console.warn(data.err);
            data = portfolioData;
            //doLogout(); //activate when not testing
            console.log(data)
        }
        return data;
    } catch (err) {
        console.warn(err);
        return portfolioData;
    }
}

async function createBuy(data){
    try{ 
        const options = { 
            headers: new Headers({'token': localStorage.getItem('token')}),
            method: 'POST',
            body: data 
        }
        const response = await fetch(`${url}buys`, options);
        const jResponse = await response.json();
        return jResponse;
    } catch(e) {
        console.warn(err);
    }
}

async function createSell(data){
    try{ 
        const options = { 
            headers: new Headers({'token': localStorage.getItem('token')}),
            method: 'POST',
            body: data 
        }
        const response = await fetch(`${url}sells`, options);
        const jResponse = await response.json();
        return jResponse;
    } catch(e) {
        console.warn(err);
    }
}
async function updateBuy(data){
    try{ 
        const options = { 
            headers: new Headers({'token': localStorage.getItem('token')}),
            method: 'PATCH',
            body: data 
        }
        const response = await fetch(`${url}buys`, options);
        const jResponse = await response.json();
        return jResponse;
    } catch(e) {
        console.warn(err);
    }
}
async function deleteBuy(data){
    try{ 
        const options = { 
            headers: new Headers({'token': localStorage.getItem('token')}),
            method: 'DELETE',
            body: data 
        }
        const response = await fetch(`${url}buys/${data.buy_id}`, options);
        const jResponse = await response.json();
        return jResponse;
    } catch(e) {
        console.warn(err);
    }
}
async function deleteSell(data){
    try{ 
        const options = { 
            headers: new Headers({'token': localStorage.getItem('token')}),
            method: 'DELETE',
            body: data 
        }
        const response = await fetch(`${url}sells/${data.id}`, options);
        const jResponse = await response.json();
        return jResponse;
    } catch(e) {
        console.warn(err);
    }
}



module.exports = {
    getAll,
    createBuy,
    updateBuy,
    createSell,
    deleteBuy,
    deleteSell,
    requestRegistration,
    requestLogin
};

}).call(this)}).call(this,require('_process'))
},{"../_data.example/portfolio.json":3,"./layout":5,"_process":2}]},{},[4]);
