      // Quiz de Vidas Secas
      const quizData = [
        {
            question: "1. Em que período foi publicado o livro Vidas Secas?",
            options: [
                "Entre 1925 e 1930",
                "Entre 1937 e 1938",
                "Entre 1940 e 1945",
                "Entre 1950 e 1955"
            ],
            correct: 1
        },
        {
            question: "2. Qual é o apelido de Graciliano Ramos?",
            options: [
                "Mestre da Seca",
                "Poeta do Sertão",
                "Mestre Graça",
                "Sábio de Alagoas"
            ],
            correct: 2
        },
        {
            question: "3. Qual personagem sonha com uma cama de couro?",
            options: [
                "Fabiano",
                "Sinha Vitória",
                "O Filho Mais Velho",
                "Tomás da Bolandeira"
            ],
            correct: 1
        },
        {
            question: "4. Quantos capítulos possui o livro Vidas Secas?",
            options: [
                "10 capítulos",
                "13 capítulos",
                "15 capítulos",
                "20 capítulos"
            ],
            correct: 1
        },
        {
            question: "5. Quem representa a opressão do Estado na obra?",
            options: [
                "O Patrão",
                "Tomás da Bolandeira",
                "O Soldado Amarelo",
                "Fabiano"
            ],
            correct: 2
        },
        {
            question: "6. Qual animal é humanizado na narrativa e possui um capítulo dedicado?",
            options: [
                "Um papagaio",
                "Uma cabra",
                "Baleia, a cachorra",
                "Um cavalo"
            ],
            correct: 2
        },
        {
            question: "7. A qual geração do Modernismo pertence Graciliano Ramos?",
            options: [
                "Primeira Geração (1922-1930)",
                "Segunda Geração (1930-1945)",
                "Terceira Geração (1945-1960)",
                "Pré-Modernismo"
            ],
            correct: 1
        },
        {
            question: "8. Qual característica NÃO faz parte do estilo de Graciliano Ramos?",
            options: [
                "Economia verbal",
                "Linguagem rebuscada e ornamentada",
                "Objetividade",
                "Realismo psicológico"
            ],
            correct: 1
        },
        {
            question: "9. Quem é admirado por Fabiano por saber usar palavras difíceis?",
            options: [
                "O Patrão",
                "O Soldado Amarelo",
                "Seu Tomás da Bolandeira",
                "O Filho Mais Velho"
            ],
            correct: 2
        },
        {
            question: "10. O que o título 'Vidas Secas' simboliza?",
            options: [
                "Apenas a falta de água no sertão",
                "A vida dos animais na região",
                "A aridez do ambiente e a secura emocional dos personagens",
                "A morte da vegetação"
            ],
            correct: 2
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let answered = false;

    function loadQuiz() {
        const container = document.getElementById('quizContainer');
        container.innerHTML = '';
        
        quizData.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'quiz-question';
            if (index === 0) questionDiv.classList.add('active');
            
            questionDiv.innerHTML = `
                <h3>${q.question}</h3>
                <div class="quiz-options">
                    ${q.options.map((option, i) => `
                        <div class="quiz-option" onclick="checkAnswer(${index}, ${i})" data-question="${index}" data-option="${i}">
                            ${option}
                        </div>
                    `).join('')}
                </div>
            `;
            
            container.appendChild(questionDiv);
        });
    }

    function checkAnswer(questionIndex, optionIndex) {
        if (answered) return;
        
        answered = true;
        const options = document.querySelectorAll(`[data-question="${questionIndex}"]`);
        
        options.forEach(opt => opt.classList.add('disabled'));
        
        if (optionIndex === quizData[questionIndex].correct) {
            options[optionIndex].classList.add('correct');
            score++;
        } else {
            options[optionIndex].classList.add('incorrect');
            options[quizData[questionIndex].correct].classList.add('correct');
        }
        
        setTimeout(() => {
            answered = false;
            currentQuestion++;
            
            if (currentQuestion < quizData.length) {
                document.querySelectorAll('.quiz-question')[currentQuestion].classList.add('active');
                document.querySelectorAll('.quiz-question')[currentQuestion].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            } else {
                showResults();
            }
        }, 2000);
    }

    function showResults() {
        const container = document.getElementById('quizContainer');
        const resultDiv = document.getElementById('quizResult');
        
        container.style.display = 'none';
        resultDiv.style.display = 'block';
        
        const percentage = (score / quizData.length) * 100;
        let message = '';
        
        if (percentage === 100) {
            message = '🌟 Perfeito! Você domina completamente a obra Vidas Secas!';
        } else if (percentage >= 80) {
            message = '👏 Excelente! Você conhece muito bem a obra!';
        } else if (percentage >= 60) {
            message = '👍 Bom trabalho! Você tem um bom conhecimento sobre Vidas Secas!';
        } else if (percentage >= 40) {
            message = '📚 Continue estudando! Você está no caminho certo!';
        } else {
            message = '💪 Que tal reler a obra? Há muito mais para descobrir!';
        }
        
        resultDiv.innerHTML = `
            <div class="quiz-result">
                <h3>Resultado do Quiz</h3>
                <div class="quiz-score">${score} / ${quizData.length}</div>
                <p>${message}</p>
                <p style="font-size: 1.1em; margin-top: 10px;">Você acertou ${percentage.toFixed(0)}% das questões!</p>
                <button class="quiz-btn" onclick="restartQuiz()">Tentar Novamente</button>
            </div>
        `;
        
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        answered = false;
        
        document.getElementById('quizContainer').style.display = 'block';
        document.getElementById('quizResult').style.display = 'none';
        
        loadQuiz();
        document.getElementById('quiz').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Carregar o quiz quando a página carregar
    document.addEventListener('DOMContentLoaded', () => {
        loadQuiz();
    });

    // Animação de scroll para revelar seções
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Smooth scroll para navegação
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });