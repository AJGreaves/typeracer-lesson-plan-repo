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
    const retryButton = document.getElementById('retry-button');
    const timeDisplay = document.getElementById('time');
    const typingInput = document.getElementById('typing-input');
    const wpmDisplay = document.getElementById('wpm');

    let sampleText;
    let startTime;
    let endTime;

    /**
     * Get a random text from the provided text array.
     * @param {Array} textArray - Array of text strings.
     * @returns {string} - Random text string.
     */
    function getRandomText(textArray) {
        const randomIndex = Math.floor(Math.random() * textArray.length);
        return textArray[randomIndex];
    }

    /**
     * Update the sample text based on the selected difficulty.
     */
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

    /**
     * Start the typing test timer and enable the typing input.
     */
    function startTimer() {
        startTime = new Date();
        timeDisplay.textContent = '0';
        retryButton.disabled = true;
    }

    /**
     * Stop the typing test timer, calculate WPM, and disable the typing input.
     */
    function stopTimer() {
        endTime = new Date();
        const timeDiff = ((endTime - startTime) / 1000).toFixed(2);
        timeDisplay.textContent = timeDiff.toString();
        typingInput.disabled = true;

        const userInput = typingInput.value;
        const correctWordCount = calculateCorrectWords(userInput, sampleText);
        const wpm = calculateWPM(correctWordCount, timeDiff);
        wpmDisplay.textContent = wpm.toString();

        retryButton.disabled = false;
    }

    /**
     * Calculate the number of correct words typed by the user.
     * @param {string} userInput - User's input text.
     * @param {string} sampleText - Sample text to compare against.
     * @returns {number} - Number of correct words.
     */
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

    /**
     * Calculate the words per minute (WPM) based on correct words and time taken.
     * @param {number} correctWordCount - Number of correct words typed.
     * @param {number} timeDiff - Time taken in seconds.
     * @returns {number} - Words per minute (WPM).
     */
    function calculateWPM(correctWordCount, timeDiff) {
        const minutes = timeDiff / 60;
        const wpm = Math.round(correctWordCount / minutes);
        return wpm;
    }

    /**
     * Show typing feedback by highlighting correct and incorrect words.
     */
    function showTypingFeedback() {

        if (!startTime) {
            startTimer();
        }

        const userInput = typingInput.value.trim();
        const userWords = userInput.split(/\s+/);
        const sampleWords = sampleText.trim().split(/\s+/);

        let highlightedText = '';

        for (let i = 0; i < sampleWords.length; i++) {
            if (userWords[i] === undefined) {
                highlightedText += `<span>${sampleWords[i]}</span> `;
            } else if (userWords[i] === sampleWords[i]) {
                highlightedText += `<span class="correct-word">${sampleWords[i]}</span> `;
            } else {
                highlightedText += `<span class="incorrect-word">${sampleWords[i]}</span> `;
            }
        }

        sampleTextDiv.innerHTML = highlightedText.trim();
    }

    /**
     * Handle difficulty change event.
     */
    function handleDifficultyChange() {
        updateSampleText();
    }

    /**
     * Handle typing input event.
     */
    function handleTypingInput() {
        showTypingFeedback();
    }

    /**
     * Handle Enter key press event.
     * @param {KeyboardEvent} event - The keyboard event.
     */
    function handleEnterKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default behavior of Enter key
            stopTimer();
        }
    }

    /**
     * Handle retry button click event.
     */
    function handleRetryButtonClick() {
        typingInput.value = '';
        updateSampleText();
        timeDisplay.textContent = '0';
        wpmDisplay.textContent = '0';
        typingInput.disabled = false;
        typingInput.placeholder = "Begin typing to start the test. Hit enter to end the test.";
        typingInput.focus();
        startTime = null;
        endTime = null;
        retryButton.disabled = true; // Disable retry button while test is running
    }

    // Add event listeners
    difficultySelect.addEventListener('change', handleDifficultyChange);
    typingInput.addEventListener('input', handleTypingInput);
    typingInput.addEventListener('keydown', handleEnterKeyPress);
    retryButton.addEventListener('click', handleRetryButtonClick);

    // Initialize with a default text
    updateSampleText();
});