        // Initialize Lucide Icons
        lucide.createIcons();

        // Mobile Menu Toggle
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });

        // Close mobile menu on link click
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });

        // Sticky Navbar
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('py-0');
            } else {
                navbar.classList.remove('py-0');
            }
        });

        // Scroll animations (Intersection Observer)
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                    
                    // Trigger counter animation if inside impact section
                    if (entry.target.id === 'counter-container' || entry.target.querySelector('.counter')) {
                        const counters = document.querySelectorAll('.counter');
                        counters.forEach(counter => {
                            const updateCount = () => {
                                const target = +counter.getAttribute('data-target');
                                const count = +counter.innerText;
                                const inc = target / 40; // speed
                                if (count < target) {
                                    counter.innerText = Math.ceil(count + inc);
                                    setTimeout(updateCount, 40);
                                } else {
                                    counter.innerText = target;
                                }
                            };
                            updateCount();
                        });
                    }
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(element => {
            observer.observe(element);
        });
        
        // Observe counter container separately if needed
        const counterContainer = document.getElementById('counter-container');
        if(counterContainer) observer.observe(counterContainer);

        // Accordion Logic
        const accordionBtns = document.querySelectorAll('.accordion-btn');
        accordionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('active');
                const content = this.nextElementSibling;
                if (content.classList.contains('expanded')) {
                    content.classList.remove('expanded');
                } else {
                    // Close others
                    document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('expanded'));
                    document.querySelectorAll('.accordion-btn').forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    content.classList.add('expanded');
                }
            });
        });

        // Donation Buttons Selection
        const donationBtns = document.querySelectorAll('.donation-btn');
        const customInput = document.getElementById('custom-amount');
        donationBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                donationBtns.forEach(b => {
                    b.classList.remove('bg-primary', 'text-white', 'border-primary');
                    b.classList.add('bg-white', 'text-charcoal', 'border-gray-200');
                });
                btn.classList.remove('bg-white', 'text-charcoal', 'border-gray-200');
                btn.classList.add('bg-primary', 'text-white', 'border-primary');
                customInput.value = '';
            });
        });
        customInput.addEventListener('input', () => {
            if(customInput.value) {
                donationBtns.forEach(b => {
                    b.classList.remove('bg-primary', 'text-white', 'border-primary');
                    b.classList.add('bg-white', 'text-charcoal', 'border-gray-200');
                });
            }
        });
