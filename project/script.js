/* =====================================================
   MONTHSARY WEBSITE
   ELIZHA EDITION 💗
   COMPLETE & FIXED VERSION
===================================================== */


/* =====================================================
   LOGIN SETTINGS
===================================================== */

const correctEmail = "elizha@gmail.com";
const correctPassword = "mahal";


/* =====================================================
   LOGIN ELEMENTS
===================================================== */

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const loginScreen = document.getElementById("loginScreen");
const mainScreen = document.getElementById("mainScreen");

const loginMessage = document.getElementById("loginMessage");
const passwordHint = document.getElementById("passwordHint");


/* =====================================================
   SLIDE ELEMENTS
===================================================== */

const slides = document.querySelectorAll(".slide");

const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

const progressFill = document.getElementById("progressFill");
const slideCounter = document.getElementById("slideCounter");


/* =====================================================
   OTHER ELEMENTS
===================================================== */

const logoutBtn = document.getElementById("logoutBtn");

const letterModal = document.getElementById("letterModal");
const closeLetterBtn = document.getElementById("closeLetterBtn");
const keepMemoryBtn = document.getElementById("keepMemoryBtn");

const letterTitle = document.getElementById("letterTitle");
const letterText = document.getElementById("letterText");

const heartsContainer = document.querySelector(".hearts");


/* =====================================================
   CURRENT SLIDE
===================================================== */

let currentSlide = 0;


/* =====================================================
   QUIZ STATE
===================================================== */

/*
   Instead of using ONE global answeredCorrectly
   variable, every quiz slide remembers its own state.

   This prevents one question from accidentally
   affecting another question.
*/


function isQuizSlide(slide) {

    return slide.querySelector(".choice") !== null;

}


function isQuizAnswered(slide) {

    return slide.dataset.answered === "true";

}


function setQuizAnswered(slide, value) {

    slide.dataset.answered = value ? "true" : "false";

}


/* =====================================================
   LOGIN
===================================================== */

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value.trim().toLowerCase();


    /*
       Hide password hint every time
       before checking the login.
    */

    passwordHint.style.display = "none";

    loginMessage.textContent = "";


    /* =================================================
       WRONG EMAIL
    ================================================= */

    if (email !== correctEmail) {

        loginMessage.textContent =
            "Wrong username or email. Try again. 🥺";

        loginMessage.style.color = "#c43859";

        return;

    }


    /* =================================================
       CORRECT EMAIL / WRONG PASSWORD
    ================================================= */

    if (password !== correctPassword) {

        loginMessage.textContent =
            "Wrong password! Try again. 💗";

        loginMessage.style.color = "#c43859";

        passwordHint.style.display = "flex";

        return;

    }


    /* =================================================
       CORRECT LOGIN
    ================================================= */

    loginMessage.textContent =
        "Welcome to our little world. 💗";

    loginMessage.style.color = "#3d9560";


    setTimeout(function() {

        loginScreen.classList.add("hidden");

        mainScreen.classList.remove("hidden");

        startWebsite();

    }, 700);

});


/* =====================================================
   START WEBSITE
===================================================== */

