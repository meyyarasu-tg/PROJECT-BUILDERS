// Sample data for demo purposes
const siteIndex = [
    {
        "title": "Home",
        "url": "/index.html",
        "keywords": "home, landing, welcome"
    },
    {
        "title": "Analysis of Forces and Moments",
        "url": "/mini-project-reports/civil/analysis-of-forces.html",
        "keywords": "forces, moments, statically determinate, structures, civil"
    },
    {
        "title": "Boundary Layers in Laminar and Turbulent Flow",
        "url": "/mini-project-reports/civil/boundary-layers.html",
        "keywords": "boundary layers, laminar flow, turbulent flow, fluid mechanics, civil"
    },
    {
        "title": "Construction Planning",
        "url": "/mini-project-reports/civil/construction-planning.html",
        "keywords": "construction, planning, civil engineering"
    },
    {
        "title": "Contact Us",
        "url": "/contact.html",
        "keywords": "contact, email, phone, support"
    }
];

function performSearch() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    if (searchTerm) {
        // Filter results based on the search term
        const results = siteIndex.filter(item => {
            return item.keywords.toLowerCase().includes(searchTerm);
        });

        // Display the results
        if (results.length > 0) {
            results.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');

                resultItem.innerHTML = `
                    <h3><a href="${item.url}">${item.title}</a></h3>
                    <p>Keywords: ${item.keywords}</p>
                `;
                resultsContainer.appendChild(resultItem);
            });
        } else {
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }
    }
}