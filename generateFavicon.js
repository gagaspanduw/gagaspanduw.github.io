const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// Generate favicon.ico (will need to install canvas package via npm)
async function generateFavicon() {
  const svgPath = path.join(__dirname, 'public', 'favicon.svg');
  const svgContent = fs.readFileSync(svgPath, 'utf8');
  
  // Create a data URL from the SVG
  const svgDataUrl = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;
  
  // Sizes for favicon and other icons
  const sizes = [16, 32, 48, 64, 192, 512];
  
  for (const size of sizes) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Load the SVG onto the canvas
    const img = await loadImage(svgDataUrl);
    ctx.drawImage(img, 0, 0, size, size);
    
    // Write to PNG files
    const pngBuffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(__dirname, 'public', `logo${size}.png`), pngBuffer);
    
    // For size 16, 32, and 48, also create ICO data
    if (size === 16) {
      fs.writeFileSync(path.join(__dirname, 'public', 'favicon.ico'), pngBuffer);
    }
  }
  
  console.log('Favicon and logo files generated successfully!');
}

generateFavicon().catch(console.error);