const inquirer = require('inquirer')
const chalk = require('chalk')

const fs = require('fs')

operations()

function operations(){
    inquirer.prompt([{
        type: 'list',
        name: 'actions',
        message: 'O que você deseja fazer?',
        choices: [
            "Criar conta",
            "Sacar",
            "Depositar",
            "Consultar saldo",
            "Sair"
        ]
    }])
    .then((resposta) => {
        const action = resposta['actions']
        
        if(action === "Criar conta"){
            createAccount()
        } else if(action === "Sacar"){
           console.log(action) 
        } else if(action === "Depositar"){
            deposit()
        } else if(action === "Consultar saldo"){
            console.log(action) 
        } else if(action === "Sair"){
            console.log(chalk.bgBlue("Obrigado por utilizar os nossos serviços!"))
            process.exit() 
         }   
    })
    .catch(err => console.log(err))
}


function createAccount(){
    console.log(chalk.bgGreen("Obrigado por escolher o nosso banco!"));
    console.log(chalk.green("Defina as opções da sua conta a seguir"))

    buildAccount()
}

function buildAccount(){
    inquirer.prompt({
        name: 'accountName',
        message: 'Digite um nome para a sua conta: '
    })
    .then((resposta) => {
        const accountName = resposta['accountName'];

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black("Essa conta já existe, escolha outro nome"))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"saldo": 0}', function(err){console.log(err)})
        console.log(chalk.green("Sua conta foi criada com sucesso!"))
        operations()
    })
    .catch(err => console.log(err))
}

function deposit(){
    inquirer.prompt({
        name: 'accountName',
        message: 'Qual o nome da conta? '
    })
    .then((resposta) => {
        const accountName = resposta['accountName']
        if(!checkAccount(accountName)){
            deposit()
        }
    })
    .catch(err => console.log(err))
}

function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black("Essa conta não existe, ecolha uma conta válida!"))
        return false
    }else {
        return true
    }
}