document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('orcamento-form');
    
    const whatsappNumber = '5575981284738';
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
      
        if (validateForm()) {
            sendToWhatsapp();
        }
    });
    
    function validateForm() {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required]');
        
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
    
    function sendToWhatsapp() {
        
        const peso = document.getElementById('peso').value;
        const quantidade = document.getElementById('quantidade').value;
        const valor = document.getElementById('valor').value;
        const material = document.getElementById('material').value;
        const origem = document.getElementById('origem').value;
        const destino = document.getElementById('destino').value;
        const endereco = document.getElementById('endereco').value;
        const transporte = document.querySelector('input[name="transporte"]:checked')?.value || 'Não informado';

    
        let message = `🧾 *Solicitação de Orçamento - NobreLog*\n\n`;
        message += `📦 Peso: ${peso} kg\n`;
        message += `📦 Quantidade: ${quantidade} volumes\n`;
        message += `💰 Valor NF: R$ ${valor}\n`;
        message += `🧰 Material: ${material}\n`;
        message += `🚚 Tipo de Transporte: ${transporte}\n\n`;
        message += `🏙️ Origem: ${origem}\n`;
        message += `🏙️ Destino: ${destino}\n`;
        message += `📍 Endereço de Coleta: ${endereco}`;
      
        const encodedMessage = encodeURIComponent(message);
        
       
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        showSuccessMessage();
        
      
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 1000);
    }
    
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = 'Redirecionando para o WhatsApp...';
        successDiv.style.backgroundColor = '#0047AB';
        successDiv.style.color = 'white';
        successDiv.style.padding = '15px';
        successDiv.style.borderRadius = '8px';
        successDiv.style.textAlign = 'center';
        successDiv.style.marginTop = '20px';
        
        form.innerHTML = '';
        form.appendChild(successDiv);
    }
});

const estadoOrigem = document.getElementById("estado-origem");
  const cidadeOrigem = document.getElementById("origem");
  const estadoDestino = document.getElementById("estado-destino");
  const cidadeDestino = document.getElementById("destino");

  
  async function carregarEstados(selectEstado) {
    const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
    const estados = await response.json();
    estados.sort((a, b) => a.nome.localeCompare(b.nome));

    estados.forEach(estado => {
      const option = document.createElement("option");
      option.value = estado.sigla;
      option.textContent = estado.nome;
      selectEstado.appendChild(option);
    });
  }

  
  async function carregarCidades(sigla, selectCidade) {
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
  }

  
  estadoOrigem.addEventListener("change", () => {
    if (estadoOrigem.value) carregarCidades(estadoOrigem.value, cidadeOrigem);
  });

  estadoDestino.addEventListener("change", () => {
    if (estadoDestino.value) carregarCidades(estadoDestino.value, cidadeDestino);
  });

  carregarEstados(estadoOrigem);
  carregarEstados(estadoDestino);