const fs = require('fs')

// Function to delete the file after a specified delay
exports.deleteFileAfterDelay = (filePath, delay) => {
    setTimeout(() => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          return;
        }
        console.log('File deleted successfully:', filePath);
      });
    }, delay);
  };