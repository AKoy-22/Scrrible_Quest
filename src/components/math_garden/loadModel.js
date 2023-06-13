/*import * as tf from '@tensorflow/tfjs';
cv = require('opencv.js');

var model;

export async function loadModel() {
  //model=await tf.loadGraphModel('TFJS/model.json');
  model = await tf.loadLayersModel('./TFJS/model.json');
  return console.log("model loaded");
  
}
loadModel();



export function predictNumber(canvas){
  console.log('processing...');

  //read image
  let image = cv.imread(canvas);
  //convert color to gray scale 
  cv.cvtColor(image, image, cv.COLOR_RGBA2GRAY, 0);
  cv.threshold(image, image, 175, 255, cv.THRESH_BINARY); //anything above 175 will be converted to 255 
  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();
  //highlight the edges 
  cv.findContours(image, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);

  //crop image into a rectangle
  let cnt = contours.get(0); 
  let rect = cv.boundingRect(cnt);
  image = image.roi(rect);

  //set the height 
  var height = image.rows;
  var width = image.cols; 

  if(height > width){
    height = 20;
    const SCALE_FACTOR = image.rows / height;
    width = Math.round(image.cols / SCALE_FACTOR);
  }else{
    width = 20;
    const SCALE_FACTOR = image.cols / width;
    height = Math.round(image.rows / SCALE_FACTOR);
  }
  //resize 
  let newSize = new cv.Size(width, height);
  cv.resize(image, image, newSize, 0, 0, cv.INTER_AREA);

  //calculate padding 
  const LEFT = Math.ceil(4 + (20 - width) / 2);
  const RIGHT = Math.floor(4 +(20 - width) / 2);
  const TOP = Math.ceil(4 + (20 - height) / 2);
  const BOTTOM = Math.floor(4 + (20 - height) / 2);

  //add a black padding 
  let s = new cv.Scalar(0, 0, 0, 0);
  cv.copyMakeBorder(image, image, TOP, BOTTOM, LEFT, RIGHT, cv.BORDER_CONSTANT, s);
  //test
  // const canvas=document.createElement('CANVAS');
  // cv.imshow(canvas, image);
  // document.body.appendChild(canvas);

  //center of mass -- https://docs.opencv.org/3.4/dc/dcf/tutorial_js_contour_features.html
  cv.findContours( image, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE );
  cnt = contours.get(0);
  const MOMENTS = cv.moments(cnt, false);
  //x and y coordinates for center of mass - M00 is the mass of the image
  const cx = MOMENTS.m10 / MOMENTS.m00;
  const cy = MOMENTS.m01 / MOMENTS.m00;

  //shft image to center the image  --- https://docs.opencv.org/3.4/dd/d52/tutorial_js_geometric_transformations.html
  const X_SHIFT = Math.round(image.cols/2.0 - cx); //midpoint - cx
  const Y_SHIFT = Math.round(image.rows/2.0 - cy);

  newSize = new cv.Size(image.cols, image.rows);
  const M = cv.matFromArray(2, 3, cv.CV_64FC1, [1, 0, X_SHIFT, 0, 1, Y_SHIFT]);
  cv.warpAffine(image, image, M, newSize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, s);

  //normalize pixel value
  let pix = image.data;
  //console.log(pix);
  pix = Float32Array.from(pix);
  pix = pix.map(p => p/255.0);


  //Predict image 
  const X = tf.tensor([pix]);
 // console.log(X.shape);
  //console.log(X.dtype);
  const reshaped_X = X.reshape([1, 28, 28]);
  const result = model.predict(reshaped_X);
  var output = tf.argMax(result, axis=1);
  output = output.dataSync()[0];
  //console.log(output);

  //Delete unnecessary variables
  image.delete();
  contours.delete();
  cnt.delete();
  hierarchy.delete();
  M.delete();

  return output;
}



*/