// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Close the sidebar after clicking the link
        const sidebar = document.querySelector('.sidebar');
        const mainContent = document.querySelector('.main-content');
        sidebar.classList.remove('active');
        mainContent.classList.remove('shifted');
    });
});

// Handle active state of navigation items
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        e.target.classList.add('active');
    });
});

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.parentElement.dataset.progress || '0';
                progressBar.style.width = width + '%';

                // Show the percentage value
                const valueElement = progressBar.querySelector('.progress-value');
                if (valueElement) {
                    valueElement.style.opacity = '1';
                }

                observer.unobserve(progressBar);
            }
        });
    }, {
        threshold: 0.5
    });

    progressBars.forEach(bar => observer.observe(bar));
}

function animateExperienceItems() {
    const experienceItems = document.querySelectorAll('.experience-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });

    experienceItems.forEach(item => observer.observe(item));
}

function animationmywork() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                // Check if the item has data-category of 'banner' or 'thumbnail'
                if (item.getAttribute('data-category') === 'banner' || item.getAttribute('data-category') === 'thumbnail') {
                    if (filterValue !== 'all') {
                        item.classList.remove('hide');
                    } else {
                        return; // Do nothing to these items
                    }
                    item.classList.add('hide');
                }

                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });
}

function animationEducation() {
    // Setup education accordion
    const educationItems = document.querySelectorAll('.education-item');

    educationItems.forEach(item => {
        const title = item.querySelector('.education-degree');
        title.addEventListener('click', () => {
            // Close other items
            educationItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                    otherItem.querySelector('.education-degree').classList.remove('active'); // Remove active class from others
                }
            });

            // Toggle current item and active class
            item.classList.toggle('open');
            title.classList.toggle('active'); // Toggle active class for clicked item
        });
    });
}

function toggleNavbar() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');

    // Toggle sidebar on menu button click
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        mainContent.classList.toggle('shifted');
    });

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('active');
                mainContent.classList.remove('shifted');
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            mainContent.classList.remove('shifted');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize progress bars
    animateProgressBars();
    animateExperienceItems();
    animationEducation();
    animationmywork();
    toggleNavbar();
});
