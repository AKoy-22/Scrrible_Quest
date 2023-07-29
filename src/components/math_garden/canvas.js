/**Prepares the canvas./ Used for both math and words game
 * utilizes OpenCV in backend. 
 */

const BACK_COLOR = '#000000';
const LINE_COL = "#FFFFFF";
const LINE_WIDTH = 10;
let currentX = 0;
let currentY = 0;
let prevX = 0;
let prevY = 0;
let isDrawing = false;

export function prepareCanvas(canvas, ctx) {
  ctx.fillStyle = BACK_COLOR;
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  ctx.strokeStyle = LINE_COL;
  ctx.lineWidth = LINE_WIDTH;
  ctx.lineJoin = 'round';

  function handleMouseMove(event) {
    if (isDrawing) {
      prevX = currentX;
      prevY = currentY;
      currentX = event.clientX - canvas.offsetLeft;
      currentY = event.clientY - canvas.offsetTop;
      draw(ctx);
    }
  }

  function handleMouseDown(event) {
    isDrawing = true;
    currentX = event.clientX - canvas.offsetLeft;
    currentY = event.clientY - canvas.offsetTop;
  }

  function handleMouseUp(event) {
    isDrawing = false;
  }

  function handleMouseLeave(event) {
    isDrawing = false;
  }

  function handleTouchMove(event) {
    if (isDrawing) {
      prevX = currentX;
      prevY = currentY;
      currentX = event.touches[0].clientX - canvas.offsetLeft;
      currentY = event.touches[0].clientY - canvas.offsetTop;
      draw(ctx);
    }
  }

  function handleTouchStart(event) {
    isDrawing = true;
    currentX = event.touches[0].clientX - canvas.offsetLeft;
    currentY = event.touches[0].clientY - canvas.offsetTop;
  }

  function handleTouchEnd(event) {
    isDrawing = false;
  }

  function handleTouchCancel(event) {
    isDrawing = false;
  }

  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mouseup', handleMouseUp);
  canvas.addEventListener('mouseleave', handleMouseLeave);

  canvas.addEventListener('touchmove', handleTouchMove);
  canvas.addEventListener('touchstart', handleTouchStart);
  canvas.addEventListener('touchend', handleTouchEnd);
  canvas.addEventListener('touchcancel', handleTouchCancel);

  function draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
  }

  return function removeEventListeners() {
    canvas.removeEventListener('mousemove', handleMouseMove);
    canvas.removeEventListener('mousedown', handleMouseDown);
    canvas.removeEventListener('mouseup', handleMouseUp);
    canvas.removeEventListener('mouseleave', handleMouseLeave);

    canvas.removeEventListener('touchmove', handleTouchMove);
    canvas.removeEventListener('touchstart', handleTouchStart);
    canvas.removeEventListener('touchend', handleTouchEnd);
    canvas.removeEventListener('touchcancel', handleTouchCancel);
  };
}

export function clearCanvas(canvas, ctx) {
  currentX = 0;
  currentY = 0;
  prevX = 0;
  prevY = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}
