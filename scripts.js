
document.addEventListener("DOMContentLoaded", function () {

    const bags = document.querySelectorAll(".bag");
    const homeScreen = document.getElementById("homeScreen");
    const questionScreen = document.getElementById("questionScreen");

    const questionNumber = document.getElementById("questionNumber");
    const questionText = document.getElementById("questionText");
    const answerList = document.getElementById("answerList");
    const resultMessage = document.getElementById("resultMessage");
    const backButton = document.getElementById("backButton");

    const finishedMessage = document.getElementById("finishedMessage");

const questions = JSON.parse(
    document.getElementById("questionData").textContent
);

    let currentId = null;
    let answered = false;
    let completed = 0;

    // BẤM VÀO TÚI
    bags.forEach(bag => {

        bag.addEventListener("click", function () {

            const id = Number(this.dataset.id);

            if (this.classList.contains("completed")) return;

            currentId = id;

            homeScreen.style.display = "none";
            questionScreen.style.display = "flex";

            showQuestion(id);

        });

    });

    // HIỆN CÂU HỎI
    function showQuestion(id) {

        const q = questions[id];

        answered = false;

        questionNumber.textContent = "CÂU HỎI SỐ " + (id + 1);

        questionText.textContent = q.question;

        answerList.innerHTML = "";

        resultMessage.textContent = "";

        backButton.style.display = "none";

        q.answers.forEach((answer, index) => {

            const btn = document.createElement("button");

            btn.className = "answer";
            btn.textContent = answer;

            btn.addEventListener("click", () => checkAnswer(index));

            answerList.appendChild(btn);

        });

    }

    // KIỂM TRA ĐÁP ÁN
    function checkAnswer(selected) {

        if (answered) return;

        answered = true;

        const correct = questions[currentId].correct;

        const buttons = answerList.querySelectorAll(".answer");

        buttons.forEach(btn => btn.disabled = true);

        // Tô xanh đáp án đúng
        buttons[correct].classList.add("correct");

        if (selected !== correct) {

            // Tô đỏ đáp án sai
            buttons[selected].classList.add("wrong");

            resultMessage.textContent = "❌ Rất tiếc! Bạn đã trả lời sai!";

            resultMessage.style.color = "red";

        } else {

            resultMessage.textContent = "🎉 CHÍNH XÁC! CHÚC MỪNG BẠN!";

            resultMessage.style.color = "green";

        }

        backButton.style.display = "block";

    }

    // QUAY LẠI
    backButton.addEventListener("click", function () {

        if (!answered) return;

        bags[currentId].classList.add("completed");

        completed++;

        questionScreen.style.display = "none";

        homeScreen.style.display = "block";

        
if (completed === 6) {
    finishedMessage.style.display = "block";

    const video = document.getElementById("congratVideo");

    video.currentTime = 0;
    video.muted = false;
    video.volume = 2;

    video.play().catch(() => {
        console.log("Trình duyệt chặn tự động phát video có tiếng.");
    });
}


    });

    // CHƠI LẠI
    window.restartGame = function () {

        completed = 0;
        currentId = null;
        answered = false;

        bags.forEach(bag => {
            bag.classList.remove("completed");
        });

        finishedMessage.style.display = "none";

        questionScreen.style.display = "none";
        homeScreen.style.display = "block";

    };

    console.log("Trò chơi túi mù đã tải thành công!");

});
