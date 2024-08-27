async function fetchContent(url) {
    const response = await fetch(url);
    const text = await response.text();
    return (new DOMParser()).parseFromString(text, 'text/html');
}

async function performSearch(event) {
    event.preventDefault();
    
    const query = document.getElementById('search-input').value.toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results
    
    // Define the paths to search
    const pagesToSearch = [
        '/project-reports/civil-project-reports.html',
        '/project-reports/mechanical-project-reports.html',
        '/project-reports/cse-project-reports.html',
        '/project-reports/eee-project-reports.html',
        '/project-reports/ece-project-reports.html',
        '/project-reports/nm-project-reports.html',
        '/mini-project-reports/civil-mini-project-reports.html',
        '/mini-project-reports/mechanical-mini-project-reports.html',
        '/mini-project-reports/cse-mini-project-reports.html',
        '/mini-project-reports/eee-mini-project-reports.html',
        '/mini-project-reports/ece-mini-project-reports.html',
        '/mini-project-reports/nm-mini-project-reports.html',
        '/ppts/civil-ppts.html',
        '/ppts/mechanical-ppts.html',
        '/ppts/cse-ppts.html',
        '/ppts/eee-ppts.html',
        '/ppts/ece-ppts.html',
        '/notes/civil-notes.html',
        '/notes/mechanical-notes.html',
        '/notes/cse-notes.html',
        '/notes/eee-notes.html',
        '/notes/ece-notes.html'
        // Add other paths as needed
    ];
    
    for (const page of pagesToSearch) {
        const doc = await fetchContent(page);
        
        // Search for project items and notes
        const projectItems = doc.querySelectorAll('.project-item');
        const semesterTables = doc.querySelectorAll('.semester-table');
        
        // Search project items
        projectItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                const result = document.createElement('div');
                result.className = 'search-result-item';
                result.innerHTML = `
                    <h3>${item.querySelector('h3') ? item.querySelector('h3').textContent : 'No title'}</h3>
                    <p>${item.querySelector('p') ? item.querySelector('p').textContent : ''}</p>
                    <a href="${page}#${item.id}" target="_blank">Go to project</a>
                `;
                resultsContainer.appendChild(result);
            }
        });
        
        // Search notes (semester tables)
        semesterTables.forEach(table => {
            const text = table.textContent.toLowerCase();
            if (text.includes(query)) {
                const result = document.createElement('div');
                result.className = 'search-result-item';
                result.innerHTML = `
                    <h3>${table.querySelector('h3') ? table.querySelector('h3').textContent : 'No title'}</h3>
                    <p>${table.querySelector('p') ? table.querySelector('p').textContent : ''}</p>
                    <a href="${page}#${table.id}" target="_blank">Go to notes</a>
                `;
                resultsContainer.appendChild(result);
            }
        });
    }
    
    if (resultsContainer.innerHTML === '') {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }
}
