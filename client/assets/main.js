function signup() {
    let sect = document.getElementById('wordy')
    sect.textContent = "Already have an account? "
    let loginlink = document.createElement('a')
    sect.append(loginlink)
    loginlink.textContent = "Log in here"
    loginlink.setAttribute('class', 'underline font-semibold')
    loginlink.setAttribute('onclick', 'removehash()')
    
    // secta = sect.createElement('a');
    // secta.href = '#Works'
    // secta.textcontent = "Shav"

    let login1 = document.getElementById('login')
    login1.setAttribute('class', 'hidden')
    let login = document.getElementById('register')
    login.setAttribute('class', 'flex flex-col pt-3 md:pt-8')

    let namediv = document.createElement('div')
    login.prepend(namediv)
    namediv.setAttribute('class', 'flex flex-col pt-4')

    let namelabel = document.createElement('label')
    namediv.append(namelabel)
    namelabel.setAttribute('class', 'text-lg')
    namelabel.textContent = "Full Name"

    
    let nameinput = document.createElement('input')
    namediv.append(nameinput)
    nameinput.setAttribute('class', 'shadow   border rounded-md w-full py-2 px-3 text-gray-700 mt-1 leading-tight  outline-none focus:outline-none focus-within:border-indigo-500 transition-all duration-500 focus:border')
    nameinput.setAttribute('id', 'name')
    nameinput.setAttribute('name', 'name')
    nameinput.setAttribute('placeholder', 'Full Name')
    


    let passwordDiv = document.createElement('div')
    let subbtndiv = document.getElementById('subbtndiv')
    login.insertBefore(passwordDiv, subbtndiv)
    passwordDiv.setAttribute('class', 'flex flex-col pt-4')


    let passwordlabel = document.createElement('label')
    passwordDiv.append(passwordlabel)
    passwordlabel.setAttribute('class', 'text-lg')
    passwordlabel.textContent = "Repeat Password"

    
    let passwordInput = document.createElement('input')
    passwordDiv.append(passwordInput)
    passwordInput.setAttribute('class', 'shadow   border rounded-md w-full py-2 px-3 text-gray-700 mt-1 leading-tight  outline-none focus:outline-none focus-within:border-indigo-500 transition-all duration-500 focus:border')
    passwordInput.setAttribute('id', 'passwordrepeat')
    passwordInput.setAttribute('placeholder', 'Repeat Password')
    passwordInput.setAttribute('type', 'password')



    namediv.setAttribute('id', 'findme')

    // namediv.setAttribute('class', 'shadow border rounded-md w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border')
    // namediv.textContent = "Have an account?"


    let sect2 = document.getElementById('submitbtn')
    sect2.setAttribute('value', 'Register')


}

function removehash() {
let destination = window.location.href.substr(0, window.location.href.indexOf('#'))
window.location.href = destination;
}