## boottable documentação

Exemplo de JS. (melhorar).

```javascript
var PedidoDeCompra = {
  name:'PedidoDeCompra',
  init:function(){

    var teste = '[{"ID_PRODUTOS":"1", "NOMEPRODUTO":"GASOSA COMUM PREMIUM", "QTDE":"100", "VLRUNITARIO":"56,52", "ULTVLRENTRADA":"2,50", "CUSTOMEDIO":"2,50", "QTDETOTAL":"5.50456"},{"ID_PRODUTOS":"2", "NOMEPRODUTO":"GASOSA COMUM PREMIUM", "QTDE":"100", "VLRUNITARIO":"56,52", "ULTVLRENTRADA":"2,50", "CUSTOMEDIO":"2,50", "QTDETOTAL":"5.50456"},{"ID_PRODUTOS":"3", "NOMEPRODUTO":"GASOSA COMUM PREMIUM", "QTDE":"100", "VLRUNITARIO":"56,52", "ULTVLRENTRADA":"2,50", "CUSTOMEDIO":"2,50", "QTDETOTAL":"5.50456"},{"ID_PRODUTOS":"4", "NOMEPRODUTO":"GASOSA COMUM PREMIUM", "QTDE":"100", "VLRUNITARIO":"56,52", "ULTVLRENTRADA":"2,50", "CUSTOMEDIO":"2,50", "QTDETOTAL":"5.50456"},{"ID_PRODUTOS":"1", "NOMEPRODUTO":"GASOSA COMUM PREMIUM", "QTDE":"100", "VLRUNITARIO":"56,52", "ULTVLRENTRADA":"2,50", "CUSTOMEDIO":"2,50", "QTDETOTAL":"5.50456"},{"ID_PRODUTOS":"1", "NOMEPRODUTO":"GASOSA COMUM PREMIUM", "QTDE":"100", "VLRUNITARIO":"56,52", "ULTVLRENTRADA":"2,50", "CUSTOMEDIO":"2,50", "QTDETOTAL":"5.50456"},{"ID_PRODUTOS":"1", "NOMEPRODUTO":"GASOSA COMUM PREMIUM", "QTDE":"100", "VLRUNITARIO":"56,52", "ULTVLRENTRADA":"2,50", "CUSTOMEDIO":"2,50", "QTDETOTAL":"5.50456"},{"ID_PRODUTOS":"1", "NOMEPRODUTO":"GASOSA COMUM PREMIUM", "QTDE":"100", "VLRUNITARIO":"56,52", "ULTVLRENTRADA":"2,50", "CUSTOMEDIO":"2,50", "QTDETOTAL":"5.50456"},{"ID_PRODUTOS":"1", "NOMEPRODUTO":"GASOSA COMUM PREMIUM", "QTDE":"100", "VLRUNITARIO":"56,52", "ULTVLRENTRADA":"2,50", "CUSTOMEDIO":"2,50", "QTDETOTAL":"5.50456"},{"ID_PRODUTOS":"1", "NOMEPRODUTO":"GASOSA COMUM PREMIUM", "QTDE":"100", "VLRUNITARIO":"56,52", "ULTVLRENTRADA":"2,50", "CUSTOMEDIO":"2,50", "QTDETOTAL":"5.50456"},{"ID_PRODUTOS":"1", "NOMEPRODUTO":"GASOSA COMUM PREMIUM", "QTDE":"100", "VLRUNITARIO":"56,52", "ULTVLRENTRADA":"2,50", "CUSTOMEDIO":"2,50", "QTDETOTAL":"5.50456"},{"ID_PRODUTOS":"1", "NOMEPRODUTO":"GASOSA COMUM PREMIUM", "QTDE":"100", "VLRUNITARIO":"56,52", "ULTVLRENTRADA":"2,50", "CUSTOMEDIO":"2,50", "QTDETOTAL":"5.50456"},{"ID_PRODUTOS":"1", "NOMEPRODUTO":"GASOSA COMUM PREMIUM", "QTDE":"100", "VLRUNITARIO":"56,52", "ULTVLRENTRADA":"2,50", "CUSTOMEDIO":"2,50", "QTDETOTAL":"5.50456"}]';

    var list = jQuery.parseJSON( teste );

    PedidoDeCompra.additens(list);
  },
  additens:function(list){
    var arrHeader = [];
    var arrValues = [];
    var arrDetails = [];

    $("#table-pedidodecompra").bootTable({ method : 'init', selected : true });
    $("#table-pedidodecompra").bootTable({ method : 'clr' });

    $.each(list, function(key, values) {
      var header = {
        "ID_PRODUTOS" : values.ID_PRODUTOS
      };
      arrHeader.push( header );

      var item = {
        "ID_PRODUTOS"   : values.ID_PRODUTOS,
        "NOMEPRODUTO"   : values.NOMEPRODUTO,
        "QTDE"          : values.QTDE,
        "VLRUNITARIO"   : values.VLRUNITARIO,
        "ULTVLRENTRADA" : values.ULTVLRENTRADA,
        "CUSTOMEDIO"    : values.CUSTOMEDIO,
        "QTDETOTAL"     : values.QTDETOTAL,
        "EDIT"          : '<div onclick="PedidoDeCompra.edit('+key+')" class="btn btn-warning" ><span class="glyphicon glyphicon-pencil"></span></div>'
      };
      arrValues.push( item );

      var details  = {
        COLUMNS : ['Código', 'Nome do Produto', 'Valor'],
        ITENS : [{
          HEADER : {
            "ID_PRODUTOS"  : "1",
          },
          VALUES : {
            "ID_PRODUTOS"  : "1",
            "NOMEPRODUTOS" : "TEU CUZINHO É PRETO",
            "VALOR"        : "10,00"
          }
        },{
          HEADER : {
            "ID_PRODUTOS"  : "2",
          },
          VALUES : {
            "ID_PRODUTOS"  : "2",
            "NOMEPRODUTOS" : "TU É BIBA SEU VIADO",
            "VALOR"        : "10,00"
          }
        },{
          HEADER : {
            "ID_PRODUTOS"  : "3",
          },
          VALUES : {
            "ID_PRODUTOS"  : "3",
            "NOMEPRODUTOS" : "MAMA NO TABACO",
            "VALOR"        : "10,00"
          }
        }]
      };
      arrDetails.push( details );
    });
    $("#table-pedidodecompra").bTAddAll(arrHeader, arrValues, arrDetails);
  },
  edit : function(key) {
    $("#table-pedidodecompra").bTToggleDetails( key );
  }
}
```