function startWebsite() {

    currentSlide = 0;

    resetAllQuizSlides();

    showSlide(currentSlide);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   RESET ALL QUIZZES
===================================================== */

function resetAllQuizSlides() {

    slides.forEach(function(slide) {

        if (!isQuizSlide(slide)) {
            return;
        }


        setQuizAnswered(slide, false);


        const choices =
            slide.querySelectorAll(".choice");


        choices.forEach(function(button) {

            button.disabled = false;

            button.classList.remove(
                "correct",
                "wrong"
            );

        });


        const feedback =
            slide.querySelector(".question-answer");


        if (feedback) {

            feedback.textContent = "";

            feedback.style.color = "";

        }

    });

}


/* =====================================================
   SHOW SLIDE
===================================================== */

function showSlide(index) {

    if (index < 0 || index >= slides.length) {
        return;
    }


    /* =================================================
       HIDE ALL SLIDES
    ================================================= */

    slides.forEach(function(slide) {

        slide.classList.remove("active-slide");

    });


    /* =================================================
       SHOW CURRENT SLIDE
    ================================================= */

    slides[index].classList.add("active-slide");


    currentSlide = index;


    /* =================================================
       SLIDE NUMBER

       Login = Slide 1
       First website slide = Slide 2

       There are 29 website slides.
       Therefore:
       index 0 = Slide 2
       index 28 = Slide 30
    ================================================= */

    const actualScreenNumber = index + 2;


    slideCounter.textContent =
        "Slide " +
        actualScreenNumber +
        " of 30";


    /* =================================================
       PROGRESS BAR
    ================================================= */

    const percentage =
        (actualScreenNumber / 30) * 100;


    progressFill.style.width =
        percentage + "%";


    /* =================================================
       BACK BUTTON
    ================================================= */

    backBtn.disabled =
        index === 0;


    /* =================================================
       NEXT BUTTON
    ================================================= */

    if (index === slides.length - 1) {

        nextBtn.textContent =
            "Finished 💗";

    } else {

        nextBtn.textContent =
            "Next →";

    }


    /* =================================================
       QUIZ BUTTON STATE

       IMPORTANT:
       We DO NOT reset the quiz every time
       showSlide() runs.

       If the user already answered correctly,
       the question stays answered.
    ================================================= */

    if (isQuizSlide(slides[index])) {

        const choices =
            slides[index].querySelectorAll(".choice");


        choices.forEach(function(button) {

            button.disabled =
                isQuizAnswered(slides[index]);

        });

    }

}


/* =====================================================
   NEXT BUTTON
===================================================== */

nextBtn.addEventListener("click", function() {

    const current =
        slides[currentSlide];


    /* =================================================
       IF CURRENT SLIDE IS A QUIZ
    ================================================= */

    if (isQuizSlide(current)) {

        if (!isQuizAnswered(current)) {

            const feedback =
                current.querySelector(".question-answer");


            if (feedback) {

                feedback.textContent =
                    "Please answer correctly first. 💗";

                feedback.style.color =
                    "#c43859";

            }

            return;

        }

    }


    /* =================================================
       MOVE TO NEXT SLIDE
    ================================================= */

    if (currentSlide < slides.length - 1) {

        showSlide(currentSlide + 1);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

});


/* =====================================================
   BACK BUTTON
===================================================== */

backBtn.addEventListener("click", function() {

    if (currentSlide > 0) {

        showSlide(currentSlide - 1);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

});


/* =====================================================
   QUIZ SYSTEM
===================================================== */

/*
   IMPORTANT:

   The correct answer is NOT hardcoded here.

   JavaScript reads:

   data-correct="true"

   directly from your HTML.

   Example:

   <button
       class="choice"
       data-answer="jollibee"
       data-correct="true"
   >
       Jollibee 💗
   </button>

   This means you can change the correct answer
   directly in index.html.
*/


slides.forEach(function(slide) {

    const choices =
        slide.querySelectorAll(".choice");


    if (choices.length === 0) {
        return;
    }


    choices.forEach(function(choice) {

        choice.addEventListener("click", function() {


            /* =========================================
               DO NOTHING IF ALREADY CORRECT
            ========================================= */

            if (isQuizAnswered(slide)) {
                return;
            }


            /* =========================================
               GET SELECTED ANSWER
            ========================================= */

            const selectedAnswer =
                (choice.dataset.answer || "")
                    .trim()
                    .toLowerCase();


            /* =========================================
               FIND CORRECT ANSWER FROM HTML
            ========================================= */

            const correctChoice =
                slide.querySelector(
                    '.choice[data-correct="true"]'
                );


            /* =========================================
               SAFETY CHECK
            ========================================= */

            if (!correctChoice) {

                console.error(
                    "ERROR: This question has no data-correct='true'.",
                    slide
                );

                return;

            }


            const correctAnswer =
                (correctChoice.dataset.answer || "")
                    .trim()
                    .toLowerCase();


            /* =========================================
               FEEDBACK
            ========================================= */

            const feedback =
                slide.querySelector(".question-answer");


            /* =========================================
               REMOVE OLD STYLES
            ========================================= */

            choices.forEach(function(button) {

                button.classList.remove(
                    "correct",
                    "wrong"
                );

            });


            /* =========================================
               CORRECT ANSWER
            ========================================= */

            if (selectedAnswer === correctAnswer) {

                choice.classList.add("correct");


                setQuizAnswered(
                    slide,
                    true
                );


                if (feedback) {

                    feedback.textContent =
                        "Correct! 💗 You remembered!";

                    feedback.style.color =
                        "#3d9560";

                }


                /*
                   Disable all answers after
                   getting the correct answer.
                */

                choices.forEach(function(button) {

                    button.disabled = true;

                });

            }


            /* =========================================
               WRONG ANSWER
            ========================================= */

            else {

                choice.classList.add("wrong");


                setQuizAnswered(
                    slide,
                    false
                );


                if (feedback) {

                    feedback.textContent =
                        "Wrong! Try Again 😭💗";

                    feedback.style.color =
                        "#c43859";

                }


                /*
                   Wrong answer does NOT disable
                   the other choices.
                */

                setTimeout(function() {

                    choice.classList.remove("wrong");

                }, 700);

            }

        });

    });

});


/* =====================================================
   HIDDEN LOVE LETTERS
===================================================== */

const letters = {

    1: {

        title:
            "Our First Little Memory 💗",

        text:
`Elizha,

Every memory has a beginning.

When I look at this picture, I don't just see a photo. I see a moment that became part of our story.

Maybe someday we'll look back at these pictures and realize how many little moments became important to us.

Thank you for being part of those memories.

And thank you for opening this little surprise. 💗

— From me`

    },


    2: {

        title:
            "A Memory Worth Keeping 💌",

        text:
`Some pictures are more than pictures.

They remind us of a specific moment, a certain feeling, and a time that we can never exactly repeat.

That's what makes memories special.

I hope we continue collecting moments that we'll someday look back on and smile about.

Keep this memory. 💗`

    },


    3: {

        title:
            "A Little Message For You 💗",

        text:
`Elizha,

This is one of those little moments I wanted you to remember.

It may look simple, but sometimes the simplest memories become the ones we treasure the most.

Thank you for being part of my favorite memories.

Happy monthsary. 💗`

    },


    4: {

        title:
            "For You 💕",

        text:
`If I could keep one thing from this memory, it would be the feeling behind it.

The laughter.

The little moments.

The conversations.

And the happiness that came with simply having another memory to keep.

I hope we make many more. 💗`

    },


    5: {

        title:
            "Another Little Memory 💌",

        text:
`There are moments that look ordinary from the outside.

But for the people who experienced them, they can mean so much more.

This is one of those memories I want to keep.

One more picture.

One more story.

One more reason to smile. 💗`

    },


    6: {

        title:
            "A Secret Letter 💗",

        text:
`Elizha,

I made this website because I wanted to give you something that you could actually explore.

Not just one message.

Not just one picture.

But a collection of little moments.

I hope every click reminds you that this was made with effort, time, and a lot of thought.

Happy monthsary. 💗`

    },


    7: {

        title:
            "You And Me 💕",

        text:
`One picture.

One moment.

One memory.

And somehow, it became part of our story.

Whenever we look back at old pictures, I hope we remember not only what happened, but how those moments made us feel.

Here's to more memories. 💗`

    },


    8: {

        title:
            "Keep This Memory 💌",

        text:
`Someday, these pictures will become old pictures.

But I hope the memories behind them never become ordinary.

I hope we always have something to look back on.

Something that makes us smile.

Something that reminds us of how far we've come.

Let's keep making memories worth remembering. 💗`

    },


    9: {

        title:
            "The Final Hidden Letter 💗",

        text:
`And here we are.

After all the questions, pictures, memories, and hidden letters, I just want you to know one thing.

This entire little website was made to create one more memory.

Something you could open.

Something you could explore.

Something you could remember.

Happy 16th monthsary, Elizha. 💗

This isn't the end.

It's just another chapter.

Our story continues...`

    }

};


/* =====================================================
   OPEN LETTER
===================================================== */

function openLetter(letterNumber) {

    const letter =
        letters[letterNumber];


    if (!letter) {

        console.error(
            "Letter not found:",
            letterNumber
        );

        return;

    }


    letterTitle.textContent =
        letter.title;


    letterText.textContent =
        letter.text;


    letterModal.classList.add("show");


    document.body.style.overflow =
        "hidden";

}


/* =====================================================
   CLOSE LETTER
===================================================== */

function closeLetter() {

    letterModal.classList.remove("show");

    document.body.style.overflow = "";

}


/* =====================================================
   CLOSE LETTER BUTTON
===================================================== */

if (closeLetterBtn) {

    closeLetterBtn.addEventListener(
        "click",
        closeLetter
    );

}


/* =====================================================
   KEEP MEMORY BUTTON
===================================================== */

if (keepMemoryBtn) {

    keepMemoryBtn.addEventListener(
        "click",
        closeLetter
    );

}


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeLetter();

        }

    }
);


