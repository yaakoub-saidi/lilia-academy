/* =========================
   MOBILE MENU
========================= */

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const navMenu =
    document.querySelector(".nav-menu");


mobileMenuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("show");

    const icon =
        mobileMenuBtn.querySelector("i");

    if (navMenu.classList.contains("show")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* CLOSE MOBILE MENU AFTER CLICK */

document.querySelectorAll(".nav-menu a")
.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

        const icon =
            mobileMenuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================
   COURSE → REGISTRATION
========================= */

const courseLinks =
    document.querySelectorAll(".course-link");

const courseSelect =
    document.getElementById("course");


courseLinks.forEach(link => {

    link.addEventListener("click", () => {

        const selectedCourse =
            link.dataset.course;

        courseSelect.value =
            selectedCourse;

    });

});


/* =========================
   FAQ
========================= */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        faqItems.forEach(otherItem => {

            if (otherItem !== item) {

                otherItem.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});


/* =========================
   REGISTRATION FORM
========================= */

const registrationForm =
    document.getElementById("registrationForm");

const successModal =
    document.getElementById("successModal");

const modalClose =
    document.getElementById("modalClose");

const modalOk =
    document.getElementById("modalOk");


registrationForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const submitButton =
        registrationForm.querySelector(
            'button[type="submit"]'
        );


    const formData =
        new FormData(registrationForm);


    const data = {

        name: formData.get("name"),

        phone: formData.get("phone"),

        email: formData.get("email"),

        course: formData.get("course"),

        level: formData.get("level"),

        message: formData.get("message"),

        date: new Date().toISOString()

    };


    console.log("Registration data:", data);


    /*
       ========================================
       n8n WEBHOOK
       ========================================

       بعد ما تنشئ Webhook في n8n:

       const N8N_WEBHOOK_URL =
       "https://YOUR-N8N-DOMAIN/webhook/school-registration";

       await fetch(N8N_WEBHOOK_URL, {
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: JSON.stringify(data)
       });

       ========================================
    */


    submitButton.disabled = true;

    submitButton.innerHTML =
        `
        Sending...
        <i class="fa-solid fa-spinner fa-spin"></i>
        `;


    /*
       Simulation فقط للتجربة المحلية.
       عندما تربط n8n احذف setTimeout
       واستعمل fetch الموجود فوق.
    */

    setTimeout(() => {

        submitButton.disabled = false;

        submitButton.innerHTML =
            `
            Submit Registration
            <i class="fa-solid fa-arrow-right"></i>
            `;


        registrationForm.reset();

        successModal.classList.add("show");

    }, 1000);

});


/* =========================
   MODAL
========================= */

function closeModal() {

    successModal.classList.remove("show");

}


modalClose.addEventListener(
    "click",
    closeModal
);


modalOk.addEventListener(
    "click",
    closeModal
);


successModal.addEventListener(
    "click",
    (event) => {

        if (event.target === successModal) {

            closeModal();

        }

    }
);


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(
        ".feature-card, .course-card, .process-step, .review-card"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(element);

});


/* =========================
   NAVBAR SHADOW ON SCROLL
========================= */

window.addEventListener("scroll", () => {

    const navbar =
        document.querySelector(".navbar");

    if (window.scrollY > 30) {

        navbar.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.05)";

    } else {

        navbar.style.boxShadow = "none";

    }

});