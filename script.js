document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('orcamento-form');
    const whatsappNumber = '5575981284738';
    
    // ========== ARRAYS DE CIDADES ==========
    let cidadesOrigemData = [];
    let cidadesDestinoData = [];
    
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
        
        const estadoOrigem = document.getElementById('estado-origem');
        const cidadeOrigem = document.getElementById('origem');
        const estadoDestino = document.getElementById('estado-destino');
        const cidadeDestino = document.getElementById('destino');
        
        if (cidadeOrigem.value && !estadoOrigem.value) {
            isValid = false;
            showError(estadoOrigem, 'Selecione o estado primeiro');
        }
        
        if (cidadeDestino.value && !estadoDestino.value) {
            isValid = false;
            showError(estadoDestino, 'Selecione o estado primeiro');
        }
        
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
        
        const estadoOrigemSigla = document.getElementById('estado-origem').value;
        const estadoDestinoSigla = document.getElementById('estado-destino').value;

        let transporteEmoji = '🚚';
        const transporteLower = transporte.toLowerCase();
        
        if (transporteLower.includes('moto')) {
            transporteEmoji = '🏍️';
        } else if (transporteLower.includes('carro')) {
            transporteEmoji = '🚗';
        } else if (transporteLower.includes('caminhão') || transporteLower.includes('caminhao')) {
            transporteEmoji = '🚚';
        }

        let message = `*Solicitação de Orçamento NobreLog* 🚛\n\n`;
        message += `📦 *Peso:* ${peso} kg\n`;
        message += `📦 *Quantidade:* ${quantidade} volumes\n`;
        message += `💰 *Valor da Nota:* R$ ${valor}\n`;
        message += `🧱 *Material:* ${material}\n`;
        message += `${transporteEmoji} *Tipo de Transporte:* ${transporte}\n\n`;
        message += `🏙️ *Origem:* ${origem} - ${estadoOrigemSigla}\n`;
        message += `🏙️ *Destino:* ${destino} - ${estadoDestinoSigla}\n`;
        message += `📍 *Endereço de Coleta:* ${endereco}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        showModal(whatsappUrl);
    }

    // ========== MODAL DE REDIRECIONAMENTO ==========
    function showModal(url) {
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
        addModalStyles();
        setTimeout(() => modal.classList.add('show'), 10);
        setTimeout(() => {
            window.open(url, '_blank');
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }, 2000);
    }

    function addModalStyles() {
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
                to { transform: scale(1); }
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
                to { width: 100%; }
            }
            .autocomplete-list {
                position: absolute;
                background: white;
                border: 1px solid #ddd;
                border-top: none;
                z-index: 99;
                max-height: 200px;
                overflow-y: auto;
                width: 100%;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                border-radius: 0 0 8px 8px;
            }
            .autocomplete-item {
                padding: 12px;
                cursor: pointer;
                border-bottom: 1px solid #f0f0f0;
                transition: background 0.2s;
            }
            .autocomplete-item:hover {
                background-color: #f0f0f0;
            }
            .autocomplete-item.active {
                background-color: #0047AB;
                color: white;
            }
            .autocomplete-item.no-results {
                color: #999;
                cursor: default;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ========== CARREGAMENTO DE ESTADOS ==========
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
    
    async function carregarCidades(sigla, inputCidade, dataArray) {
        try {
            inputCidade.value = 'Carregando...';
            inputCidade.disabled = true;
            
            const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${sigla}/municipios`);
            const cidades = await response.json();
            
            dataArray.length = 0;
            dataArray.push(...cidades);
            
            inputCidade.value = '';
            inputCidade.placeholder = 'Digite o nome da cidade';
            inputCidade.disabled = false;
            inputCidade.focus();
            
        } catch (error) {
            console.error('Erro ao carregar cidades:', error);
            inputCidade.value = '';
            inputCidade.placeholder = 'Erro ao carregar';
            inputCidade.disabled = true;
        }
    }
    
    // ========== AUTOCOMPLETE ==========
    function configurarAutocomplete(input, dataArray) {
        let currentFocus = -1;
        
        input.addEventListener('input', function() {
            const val = this.value.trim();
            fecharListas();
            
            if (!val) return false;
            
            currentFocus = -1;
            
            const listDiv = document.createElement('div');
            listDiv.className = 'autocomplete-list';
            listDiv.id = this.id + '-autocomplete-list';
            this.parentNode.appendChild(listDiv);
            
            const cidadesFiltradas = dataArray.filter(cidade => 
                cidade.nome.toLowerCase().includes(val.toLowerCase())
            ).slice(0, 10);
            
            if (cidadesFiltradas.length === 0) {
                const item = document.createElement('div');
                item.className = 'autocomplete-item no-results';
                item.innerHTML = 'Nenhuma cidade encontrada';
                listDiv.appendChild(item);
                return;
            }
            
            cidadesFiltradas.forEach(cidade => {
                const item = document.createElement('div');
                item.className = 'autocomplete-item';
                item.innerHTML = cidade.nome;
                
                item.addEventListener('click', function() {
                    input.value = cidade.nome;
                    fecharListas();
                });
                
                listDiv.appendChild(item);
            });
        });
        
        input.addEventListener('keydown', function(e) {
            let lista = document.getElementById(this.id + '-autocomplete-list');
            if (lista) lista = lista.getElementsByClassName('autocomplete-item');
            
            if (e.keyCode === 40) {
                currentFocus++;
                adicionarAtivo(lista);
            } else if (e.keyCode === 38) {
                currentFocus--;
                adicionarAtivo(lista);
            } else if (e.keyCode === 13) {
                e.preventDefault();
                if (currentFocus > -1 && lista && !lista[currentFocus].classList.contains('no-results')) {
                    lista[currentFocus].click();
                }
            }
        });
        
        function adicionarAtivo(lista) {
            if (!lista) return false;
            removerAtivo(lista);
            if (currentFocus >= lista.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = lista.length - 1;
            if (!lista[currentFocus].classList.contains('no-results')) {
                lista[currentFocus].classList.add('active');
            }
        }
        
        function removerAtivo(lista) {
            for (let i = 0; i < lista.length; i++) {
                lista[i].classList.remove('active');
            }
        }
        
        function fecharListas(elemento) {
            const listas = document.getElementsByClassName('autocomplete-list');
            for (let i = 0; i < listas.length; i++) {
                if (elemento !== listas[i] && elemento !== input) {
                    listas[i].parentNode.removeChild(listas[i]);
                }
            }
        }
        
        document.addEventListener('click', function(e) {
            fecharListas(e.target);
        });
    }
    
    // ========== EVENTOS DE MUDANÇA DE ESTADO ==========
    estadoOrigem.addEventListener("change", () => {
        cidadeOrigem.value = '';
        if (estadoOrigem.value) {
            carregarCidades(estadoOrigem.value, cidadeOrigem, cidadesOrigemData);
        } else {
            cidadeOrigem.placeholder = 'Selecione o estado primeiro';
            cidadeOrigem.disabled = true;
        }
    });
    
    estadoDestino.addEventListener("change", () => {
        cidadeDestino.value = '';
        if (estadoDestino.value) {
            carregarCidades(estadoDestino.value, cidadeDestino, cidadesDestinoData);
        } else {
            cidadeDestino.placeholder = 'Selecione o estado primeiro';
            cidadeDestino.disabled = true;
        }
    });
    
    // Bloqueia cidade se não tiver estado selecionado
    cidadeOrigem.addEventListener('focus', function() {
        if (!estadoOrigem.value) {
            this.blur();
            alert('Por favor, selecione o estado de origem primeiro!');
            estadoOrigem.focus();
        }
    });
    
    cidadeDestino.addEventListener('focus', function() {
        if (!estadoDestino.value) {
            this.blur();
            alert('Por favor, selecione o estado de destino primeiro!');
            estadoDestino.focus();
        }
    });
    
    // ========== INICIALIZAÇÃO ==========
    carregarEstados(estadoOrigem);
    carregarEstados(estadoDestino);
    cidadeOrigem.disabled = true;
    cidadeDestino.disabled = true;
    cidadeOrigem.placeholder = 'Selecione o estado primeiro';
    cidadeDestino.placeholder = 'Selecione o estado primeiro';
    
    configurarAutocomplete(cidadeOrigem, cidadesOrigemData);
    configurarAutocomplete(cidadeDestino, cidadesDestinoData);
});