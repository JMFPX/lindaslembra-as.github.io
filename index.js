
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

var totalPreco = "0.00"

function ready(){
    let show = true;
    const menuContent = document.querySelector('.content');
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', () => {
        menuContent.classList.toggle('on', show)
        show = !show
    }) 
   
   
    const removeProdutoBt = document.getElementsByClassName("remove-button")
    for(var i = 0; i < removeProdutoBt.length; i++) {
    removeProdutoBt[i].addEventListener("click", removeProduto)
}
const quantidadeInputs = document.getElementsByClassName("preco-quantidade")
for(var i = 0; i < quantidadeInputs.length; i++){
    quantidadeInputs[i].addEventListener("change", checkIfInputIsNull)
}

const adicionarCarrinho = document.getElementsByClassName("adicionar")
for(var i = 0; i < adicionarCarrinho.length; i++){
adicionarCarrinho[i].addEventListener("click", adicionarProduto)
}


const purchaseButton = document.getElementsByClassName("purchase-Button")[0]
purchaseButton.addEventListener("click", AlertButton)
}


function AlertButton(){
    if(totalPreco === "0.00")
    {
      alert('Seu Carrinho de Compras está vazio')
    } 
    else {
        alert('Para Concluir sua compra, Você está direcionada(o) para entregar a(o) print para a loja!')
        
        setTimeout(() => {
            window.location.href = "https://api.whatsapp.com/send?phone=5585999743577&text=Ol%C3%A1,%20acessei%20seu%20Link%20Personalizado%20WhatsLink"
        } , 4500) 
       
    }
    
    document.querySelector(".cart-table tbody").innerHTML = ""
    updateTotal()
    
    
}

function checkIfInputIsNull(event){
    if(event.target.value === "0"){
        event.target.parentElement.parentElement.remove()
    }
    
    updateTotal()
}

function adicionarProduto(event){
    const button = event.target
    const produtoInfos = button.parentElement.parentElement
    const produtoImage = produtoInfos.getElementsByClassName("image-item")[0].src
    const produtoTitulo = produtoInfos.getElementsByClassName("titulo-produto")[0].innerText
    const produtoPreco = produtoInfos.getElementsByClassName("preco-produto")[0].innerText

    let novoCartProduto = document.createElement("tr")
    novoCartProduto.classList.add("cart-produto")

    novoCartProduto.innerHTML = 
    `
<td class="produto-identificacao">
    <div class="produtos">
        <img class="image-item" src="${produtoImage}" alt="">
    <div class="info">
        <div class="name">${produtoTitulo}</div>
    </div>
    </div>
</td>
<td><span class="preco-produto">${produtoPreco}</span></td>
<td>
  
  <input type="number" value= "1" min="0" class="preco-quantidade">

    
</td>
<td>
    <button class="remove-button">Remover</button>
</td>
 `
    const tableBody = document.querySelector(".content-1 tbody")
    tableBody.append(novoCartProduto)	

    updateTotal()
    novoCartProduto.getElementsByClassName("preco-quantidade")[0].addEventListener("change", checkIfInputIsNull)
    novoCartProduto.getElementsByClassName("remove-button")[0].addEventListener("click", removeProduto)
    
}

function removeProduto(event){
    event.target.parentElement.parentElement.remove()
    updateTotal()
}


function updateTotal() {
 totalPreco = 0
const produtoCart = document.getElementsByClassName("cart-produto")
for(var i = 0; i < produtoCart.length; i++){
    const produtoPreco = produtoCart[i].getElementsByClassName("preco-produto")[0].innerText.replace("R$"," ").replace(",",".")
    const precoQuantidade = produtoCart[i].getElementsByClassName("preco-quantidade")[0].value
    totalPreco = totalPreco +  (produtoPreco * precoQuantidade)
}
totalPreco = totalPreco.toFixed(2)
totalPreco = totalPreco.replace("." , ",")

document.querySelector(".box footer span").innerText = "R$" + totalPreco
}

