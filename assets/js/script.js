document.addEventListener('DOMContentLoaded', function () {
    const easyTexts = [
        "The cat sat on the mat.",
        "She sells seashells by the seashore.",
        "A quick brown fox jumps over the lazy dog."
    ];

    const mediumTexts = [
        "The curious kitten chased the fluttering butterfly.",
        "A journey of a thousand miles begins with a single step.",
        "The early bird catches the worm, but the second mouse gets the cheese."
    ];

    const hardTexts = [
        "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune.",
        "In the beginning the Universe was created. This has made a lot of people very angry and been widely regarded as a bad move.",
        "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness."
    ];

    const difficultySelect = document.getElementById('difficulty-select');
    const sampleTextDiv = document.getElementById('sample-text');
    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');
    const timeDisplay = document.getElementById('time');

    let sampleText;
    let startTime;
    let endTime;

    function getRandomText(textArray) {
        const randomIndex = Math.floor(Math.random() * textArray.length);
        return textArray[randomIndex];
    }

    function updateSampleText() {
        const selectedDifficulty = difficultySelect.value;

        if (selectedDifficulty === 'easy') {
            sampleText = getRandomText(easyTexts);
        } else if (selectedDifficulty === 'medium') {
            sampleText = getRandomText(mediumTexts);
        } else if (selectedDifficulty === 'hard') {
            sampleText = getRandomText(hardTexts);
        }

        sampleTextDiv.textContent = sampleText;
    }

    function startTimer() {
        startTime = new Date();
        timeDisplay.textContent = '0';
    }

    function stopTimer() {
        endTime = new Date();
        const timeDiff = ((endTime - startTime) / 1000).toFixed(2);
        timeDisplay.textContent = timeDiff.toString();
        const userInput = document.getElementById('typing-input').value;
        const correctWordCount = calculateCorrectWords(userInput, sampleText);
        const wpm = calculateWPM(correctWordCount, timeDiff);
        document.getElementById('wpm').textContent = wpm.toString();
    }

    function calculateCorrectWords(userInput, sampleText) {
        const userWords = userInput.trim().split(/\s+/);
        const sampleWords = sampleText.trim().split(/\s+/);
        let correctWordCount = 0;

        for (let i = 0; i < userWords.length; i++) {
            if (userWords[i] === sampleWords[i]) {
                correctWordCount++;
            }
        }

        return correctWordCount;
    }

    function calculateWPM(correctWordCount, timeDiff) {
        const minutes = timeDiff / 60;
        const wpm = Math.round(correctWordCount / minutes);
        return wpm;
    }


    difficultySelect.addEventListener('change', updateSampleText);
    startButton.addEventListener('click', startTimer);
    stopButton.addEventListener('click', stopTimer);

    // Initialize with a default text
    updateSampleText();
});