const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3000

const fs = require('fs');
const alimentos = JSON.parse(fs.readFileSync('./db.json'));

app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(express.json());


app.post((request, response, next) => { //configure in cors what can access the backend
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
    response.status(200).send("Página em desenvolvimento...");
});

//Listar alimentos entre M e N calorias
app.post('/calorias', (request, response) => {
    const {menor_caloria, maior_caloria} = request.body
    const alimentosFiltrados = {};
    
    for (let i = 0; i < alimentos.length; i++) {
        const alimento = alimentos[i];
        const caloria = parseFloat(alimento.Calorias);
        
        if (caloria >= menor_caloria && caloria <= maior_caloria) {
            alimentosFiltrados[i] = alimento;
        }
    }
    response.status(200).send(alimentosFiltrados);
}); 

//Listar K alimentos menos carboidatros
app.post('/menos_carbo', (request, response) => {
    const {carbo} = request.body

    const alimentosFiltrados = {};
    for (const [key, value] of Object.entries(alimentos)) {
        const carboidratos = parseFloat(value.Carboidratos);
        if (carboidratos <= carbo) {
            alimentosFiltrados[key] = value;
        }
    }

    response.status(200).json(alimentosFiltrados);
    
});

//Listar K alimentos mais carboidatros
app.post('/mais_carbo', (request, response) => {
    const {carbo} = request.body

    const alimentosFiltrados = {};
    for (const [key, value] of Object.entries(alimentos)) {
        const carboidratos = parseFloat(value.Carboidratos);
        if (carboidratos >= carbo) {
            alimentosFiltrados[key] = value;
        }
    }

    response.status(200).json(alimentosFiltrados);
});

//Listar K alimentos menos Proteicos
app.post('/menos_prot', (request, response) => {
    const {prot} = request.body

    const alimentosFiltrados = {};
    for (const [key, value] of Object.entries(alimentos)) {
        const proteina = parseFloat(value.Proteinas);
        if (proteina <= prot) {
            alimentosFiltrados[key] = value;
        }
    }

    response.status(200).json(alimentosFiltrados);
});

//Listar K alimentos mais Proteicos
app.post('/mais_prot', (request, response) => {
    const {prot} = request.body

    const alimentosFiltrados = {};
    for (const [key, value] of Object.entries(alimentos)) {
        const proteina = parseFloat(value.Proteinas);
        if (proteina >= prot) {
            alimentosFiltrados[key] = value;
        }
    }

    response.status(200).json(alimentosFiltrados);
});

//Listar K alimentos menos Gordurosos
app.post('/menos_gord', (request, response) => {
    const {gord} = request.body

    const alimentosFiltrados = {};
    for (const [key, value] of Object.entries(alimentos)) {
        const gordura = parseFloat(value['Gorduras Totais']);
        if (gordura <= gord) {
            alimentosFiltrados[key] = value;
        }
    }

    response.status(200).json(alimentosFiltrados);
});

//Listar K alimentos mais Gordurosos
app.post('/mais_gord', (request, response) => {
    const {gord} = request.body

    const alimentosFiltrados = {};
    for (const [key, value] of Object.entries(alimentos)) {
        const gordura = parseFloat(value['Gorduras Totais']);
        if (gordura >= gord) {
            alimentosFiltrados[key] = value;
        }
    }

    response.status(200).json(alimentosFiltrados);
});


//Listar alimentos por nome
app.post('/alimentos_nome', (request, response) => {
    const {nome} = request.body

    const alimentosFiltrados = {};
    for (const [key, value] of Object.entries(alimentos)) {
        if (key.includes(nome)) {
            alimentosFiltrados[key] = value;
        }
    }

    response.status(200).json(alimentosFiltrados);
});


app.listen(port, (err) => {

    if (err) {
        console.log("❌ Não foi possível iniciar o servidor ❌");
    }else{
        console.log("Servidor iniciado")
    }
});
