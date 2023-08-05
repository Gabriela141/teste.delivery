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
    nome: `Pizza ${sabor}`,
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
    nome: `Pizza ${sabores[0]} e ${sabores[1]}`,
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
  const checkboxesBordas = document.querySelectorAll(".bordas_pizza_dois_sabores_media input[type='checkbox']:checked");

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
    nome: `Pizza  ${sabores[0]} e ${sabores[1]}`,
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












function updatePriceBurguer(modalId) {
  var modal = document.getElementById(modalId);
  var valorHamburguer = parseFloat(modal.querySelector('.grande-media:checked').value);
  
  // Obter o tipo de queijo selecionado
  var queijoSelecionado = modal.querySelector('input[name="queijo"]:checked');
  var tipoQueijo = queijoSelecionado ? queijoSelecionado.value : "Sem queijo";

  // Calcular o preço dos ingredientes adicionais selecionados
  var ingredientesSelecionados = Array.from(modal.querySelectorAll('input[name="adicionais_burguer"]:checked'));
  var valorIngredientes = ingredientesSelecionados.reduce(function(total, ingrediente) {
    return total + parseFloat(ingrediente.dataset.price);
  }, 0);

  // Calcular o preço total
  var precoTotal = valorHamburguer + valorIngredientes;

  modal.querySelector("#precoTotal").textContent = "R$ " + precoTotal.toFixed(2);
  modal.querySelector(".queijo-selecionado").textContent = tipoQueijo; // Atualiza o tipo de queijo selecionado
}

// Adicione eventos de clique aos inputs de tamanho, queijos e checkboxes de ingredientes adicionais de cada modal
var modals = document.querySelectorAll('.modal');
modals.forEach(function(modal) {
  var inputsTamanho = modal.querySelectorAll('input[name="tamanho"]');
  inputsTamanho.forEach(function(input) {
    input.addEventListener("click", function() {
      updatePriceBurguer(modal.id);
    });
  });

  var checkboxesQueijo = modal.querySelectorAll('input[name="queijo"]');
  checkboxesQueijo.forEach(function(checkbox) {
    checkbox.addEventListener("click", function() {
      updatePriceBurguer(modal.id);
    });
  });

  var checkboxesAdicionais = modal.querySelectorAll('input[name="adicionais_burguer"]');
  checkboxesAdicionais.forEach(function(checkbox) {
    checkbox.addEventListener("click", function() {
      updatePriceBurguer(modal.id);
    });
  });
});



//DEPOIS DISSO VC APAGA A SOMA DOS ADICIONAIS E O TAMANHO


// Função para adicionar hambúrguer ao carrinho
function addToCartBurguer(sabor) {
  // Recuperar elementos selecionados
  const modal = document.getElementById(sabor);

  const tamanhoElement = modal.querySelector('input[name="tamanho"]:checked');
  const tamanho = parseFloat(tamanhoElement.value);

  const adicionaisSelecionados = modal.querySelectorAll('input[name="adicionais_burguer"]:checked');
  const adicionais = Array.from(adicionaisSelecionados).map(adicional => parseFloat(adicional.value));
  const adicionaisTextos = Array.from(adicionaisSelecionados).map(adicional => adicional.nextElementSibling.textContent);

  const queijoSelecionado = modal.querySelector('input[name="queijo"]:checked');

  if (!queijoSelecionado) {
    alert("Selecione uma opção de queijo!(Cheddar ou Mussarela)");
    return;
  }

  const queijo = queijoSelecionado.value;

  if (adicionais.length > 3) {
    alert("Selecione no máximo 3 adicionais!");
    return;
  }

  // Recuperar a imagem do hambúrguer
  const imagemSrc = modal.querySelector('.modal-image').src;

  // Calcular o preço total
  let precoTotal = tamanho;
  adicionais.forEach(adicional => {
    precoTotal += adicional;
  });

  // Criar objeto do item adicionado
  const item = {
    nome: ` ${sabor} (${queijo})`,
    adicionais: adicionaisTextos,
    precoTotal: precoTotal.toFixed(2),
    imagem: imagemSrc,
    observacoes: "",
  };

  // Adicionar item ao carrinho específico de hambúrguer
  cart.push(item);

  // Atualizar a exibição do carrinho específico de hambúrguer
  updateCart();

  // Atualizar o contador do carrinho geral
  updateCartCounter();
}











