
const formyahoo = document.querySelector('#yahoo-form');
const addInvestmentform = document.querySelector('#addInvestmentform');

// Bind Event Listeners
formyahoo.addEventListener('submit', searchstock);
addInvestmentform.addEventListener('submit', sendbuy)
submitbtn
function replaceName() {
let sect = document.getElementById('usernameTop')
if (localStorage.username && localStorage.username !== "undefined"){
sect.textContent = 'Hi ' + localStorage.username + '!'}}
replaceName()

function searchstock(e) {
    e.preventDefault(); //Stops page reloading
    let ticker = e.target.StockTickersearch.value
    let url = `https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=${ticker}&region=US`
    console.log(url)
    fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "d5f69dd810msh69699f52c9e3a85p16f184jsn9ac2dae6c00f",
            "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
        }
    })
        .then(response => response.json())
        .then(content => {
            document.querySelector("#Stock-Ticker").value = content.symbol
            document.querySelector("#Name").value = content.quoteType.longName
            document.querySelector("#Sector").value = content.summaryProfile.sector
            document.querySelector("#sharePrice").value = content.financialData.currentPrice.raw
            document.querySelector("#StockTickersearch").value = ""
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); 
            var yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd;
            document.querySelector("#Dateform").value = today
        })
        .catch(err => { console.error(err) })

}

function logout(){
    localStorage.clear();
    window.location = "./index.html";
}

document.addEventListener('DOMContentLoaded', showPortfolio);
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
    if(!!data.buys.length>0) {createTable('holdings', data.buys)};
    if(!!data.sells.length>0){createTable('pastHoldings', data.sells)};
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

const url = 'http://localhost:5000/'
async function getAll(){
    try {
        const options = { headers: new Headers({'token': localStorage.getItem('token')}) }
        console.log(localStorage.getItem('userid'))
        const response = await fetch(`${url}users/${localStorage.getItem('userid')}`, options);
        const data = await response.json();
        if(data.err){
            console.warn(data.err);
            //data = portfolioData;
            //doLogout(); //activate when not testing
            console.log(data)
        }
        return data;
    } catch (err) {
        console.warn(err);
        return portfolioData;
    }
}

async function sendbuy(e){
    e.preventDefault();
    const data =Object.fromEntries(new FormData(e.target));
    data.user_id = localStorage.getItem('userid');
    try {
        const options = {
            headers: new Headers({'token': localStorage.getItem('token')}),
            method: 'POST',
            body: JSON.stringify(data)
        }
        const r = await fetch(`${url}buys`, options)
        const data = await r.json()
        if (data.err){ throw Error(data.err) }
        requestLogin(e);
    } catch (err) {
        console.warn(err);
    }

}