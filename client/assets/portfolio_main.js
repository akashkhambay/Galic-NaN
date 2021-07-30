
const formyahoo = document.querySelector('#yahoo-form');

// Bind Event Listeners
formyahoo.addEventListener('submit', searchstock);

function replaceName() {
let sect = document.getElementById('usernameTop')
if (localStorage.username && localStorage.username !== "undefined"){
sect.textContent = "Hello " + localStorage.username + "!"}}
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