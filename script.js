document.addEventListener('DOMContentLoaded', animateProgressBars);
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
// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
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
// Add this to your existing JavaScript
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

document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send the form data to your server
    console.log('Form submitted:', { name, email, subject, message });
    
    // Clear form
    this.reset();
    
    // Show success message (you can customize this)
    alert('Message sent successfully!');
});
    
document.addEventListener('DOMContentLoaded', () => {
    // Initialize progress bars
    animateProgressBars();
    animateExperienceItems();

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
});
