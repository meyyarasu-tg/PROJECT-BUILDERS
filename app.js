const express = require('express');
const path = require('path')
const app = express();

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(_dirname)));
app.set('views', path.join(__dirname));

// Data for different departments
const departments = {
    civil: {
        title: 'Civil',
        projects: [
            { id: 'cproject1', title: 'DESIGN AND ESTIMATION OF HOSTEL BUILDING' },
            { id: 'cproject2', title: 'EXPERIMENTAL INVESTIGATION ON COCONUT FIBER REINFORCED SELF-COMPACTING CONCRETE INCORPORATING WITH FLY ASH AND METAKAOLIN' },
            { id: 'cproject3', title: 'EXPERIMENTAL INVESTIGATION ON IMPROVEMENT OF BEARING CAPACITY OF SANDY SOIL BY USING GROUTING' },
            { id: 'cproject4', title: 'EXPERIMENTAL STUDY ON CLAY BRICK BY PARTIAL REPLACEMENT OF CLAY WITH DOLOMITE POWDER' },
            { id: 'cproject5', title: 'EXPERIMENTAL STUDY ON HIGH PERFORMANCE CONCRETE BY PARTIAL REPLACEMENT OF CEMENT WITH SILICA FUME AND NANO SILICA' },
            { id: 'cproject6', title: 'EXPERIMENTAL STUDY OF INCREASING SOIL STABILIZATION USING CRUMB RUBBER AND CEMENT' },
            { id: 'cproject7', title: 'EXPERIMENTAL STUDY ON STRENGTH IMPROVEMENT OF STRUCTURAL CONCRETE BY USING GRANITE SLURRY WASTE AS FINE AGGREGATE' },
            { id: 'cproject8', title: 'PLANNING, ANALYSIS, DESIGNING AND ESTIMATION OF PRE-STRESSED CONCRETE RAILWAY BRIDGE' }
        ]
    },
    mechanical: {
        title: 'Mechanical',
        projects: [
            {id: 'mproject1', title: 'Example Project'},
            {id: 'mproject2', title: 'Example Project'},
            {id: 'mproject3', title: 'Example Project'},
            {id: 'mproject4', title: 'Example Project'},
            {id: 'mproject5', title: 'Example Project'},
            {id: 'mproject6', title: 'Example Project'},
            {id: 'mproject7', title: 'Example Project'},
            {id: 'mproject8', title: 'Example Project'},
            {id: 'mproject9', title: 'Example Project'}
        ]
    },
    cse: {
        title: 'CSE',
        projects: [
            {id: 'csproject1', title: 'Example Project'},
            {id: 'csproject2', title: 'Example Project'},
            {id: 'csproject3', title: 'Example Project'},
            {id: 'csproject4', title: 'Example Project'},
            {id: 'csproject5', title: 'Example Project'},
            {id: 'csproject6', title: 'Example Project'},
            {id: 'csproject7', title: 'Example Project'},
            {id: 'csproject8', title: 'Example Project'},
            {id: 'csproject9', title: 'Example Project'}
        ]
    },
    eee: {
        title: 'EEE',
        projects: [
            {id: 'eproject1', title: 'Example Project'},
            {id: 'eproject2', title: 'Example Project'},
            {id: 'eproject3', title: 'Example Project'},
            {id: 'eproject4', title: 'Example Project'},
            {id: 'eproject5', title: 'Example Project'},
            {id: 'eproject6', title: 'Example Project'},
            {id: 'eproject7', title: 'Example Project'},
            {id: 'esproject8', title: 'Example Project'},
            {id: 'eproject9', title: 'Example Project'}
        ]
    },
    ece: {
        title: 'ECE',
        projects: [
            {id: 'ecproject1', title: 'Example Project'},
            {id: 'ecproject2', title: 'Example Project'},
            {id: 'ecproject3', title: 'Example Project'},
            {id: 'ecproject4', title: 'Example Project'},
            {id: 'ecproject5', title: 'Example Project'},
            {id: 'ecproject6', title: 'Example Project'},
            {id: 'ecproject7', title: 'Example Project'},
            {id: 'ecproject8', title: 'Example Project'},
            {id: 'ecproject9', title: 'Example Project'},
        ]
    },
    nm: {
        title:'NAAN MUDHALVAN',
        projects: [
            {id: 'nmproject1', title: 'Example Project'},
            {id: 'nmproject2', title: 'Example Project'},
            {id: 'nmproject3', title: 'Example Project'},
            {id: 'nmproject4', title: 'Example Project'},
            {id: 'nmproject5', title: 'Example Project'},
            {id: 'nmproject6', title: 'Example Project'},
            {id: 'nmproject7', title: 'Example Project'},
            {id: 'nmproject8', title: 'Example Project'},
            {id: 'nmproject9', title: 'Example Project'}
        ]
    }
    
    // Define other departments in a similar structure
};

// Route to render project-reports.ejs
app.get('/project-reports.ejs', (req, res) => {
    const department = req.query.department.toLowerCase();
    
    // Get the department data based on query parameter
    const departmentData = departments[department];

    if (!departmentData) {
        return res.status(404).send('Department not found');
    }

    // Render the project-reports.ejs with department title and project list
    res.render('project-reports', { 
        departmentTitle: departmentData.title, 
        projects: departmentData.projects 
    });
});
// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