const cards = document.querySelectorAll(".card");

// Função para realizar a pesquisa
function search() {
  const searchTerm = document.getElementById("search-bar").value.toLowerCase();
  
  // Filtrar os cards com base no termo de pesquisa
  const filteredCards = Array.from(cards).filter(card => {
    const title = card.querySelector(".pizza-title").textContent.toLowerCase();
    const description = card.querySelector(".pizza-description").textContent.toLowerCase();
    return title.includes(searchTerm) || description.includes(searchTerm);
  });
  
  // Exibir apenas os cards filtrados e esconder os demais
  cards.forEach(card => {
    card.style.display = filteredCards.includes(card) ? "block" : "none";
  });
}








function abrirDetalhesPedidoModal() {
  const modal = document.getElementById("detalhesPedidoModal");
  const detalhesPedido = formatarDetalhesPedido();

  const detalhesPedidoTexto = document.getElementById("detalhesPedidoTexto");
  detalhesPedidoTexto.textContent = detalhesPedido;

  // Preencher as observações no modal
  const observacoes = document.getElementById("observacoes").value;
  const detalhesObservacoes = document.querySelector(".detalhes-observacoes");
  detalhesObservacoes.textContent = `Observações: ${observacoes}`;

  // Calcular e exibir o valor total
  const valorTotal = calcularValorTotal();
  const valorTotalSpan = document.getElementById("valorTotalSpan");
  valorTotalSpan.textContent = valorTotal.toFixed(2);

  modal.style.display = "block";
}

const opcaoEntrega = document.getElementsByName("opcaoEntrega");
const inputEndereco = document.getElementById("inputEndereco");

opcaoEntrega.forEach(radio => {
  radio.addEventListener("change", function() {
    if (this.value === "5.0") {
      inputEndereco.style.display = "block";
    } else {
      inputEndereco.style.display = "none";
    }
    calcularValorTotal();
  });
});

function calcularValorTotal() {
  let total = 0;
  cart.forEach(item => {
    total += parseFloat(item.precoTotal);
  });

  const opcaoEntregaSelecionada = document.querySelector('input[name="opcaoEntrega"]:checked');
  const valorEntrega = opcaoEntregaSelecionada ? parseFloat(opcaoEntregaSelecionada.value) : 0;
  total += valorEntrega;

  const valorTotalSpan = document.getElementById("valorTotalSpan");
  valorTotalSpan.textContent = total.toFixed(2);

  return total;
}




function fecharDetalhesPedidoModal() {
  const modal = document.getElementById("detalhesPedidoModal");
  modal.style.display = "none";
}





function formatarDetalhesPedido() {
  let detalhes = "";

  // Verifica se o carrinho está vazio
  if (cart.length === 0) {
    detalhes = "O carrinho está vazio.";
  } else {
    // Itera sobre os itens do carrinho e formata as informações
    cart.forEach((item, index) => {
      detalhes += `${index + 1}. ${item.nome} - ${item.tamanho}\n`;

      if (item.borda !== "Sem borda") {
        detalhes += `   Borda: ${item.borda}\n`;
      }

      if (item.adicionais.length > 0) {
        detalhes += `   Adicionais: ${item.adicionais.join(", ")}\n`;
      }

      if (item.observacoes) {
        detalhes += `   Observações: ${item.observacoes}\n`;
      }

      detalhes += `   Preço: R$ ${item.precoTotal}\n\n`;
    });
  }

  return detalhes;
}