## bTInit ou bootTableInit

Método responsável por inicializar a Tabela.
- Limpa todos os itens da tabela.
- Adiciona uma mensagem padrão. "Nenhum registro encontrado!" (Essa mensagem pode ser alterada no css.)
- Seta o cursor para pointer na tabela.

```javascript
$('#table').bTInit();
```

## bTLoader ou bootTableLoader

Método responsável por inserir um processando na Tabela.
- Deve ser chamando antes do seu método Ajax de Post ou Get.

```javascript
$('#table').bTLoader();
```

## bTAddAll ou bootTableAddAll

Método responsável por inserir um conjunto de itens na Tabela.
- Deve ser chamando apos o retorno do seu método Ajax de Post ou Get.

```javascript
var arrHeader = [];
var arrValues = [];
$.each(data, function(key, values) {
  var header = {
    "ID_USER" : values.ID_USER
  };
  arrHeader.push(header);
  var values = {
    "ID_USER" : values.ID_USER,
    "NAME"    : values.NAME,
    "MONEY"   : values.MONEY,
    "ACTIVE"  : ( values.ACTIVE === true ) ? 'Yes' : 'No'
  };
  arrValues.push(values);
});

$('#table').bTAddAll(arrHeader, arrValues);
```

## bTAddAllJson ou bootTableAddAllJson

Método responsável por inserir um conjunto de itens na Tabela passados via json.

```javascript
var data = [{"ID_USER":1,"NAME":"Stefanie Melendez","MONEY":10.89,"ACTIVE":false},{"ID_USER":2,"NAME":"Gillespie Short","MONEY":22.52,"ACTIVE":false},{"ID_USER":3,"NAME":"Henrietta Langley","MONEY":28.11,"ACTIVE":true},{"ID_USER":4,"NAME":"Marisa Fitzpatrick","MONEY":27.44,"ACTIVE":true},{"ID_USER":5,"NAME":"Benson Holloway","MONEY":24.96,"ACTIVE":true},{"ID_USER":6,"NAME":"Hunter Fox","MONEY":37.12,"ACTIVE":true}];

$('#table').bTAddAllJson(data);
```

## bTCalculateColumn ou bootTableCalculateColumn

Método responsável por calcular uma coluna numérica na tabela, passando como parâmetro a coluna.

```javascript
var result = $('#table').bTCalculateColumn('6');

console.log(result);
// 3080311.0999999996
```

## bTCalculateColumnByField ou bootTableCalculateColumnByField

Método responsável por calcular uma coluna numérica na tabela, passando como parâmetro o "campo" da coluna.

```javascript
var result = $('#table').bTCalculateColumnByField('VALORTAXA');

console.log(result);
// 3080311.0999999996
```

## bTGetSelectedItem ou bootTableGetSelectedItem

Método responsável por buscar o item selecionado na grid, retornando um objeto com o item selecionado.

```javascript
var result = $('#table').bTGetSelectedItem();

console.log(result);
// {"ID_USER":2,"NAME":"Gillespie Short","MONEY":22.52,"ACTIVE":false}
```

## bTGetItens ou bootTableGetItens

Método responsável por buscar os itens da tabela retornando um array de objetos.

