document.addEventListener('DOMContentLoaded', () => {

    // スクロールに応じたフェードインアニメーション
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(el => {
        observer.observe(el);
    });

    // クイズ機能 (quiz.html)
    const quizArea = document.getElementById('quiz-area');
    if (quizArea) {
        const quizData = [
            {
                question: "動画が提唱する、国家の真の財源とは何ですか？",
                options: ["豊富なお金や外貨準備高", "国民一人ひとりの供給能力", "強力な軍事力", "国際的な政治的影響力"],
                answer: "国民一人ひとりの供給能力"
            },
            {
                question: "トランプ前大統領の「所得税廃止」提案の、筆者が読み解いた本質的な意図は何ですか？",
                options: ["富裕層を優遇するため", "単純な人気取り政策", "グローバリズムから脱却し、国内経済を強化するため", "政府の規模を縮小するため"],
                answer: "グローバリズムから脱却し、国内経済を強化するため"
            },
            {
                question: "新しい時代を生きるための3ステップに含まれないものはどれですか？",
                options: ["使命を明確にする", "より多くのお金を稼ぐ", "認識を変更する", "常識を書き換える"],
                answer: "より多くのお金を稼ぐ"
            },
            {
                question: "供給があるから商品を買える、という認識を持つと、どのような意識が芽生えると説明されていますか？",
                options: ["節約しようという意識", "もっと稼ぎたいという意欲", "供給者への感謝の意識", "自分は偉いという優越感"],
                answer: "供給者への感謝の意識"
            },
            {
                question: "筆者が、日本の自立にとって重要だと考えていることは何ですか？",
                options: ["アメリカとの関係をさらに強化すること", "国民一人ひとりが自分の心と向き合うこと", "海外企業を積極的に誘致すること", "円安を是正すること"],
                answer: "国民一人ひとりが自分の心と向き合うこと"
            }
        ];

        let currentQuestionIndex = 0;
        let score = 0;

        const questionContainer = document.getElementById('question-container');
        const nextBtn = document.getElementById('next-btn');
        const resultContainer = document.getElementById('quiz-result');

        function showQuestion() {
            const currentQuestion = quizData[currentQuestionIndex];
            questionContainer.innerHTML = `
                <div class="question">Q${currentQuestionIndex + 1}: ${currentQuestion.question}</div>
                <ul class="options">
                    ${currentQuestion.options.map(option => `<li>${option}</li>`).join('')}
                </ul>
            `;

            const options = questionContainer.querySelectorAll('.options li');
            options.forEach(option => {
                option.addEventListener('click', selectAnswer);
            });
        }

        function selectAnswer(e) {
            const selectedOption = e.target;
            const answer = quizData[currentQuestionIndex].answer;

            const allOptions = questionContainer.querySelectorAll('.options li');
            allOptions.forEach(opt => opt.style.pointerEvents = 'none');

            if (selectedOption.textContent === answer) {
                selectedOption.classList.add('correct');
                score++;
            } else {
                selectedOption.classList.add('incorrect');
                allOptions.forEach(opt => {
                    if (opt.textContent === answer) {
                        opt.classList.add('correct');
                    }
                });
            }
            nextBtn.style.display = 'inline-block';
        }

        function showNextQuestion() {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                showQuestion();
                nextBtn.style.display = 'none';
            } else {
                showResult();
            }
        }

        function showResult() {
            quizArea.style.display = 'none';
            resultContainer.style.display = 'block';
            const percentage = (score / quizData.length) * 100;
            let message = '';

            if (percentage === 100) {
                message = `<h2><i class="fa-solid fa-crown"></i> 全問正解！素晴らしい！</h2><p>あなたには新しい時代をリードする資質があります。その深い理解力で、豊かさを引き寄せていきましょう。</p>`;
                resultContainer.className = 'success';
            } else if (percentage >= 60) {
                message = `<h2><i class="fa-solid fa-star"></i> 合格です！</h2><p>よく理解できていますね。この調子で学びを深め、新しい時代の波に乗っていきましょう。</p>`;
                resultContainer.className = 'success';
            } else {
                message = `<h2><i class="fa-solid fa-rotate-right"></i> もう一歩！</h2><p>少し難しかったかもしれません。もう一度コンテンツを見直して、再挑戦してみてくださいね！</p>`;
                resultContainer.className = 'failure';
            }
            resultContainer.innerHTML = `${message}<p>あなたのスコア: ${score} / ${quizData.length}</p><a href="quiz.html" class="btn-cta" style="margin-top: 20px; background-color: #1a73e8;">もう一度挑戦する</a>`;
        }

        nextBtn.addEventListener('click', showNextQuestion);

        showQuestion();
    }
});