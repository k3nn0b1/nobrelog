document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('orcamento-form');
    const whatsappNumber = '5575981284738'; // Seu número do WhatsApp
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            sendToWhatsapp();
        }
    });
    
    // ========== VALIDAÇÃO DO FORMULÁRIO ==========
    function validateForm() {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], select[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                showError(input, 'Este campo é obrigatório');
            } else {
                removeError(input);
            }
        });
        
        return isValid;
    }
    
    function showError(input, message) {
        removeError(input);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = 'red';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '5px';
        input.style.borderColor = 'red';
        input.parentNode.appendChild(errorDiv);
    }
    
    function removeError(input) {
        input.style.borderColor = '';
        const errorDiv = input.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
    
    // ========== ENVIO PARA WHATSAPP ==========
    function sendToWhatsapp() {
        const peso = document.getElementById('peso').value;
        const quantidade = document.getElementById('quantidade').value;
        const valor = document.getElementById('valor').value;
        const material = document.getElementById('material').value;
        const origem = document.getElementById('origem').value;
        const destino = document.getElementById('destino').value;
        const endereco = document.getElementById('endereco').value;
        const transporte = document.querySelector('input[name="transporte"]:checked')?.value || 'Não informado';
        
        // Pega as siglas dos estados selecionados
        const estadoOrigemSigla = document.getElementById('estado-origem').value;
        const estadoDestinoSigla = document.getElementById('estado-destino').value;

        // Monta a mensagem formatada com cidade - UF
        let message = `*Solicitação de Orçamento NobreLog* 🚛\n\n`;
        message += `📦 *Peso:* ${peso} kg\n`;
        message += `📦 *Quantidade:* ${quantidade} volumes\n`;
        message += `💰 *Valor da Nota:* R$ ${valor}\n`;
        message += `🧱 *Material:* ${material}\n`;
        message += `🚚 *Tipo de Transporte:* ${transporte}\n\n`;
        message += `🏙️ *Origem:* ${origem} - ${estadoOrigemSigla}\n`;
        message += `🏙️ *Destino:* ${destino} - ${estadoDestinoSigla}\n`;
        message += `📍 *Endereço de Coleta:* ${endereco}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Mostra o modal de redirecionamento
        showModal(whatsappUrl);
    }

    // ========== MODAL DE REDIRECIONAMENTO ==========
    function showModal(url) {
        // Cria o modal dinamicamente
        const modal = document.createElement('div');
        modal.className = 'modal-redirect';
        modal.innerHTML = `
            <div class="modal-content-redirect">
                <div class="modal-icon">📱</div>
                <h3>Redirecionando para o WhatsApp</h3>
                <p>Você será redirecionado para concluir o envio do seu orçamento...</p>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Adiciona os estilos do modal
        addModalStyles();

        // Mostra o modal com animação
        setTimeout(() => modal.classList.add('show'), 10);

        // Redireciona após 2 segundos e remove o modal
        setTimeout(() => {
            window.open(url, '_blank');
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }, 2000);
    }

    // ========== ESTILOS DO MODAL ==========
    function addModalStyles() {
        // Verifica se os estilos já foram adicionados
        if (document.getElementById('modal-styles')) return;

        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .modal-redirect {
                display: flex;
                position: fixed;
                z-index: 1000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                justify-content: center;
                align-items: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .modal-redirect.show {
                opacity: 1;
            }
            
            .modal-content-redirect {
                background: linear-gradient(135deg, #0047AB 0%, #003b91 100%);
                padding: 40px 30px;
                border-radius: 15px;
                width: 90%;
                max-width: 400px;
                text-align: center;
                box-shadow: 0 10px 40px rgba(0, 71, 171, 0.3);
                transform: scale(0.9);
                animation: modalPop 0.3s ease forwards;
            }
            
            @keyframes modalPop {
                to {
                    transform: scale(1);
                }
            }
            
            .modal-icon {
                font-size: 50px;
                margin-bottom: 20px;
                animation: bounce 1s infinite;
            }
            
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            
            .modal-content-redirect h3 {
                color: white;
                margin: 0 0 15px 0;
                font-size: 22px;
                font-weight: 600;
            }
            
            .modal-content-redirect p {
                color: rgba(255, 255, 255, 0.9);
                margin: 0 0 25px 0;
                font-size: 14px;
            }
            
            .loading-bar {
                width: 100%;
                height: 4px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 2px;
                overflow: hidden;
            }
            
            .loading-progress {
                width: 0;
                height: 100%;
                background: white;
                border-radius: 2px;
                animation: loadingProgress 2s ease forwards;
            }
            
            @keyframes loadingProgress {
                to {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }
});

// ========== CARREGAMENTO DE ESTADOS E CIDADES (IBGE) ==========
const estadoOrigem = document.getElementById("estado-origem");
const cidadeOrigem = document.getElementById("origem");
const estadoDestino = document.getElementById("estado-destino");
const cidadeDestino = document.getElementById("destino");

async function carregarEstados(selectEstado) {
    try {
        const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
        const estados = await response.json();
        estados.sort((a, b) => a.nome.localeCompare(b.nome));

        estados.forEach(estado => {
            const option = document.createElement("option");
            option.value = estado.sigla;
            option.textContent = estado.nome;
            selectEstado.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar estados:', error);
    }
}

async function carregarCidades(sigla, selectCidade) {
    try {
        selectCidade.innerHTML = "<option value=''>Carregando...</option>";
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${sigla}/municipios`);
        const cidades = await response.json();

        selectCidade.innerHTML = "<option value=''>Selecione uma cidade</option>";
        cidades.forEach(cidade => {
            const option = document.createElement("option");
            option.value = cidade.nome;
            option.textContent = cidade.nome;
            selectCidade.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar cidades:', error);
        selectCidade.innerHTML = "<option value=''>Erro ao carregar</option>";
    }
}

estadoOrigem.addEventListener("change", () => {
    if (estadoOrigem.value) carregarCidades(estadoOrigem.value, cidadeOrigem);
});

estadoDestino.addEventListener("change", () => {
    if (estadoDestino.value) carregarCidades(estadoDestino.value, cidadeDestino);
});

carregarEstados(estadoOrigem);
carregarEstados(estadoDestino);