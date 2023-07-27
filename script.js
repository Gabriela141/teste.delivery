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
    var bordaSelecionada = modal.querySelector('input[name="bordas"]:checked');
    var borda = bordaSelecionada ? parseFloat(bordaSelecionada.value) : 0;
    var ingredientesSelecionados = Array.from(modal.querySelectorAll('input[name="adicionais"]:checked')).map(function(input) {
      return parseFloat(input.value);
    });
  
    var precoTotal = parseFloat(tamanhoSelecionado) + borda + ingredientesSelecionados.reduce(function(total, ingrediente) {
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
  
  // Adicione eventos de clique aos inputs de tamanho, bordas e checkboxes de ingredientes adicionais de cada modal
  var modals = document.querySelectorAll('.modal');
  modals.forEach(function(modal) {
    var inputsTamanho = modal.querySelectorAll('input[name="tamanho"]');
    inputsTamanho.forEach(function(input) {
      input.addEventListener("click", function() {
        updatePrice(modal.id);  // Chame a função updatePrice com o ID do modal correspondente
      });
    });
  
    var checkboxesBordas = modal.querySelectorAll('input[name="bordas"]');
    checkboxesBordas.forEach(function(checkbox) {
      checkbox.addEventListener("click", function() {
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









// Função para atualizar o contador do carrinho
function updateCartCounter() {
  const cartCounterElement = document.querySelector('.quantity');
  cartCounterElement.textContent = cart.length;
  cartCounterElement.classList.add('bounce-animation');

  // Remover a classe de animação após a conclusão da animação
  setTimeout(() => {
    cartCounterElement.classList.remove('bounce-animation');
  }, 600);
}






// Variável para armazenar o carrinho
let cart = [];

// Função para adicionar ao carrinho
function addToCart(sabor) {
  // Recuperar elementos selecionados
  const tamanhoElement = document.querySelector(`#${sabor} input[name="tamanho"]:checked`);
  const tamanho = parseFloat(tamanhoElement.value);
  const tamanhoTexto = tamanhoElement.nextElementSibling.textContent;
  
  const bordaElement = document.querySelector(`#${sabor} input[name="bordas"]:checked`);
  const borda = bordaElement ? parseFloat(bordaElement.value) : 0;
  const bordaTexto = bordaElement ? bordaElement.nextElementSibling.textContent : "Sem borda";

  const adicionaisSelecionados = document.querySelectorAll(`#${sabor} input[name="adicionais"]:checked`);
  const adicionais = Array.from(adicionaisSelecionados).map(adicional => parseFloat(adicional.value));
  const adicionaisTextos = Array.from(adicionaisSelecionados).map(adicional => adicional.nextElementSibling.textContent);

  const observacoesElement = document.getElementById("observacoes");
  const observacoes = observacoesElement.value;
  
  
  // Recuperar a imagem da pizza
  const imagemSrc = document.querySelector(`#${sabor} .modal-image`).src;

  // Calcular o preço total
  let precoTotal = tamanho + borda;
  adicionais.forEach(adicional => {
    precoTotal += adicional;
  });

  // Criar objeto do item adicionado
  const item = {
    nome: `Pizza de ${sabor}`,
    tamanho: tamanhoTexto,
    borda: bordaTexto,
    adicionais: adicionaisTextos,
    precoTotal: precoTotal.toFixed(2),
    imagem: imagemSrc,
    observacoes: observacoes,
  };

  // Adicionar item ao carrinho
  cart.push(item);

  // Atualizar a exibição do carrinho
  updateCart();

  // Atualizar o contador do carrinho
  updateCartCounter();
}


// Função para remover item do carrinho
function removeFromCart(index) {
  // Verificar se o índice é válido
  if (index >= 0 && index < cart.length) {
    // Remover o item do carrinho pelo índice
    cart.splice(index, 1);

    // Atualizar a exibição do carrinho
    updateCart();

    // Atualizar o contador do carrinho
    updateCartCounter();
  }
}

// Função para atualizar a exibição do carrinho
function updateCart() {
  const cardItemsElement = document.getElementById("card-items");
  const cardTotalElement = document.getElementById("card-total");

  // Limpar os itens atuais do carrinho
  cardItemsElement.innerHTML = "";

  // Exibir os itens do carrinho
  cart.forEach((item, index) => {
    const itemElement = document.createElement("li");

    const imageElement = document.createElement("img");
    imageElement.src = item.imagem;
    imageElement.alt = item.nome;
    imageElement.classList.add("item-image");
    itemElement.appendChild(imageElement);

    const contentElement = document.createElement("div");
    contentElement.classList.add("item-content");

    const titleElement = document.createElement("h3");
    titleElement.textContent = item.nome;
    contentElement.appendChild(titleElement);

    const sizeElement = document.createElement("p");
    sizeElement.textContent = `Tamanho: ${item.tamanho}`;
    contentElement.appendChild(sizeElement);

    const bordaElement = document.createElement("p");
    bordaElement.textContent = `Borda: ${item.borda}`;
    contentElement.appendChild(bordaElement);

    const adicionaisElement = document.createElement("p");
    adicionaisElement.textContent = `Adicionais: ${item.adicionais.join(", ")}`;
    contentElement.appendChild(adicionaisElement);

    const precoElement = document.createElement("p");
    precoElement.textContent = `Preço: R$ ${item.precoTotal}`;
    contentElement.appendChild(precoElement);

    // Criar botão de remoção
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remover";
    removeButton.addEventListener("click", () => {
      removeFromCart(index);
    });
    contentElement.appendChild(removeButton);

    itemElement.appendChild(contentElement);
    cardItemsElement.appendChild(itemElement);
  });

  // Calcular e exibir o preço total do carrinho
  const cardTotal = cart.reduce((total, item) => total + parseFloat(item.precoTotal), 0);
  cardTotalElement.textContent = cardTotal.toFixed(2);
}

// Função para atualizar o contador do carrinho
function updateCartCounter() {
  const quantityElement = document.querySelector(".quantity");
  quantityElement.textContent = cart.length.toString();
}









function adicionarSaboresAoCarrinho() {
  const checkboxesSabores = document.querySelectorAll(".sabor-checkbox:checked");
  const checkboxesAdicionais = document.querySelectorAll(".adicionais_pizza_dois_sabores input[type='checkbox']:checked");
  const checkboxesBordas = document.querySelectorAll(".bordas_pizza_dois_sabores input[type='checkbox']:checked");

  // Verificar se exatamente dois sabores foram selecionados
  if (checkboxesSabores.length !== 2) {
    alert("Selecione exatamente dois sabores de pizza!");
    return;
  }

  // Somar os valores dos sabores selecionados
  let total = 0;
  const sabores = [];
  checkboxesSabores.forEach(checkbox => {
    const preco = parseFloat(checkbox.value);
    total += preco;
    sabores.push(checkbox.dataset.sabor);
  });

  // Armazenar os nomes dos adicionais selecionados
  const adicionaisSelecionados = [];
  checkboxesAdicionais.forEach(checkbox => {
    adicionaisSelecionados.push(checkbox.nextElementSibling.textContent);
    const preco = parseFloat(checkbox.value);
    total += preco;
  });

  // Armazenar o nome da borda selecionada (se houver)
  let bordaSelecionada = "Sem borda";
  if (checkboxesBordas.length > 0) {
    bordaSelecionada = checkboxesBordas[0].nextElementSibling.textContent;
    const precoBorda = parseFloat(checkboxesBordas[0].value);
    total += precoBorda;
  }

  // Criar o objeto do item adicionado com os dois sabores, adicional e borda selecionados
  const item = {
    nome: `Pizza de ${sabores[0]} e ${sabores[1]}`,
    tamanho: "Grande",
    borda: bordaSelecionada,
    adicionais: adicionaisSelecionados,
    precoTotal: total.toFixed(2),
    imagem: "", // Coloque a URL da imagem da pizza aqui, se necessário
    observacoes: "",
  };

  // Adicionar item ao carrinho
  cart.push(item);

  // Atualizar a exibição do carrinho
  updateCart();

  // Atualizar o contador do carrinho
  updateCartCounter();

  // Fechar o modal de seleção de sabores
  closeModal("pizza_dois_sabores_modal_grande");
}



function adicionarSaboresAoCarrinhoMedia() {
  const checkboxesSabores = document.querySelectorAll(".sabor-checkbox-media:checked");
  const checkboxesAdicionais = document.querySelectorAll(".adicionais_pizza_dois_sabores_media input[type='checkbox']:checked");
  const checkboxesBordas = document.querySelectorAll(".bordas_pizza_dois_sabores_media input[type='radio']:checked");

  // Verificar se exatamente dois sabores foram selecionados
  if (checkboxesSabores.length !== 2) {
    alert("Selecione exatamente dois sabores de pizza!");
    return;
  }

  // Somar os valores dos sabores selecionados
  let total = 0;
  const sabores = [];
  checkboxesSabores.forEach(checkbox => {
    const preco = parseFloat(checkbox.value);
    total += preco;
    sabores.push(checkbox.dataset.sabor);
  });

  // Armazenar os nomes dos adicionais selecionados
  const adicionaisSelecionados = [];
  checkboxesAdicionais.forEach(checkbox => {
    adicionaisSelecionados.push(checkbox.nextElementSibling.textContent);
    const preco = parseFloat(checkbox.value);
    total += preco;
  });

  // Armazenar o nome da borda selecionada (se houver)
  let bordaSelecionada = "Sem borda";
  checkboxesBordas.forEach(radio => {
    bordaSelecionada = radio.nextElementSibling.textContent;
    const precoBorda = parseFloat(radio.value);
    total += precoBorda;
  });

  // Criar o objeto do item adicionado com os dois sabores, adicional e borda selecionados
  const item = {
    nome: `Pizza de ${sabores[0]} e ${sabores[1]}`,
    tamanho: "Média",
    borda: bordaSelecionada,
    adicionais: adicionaisSelecionados,
    precoTotal: total.toFixed(2),
    imagem: "", // Coloque a URL da imagem da pizza aqui, se necessário
    observacoes: "",
  };

  // Adicionar item ao carrinho
  cart.push(item);

  // Atualizar a exibição do carrinho
  updateCart();

  // Atualizar o contador do carrinho
  updateCartCounter();

  // Fechar o modal de seleção de sabores
  closeModal("pizza_dois_sabores_modal_media");
}



















