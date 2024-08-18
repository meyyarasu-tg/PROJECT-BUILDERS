const express = require('express');
const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Example project data
const projects = {
    'civil-project': {
        title: 'Civil Project Report',
        description: 'This is the civil project report.',
        details: ['Foundation work', 'Steel structure', 'Electrical systems']
    },
    'mechanical-project': {
        title: 'Mechanical Project Report',
        description: 'This is the mechanical project report.',
        details: ['Engine design', 'Thermodynamics analysis', 'Material selection']
    },
    // Add more projects as needed
};

// Route for dynamic project reports
app.get('/:project-report', (req, res) => {
    const projectName = req.params['project-report'];
    const project = projects[projectName];
    
    if (project) {
        res.render('project-report', { project });
    } else {
        res.status(404).send('Project not found');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