```javascript
var result = $('#table').bTGetItens();

console.log(result);
// [{"ID_USER":1,"NAME":"Stefanie Melendez","MONEY":10.89,"ACTIVE":false},{"ID_USER":2,"NAME":"Gillespie Short","MONEY":22.52,"ACTIVE":false},{"ID_USER":3,"NAME":"Henrietta Langley","MONEY":28.11,"ACTIVE":true},{"ID_USER":4,"NAME":"Marisa Fitzpatrick","MONEY":27.44,"ACTIVE":true},{"ID_USER":5,"NAME":"Benson Holloway","MONEY":24.96,"ACTIVE":true},{"ID_USER":6,"NAME":"Hunter Fox","MONEY":37.12,"ACTIVE":true}]
```

## bTGetItensByColumn ou bootTableGetItensByColumn

Método responsável por buscar os itens da tabela de acordo com a coluna passada e retornar um array de objetos.
- Exemplo: Na tabela existe um campo do tipo checkbox, é buscado todos os itens selecionados.

```javascript
var result = $('#table').bTGetItensByColumn({'4' : 'true'});

console.log(result);
// [{"ID_USER":1,"NAME":"Stefanie Melendez","MONEY":10.89,"ACTIVE":true},{"ID_USER":2,"NAME":"Gillespie Short","MONEY":22.52,"ACTIVE":true}];

```

- Outro exemplo: Na tabela existe uma valor especifico que gostaria de buscar.

```javascript
var result = $('#table').bTGetItensByColumn({'3' : '10.89'});

console.log(result);
// [{"ID_USER":1,"NAME":"Stefanie Melendez","MONEY":10.89,"ACTIVE":true}]
```

## bTGetItensByField ou bootTableGetItensByField

Método responsável por buscar os itens da tabela de acordo com o "Field" passado e retornar um array de objetos.

- Exemplo: Na tabela existe um campo do tipo checkbox, é buscado todos os itens selecionados.

```javascript
var result = $('#table').bTGetItensByField({'ACTIVE' : 'true'});

console.log(result);
// [{"ID_USER":1,"NAME":"Stefanie Melendez","MONEY":10.89,"ACTIVE":true},{"ID_USER":2,"NAME":"Gillespie Short","MONEY":22.52,"ACTIVE":true}];
```

- Outro exemplo: Na tabela existe uma valor especifico que gostaria de buscar.

```javascript
var result = $('#table').bTGetItensByField({'MONEY' : '10.89'});

console.log(result);
// [{"ID_USER":1,"NAME":"Stefanie Melendez","MONEY":10.89,"ACTIVE":true}]
```

## bTGetItensCount ou bootTableGetItensCount

Método responsável por contar a quantidade de itens na tabela.
- Pode-se passar como parâmetro quantos zeros a esquerda devem ser adicionados de máscara.

```javascript
var result = $('#table').bTGetItensCount();
console.log(result);
// 6

var result = $('#table').bTGetItensCount('4');
console.log(result);
// 0006
```

## bTHideColumn ou bootTableHideColumn

Método responsável por esconder uma coluna, passando como parâmetro a coluna.

```javascript
$('#table').bTHideColumn('1');

OR

$('#table').bTHideColumn([
  '1', '2'
]);

OR

$('#table').bTAddAllJson(data).bTHideColumn([
  '1', '2'
]);
```

## bTHideColumnByField ou bootTableHideColumnByField

Método responsável por esconder uma coluna, passando como parâmetro o "FIELD" da coluna.

```javascript
$('#table').bTHideColumnByField('ID_USER');

OR

$('#table').bTHideColumnByField([
  'ID_USER', 'NAME'
]);

OR

$('#table').bTAddAllJson(data).bTHideColumnByField([
  'ID_USER', 'NAME'
]);
```

## bTShowColumn ou bootTableShowColumn

Método responsável por apresentar uma coluna, passando como parâmetro a coluna.

```javascript
$('#table').bTShowColumn('1');

OR

$('#table').bTShowColumn([
  '1', '2'
]);

OR

$('#table').bTAddAllJson(data).bTShowColumn([
  '1', '2'
]);
```

## bTShowColumnByField ou bootTableShowColumnByField

Método responsável por apresentar uma coluna, passando como parâmetro o "FIELD" da coluna.

```javascript
$('#table').bTShowColumnByField('ID_USER');

OR

$('#table').bTShowColumnByField([
  'ID_USER', 'NAME'
]);

OR

$('#table').bTAddAllJson(data).bTShowColumnByField([
  'ID_USER', 'NAME'
]);
```

## bTFixHead ou bootTableFixHead

Método responsável por fixar "thead" da tabela.

```javascript
$('#table').bTFixHead();
```

## bTFixHeadFoot ou bootTableFixHeadFoot

Método responsável por fixar "thead" e "tfoot" da tabela.

```javascript
$('#table').bTFixHeadFoot();
```

## bTShowDetails ou bootTableShowDetails

Método responsável por apresentar os detalhes da tabela.

```javascript
$('#table').bTShowDetails('key');
```

## bTHideDetails ou bootTableHideDetails

Método responsável por esconder os detalhes da tabela.

```javascript
$('#table').bTHideDetails('key');
```

## bTToggleDetails ou bootTableToggleDetails

Método responsável por apresentar/esconder os detalhes da tabela.

```javascript
$('#table').bTToggleDetails('key');
```
