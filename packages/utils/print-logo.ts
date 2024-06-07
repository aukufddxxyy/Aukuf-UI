export default function () {
  if (PROD) {
    const logo = `
 ________    ___  ___    ___  __      ___  ___    ________                  ___  ___    ___     
|\\   __  \\  |\\  \\|\\  \\  |\\  \\|\\  \\   |\\  \\|\\  \\  |\\  _____\\                |\\  \\|\\  \\  |\\  \\    
\\ \\  \\|\\  \\ \\ \\  \\\\\\  \\ \\ \\  \\/  /|_ \\ \\  \\\\\\  \\ \\ \\  \\__/   ____________  \\ \\  \\\\\\  \\ \\ \\  \\   
 \\ \\   __  \\ \\ \\  \\\\\\  \\ \\ \\   ___  \\ \\ \\  \\\\\\  \\ \\ \\   __\\ |\\____________\\ \\ \\  \\\\\\  \\ \\ \\  \\  
  \\ \\  \\ \\  \\ \\ \\  \\\\\\  \\ \\ \\  \\\\ \\  \\ \\ \\  \\\\\\  \\ \\ \\  \\_| \\|____________|  \\ \\  \\\\\\  \\ \\ \\  \\ 
   \\ \\__\\ \\__\\ \\ \\_______\\ \\ \\__\\\\ \\__\\ \\ \\_______\\ \\ \\__\\                    \\ \\_______\\ \\ \\__\\
    \\|__|\\|__|  \\|_______|  \\|__| \\|__|  \\|_______|  \\|__|                     \\|_______|  \\|__|
        `;

    const rainbowGradient = `
        background: linear-gradient(to right, violet, indigo, blue, green, yellow, orange, red);
        -webkit-background-clip: text;
        color: transparent;
        font-family: monospace;
        font-weight: 600;
    `;
    console.info(`%c${logo}`, rainbowGradient);
  } else if (DEV) {
    console.info("[AukufUI]: dev mode...");
  }
}
