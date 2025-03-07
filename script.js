// Função para calcular e atualizar o contador
function atualizarContador() {
    const dataInicio = new Date('2021-08-03'); // Data de início do namoro
    const agora = new Date(); // Data e hora atuais
    const diferenca = agora - dataInicio; // Diferença em milissegundos

    // Convertendo a diferença para anos, meses, dias, horas, minutos e segundos
    const segundos = Math.floor(diferenca / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    const semanas = Math.floor(dias / 7);
    const meses = Math.floor(dias / 30.44); // Média de dias por mês
    const anos = Math.floor(dias / 365.25); // Considerando anos bissextos

    // Exibindo o resultado
    document.getElementById('tempo').innerHTML = `
        ${anos} anos, ${meses % 12} meses, ${semanas % 4} semanas, ${dias % 7} dias, ${horas % 24} horas, ${minutos % 60} minutos e ${segundos % 60} segundos
    `;
}

// Função para configurar e iniciar o carrossel
function configurarCarrossel() {
    const fotos = document.querySelectorAll('.fotos img');
    const totalFotos = fotos.length;
    document.documentElement.style.setProperty('--total-fotos', totalFotos);

    const carrossel = document.querySelector('.fotos');
    const larguraFoto = fotos[0].clientWidth;
    let posicaoAtual = 0;

    function moverCarrossel() {
        posicaoAtual -= larguraFoto; // Move para a próxima foto
        carrossel.style.transform = `translateX(${posicaoAtual}px)`;

        // Verifica se chegou ao final do carrossel
        if (Math.abs(posicaoAtual) >= larguraFoto * totalFotos) {
            // Reinicia suavemente para o início
            setTimeout(() => {
                carrossel.style.transition = 'none'; // Remove a transição para o reset
                posicaoAtual = 0;
                carrossel.style.transform = `translateX(${posicaoAtual}px)`;
                setTimeout(() => {
                    carrossel.style.transition = 'transform 1s linear'; // Restaura a transição
                }, 50);
            }, 1000); // Aguarda o término da transição atual
        }
    }

    setInterval(moverCarrossel, 3000); // Move o carrossel a cada 3 segundos
}

// Função para configurar o carrossel ampliado
function configurarCarrosselAmpliado() {
    const fotosAmpliadas = document.querySelector('.fotos-ampliadas');
    const fotos = document.querySelectorAll('.fotos-ampliadas img');
    const totalFotos = fotos.length;
    document.documentElement.style.setProperty('--total-fotos', totalFotos);

    const larguraFoto = fotos[0].clientWidth;
    let posicaoAtual = 0;

    function moverCarrosselAmpliado() {
        posicaoAtual -= larguraFoto; // Move para a próxima foto
        fotosAmpliadas.style.transform = `translateX(${posicaoAtual}px)`;

        // Verifica se chegou ao final do carrossel
        if (Math.abs(posicaoAtual) >= larguraFoto * totalFotos) {
            // Reinicia suavemente para o início
            setTimeout(() => {
                fotosAmpliadas.style.transition = 'none'; // Remove a transição para o reset
                posicaoAtual = 0;
                fotosAmpliadas.style.transform = `translateX(${posicaoAtual}px)`;
                setTimeout(() => {
                    fotosAmpliadas.style.transition = 'transform 1s linear'; // Restaura a transição
                }, 50);
            }, 1000); // Aguarda o término da transição atual
        }
    }

    setInterval(moverCarrosselAmpliado, 3000); // Move o carrossel a cada 3 segundos
}

// Função para criar corações que caem
function criarCoracao() {
    const coracao = document.createElement('div');
    coracao.classList.add('coracao');
    coracao.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    `;
    coracao.style.left = Math.random() * 100 + 'vw';
    coracao.style.animationDuration = Math.random() * 2 + 3 + 's';
    document.getElementById('coracoes-container').appendChild(coracao);

    setTimeout(() => coracao.remove(), 5000);
}

// Função para exibir o modal
function exibirModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';

    const checkbox = document.getElementById('check-feito');
    const btnEntendi = document.getElementById('btn-entendi');

    checkbox.addEventListener('change', () => {
        btnEntendi.disabled = !checkbox.checked;
    });

    btnEntendi.addEventListener('click', () => {
        modal.style.display = 'none';

        // Esconde o botão "Click" instantaneamente
        const botaoIniciar = document.getElementById('botaoIniciar');
        botaoIniciar.style.display = 'none';

        // Exibe a segunda tela
        exibirSegundaTela();
    });
}



// Função para exibir a segunda tela
function exibirSegundaTela() {
    const elementos = [
        'contador', 'carrossel', 'spotify-player', 'linha-divisoria', 'texto-romantico'
    ];

    elementos.forEach(id => {
        const elemento = document.getElementById(id);
        if (elemento) {
            elemento.style.display = 'block';
            if (id === 'contador') elemento.classList.add('fade-in');
        }
    });

    // Inicia o contador
    atualizarContador();
    setInterval(atualizarContador, 1000);

    // Inicia a chuva de corações
    setInterval(criarCoracao, 300);

    // Inicia o carrossel
    configurarCarrossel();
}

// Exibe o modal quando o botão "Click" for clicado
document.getElementById('botaoIniciar').addEventListener('click', (event) => {
    event.preventDefault();
    exibirModal();
});

// Função para abrir o modal do carrossel
function abrirModalCarrossel() {
    const modalCarrossel = document.getElementById('modal-carrossel');
    const fotosAmpliadas = document.querySelector('.fotos-ampliadas');
    const fotosOriginais = document.querySelectorAll('.fotos img');

    // Copia as fotos do carrossel original para o modal ampliado
    fotosAmpliadas.innerHTML = '';
    fotosOriginais.forEach(foto => {
        const novaFoto = foto.cloneNode(true);
        fotosAmpliadas.appendChild(novaFoto);
    });

    // Exibe o modal
    modalCarrossel.style.display = 'flex';

    // Configura o carrossel ampliado
    configurarCarrosselAmpliado();
}

// Função para fechar o modal do carrossel
function fecharModalCarrossel() {
    const modalCarrossel = document.getElementById('modal-carrossel');
    modalCarrossel.style.display = 'none';
}

// Adiciona o evento de clique ao carrossel original
document.getElementById('carrossel').addEventListener('click', abrirModalCarrossel);

// Adiciona o evento de clique ao botão de fechar
document.getElementById('fechar-modal-carrossel').addEventListener('click', fecharModalCarrossel);
