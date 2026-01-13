// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselSlide = document.querySelector('.carousel-slide');
    const carouselNext = document.querySelector('.carousel-next');
    
    // Array of carousel images (you can add more images here)
    const carouselImages = [
        'images/school-photo.jpg',
        'images/college-photo.jpg',
        'images/group-photo.jpg'
    ];
    
    let currentImageIndex = 0;
    
    // Function to change carousel image
    function changeCarouselImage() {
        if (carouselSlide && carouselImages.length > 0) {
            const carouselImage = carouselSlide.querySelector('.carousel-image');
            if (carouselImage) {
                currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
                carouselImage.src = carouselImages[currentImageIndex];
            }
        }
    }
    
    // Next button click handler
    if (carouselNext) {
        carouselNext.addEventListener('click', changeCarouselImage);
    }
    
    // Auto-rotate carousel every 5 seconds (optional)
    // setInterval(changeCarouselImage, 5000);
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Profile image automatic animation (GIF-like)
    const profileImage = document.getElementById('profile-image');
    const profileWrapper = document.querySelector('.profile-image-wrapper');
    
    // Array of profile images for animation
    const profileImages = [
        'images/my-pixel-art/1-removebg-preview.png',
        'images/my-pixel-art/2-removebg-preview.png'
    ];
    
    let currentProfileIndex = 0;
    
    // Function to change profile image automatically
    function changeProfileImage() {
        if (profileImages.length > 1 && profileImage) {
            // Fast fade out
            profileImage.style.opacity = '0';
            
            setTimeout(() => {
                // Change image
                currentProfileIndex = (currentProfileIndex + 1) % profileImages.length;
                profileImage.src = profileImages[currentProfileIndex];
                
                // Fast fade in
                setTimeout(() => {
                    profileImage.style.opacity = '1';
                }, 30);
            }, 100);
        }
    }
    
    // Start automatic animation (change every 1 second for fast GIF-like effect)
    if (profileImage && profileImages.length > 1) {
        // Set initial image
        profileImage.src = profileImages[0];
        
        // Auto-cycle images every 1 second
        setInterval(changeProfileImage, 1000);
    }
    
    // Hover effect enhancement (keep hover animation)
    if (profileWrapper) {
        profileWrapper.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        profileWrapper.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const mainHeader = document.querySelector('.main-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            mainHeader.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            mainHeader.style.boxShadow = 'none';
        }
    });
    
    // Timeline item animation on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
    
    // Education items animation
    const educationItems = document.querySelectorAll('.education-item');
    educationItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
});
