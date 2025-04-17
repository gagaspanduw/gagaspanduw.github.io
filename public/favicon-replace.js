// Simple favicon replacement script
// This will run after the app loads and replace the favicon with our custom GPW logo
(function() {
  // Create a function to be called after DOM is loaded
  function replaceFavicon() {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    
    const ctx = canvas.getContext('2d');
    
    // Draw a red circle background (your brand color)
    ctx.fillStyle = '#F87171';
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw a dark inner square (your secondary brand color)
    ctx.fillStyle = '#1F2937';
    ctx.fillRect(8, 8, 16, 16);
    
    // Draw GPW initials
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    
    // G
    ctx.moveTo(10, 16);
    ctx.arc(12, 13, 3, Math.PI, 0, true);
    ctx.lineTo(15, 16);
    
    // P
    ctx.moveTo(17, 10);
    ctx.lineTo(17, 22);
    ctx.moveTo(17, 12);
    ctx.arc(17, 14, 2, Math.PI * 1.5, Math.PI * 0.5, false);
    
    // W
    ctx.moveTo(21, 10);
    ctx.lineTo(22, 22);
    ctx.lineTo(23, 16);
    ctx.lineTo(24, 22);
    ctx.lineTo(25, 10);
    
    ctx.stroke();
    
    // Replace all favicon links
    const links = document.querySelectorAll("link[rel*='icon']");
    links.forEach(link => {
      link.href = canvas.toDataURL('image/x-icon');
    });
    
    // If no links found, create a new one
    if (links.length === 0) {
      const link = document.createElement('link');
      link.rel = 'shortcut icon';
      link.type = 'image/x-icon';
      link.href = canvas.toDataURL('image/x-icon');
      document.head.appendChild(link);
    }
  }

  // Add event listener to run when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', replaceFavicon);
  } else {
    replaceFavicon();
  }
})();