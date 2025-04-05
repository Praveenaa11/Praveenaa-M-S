const generateBtn = document.getElementById("generateButton");
const clearBtn = document.getElementById("clearButton");
const saveBtn = document.getElementById("saveButton");
const storyOutput = document.getElementById("generatedStory");
const loading = document.getElementById("loading");
const userInput = document.getElementById("userInput");
const charCount = document.getElementById("charCount");
const storyText = document.getElementById("storyText");
const cursor = document.querySelector(".cursor");

// Character Counter
userInput.addEventListener("input", () => {
    charCount.textContent = `${userInput.value.length}/200`;
});

// Generate Button Click
generateBtn.addEventListener("click", async () => {
    const input = userInput.value.trim();
    if (input === "") return alert("Please enter a story idea!");

    storyText.innerHTML = "";
    cursor.style.display = "inline-block"; // Show cursor
    loading.classList.remove("hidden");

    await generateStory(input);
});

// Clear Button Click
clearBtn.addEventListener("click", () => {
    userInput.value = "";
    storyText.innerHTML = "";
    charCount.textContent = "0/200";
});

// Save Story Button Click
saveBtn.addEventListener("click", () => {
    const story = storyText.innerText.trim();
    if (!story) {
        alert("No story to save!");
        return;
    }

    const blob = new Blob([story], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "ZenTale_AI.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

// Typing Animation with Blinking Cursor
function typeStory(text) {
    let i = 0;
    const speed = 50; // Adjust typing speed
    storyText.innerHTML = ""; // Clear previous text
    cursor.style.display = "inline-block"; // Show cursor

    function typeWriter() {
        if (i < text.length) {
            storyText.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            cursor.classList.add("blink"); // Make cursor blink after typing
        }
    }

    typeWriter();
}

// AI Story Generation Function
async function generateStory(userIdea) {
    try {
        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: "mistral",
                prompt: `Write a creative short story about: ${userIdea}`,
                stream: false
            })
        });

        loading.classList.add("hidden");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("AI Response:", data);

        if (data.response) {
            typeStory(data.response.trim());
        } else {
            storyText.innerHTML = "No story generated. Please try again.";
        }
    } catch (error) {
        console.error("Error generating story:", error);
        loading.classList.add("hidden");
        storyText.innerHTML = "Error generating story. Make sure Ollama is running.";
    }
}

// CSS for Blinking Cursor
const style = document.createElement("style");
style.innerHTML = `
  .cursor {
    display: inline-block;
    width: 8px;
    height: 18px;
    background: white;
    animation: blinkCursor 1s infinite;
  }

  @keyframes blinkCursor {
    50% { opacity: 0; }
  }
`;
document.head.appendChild(style);
