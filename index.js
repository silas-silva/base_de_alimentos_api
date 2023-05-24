const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000

const fs = require('fs');
const alimentos = JSON.parse(fs.readFileSync('static/database/db.json'));

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.set('view engine', 'ejs')

app.post((request, response, next) => { 
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    app.use(cors());
    next();
})


//rotas
app.get('/', (request, response) => {
    response.sendFile('./views/index.html', {root: __dirname})
});

//Listar alimentos entre M e N calorias
app.post('/calorias', (request, response) => {
    const {menor_caloria, maior_caloria} = request.body
    
    const alimentosFiltrados = Object.entries(alimentos)
    .filter(alimento => {
        const caloria = parseFloat(alimentos[alimento[0]].Calorias)
        return caloria >= menor_caloria && caloria <= maior_caloria && alimento;
    });

    response.render('tabela', {alimentos: alimentosFiltrados})
}); 

//Listar K alimentos menos carboidatros
app.post('/menos_carbo', (request, response) => {
    const {carbo} = request.body

    const alimentosFiltrados = Object.entries(alimentos)
    .filter(alimento => {
        return parseFloat(alimentos[alimento[0]].Carboidratos) <= carbo && alimento;
    });

    response.render('tabela', {alimentos: alimentosFiltrados})
});

//Listar K alimentos mais carboidatros
app.post('/mais_carbo', (request, response) => {
    const {carbo} = request.body

    const alimentosFiltrados = Object.entries(alimentos)
    .filter(alimento => {
        return parseFloat(alimentos[alimento[0]].Carboidratos) >= carbo && alimento;
    });

    response.render('tabela', {alimentos: alimentosFiltrados})
});

//Listar K alimentos menos Proteicos
app.post('/menos_prot', (request, response) => {
    const {prot} = request.body

    const alimentosFiltrados = Object.entries(alimentos)
    .filter(alimento => {
        return parseFloat(alimentos[alimento[0]].Proteinas) <= prot && alimento;
    });

    response.render('tabela', {alimentos: alimentosFiltrados})
});

//Listar K alimentos mais Proteicos
app.post('/mais_prot', (request, response) => {
    const {prot} = request.body

    const alimentosFiltrados = Object.entries(alimentos)
    .filter(alimento => {
        return parseFloat(alimentos[alimento[0]].Proteinas) >= prot && alimento;
    });

    response.render('tabela', {alimentos: alimentosFiltrados})
});

//Listar K alimentos menos Gordurosos
app.post('/menos_gord', (request, response) => {
    const {gord} = request.body

    const alimentosFiltrados = Object.entries(alimentos)
    .filter(alimento => {
        return parseFloat(alimentos[alimento[0]]['Gorduras Totais']) <= gord && alimento;
    });

    response.render('tabela', {alimentos: alimentosFiltrados})
});

//Listar K alimentos mais Gordurosos
app.post('/mais_gord', (request, response) => {
    const {gord} = request.body

    const alimentosFiltrados = Object.entries(alimentos)
    .filter(alimento => {
        return parseFloat(alimentos[alimento[0]]['Gorduras Totais']) >= gord && alimento;
    });

    response.render('tabela', {alimentos: alimentosFiltrados})
});


//Listar alimentos por nome
app.post('/alimentos_nome', (request, response) => {
    const {nome} = request.body

    const alimentosFiltrados = Object.entries(alimentos)
    .filter(alimento => {
        return alimento[0].includes(nome) && alimento
    });

    response.render('tabela', {alimentos: alimentosFiltrados})
});


app.listen(port, (err) => {

    if (err) {
        console.log("❌ Não foi possível iniciar o servidor ❌");
    }else{
        console.log("ACESSE: http://localhost:3000/")
    }
});
