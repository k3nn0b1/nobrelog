document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('orcamento-form');
    const whatsappNumber = '5575981284738';
    
    // ========== ROTAS E CIDADES COM PRAZOS ==========
    const rotasComPrazos = {
        "Rota 01 (Alagoinhas)": {
            "prazo": "1 dia útil",
            "cidades": [
                "Alagoinhas", "Amélia Rodrigues", "Catu", "Conceição do Jacuípe", "Coração da Maria",
                "Inhambupe", "Irará", "Ouriçangas", "Pedrão", "Pojuca", "Santanópolis",
                "Santo Amaro", "São Sebastião do Passé", "Saubara", "Teodoro Sampaio", "Terra Nova"
            ]
        },
        "Rota 02 (Santo Antônio)": {
            "prazo": "1 dia útil",
            "cidades": [
                "Cachoeira", "Conceição da Feira", "Conceição do Almeida", "Cruz das Almas", "Dom Macedo Costa",
                "Governador Mangabeira", "Muritiba", "Santo Antônio de Jesus", "São Felipe", "São Félix",
                "São Gonçalo dos Campos", "Sapeaçu", "Varzedo"
            ]
        },
        "Rota 03 (Região Metropolitana)": {
            "prazo": "1 dia útil",
            "cidades": [
                "Camaçari", "Candeias", "Dias D'Ávila", "Madre de Deus", "Mata de São João",
                "São Francisco do Conde", "Simões Filho"
            ]
        },
        "Rota 04 (Capital)": {
            "prazo": "1 dia útil",
            "cidades": ["Lauro de Freitas", "Salvador"]
        },
        "Rota 05 (Itabuna)": {
            "prazo": "4 dias úteis",
            "cidades": [
                "Apuarema", "Aratuípe", "Aurelino Leal", "Barra do Rocha", "Camamu", "Coaraci", "Gandu",
                "Gongogi", "Ibicaraí", "Ibirapitanga", "Ibirataia", "Igrapiúna", "Ilhéus", "Ipiaú",
                "Itabuna", "Itacaré", "Itagibá", "Itajuípe", "Itamari", "Itapitanga", "Ituberá", "Jaguaripe",
                "Laje", "Muniz Ferreira", "Nazaré", "Nilo Peçanha", "Piraí do Norte", "Presidente Tancredo Neves",
                "Taperoá", "Ubaitaba", "Ubatã", "Uruçuca", "Valença", "Wenceslau Guimarães"
            ]
        },
        "Rota 06 (Feira de Santana)": {
            "prazo": "1 dia útil",
            "cidades": ["Feira de Santana", "Humildes"]
        },
        "Rota 07 (Vitória da Conquista)": {
            "prazo": "4 dias úteis",
            "cidades": [
                "Aiquara", "Amargosa", "Barra do Choça", "Boa Nova", "Brejões", "Caatiba", "Castro Alves",
                "Cravolândia", "Dário Meira", "Elísio Medrado", "Firmino Alves", "Ibicuí", "Iguaí", "Ipecaetá",
                "Irajuba", "Itagi", "Itambé", "Itapetinga", "Itaquara", "Itatim", "Itiruçu", "Itororó",
                "Jaguaquara", "Jequié", "Jequiriça", "Jitaúna", "Manoel Vitorino", "Milagres", "Mutuípe",
                "Nova Canaã", "Nova Itarana", "Planalto", "Poções", "Santa Inês", "Santa Terezinha",
                "Santo Estêvão", "Ubaíra", "Vitória da Conquista"
            ]
        },
        "Rota 08 (Juazeiro)": {
            "prazo": "4 dias úteis",
            "cidades": [
                "Antônio Gonçalves", "Campo Formoso", "Candeal", "Cansanção", "Capela do Alto Alegre",
                "Capim Grosso", "Conceição do Coité", "Filadélfia", "Gavião", "Ichu", "Itiúba", "Jaguarari",
                "Juazeiro", "Massaroca", "Monte Santo", "Nordestina", "Nova Fátima", "Pé de Serra", "Petrolina",
                "Pindobaçu", "Ponto Novo", "Queimadas", "Retirolândia", "Riachão do Jacuípe", "Salgadália",
                "Santaluz", "Senhor do Bonfim", "Tanquinho", "Valente"
            ]
        },
        "Rota 09 (Paulo Afonso)": {
            "prazo": "4 dias úteis",
            "cidades": [
                "Adustina", "Antas", "Araci", "Barrocas", "Biritinga", "Caldas do Jorro", "Canudos",
                "Cícero Dantas", "Cipó", "Coronel João Sá", "Euclides da Cunha", "Fátima", "Glória", "Jeremoabo",
                "Nova Soure", "Novo Triunfo", "Olindina", "Paripiranga", "Paulo Afonso", "Ribeira do Amparo",
                "Ribeira do Pombal", "Santa Bárbara", "Santa Brígida", "São Domingos", "Serrinha",
                "Sítio do Quinto", "Teofilândia", "Tucano", "Uauá"
            ]
        },
        "Rota 10 (Ilha)": {
            "prazo": "4 dias úteis",
            "cidades": ["Itaparica", "Maragogipe", "Salinas das Margaridas", "Vera Cruz"]
        },
        "Rota 11 (Irecê)": {
            "prazo": "4 dias úteis",
            "cidades": [
                "América Dourada", "Andaraí", "Anguera", "Baixa Grande", "Barra do Mendes", "Boa Vista do Tupim",
                "Bravo", "Cafarnaum", "Canarana", "Central", "Gentio do Ouro", "Iaçu", "Ibipeba", "Ibiquera",
                "Ibititá", "Ipirá", "Iraquara", "Irecê", "Itaberaba", "Itaetê", "Jacobina", "João Dourado",
                "Jussara", "Lapão", "Lençóis", "Macionílio Souza", "Mairi", "Miguel Calmon", "Morro do Chapéu",
                "Mucugê", "Mulungu do Morro", "Mundo Novo", "Pintadas", "Piritiba", "Presidente Dutra",
                "Ruy Barbosa", "São Gabriel", "Seabra", "Serra Preta", "Tapiramutá", "Uibaí", "Várzea da Roça"
            ]
        }
    };
    
    // Criar array unificado de cidades com seus prazos
    let todasCidades = [];
    Object.keys(rotasComPrazos).forEach(rota => {
        const info = rotasComPrazos[rota];
        info.cidades.forEach(cidade => {
            todasCidades.push({
                nome: cidade,
                rota: rota,
                prazo: info.prazo,
                displayText: cidade
            });
        });
    });
    
    // Ordenar alfabeticamente
    todasCidades.sort((a, b) => a.nome.localeCompare(b.nome));
    
    console.log(`✅ ${todasCidades.length} cidades carregadas com prazos!`);
    
    // ========== BUSCAR PRAZO DE UMA CIDADE ==========
    function buscarPrazo(nomeCidade) {
        const cidade = todasCidades.find(c => 
            c.nome.toLowerCase() === nomeCidade.toLowerCase()
        );
        return cidade ? cidade.prazo : 'Não disponível';
    }
    
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
        const enderecoColeta = document.getElementById('endereco-coleta').value;
        const enderecoDestino = document.getElementById('endereco-destino').value;
        const transporte = document.querySelector('input[name="transporte"]:checked')?.value || 'Não informado';

        // Buscar prazo do destino
        const prazoEntrega = buscarPrazo(destino);

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
        message += `🏙️ *Origem:* ${origem}\n`;
        message += `📍 *Endereço de Coleta:* ${enderecoColeta}\n\n`;
        message += `🏙️ *Destino:* ${destino}\n`;
        message += `📍 *Endereço de Entrega:* ${enderecoDestino}\n`;
        message += `⏱️ *Prazo de Entrega:* ${prazoEntrega}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        showModal(whatsappUrl, prazoEntrega);
    }

    // ========== MODAL DE REDIRECIONAMENTO ==========
    function showModal(url, prazo) {
        const modal = document.createElement('div');
        modal.className = 'modal-redirect';
        modal.innerHTML = `
            <div class="modal-content-redirect">
                <div class="modal-icon">📱</div>
                <h3>Redirecionando para o WhatsApp</h3>
                <p>Prazo de entrega: <strong>${prazo}</strong></p>
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
                margin: 0 0 15px 0;
                font-size: 14px;
            }
            .modal-content-redirect p strong {
                color: white;
                font-weight: 600;
                font-size: 16px;
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
                border: 1px solid #e0e0e0;
                border-top: none;
                z-index: 99;
                max-height: 280px;
                overflow-y: auto;
                width: 100%;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                border-radius: 0 0 8px 8px;
                top: 100%;
                left: 0;
            }
            .autocomplete-item {
                padding: 14px 16px;
                cursor: pointer;
                border-bottom: 1px solid #f5f5f5;
                transition: background 0.2s ease;
            }
            .autocomplete-item:last-child {
                border-bottom: none;
            }
            .autocomplete-item:hover {
                background-color: #f8f9fa;
            }
            .autocomplete-item.active {
                background-color: #f0f4ff;
            }
            .autocomplete-item.no-results {
                color: #999;
                cursor: default;
                justify-content: center;
            }
            .cidade-info {
                display: flex;
                flex-direction: column;
                text-align: left;
            }
            .cidade-nome {
                font-weight: 500;
                color: #333;
                font-size: 15px;
                line-height: 1.3;
            }
            .prazo-info {
                color: #0047AB;
                font-size: 12px;
                margin-top: 2px;
                font-weight: 500;
            }
            .prazo-badge {
                display: inline-block;
                margin-top: 4px;
                padding: 2px 8px;
                background-color: #e8f4fd;
                color: #0047AB;
                border-radius: 4px;
                font-size: 11px;
                font-weight: 600;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ========== AUTOCOMPLETE PARA CIDADES ==========
    function configurarAutocomplete(input) {
        let currentFocus = -1;
        
        input.addEventListener('input', function() {
            const val = this.value.trim();
            fecharListas();
            
            if (!val || val.length < 2) return false;
            
            currentFocus = -1;
            
            const listDiv = document.createElement('div');
            listDiv.className = 'autocomplete-list';
            listDiv.id = this.id + '-autocomplete-list';
            this.parentNode.appendChild(listDiv);
            
            const cidadesFiltradas = todasCidades.filter(cidade => 
                cidade.nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").includes(
                    val.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                )
            ).slice(0, 15);
            
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
                
                // Verifica se é o campo de destino para mostrar o prazo
                const isDestino = input.id === 'destino';
                
                item.innerHTML = `
                    <div class="cidade-info">
                        <div class="cidade-nome">${cidade.nome}</div>
                        ${isDestino ? `<span class="prazo-badge">⏱️ ${cidade.prazo}</span>` : ''}
                    </div>
                `;
                
                item.addEventListener('click', function() {
                    input.value = cidade.displayText;
                    input.dataset.cidade = cidade.nome;
                    input.dataset.prazo = cidade.prazo;
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
                lista[currentFocus].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
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
    
    // ========== INICIALIZAÇÃO ==========
    const cidadeOrigem = document.getElementById("origem");
    const cidadeDestino = document.getElementById("destino");
    
    if (cidadeOrigem && cidadeDestino) {
        configurarAutocomplete(cidadeOrigem);
        configurarAutocomplete(cidadeDestino);
    } else {
        console.error('Campos de cidade não encontrados no HTML!');
    }
});