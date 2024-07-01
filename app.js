document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("main section, .hero");
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // Highlight the current section in the navbar and add smooth scroll
    const navList = document.getElementById("nav-list");
    const sectionIds = ["home", "about", "team", "contact"];
    const sectionNames = ["Home", "About", "Our Team", "Contact"];

    sectionIds.forEach((id, index) => {
        const listItem = document.createElement("li");
        const anchor = document.createElement("a");
        anchor.setAttribute("href", `#${id}`);
        anchor.setAttribute("id", `${id}-link`);
        anchor.textContent = sectionNames[index];
        listItem.appendChild(anchor);
        navList.appendChild(listItem);
    });

    const navLinks = document.querySelectorAll(".nav-links a");
    let lastScrollTop = 0;
    const navMenu = document.querySelector(".navmenu");

    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });

                // Remove active class from all links and add to the clicked one
                navLinks.forEach(nav => nav.classList.remove("active"));
                link.classList.add("active");
            }
        });
    });

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top + window.scrollY;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop - 60 && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === current) {
                link.classList.add("active");
            }
        });

        // Show or hide scroll to top button
        if (window.scrollY > 200) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }

        // Hide or show navigation bar on scroll
        let st = document.documentElement.scrollTop;
        if (st > lastScrollTop) {
            navMenu.style.top = "-50px";
        } else {
            navMenu.style.top = "0";
        }
        lastScrollTop = st <= 0 ? 0 : st;
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Collapsible sections
    sections.forEach(section => {
        const header = section.querySelector("h3");
        if (header) {
            header.style.cursor = "pointer";
            header.addEventListener("click", () => {
                section.classList.toggle("collapsed");
            });
        }
    });
});
