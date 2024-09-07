document.addEventListener('DOMContentLoaded', () => {
    // Quando o documento HTML estiver completamente carregado, execute esta função.
  
    const tabuleiro = document.getElementById('gameBoard'); // Obtém o elemento HTML com o ID "gameBoard" (tabuleiro do jogo).
    const botaoEmbaralhar = document.getElementById('shuffleButton'); // Obtém o botão para embaralhar as cartas.
    const botaoRevelar = document.getElementById('revealButton'); // Obtém o botão para revelar todas as cartas.
    const cartas = dadosCartas; // Obtém os dados das cartas de um array externo (dadosCartas).
  
    let cartasViradas = []; // Array para armazenar as cartas que estão viradas.
    console.log(cartas)
    // Função para embaralhar um array usando o algoritmo Fisher-Yates.
    function embaralhar(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    // Função para criar um elemento de carta HTML.
    function criarCarta(carta) {
      const elementoCarta = document.createElement('div'); // Cria um novo elemento div para representar a carta.
      elementoCarta.classList.add('card'); // Adiciona a classe "card" para estilização.
      elementoCarta.dataset.id = carta.id; // Armazena o ID da carta em um atributo de dados.
      const elementoImagem = document.createElement('img'); // Cria um elemento img para a imagem da carta.
      elementoImagem.src = carta.src; // Define o caminho da imagem da carta.
      elementoCarta.appendChild(elementoImagem); // Adiciona a imagem à carta.
      elementoCarta.addEventListener('click', virarCarta); // Adiciona um ouvinte de evento para quando a carta for clicada.
      return elementoCarta; // Retorna o elemento da carta criado.
    }
  
    // Função para virar uma carta.
    function virarCarta() {
      // Verifica se a carta já está virada ou se duas cartas já estão viradas.
      if (this.classList.contains('flipped') || cartasViradas.length === 2) {
        return;
      }
      this.classList.add('flipped'); // Adiciona a classe "flipped" para virar a carta.
      cartasViradas.push(this); // Adiciona a carta ao array de cartas viradas.
  
      if (cartasViradas.length === 2) {
        // Se duas cartas estão viradas, verifica se são iguais após 500ms.
        setTimeout(verificarCorrespondencia, 500);
      }
    }
  
    // Função para verificar se duas cartas são iguais.
    function verificarCorrespondencia() {
      const [carta1, carta2] = cartasViradas; // Obtém as duas cartas viradas.
      if (carta1.dataset.id === carta2.dataset.id) { // Se as cartas são iguais
        carta1.classList.add('hidden'); // Marca as cartas como escondidas.
        carta2.classList.add('hidden');
      } else { // Se as cartas são diferentes
        carta1.classList.remove('flipped'); // Desvira as cartas.
        carta2.classList.remove('flipped');
      }
      cartasViradas = []; // Limpa o array de cartas viradas.
    }
  
    // Função para reiniciar o jogo.
    function reiniciarJogo() {
      tabuleiro.innerHTML = ''; // Limpa o tabuleiro.
      embaralhar(cartas); // Embaralha as cartas.
      cartas.forEach(carta => {
        const elementoCarta = criarCarta(carta); // Cria um elemento de carta para cada carta.
        tabuleiro.appendChild(elementoCarta); // Adiciona a carta ao tabuleiro.
      });
    }
  
    // Função para revelar todas as cartas.
    function revelarCartas() {
      const todasCartas = document.querySelectorAll('.card'); // Obtém todas as cartas.
      todasCartas.forEach(carta => {
        carta.classList.add('flipped'); // Vira todas as cartas.
      });
    }
  
    // Adiciona ouvintes de evento aos botões.
    botaoEmbaralhar.addEventListener('click', reiniciarJogo);
    botaoRevelar.addEventListener('click', revelarCartas);
  
    // Inicializa o jogo.
    reiniciarJogo();
  });