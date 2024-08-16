// Function to load HTML content
    function loadHTML(elementId, filePath) {
        fetch(filePath)
            .then(response => response.text())
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
                // Initialize menu toggle after header is loaded
                if (elementId === 'header-container') {
                    const menuToggle = document.getElementById('menu-toggle');
                    const nav = document.querySelector('.nav');

                    if (menuToggle && nav) {
                        menuToggle.addEventListener('click', function (event) {
                            event.stopPropagation(); // Prevent the click from propagating to document
                            nav.classList.toggle('active');
                        });

                        // Close the menu when clicking outside
                        document.addEventListener('click', function (event) {
                            if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
                                nav.classList.remove('active');
                            }
                        });
                    } else {
                        console.error('Menu toggle or nav element not found');
                    }
                }
            })
            .catch(error => console.error('Error loading HTML:', error));
    }

    // Load header
    loadHTML('header-container', 'header.html');

    // Load footer
    loadHTML('footer-container', 'footer.html');
