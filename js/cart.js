let cantidad = ""


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            cartInfo = resultObj.data
            ShowCartInfo(cartInfo)
            guardarProductoCarrito()
            cantidad = document.getElementById('cantProduct')
            cantidad.addEventListener("click", function(e){
                let valor = cartInfo.articles[0].unitCost
                let currency = cartInfo.articles[0].currency
                let coste = document.getElementById('totalProd')
                coste.innerHTML="<b>"+currency +" "+ cantidad.value * valor+"</b>"
            })
        }
    });
});







function ShowCartInfo(cartInfo){
    let img = document.getElementById('productImg')
    let nombre = document.getElementById('productName')
    let precio = document.getElementById('productCurrency')
    let total = document.getElementById('totalProd')
    let currency = cartInfo.articles[0].currency;
    let unitCost = cartInfo.articles[0].unitCost
    img.src = cartInfo.articles[0].image
    nombre.innerText = cartInfo.articles[0].name
    precio.innerText = currency+" "+unitCost
    total.innerHTML="<b>"+currency+" "+unitCost+"</b>"
}

function guardarProductoCarrito(){
    let productCart = ""
    let productInfo = JSON.parse(localStorage.getItem('article'));
    productCart+=`<div class="row">
    <img src="`+productInfo.images[0]+`" style="width: 90px; height:40px;">
    <div class="col-md-1" style="width: 120px;">
      `+productInfo.name+`
    </div>
    <div class="col-md-1">
     `+productInfo.currency+" "+productInfo.cost+`
    </div>
    <div class="col-md-1">
      <input id="inputCantidad" class="form-control" min="1" type="number" value="1" style="width: 60px; height: 40px;" onclick="calcularValor()">
    </div>
    <div class="col-md-1" id="precioTotalArt">
    <b>`+productInfo.currency+" "+productInfo.cost+`</b>
    </div>
    </div>
    `
    document.getElementById('articulos').innerHTML += productCart;
}

function calcularValor(){
    let producto = JSON.parse(localStorage.getItem('article'));
    let cantidadArt = document.getElementById('inputCantidad').value;
    let totalArt = document.getElementById('precioTotalArt')
    totalArt.innerHTML = `<b>`+producto.currency+" "+ producto.cost * cantidadArt+`</b>`
}
