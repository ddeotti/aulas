
        const display = document.getElementById('display');
        const buttonsContainer = document.querySelector('.buttons');

 
        function handleInput(value) {
            const currentText = display.textContent;

            if (value === 'C') {
                // Limpar (Clear)
                display.textContent = '0';
            
            } else if (value === 'Backspace') {
                // Apagar último caractere
                if (currentText.length === 1 || currentText === 'Erro') {
                    display.textContent = '0';
                } else {
                    display.textContent = currentText.slice(0, -1); // Remove o último caractere
                }

            } else if (value === '=') {
                // Calcular (Equals)
                try {
                    // Substitui "Erro" por "0" se estiver no visor antes de calcular
                    let result = eval(currentText.replace('Erro', '0'));
                    display.textContent = result;
                } catch (error) {
                    display.textContent = 'Erro';
                }

            } else {
                // Números e Operadores
                if ((currentText === '0' && value !== '.') || currentText === 'Erro') {
                    // Substitui o '0' ou 'Erro' inicial
                    display.textContent = value;
                } else {
                    // Concatena o novo valor
                    display.textContent += value;
                }
            }
        }
        
     
        // Este ouvinte agora apenas delega para a função central
        buttonsContainer.addEventListener('click', (event) => {
            if (!event.target.matches('button')) {
                return;
            }
            const value = event.target.dataset.value;
            handleInput(value); // Chama a função central
        });


        window.addEventListener('keydown', (event) => {
            const key = event.key;
            let value = null; // Valor a ser passado para handleInput

            // Mapeia a tecla pressionada para o 'data-value' correspondente
            if (key >= '0' && key <= '9') {
                value = key;
            } else if (key === '+' || key === '-' || key === '*' || key === '/') {
                event.preventDefault(); // Impede o '/' de abrir a busca rápida no Firefox
                value = key;
            } else if (key === '.' || key === ',') { // Aceita '.' e ',' para decimal
                value = '.';
            } else if (key === 'Enter' || key === '=') {
                event.preventDefault(); // Impede o 'Enter' de submeter (se houver um form)
                value = '=';
            } else if (key === 'Escape') {
                value = 'C';
            } else if (key === 'Backspace') {
                value = 'Backspace';
            }
            
            // Se a tecla for mapeada, processa o input e dá feedback visual
            if (value !== null) {
                handleInput(value);
                visualFeedback(value); // Chama o feedback visual
            }
        });
        

        function visualFeedback(value) {
            // Encontra o botão correspondente ao valor
            // Para 'Backspace', não há botão, então não faz nada
            if (value === 'Backspace') return; 

            const button = document.querySelector(`button[data-value="${value}"]`);
            
            if (button) {
                // Adiciona classe 'active'
                button.classList.add('active');
                
                // Remove a classe após 100ms
                setTimeout(() => {
                    button.classList.remove('active');
                }, 100);
            }
        }
