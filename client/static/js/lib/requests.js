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
