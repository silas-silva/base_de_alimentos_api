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
        var max = document.getElementById('valor-mais').value 
        var min = document.getElementById('valor-menos').value
        if (max > 900) {
            alert('O valor máximo para o maior valor é 900')
            document.getElementById('valor-mais').value = 900
            max = 900
        }else if (max < 0) {
            alert('O valor mínimo para o maior valor é 900')
            document.getElementById('valor-mais').value = 0
            max = 0
        }
        if (min > 900) {
            alert('O maior valor para o valor mínimo é 900')
            document.getElementById('valor-menos').value = 900
            min = 900
        }else if (min < 0) {
            alert('O menor valor para o valor mínimo é 900')
            document.getElementById('valor-menos').value = 0
            min = 0
        }
        dados.menor_caloria = max
        dados.maior_caloria = min
    }else{
        rota = document.getElementById('menos-mais').value+'_'+tipo_busca
        var valor = document.getElementById('valor').value
        if (valor > 100) {
            alert('O valor máximo é 100')
            document.getElementById('valor').value = 100
            valor = 100
        }else if (valor < 0) {
            alert('O valor mínimo é 0')
            document.getElementById('valor').value = 0
            valor = 0
        }
        dados[tipo_busca] = valor
    }

    //var rota_completa = `https://basedealimentosapi-production-12a4.up.railway.app/${rota}`
    var rota_completa = ` http://localhost:3000/${rota}`

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
    $('#icone_tema').toggleClass("bi-sun-fill bi-moon-fill");
}