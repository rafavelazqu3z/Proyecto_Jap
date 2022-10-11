document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            cartInfo = resultObj.data
            ShowCartInfo(cartInfo)
        }
    })
});


let cantidad = document.getElementById('cantProduct')

cantidad.addEventListener("click", function(e){
    let valor = cartInfo.articles[0].unitCost
    let currency = cartInfo.articles[0].currency
    let coste = document.getElementById('totalProd')
    let cantidad = document.getElementById('cantProduct').value
    if( cantidad > 0){
    coste.innerHTML="<b>"+currency +" "+ cantidad * valor+"</b>"
    }else{
        Swal.fire({
            title: "Valor incorrecto",
            text: "Debe ingresar una cantidad mayor a 0",
            icon: "error",
            backdrop: true,
            timer: 4000,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            showConfirmButton: false
        });
    }

})


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