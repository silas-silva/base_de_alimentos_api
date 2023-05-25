function atualizaOption(){
    var option_select = $('#option_select').val()
    if(option_select == 'calorias'){
        $('#div-outros').hide()
        $('#div-nome').hide()
        $('#div-calorias').show()
    }else if(option_select == 'nome') {
        $('#div-outros').hide()
        $('#div-nome').show()
        $('#div-calorias').hide()
    } else{
        $('#div-outros').show()
        $('#div-nome').hide()
        $('#div-calorias').hide()
    }
}

function atualizaTabela(){
    var tipo_busca = document.getElementById('option_select').value
    var rota = ''
    var dados = {}

    if(tipo_busca == 'nome'){
        rota = 'alimentos_nome'
        dados.nome = document.getElementById('nome').value
    }else if(tipo_busca == 'calorias'){
        rota = tipo_busca
        dados.menor_caloria = document.getElementById('valor-mais').value 
        dados.maior_caloria = document.getElementById('valor-menos').value
    }else{
        rota = document.getElementById('menos-mais').value+'_'+tipo_busca
        dados[tipo_busca] = document.getElementById('valor').value
    }

    var rota_completa = `https://basedealimentosapi-production-12a4.up.railway.app/${rota}`

    $.ajax({
        url: rota_completa,
        method: 'POST', 
        data: dados,
        success: function(response) {
            $('#minha-tabela').html(response);
            if($('body').css('color') != $('#tabela').css('color')){
                $('#tabela').toggleClass('dark-mode');
            }

        },
    });
}

function atualizaTema() {
    $("body").toggleClass("dark-mode");
    $('#tabela').toggleClass('dark-mode');
}