/* =====================================================
   CLICK OUTSIDE LETTER
===================================================== */

letterModal.addEventListener(
    "click",
    function(event) {

        if (event.target === letterModal) {

            closeLetter();

        }

    }
);


/* =====================================================
   LOGOUT
===================================================== */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function() {


            /* =========================================
               CLOSE ANY OPEN LETTER
            ========================================= */

            closeLetter();


            /* =========================================
               HIDE MAIN WEBSITE
            ========================================= */

            mainScreen.classList.add("hidden");


            /* =========================================
               SHOW LOGIN
            ========================================= */

            loginScreen.classList.remove("hidden");


            /* =========================================
               CLEAR LOGIN
            ========================================= */

            emailInput.value = "";

            passwordInput.value = "";


            /* =========================================
               CLEAR LOGIN MESSAGES
            ========================================= */

            loginMessage.textContent = "";

            passwordHint.style.display =
                "none";


            /* =========================================
               RESET ALL QUESTIONS
            ========================================= */

            resetAllQuizSlides();


            /* =========================================
               RETURN TO FIRST WEBSITE SLIDE
            ========================================= */

            currentSlide = 0;

            showSlide(0);


            /* =========================================
               SCROLL TO TOP
            ========================================= */

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =====================================================
   FLOATING HEARTS
===================================================== */

function createHeart() {

    if (!heartsContainer) {
        return;
    }


    const heart =
        document.createElement("div");


    heart.classList.add("heart");


    const heartTypes = [
        "💗",
        "💕",
        "💖",
        "💓",
        "♡"
    ];


    heart.textContent =
        heartTypes[
            Math.floor(
                Math.random() *
                heartTypes.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        (
            12 +
            Math.random() * 20
        ) + "px";


    heart.style.animationDuration =
        (
            5 +
            Math.random() * 6
        ) + "s";


    heartsContainer.appendChild(heart);


    setTimeout(function() {

        heart.remove();

    }, 12000);

}


setInterval(
    createHeart,
    900
);


/* =====================================================
   INITIAL STATE
===================================================== */

resetAllQuizSlides();

showSlide(0);