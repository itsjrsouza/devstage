// vai acessar a div do HTML
const app = document.getElementById("app") 

// guardandando o usuário
const users = [
    {
        email: "teste@teste.com",
        phone: "9999999999",
        ref: 100,
        refBy: null
    },
    {
        email: "tust@tust.com",
        phone: "9999999999",
        ref: 200,
        refBy: 100
    },
    {
        email: "tost@tost.com",
        phone: "99999999999",
        ref: 300,
        refBy: 200
    }
]

const getUser = (userData) => {
    return users.find((user) => {
        return user.email == userData.email
    })
}

// vai contar a quantidade de pessoas que se inscreveram pelo seu link
const getTotalSubscribers = (userData) => {
    const subs = users.filter((user) => {
        return user.refBy == userData.ref
    })

    return subs.length
} 

// mostrando o convite
const showInvite = (userData) => {
    app.innerHTML = `
    <main>
        <h3>Inscrição confirmada!</h3>

        <p>
            Convide mais pessoas e concorra a prêmios!</br>
            Compartilhe o link e acompanhe as inscrições:
        </p>

        <div class="input-group">
            <label for="link">
                <img src="./assets/link.svg" alt="link icon">
            </label>
        <input type="text" id="link" value="https://evento.com?ref=${userData.ref}" disabled>
        </div>
    </main>

    <section class="stats">
        
        <h4>${getTotalSubscribers(userData)}</h4> 
        <p>Inscrições feitas</p>

    </section>
    `

    app.setAttribute('class', 'page-invite')
}

const saveUser = (userData) => {
    const newUser = {

//quando usar o ... vai puxar as info que consta no const userData
        ...userData,

//vai gerar um número de referência aleatório para cada usuário
        ref: Math.round(Math.random() * 4000),
        refBy: 100
    }

    users.push(newUser)
    console.log(users)
    return newUser
} 

// pegar o formulário
const formAction = () => {
    const form = document.getElementById("form")
    form.onsubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(form)

//criando um objeto 
        const userData = {  
            email: formData.get("email"),
            phone: formData.get("phone"),
}

    const user = getUser(userData)
        if (user) {
//encontrei o usuário
            showInvite = (user)
//não encontrei, vou precisar cadastrar        
        } else {
            const newUser = saveUser (userData)
            showInvite(newUser)
        }
    }
}

const startApp = () => { // vai iniciar a aplicação

const content = `
         <main>
                <section class="about">
                    <div class="section-header">
                        <h2>Sobre o evento</h2>

                        <span class="badge">AO VIVO</span>
                    </div>

                    <p>
                        Um evento feito por e para pessoas desenvolvedoras apaixonadas por criar soluções inovadoras e compartilhar conhecimento. Vamos mergulhar nas tendências mais recentes em desenvolvimento de software, arquitetura de sistemas e tecnologias emergentes, com palestras, workshops e hackathons.
                    </br> </br>Dias 15 a 17 de março | Das 18h às 21h | Online & Gratuito
                    </p>
                </section>

                <section class="registration">
                    <h2>Inscrição</h2>

                    <form id="form">
                        <div class="input-wrapper">
                            <div class="input-group">
                                <label for="email">
                                    <img src="./assets/mail.svg" alt="email icon">
                                </label>
                                <input type="email" id="email" name="email" placeholder="E-mail"/>
                             </div>
                                
                            <div class="input-group">
                                <label for="phone">
                                    <img src="./assets/phone.svg" alt="telefone icon">
                                </label>
                                <input type="text" id="phone" name="phone" placeholder="Telefone"/>
                            </div>
                        </div>
                        <button>
                            Confirmar
                            <img src="./assets/arrow.svg" alt="Arrow right">
                        </button>
                    </form>
                </section>
            </main>
`

    app.innerHTML = content //fazer com que o conteúdo que estava no html volte a aparecer pelo JS
    app.setAttribute('class', 'page-start')


    formAction()
}

startApp ()

document.querySelector("header").onclick = () => startApp()