function toggleSidebar() {
    var sidebar = $(".sidebar");
    var isOpen = sidebar.hasClass("open");
    
    if (isOpen) {
      sidebar.animate({ right: "-200px" }, "slow").removeClass("open"); /* Altera para right */
    } else {
      sidebar.animate({ right: "0" }, "slow").addClass("open"); /* Altera para right */
    }
  }



  function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
  }

  function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
  }





  function updatePrice(modalId) {
    var modal = document.getElementById(modalId);
    var tamanhoSelecionado = modal.querySelector('input[name="tamanho"]:checked').value;
    var ingredientesSelecionados = Array.from(modal.querySelectorAll('input[name="adicionais"]:checked')).map(function(input) {
      return parseFloat(input.value);
    });
    
    var precoTotal = parseFloat(tamanhoSelecionado) + ingredientesSelecionados.reduce(function(total, ingrediente) {
      return total + ingrediente;
    }, 0);
    
    modal.querySelector("#precoTotal").textContent = "R$ " + precoTotal.toFixed(2);
  }
  
  // Adicione um evento de clique ao botão "Adicionar ao carrinho" de cada modal
  var addToCartBtns = document.querySelectorAll(".add_to_cart");
  addToCartBtns.forEach(function(btn) {
    btn.addEventListener("click", function() {
      var modalId = btn.closest('.modal').id;  // Obtenha o ID do modal pai
      updatePrice(modalId);  // Chame a função updatePrice com o ID do modal correspondente
      // Lógica para adicionar ao carrinho
    });
  });
  
  // Adicione eventos de clique aos inputs de tamanho e checkboxes de ingredientes adicionais de cada modal
  var modals = document.querySelectorAll('.modal');
  modals.forEach(function(modal) {
    var inputsTamanho = modal.querySelectorAll('input[name="tamanho"]');
    inputsTamanho.forEach(function(input) {
      input.addEventListener("click", function() {
        updatePrice(modal.id);  // Chame a função updatePrice com o ID do modal correspondente
      });
    });
  
    var checkboxesAdicionais = modal.querySelectorAll('input[name="adicionais"]');
    checkboxesAdicionais.forEach(function(checkbox) {
      checkbox.addEventListener("click", function() {
        updatePrice(modal.id);  // Chame a função updatePrice com o ID do modal correspondente
      });
    });
  });
  



//evento de compras do carrinho

let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})






function addToCart(pizzaId) {
  var modal = document.getElementById(pizzaId);
  var tamanhoSelecionado = modal.querySelector('input[name="tamanho"]:checked');
  var adicionaisSelecionados = modal.querySelectorAll('input[name="adicionais"]:checked');
  var total = 0;
  
  if (tamanhoSelecionado) {
    total += parseFloat(tamanhoSelecionado.value);
  }
  
  adicionaisSelecionados.forEach(function(adicional) {
    total += parseFloat(adicional.value);
  });
  
  var carrinho = document.querySelector('.listCard');
  var carrinhoItem = document.createElement('li');
  carrinhoItem.innerHTML = modal.querySelector('h2').innerHTML + ' - R$ ' + total.toFixed(2);
  carrinho.appendChild(carrinhoItem);
  
  var quantidade = document.querySelector('.quantity');
  quantidade.innerHTML = parseInt(quantidade.innerHTML) + 1;
  
  var totalCarrinho = document.querySelector('.total');
  totalCarrinho.innerHTML = (parseFloat(totalCarrinho.innerHTML) + total).toFixed(2);

}








