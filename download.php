<?php
// Path to your file
$file = 'path/to/your/project-report.pdf'; // Change to the actual file path

// Headers to force the file download
header('Content-Type: application/pdf'); // Adjust based on the file type
header('Content-Disposition: attachment; filename="project-report.pdf"'); // Adjust filename
header('Content-Length: ' . filesize($file));

// Serve the file for download
readfile($file);
exit;
?>
