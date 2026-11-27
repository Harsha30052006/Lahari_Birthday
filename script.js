
// ==========================================
// 1. WEBSITE SETTINGS
// ==========================================

const correctPasscode = "NANNA0230";

let surpriseOpened = false;
let memoriesViewed = false;
let letterOpened = false;
let changingPage = false;


// All birthday pages
const pageIds = [
    "surprise",
    "memories",
    "loveLetter",
    "finalSurprise"
];


// ==========================================
// 2. PASSCODE CHECKING
// ==========================================

function checkPasscode() {

    const enteredCode =
        document.getElementById("passcodeInput").value;

    if (enteredCode === correctPasscode) {

        // Hide passcode screen
        document.getElementById("passcodeScreen").style.display = "none";

        // Show website content
        const content =
            document.getElementById("websiteContent");

        content.classList.remove("hidden");

        // Hide all birthday pages first
        pageIds.forEach(id => {
            document.getElementById(id).classList.add("hidden");
        });

        // Show only the first page
        const firstPage =
            document.getElementById("surprise");

        firstPage.classList.remove("hidden");
        firstPage.classList.add("page-transition");

        window.scrollTo(0, 0);

        // Start background music
        const music = document.getElementById("bgMusic");

        if (music) {
            music.play().then(() => {
                updateMusicButton();
            }).catch(() => {
                console.log("Click Play Music to start the song.");
            });
        }

    } else {

        document.getElementById("passcodeError").textContent =
            "Incorrect passcode! Try again, Nanna ❤️";

        document.getElementById("passcodeInput").value = "";
    }
}


// ==========================================
// 3. OPEN THE GIFT
// ==========================================

function openSurprise() {

    if (surpriseOpened) return;

    surpriseOpened = true;

    const gift = document.getElementById("giftBox");
    const message = document.getElementById("giftMessage");

    gift.classList.add("opened");
    gift.textContent = "🧸💍";

    message.classList.remove("hidden");
}


// ==========================================
// 4. PAGE TRANSITION SYSTEM
// ==========================================

function changePage(currentId, nextId) {

    if (changingPage) return;

    const currentPage =
        document.getElementById(currentId);

    const nextPage =
        document.getElementById(nextId);

    if (!currentPage || !nextPage) return;

    changingPage = true;

    // Animate current page out
    currentPage.classList.add("page-exit");

    setTimeout(() => {

        // Hide every birthday page
        pageIds.forEach(id => {

            const page = document.getElementById(id);

            page.classList.add("hidden");
            page.classList.remove("page-exit");
            page.classList.remove("page-transition");

        });

        // Show only the next page
        nextPage.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        // Restart entrance animation
        void nextPage.offsetWidth;

        nextPage.classList.add("page-transition");

        setTimeout(() => {

            nextPage.classList.remove("page-transition");

            changingPage = false;

        }, 800);

    }, 400);
}


// ==========================================
// 5. GIFT PAGE TO MEMORIES PAGE
// ==========================================

function showMemories() {

    if (!surpriseOpened) return;

    memoriesViewed = true;

    changePage("surprise", "memories");
}


// ==========================================
// 6. MEMORIES PAGE TO LETTER PAGE
// ==========================================

function showLetter() {

    if (!memoriesViewed) return;

    changePage("memories", "loveLetter");
}


// ==========================================
// 7. OPEN THE LOVE LETTER
// ==========================================

function openLetter() {

    if (letterOpened) return;

    const envelope =
        document.querySelector(".envelope");

    if (!envelope) return;

    envelope.classList.add("open");

    letterOpened = true;
}


// ==========================================
// 8. LETTER PAGE TO FINAL SURPRISE
// ==========================================

function showFinalSurprise() {

    if (!letterOpened) return;

    changePage("loveLetter", "finalSurprise");
}


// ==========================================
// 9. PREVIOUS BUTTONS
// ==========================================

function previousToGift() {

    changePage("memories", "surprise");
}

function previousToMemories() {

    changePage("loveLetter", "memories");
}

function previousToLetter() {

    changePage("finalSurprise", "loveLetter");
}


// ==========================================
// 10. BACKGROUND MUSIC CONTROLS
// ==========================================

function toggleMusic() {

    const music = document.getElementById("bgMusic");

    if (!music) return;

    if (music.paused) {

        music.play().then(() => {
            updateMusicButton();
        }).catch(error => {
            console.log("Unable to play music:", error);
        });

    } else {

        music.pause();
        updateMusicButton();

    }
}


// Update music button text
function updateMusicButton() {

    const music = document.getElementById("bgMusic");
    const button = document.getElementById("musicButton");

    if (!music || !button) return;

    if (music.paused) {
        button.textContent = "🎵 Play Music";
    } else {
        button.textContent = "⏸ Pause Music";
    }
}


// Keep button text correct if music changes
document.addEventListener("DOMContentLoaded", function () {

    const music = document.getElementById("bgMusic");

    if (music) {
        music.addEventListener("play", updateMusicButton);
        music.addEventListener("pause", updateMusicButton);
    }

    const passcodeInput =
        document.getElementById("passcodeInput");

    if (passcodeInput) {

        passcodeInput.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {
                checkPasscode();
            }

        });
    }

});
