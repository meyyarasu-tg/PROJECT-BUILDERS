document.querySelector('.search-form').addEventListener('submit', performSearch);

async function fetchContent(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to load ${url}`);
        const text = await response.text();
        return (new DOMParser()).parseFromString(text, 'text/html');
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function performSearch(event) {
    event.preventDefault();
    
    const query = document.getElementById('search-input').value.toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results
    
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
    ];
    
    for (const page of pagesToSearch) {
        const doc = await fetchContent(page);
        if (!doc) continue;

        const projectItems = doc.querySelectorAll('.project-item');
        const semesterTables = doc.querySelectorAll('.semester-table');
        
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
