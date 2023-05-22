function atualizaTabela(){
    $.ajax({
        url: 'http://localhost:3000/calorias',
        method: 'POST', // ou 'POST', 'PUT', 'DELETE', etc.
        data: {menor_caloria: '10', maior_caloria: '30'}, // se necessário
        success: function(response) {
            console.log(response)
            $('#minha-tabela').html(response);
        },
      });
}
  
  