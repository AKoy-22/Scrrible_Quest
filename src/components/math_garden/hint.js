/**Logic to display hint function in math game which is available for elementary levels */
export function renderCircles (num) {
    const circles = [];
    const totalCircles = num; // Calculate the total number of circles
    const circlesPerRow = 5; // Number of circles per row
    const numRows = Math.ceil(totalCircles / circlesPerRow); // Calculate the number of rows
  
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < circlesPerRow; col++) {
        const circleIndex = row * circlesPerRow + col;
        if (circleIndex >= totalCircles) {
          break; // Exit the loop if all circles have been rendered
        }
        
        const cx = 20 + col * 40;
        const cy = 20 + row * 40;
  
        circles.push(
          <circle key={circleIndex} cx={cx} cy={cy} r="15" stroke="black" strokeWidth="3" fill="none" />
        );
      }
    }
  
    return circles;
  };
  