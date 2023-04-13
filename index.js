const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000

const fs = require('fs');
const alimentos = JSON.parse(fs.readFileSync('db.json'));

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json());


app.use((request, response, next) => { //configure in cors what can access the backend
    // * -> allow all URLs to access
    // 'url' -> permite 1 url acessar
    // ['url', 'url'] -> allow one or more URLs to access
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE"); // Release which methods will be allowed access
    app.use(cors());
    next();
})


//rotas
app.get('/', (request, response) => {
    alert(alimentos)
    response.status(200).send("Página em desenvolvimento...");
});

//Listar alimentos entre M e N calorias
app.get('/calorias', (request, response) => {
    const {menor_caloria, maior_caloria} = request.body
    
    const alimentosFiltrados = Object.entries(alimentos)
    .filter(alimento => {
        const caloria = parseFloat(alimentos[alimento[0]].Calorias)
        return caloria >= menor_caloria && caloria <= maior_caloria && alimento;
    });

    response.status(200).json(alimentosFiltrados);
}); 

//Listar K alimentos menos carboidatros
app.get('/menos_carbo', (request, response) => {
    const {carbo} = request.body

    const alimentosFiltrados = Object.entries(alimentos)
    .filter(alimento => {
        return parseFloat(alimentos[alimento[0]].Carboidratos) <= carbo && alimento;
    });

    response.status(200).json(alimentosFiltrados);
    
});

//Listar K alimentos mais carboidatros
app.get('/mais_carbo', (request, response) => {
    const {carbo} = request.body

    const alimentosFiltrados = Object.entries(alimentos)
    .filter(alimento => {
        return parseFloat(alimentos[alimento[0]].Carboidratos) >= carbo && alimento;
    });

    response.status(200).json(alimentosFiltrados);
});

//Listar K alimentos menos Proteicos
app.get('/menos_prot', (request, response) => {
    const {prot} = request.body

    const alimentosFiltrados = Object.entries(alimentos)
    .filter(alimento => {
        return parseFloat(alimentos[alimento[0]].Proteinas) <= prot && alimento;
    });

    response.status(200).json(alimentosFiltrados);
});

//Listar K alimentos mais Proteicos
app.get('/mais_prot', (request, response) => {
    const {prot} = request.body

    const alimentosFiltrados = Object.entries(alimentos)
    .filter(alimento => {
        return parseFloat(alimentos[alimento[0]].Proteinas) >= prot && alimento;
    });

    response.status(200).json(alimentosFiltrados);
});

//Listar K alimentos menos Gordurosos
app.get('/menos_gord', (request, response) => {
    const {gord} = request.body

    const alimentosFiltrados = Object.entries(alimentos)
    .filter(alimento => {
        return parseFloat(alimentos[alimento[0]]['Gorduras Totais']) <= gord && alimento;
    });

    response.status(200).json(alimentosFiltrados);
});

//Listar K alimentos mais Gordurosos
app.get('/mais_gord', (request, response) => {
    const {gord} = request.body

    const alimentosFiltrados = Object.entries(alimentos)
    .filter(alimento => {
        return parseFloat(alimentos[alimento[0]]['Gorduras Totais']) >= gord && alimento;
    });

    response.status(200).json(alimentosFiltrados);
});


//Listar alimentos por nome
app.get('/alimentos_nome', (request, response) => {
    const {nome} = request.body

    const alimentosFiltrados = Object.entries(alimentos)
    .filter(alimento => {
        return alimento[0].includes(nome) && alimento
    });

    response.status(200).json(alimentosFiltrados);
});


app.listen(port, (err) => {

    if (err) {
        console.log("❌ Não foi possível iniciar o servidor ❌");
    }else{
        console.log("Servidor iniciado")
    }
});