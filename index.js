// vai acessar a div do HTML
const app = document.getElementById("app") 

// guardandando o usuário
const users = [
    {
        email: 'teste@teste.com',
        phone: '9999999999',
        ref: 100,
        refBy: null
    },
    {
        email: 'tust@tust.com',
        phone: '9999999999',
        ref: 200,
        refBy: 100
    },
    {
        email: 'tost@tost.com',
        phone: '99999999999',
        ref: 300,
        refBy: 200
    }
]

const getUser = (userData) => {
    return user.find((user) => {
        return user.email == userData.email
    })
}

// vai contar a quantidade de pessoas que se inscreveram pelo seu link
const getTotalSubscribes = (userData) => {
    const subs = user.filter((user) => {
        return user.refBy == userData.ref
    })

    return subs.lenght
} 

// mostrando o convite
const showInvited = (userData) => {
    app.innerHTML = `
        <input type="text" id="link" value="https://evento.com?ref=${userData.ref}" disabled/>

         <div id="stats">
            <h4>${getTotalSubscribes(userData)}</h4>  // vai retornar o número de inscritos pelo seu link
            <p>Inscrições feitas</p>

         </div>
    `
}

const saveUser = (userData) => {
    const newUser = {

//quando usar o ... vai puxar as info que consta no const userData
        ...userData,

//vai gerar um número de referência aleatório para cada usuário
        ref: Math.round(Math.random()*4000),
        refBy: 100
    }

    user.push(newUser)
    return newUser
} 

// pegar o formulário
const formAction = () => { 
    const form = document.getElementById("form")
    form.onsubmit = (event) => {
        event.preventDefault()
        const formData = new FormData (form)

//criando um objeto 
        const userData = {  
            email: formData.get('email'),
            phone: formData.get('phone'),
       }

    const user = getUser(userData)
        if(user){

//encontrei o usuário
            showInvited = (user)
        }
//não encontrei, vou precisar cadastrar        
        else {
            const newUser = saveUser (userData)
            showInvited (newUser)
        }
    }
}

const startApp = () => { // vai iniciar a aplicação

const content = `
    <form id="#form">
        <input type="email" name="email" placeholder="E-mail" />
        <input type="text" name="phone" placeholder="Telefone" />
        <button>
            Confirmar
        </button>
    </form>
`

    app.innerHTML = content //fazer com que o conteúdo que estava no html volte a aparecer pelo JS


    formAction()
}

startApp ()