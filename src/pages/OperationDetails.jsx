import { Link, useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./Operations.css";

const operationData = {

  grayscale: {
    name: "Grayscale",
    category: "Intensity Transformation",

    information:
      "Grayscale conversion transforms a color image containing red, green and blue channels into a single intensity channel.",

    formula:
      "Gray = 0.299R + 0.587G + 0.114B",

    algorithm: [
      "Read the input RGB image.",
      "For every pixel, obtain R, G and B values.",
      "Calculate the weighted intensity using the grayscale formula.",
      "Assign the calculated intensity to R, G and B.",
      "Display the resulting grayscale image.",
    ],

    code: `function grayscale(r, g, b) {
  return 0.299 * r +
         0.587 * g +
         0.114 * b;
}`,

    advantages: [
      "Reduces a three-channel image to one channel.",
      "Reduces computational complexity.",
      "Useful as preprocessing for many algorithms.",
    ],

    limitations: [
      "Color information is lost.",
      "Different colors may become similar gray values.",
    ],

    applications: [
      "Edge detection",
      "Image segmentation",
      "Pattern recognition",
      "Document processing",
    ],
  },

  blur: {
    name: "Blur",
    category: "Spatial Filtering",

    information:
      "Blur is a spatial filtering operation that smooths an image by replacing each pixel with information from its neighboring pixels.",

    formula:
      "g(x,y) = (1/M) Σ f(x+i,y+j)",

    algorithm: [
      "Read the image.",
      "Select a neighborhood around every pixel.",
      "Calculate the average intensity of the neighborhood.",
      "Replace the center pixel with the average.",
      "Repeat for the complete image.",
    ],

    code: `for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    let sum = 0;
    let count = 0;

    for (let ky = -1; ky <= 1; ky++) {
      for (let kx = -1; kx <= 1; kx++) {
        const px = x + kx;
        const py = y + ky;

        if (
          px >= 0 &&
          px < width &&
          py >= 0 &&
          py < height
        ) {
          sum += image[py][px];
          count++;
        }
      }
    }

    result[y][x] = sum / count;
  }
}`,

    advantages: [
      "Reduces random noise.",
      "Produces a smoother appearance.",
      "Useful before edge detection.",
    ],

    limitations: [
      "Removes fine details.",
      "Edges can become less sharp.",
    ],

    applications: [
      "Noise reduction",
      "Preprocessing",
      "Image enhancement",
      "Computer vision",
    ],
  },

  negative: {
    name: "Negative",
    category: "Intensity Transformation",

    information:
      "Negative transformation reverses the intensity values of an image, producing an effect similar to a photographic negative.",

    formula:
      "s = L - 1 - r",

    algorithm: [
      "Read the input image.",
      "Obtain each pixel intensity r.",
      "Subtract the intensity from L - 1.",
      "For an 8-bit image use 255 - r.",
      "Store the resulting intensity.",
    ],

    code: `const negative = 255 - intensity;`,

    advantages: [
      "Simple computational operation.",
      "Can reveal details in dark regions.",
      "Useful for photographic and medical images.",
    ],

    limitations: [
      "Normal visual appearance is lost.",
      "Not suitable when natural colors are required.",
    ],

    applications: [
      "Medical imaging",
      "Photographic processing",
      "X-ray analysis",
      "Image inspection",
    ],
  },

  contrast: {
    name: "Contrast Stretching",
    category: "Enhancement",

    information:
      "Contrast stretching expands the range of intensity values so that dark pixels become darker and bright pixels become brighter.",

    formula:
      "s = ((r - rmin) / (rmax - rmin)) × 255",

    algorithm: [
      "Find the minimum intensity.",
      "Find the maximum intensity.",
      "Calculate the available input range.",
      "Map the input range to 0–255.",
      "Generate the enhanced image.",
    ],

    code: `const output =
  ((input - rMin) /
   (rMax - rMin)) * 255;`,

    advantages: [
      "Improves image contrast.",
      "Simple to implement.",
      "Useful for low-contrast images.",
    ],

    limitations: [
      "Can amplify noise.",
      "Outliers can affect the minimum and maximum values.",
    ],

    applications: [
      "Satellite imagery",
      "Medical imaging",
      "Low-light images",
      "Image enhancement",
    ],
  },

  transpose: {
    name: "Transpose",
    category: "Geometric Transformation",

    information:
      "Transpose interchanges the rows and columns of the image matrix.",

    formula:
      "Aᵀ[i][j] = A[j][i]",

    algorithm: [
      "Read the image matrix.",
      "Create an output matrix with reversed dimensions.",
      "Copy A[i][j] into Aᵀ[j][i].",
      "Display the transposed image.",
    ],

    code: `for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    result[j][i] = image[i][j];
  }
}`,

    advantages: [
      "Simple matrix operation.",
      "Useful in matrix-based image processing.",
      "Changes image orientation without changing pixel values.",
    ],

    limitations: [
      "Image dimensions are exchanged.",
      "It is not equivalent to arbitrary-angle rotation.",
    ],

    applications: [
      "Matrix processing",
      "Image orientation",
      "Mathematical transformations",
      "Computer vision",
    ],
  },

  transform: {
    name: "Transform",
    category: "Intensity Transformation",

    information:
      "Linear intensity transformation changes pixel values using a linear mapping to control brightness or intensity distribution.",

    formula:
      "s = ar + b",

    algorithm: [
      "Read the input intensity.",
      "Select scale factor a.",
      "Select brightness offset b.",
      "Calculate the transformed intensity.",
      "Clamp the result between 0 and 255.",
    ],

    code: `let output = a * input + b;
output = Math.max(0, Math.min(255, output));`,

    advantages: [
      "Simple and fast.",
      "Allows brightness adjustment.",
      "Can modify overall intensity distribution.",
    ],

    limitations: [
      "A poorly selected scale may cause clipping.",
      "Does not perform nonlinear enhancement.",
    ],

    applications: [
      "Brightness adjustment",
      "Preprocessing",
      "Image enhancement",
      "Display correction",
    ],
  },

  "color-histogram": {
    name: "Color Histogram",
    category: "Image Analysis",

    information:
      "A color histogram represents the frequency distribution of pixel intensities separately for the red, green and blue channels.",

    formula:
      "H(k) = number of pixels having intensity k",

    algorithm: [
      "Create three arrays containing 256 bins.",
      "Read every pixel.",
      "Increment the corresponding R, G and B bins.",
      "Plot the three distributions.",
      "Analyze the intensity distribution.",
    ],

    code: `const histogram = Array.from(
  { length: 256 },
  () => 0
);

for (const value of pixels) {
  histogram[value]++;
}`,

    advantages: [
      "Provides useful image statistics.",
      "Helps analyze brightness and contrast.",
      "Useful for comparing images.",
    ],

    limitations: [
      "Spatial information is not represented.",
      "Different images can have similar histograms.",
    ],

    applications: [
      "Contrast analysis",
      "Image enhancement",
      "Image comparison",
      "Computer vision",
    ],
  },

  rotation: {
    name: "Rotation",
    category: "Geometric Transformation",

    information:
      "Rotation changes the orientation of an image around a selected center point.",

    formula:
      "x' = x cosθ - y sinθ",

    algorithm: [
      "Select the rotation angle.",
      "Find the image center.",
      "Translate coordinates relative to the center.",
      "Apply the rotation matrix.",
      "Map the transformed pixels into the output image.",
    ],

    code: `const x2 =
  x * Math.cos(angle) -
  y * Math.sin(angle);

const y2 =
  x * Math.sin(angle) +
  y * Math.cos(angle);`,

    advantages: [
      "Corrects image orientation.",
      "Useful in data augmentation.",
      "Supports geometric image processing.",
    ],

    limitations: [
      "Interpolation can reduce quality.",
      "Output dimensions may change.",
    ],

    applications: [
      "Document correction",
      "Computer vision",
      "Image registration",
      "Data augmentation",
    ],
  },

  resize: {
    name: "Resize",
    category: "Geometric Transformation",

    information:
      "Resizing changes the width and height of an image using interpolation.",

    formula:
      "x' = sx x,  y' = sy y",

    algorithm: [
      "Select the desired output dimensions.",
      "Calculate horizontal and vertical scale factors.",
      "Map output coordinates to the input.",
      "Interpolate pixel values.",
      "Generate the resized image.",
    ],

    code: `ctx.drawImage(
  image,
  0,
  0,
  newWidth,
  newHeight
);`,

    advantages: [
      "Controls image dimensions.",
      "Useful for standardizing datasets.",
      "Can reduce computational requirements.",
    ],

    limitations: [
      "Upscaling can introduce blur.",
      "Downscaling may remove details.",
    ],

    applications: [
      "Web images",
      "Machine learning",
      "Computer vision",
      "Thumbnail generation",
    ],
  },

  log: {
    name: "Log Transformation",
    category: "Intensity Transformation",

    information:
      "Log transformation expands low-intensity values and compresses high-intensity values.",

    formula:
      "s = c log(1 + r)",

    algorithm: [
      "Read the input intensity.",
      "Add one to avoid log(0).",
      "Calculate the logarithm.",
      "Multiply by scaling constant c.",
      "Normalize the result to 0–255.",
    ],

    code: `const output =
  c * Math.log(1 + input);`,

    advantages: [
      "Enhances dark regions.",
      "Compresses a large dynamic range.",
      "Useful for frequency-domain displays.",
    ],

    limitations: [
      "Bright regions may lose detail.",
      "Requires normalization.",
    ],

    applications: [
      "Fourier spectrum visualization",
      "Dark image enhancement",
      "Scientific imaging",
      "Dynamic range compression",
    ],
  },

  "inverse-log": {
    name: "Inverse Log",
    category: "Intensity Transformation",

    information:
      "Inverse logarithmic transformation expands higher intensity values and compresses lower intensity values.",

    formula:
      "s = c(eʳ - 1)",

    algorithm: [
      "Normalize the input intensity.",
      "Apply the exponential function.",
      "Scale the result.",
      "Clamp to the 0–255 range.",
    ],

    code: `const normalized = input / 255;
const output =
  (Math.exp(normalized) - 1) * 255;`,

    advantages: [
      "Enhances brighter intensity ranges.",
      "Provides nonlinear intensity mapping.",
    ],

    limitations: [
      "Can strongly amplify high intensities.",
      "Requires careful scaling.",
    ],

    applications: [
      "Image enhancement",
      "Scientific visualization",
      "Dynamic range manipulation",
    ],
  },

  gamma05: {
    name: "Gamma 0.5",
    category: "Power-Law Transformation",

    information:
      "Gamma transformation with γ = 0.5 increases the brightness of an image, especially in darker regions.",

    formula:
      "s = c r⁰·⁵",

    algorithm: [
      "Normalize intensity to 0–1.",
      "Raise intensity to gamma 0.5.",
      "Multiply by 255.",
      "Store the output intensity.",
    ],

    code: `const output =
  255 * Math.pow(input / 255, 0.5);`,

    advantages: [
      "Brightens dark images.",
      "Simple nonlinear transformation.",
      "Useful for gamma correction.",
    ],

    limitations: [
      "Can over-brighten an image.",
      "May reduce detail in bright areas.",
    ],

    applications: [
      "Display correction",
      "Dark image enhancement",
      "Photographic processing",
    ],
  },

  gamma20: {
    name: "Gamma 2.0",
    category: "Power-Law Transformation",

    information:
      "Gamma transformation with γ = 2.0 darkens the image and emphasizes differences in brighter intensity regions.",

    formula:
      "s = c r²",

    algorithm: [
      "Normalize intensity.",
      "Raise the value to gamma 2.0.",
      "Scale back to 0–255.",
      "Store the transformed value.",
    ],

    code: `const output =
  255 * Math.pow(input / 255, 2);`,

    advantages: [
      "Darkens overly bright images.",
      "Provides nonlinear intensity control.",
    ],

    limitations: [
      "Can remove information from dark regions.",
      "Incorrect gamma values may degrade visibility.",
    ],

    applications: [
      "Gamma correction",
      "Display systems",
      "Image enhancement",
    ],
  },

  piecewise: {
    name: "Piecewise",
    category: "Intensity Transformation",

    information:
      "Piecewise-linear transformation uses different mappings for different intensity intervals.",

    formula:
      "s = f(r), using different linear functions over selected ranges.",

    algorithm: [
      "Select intensity breakpoints.",
      "Divide the intensity range into segments.",
      "Define a linear mapping for every segment.",
      "Transform each pixel according to its range.",
    ],

    code: `if (r < r1)
  s = m1 * r + b1;
else if (r < r2)
  s = m2 * r + b2;
else
  s = m3 * r + b3;`,

    advantages: [
      "Provides precise intensity control.",
      "Can highlight selected ranges.",
    ],

    limitations: [
      "Requires parameter selection.",
      "Poor parameters can produce unnatural results.",
    ],

    applications: [
      "Contrast enhancement",
      "Feature highlighting",
      "Medical image processing",
    ],
  },

  "gray-slicing": {
    name: "Gray Level Slicing",
    category: "Intensity Transformation",

    information:
      "Gray level slicing highlights pixels within a selected intensity range.",

    formula:
      "s = L - 1 if A ≤ r ≤ B, otherwise 0",

    algorithm: [
      "Choose lower and upper intensity limits.",
      "Check every pixel intensity.",
      "Highlight pixels inside the selected range.",
      "Suppress or preserve pixels outside the range.",
    ],

    code: `if (input >= low &&
    input <= high) {
  output = 255;
} else {
  output = 0;
}`,

    advantages: [
      "Highlights specific intensity features.",
      "Simple to implement.",
      "Useful for segmentation.",
    ],

    limitations: [
      "Requires appropriate intensity limits.",
      "Information outside the range may be suppressed.",
    ],

    applications: [
      "Medical imaging",
      "Object extraction",
      "Feature detection",
      "Segmentation",
    ],
  },

  thresholding: {
    name: "Thresholding",
    category: "Segmentation",

    information:
      "Thresholding separates pixels into foreground and background based on a selected threshold.",

    formula:
      "g(x,y) = 1 if f(x,y) ≥ T, otherwise 0",

    algorithm: [
      "Convert the image to grayscale.",
      "Select threshold T.",
      "Compare every pixel with T.",
      "Assign foreground or background.",
      "Display the binary result.",
    ],

    code: `const output =
  input >= threshold
    ? 255
    : 0;`,

    advantages: [
      "Very simple segmentation method.",
      "Fast computationally.",
      "Effective for clearly separated objects.",
    ],

    limitations: [
      "Sensitive to illumination.",
      "A single threshold may not work for complex images.",
    ],

    applications: [
      "Document processing",
      "Object detection",
      "Segmentation",
      "Industrial inspection",
    ],
  },

  hsi: {
    name: "HSI",
    category: "Color Model",

    information:
      "HSI separates color information into Hue, Saturation and Intensity, making it useful for analyzing color independently of brightness.",

    formula:
      "I = (R + G + B) / 3",

    algorithm: [
      "Normalize R, G and B.",
      "Calculate intensity.",
      "Calculate saturation.",
      "Calculate hue.",
      "Display the selected HSI component.",
    ],

    code: `I = (R + G + B) / 3;

S = 1 -
  (3 * Math.min(R,G,B)) /
  (R + G + B);`,

    advantages: [
      "Separates intensity from color.",
      "Useful for color-based analysis.",
    ],

    limitations: [
      "Conversion is more complex than RGB.",
      "Hue becomes unstable at very low saturation.",
    ],

    applications: [
      "Color segmentation",
      "Remote sensing",
      "Image enhancement",
      "Computer vision",
    ],
  },

  hsv: {
    name: "HSV",
    category: "Color Model",

    information:
      "HSV represents a color using Hue, Saturation and Value, closely matching the way humans describe colors.",

    formula:
      "HSV = f(R,G,B)",

    algorithm: [
      "Normalize RGB values.",
      "Find maximum and minimum channels.",
      "Calculate value.",
      "Calculate saturation.",
      "Calculate hue based on the dominant channel.",
    ],

    code: `const max = Math.max(r,g,b);
const min = Math.min(r,g,b);

const value = max;
const saturation =
  max === 0 ? 0 : (max-min)/max;`,

    advantages: [
      "Intuitive color representation.",
      "Useful for selecting colors.",
      "Good for color segmentation.",
    ],

    limitations: [
      "Hue is undefined for grayscale colors.",
      "Not perceptually uniform.",
    ],

    applications: [
      "Color detection",
      "Object tracking",
      "Computer vision",
      "Image editing",
    ],
  },

  ycbcr: {
    name: "YCbCr",
    category: "Color Model",

    information:
      "YCbCr separates luminance information from chrominance information.",

    formula:
      "Y = 0.299R + 0.587G + 0.114B",

    algorithm: [
      "Read RGB values.",
      "Calculate luminance Y.",
      "Calculate blue-difference chroma Cb.",
      "Calculate red-difference chroma Cr.",
      "Display the selected component.",
    ],

    code: `Y =
  0.299*r +
  0.587*g +
  0.114*b;

Cb =
  128 -
  0.168736*r -
  0.331264*g +
  0.5*b;

Cr =
  128 +
  0.5*r -
  0.418688*g -
  0.081312*b;`,

    advantages: [
      "Separates luminance and chrominance.",
      "Efficient for image/video compression.",
    ],

    limitations: [
      "Less intuitive than RGB.",
      "Requires conversion.",
    ],

    applications: [
      "JPEG",
      "Digital video",
      "Television systems",
      "Compression",
    ],
  },

  cmyk: {
    name: "CMYK",
    category: "Color Model",

    information:
      "CMYK represents colors using Cyan, Magenta, Yellow and Key/Black components and is commonly used in printing.",

    formula:
      "C = 1 - R, M = 1 - G, Y = 1 - B",

    algorithm: [
      "Normalize RGB values.",
      "Calculate CMY components.",
      "Calculate K as the minimum component.",
      "Adjust C, M and Y using K.",
      "Display the selected component.",
    ],

    code: `const c = 1 - r;
const m = 1 - g;
const y = 1 - b;

const k = Math.min(c,m,y);`,

    advantages: [
      "Suitable for printing.",
      "Separates black ink from color inks.",
    ],

    limitations: [
      "Not ideal for screen display.",
      "Conversion depends on color profiles.",
    ],

    applications: [
      "Printing",
      "Publishing",
      "Graphic design",
      "Color separation",
    ],
  },

  dct: {
    name: "DCT",
    category: "Frequency Transformation",

    information:
      "The Discrete Cosine Transform represents an image using cosine basis functions and concentrates much of the image energy into low-frequency coefficients.",

    formula:
      "C(u,v) = α(u)α(v) ΣΣ f(x,y) cos[...] cos[...]",

    algorithm: [
      "Convert the image to grayscale.",
      "Divide the image into blocks.",
      "Apply the DCT equation.",
      "Obtain frequency coefficients.",
      "Analyze or compress the coefficients.",
    ],

    code: `for (let u = 0; u < N; u++) {
  for (let v = 0; v < N; v++) {
    let sum = 0;

    for (let x = 0; x < N; x++) {
      for (let y = 0; y < N; y++) {
        sum += image[x][y] *
          Math.cos(
            ((2*x+1)*u*Math.PI)/(2*N)
          ) *
          Math.cos(
            ((2*y+1)*v*Math.PI)/(2*N)
          );
      }
    }

    dct[u][v] = sum;
  }
}`,

    advantages: [
      "Excellent energy compaction.",
      "Widely used in compression.",
      "Real-valued coefficients.",
    ],

    limitations: [
      "Computationally expensive without optimization.",
      "Blocking artifacts may occur during compression.",
    ],

    applications: [
      "JPEG compression",
      "Image compression",
      "Feature extraction",
      "Frequency analysis",
    ],
  },

  dft: {
    name: "DFT",
    category: "Frequency Transformation",

    information:
      "The Discrete Fourier Transform converts an image from the spatial domain to the frequency domain.",

    formula:
      "F(u,v) = ΣΣ f(x,y)e⁻ʲ²π(ux/M + vy/N)",

    algorithm: [
      "Convert image to grayscale.",
      "Read spatial-domain pixels.",
      "Calculate the complex Fourier coefficients.",
      "Calculate magnitude.",
      "Display the frequency spectrum.",
    ],

    code: `F(u,v) =
  Σ Σ f(x,y) *
  exp(-j * 2π *
  (u*x/M + v*y/N));`,

    advantages: [
      "Provides frequency-domain information.",
      "Useful for filtering.",
      "Useful for periodic pattern analysis.",
    ],

    limitations: [
      "Computationally expensive for large images.",
      "Frequency interpretation can be less intuitive.",
    ],

    applications: [
      "Frequency filtering",
      "Image restoration",
      "Pattern analysis",
      "Signal processing",
    ],
  },

  wht: {
    name: "WHT",
    category: "Frequency Transformation",

    information:
      "The Walsh-Hadamard Transform represents an image using orthogonal square-wave basis functions.",

    formula:
      "W = H f Hᵀ",

    algorithm: [
      "Convert image to grayscale.",
      "Resize to a power-of-two dimension.",
      "Generate the Hadamard matrix.",
      "Multiply the image matrix by the transform matrix.",
      "Display the transform coefficients.",
    ],

    code: `W = H * image * Hᵀ;`,

    advantages: [
      "Uses only addition and subtraction.",
      "Fast implementation is possible.",
      "Useful for transform-domain processing.",
    ],

    limitations: [
      "Less suitable for smooth signals than cosine transforms.",
      "Requires power-of-two dimensions for standard implementations.",
    ],

    applications: [
      "Image compression",
      "Pattern recognition",
      "Feature extraction",
      "Signal processing",
    ],
  },

  haar: {
    name: "Haar Transformation",
    category: "Wavelet Transformation",

    information:
      "The Haar transform decomposes an image into average and difference components at different spatial scales.",

    formula:
      "Average = (a + b) / √2",

    algorithm: [
      "Read the grayscale image.",
      "Pair neighboring pixels.",
      "Calculate average coefficients.",
      "Calculate difference coefficients.",
      "Repeat along rows and columns.",
      "Display the wavelet components.",
    ],

    code: `const average =
  (a + b) / Math.sqrt(2);

const detail =
  (a - b) / Math.sqrt(2);`,

    advantages: [
      "Simple wavelet transform.",
      "Provides spatial and frequency information.",
      "Efficient to implement.",
    ],

    limitations: [
      "Produces block-like basis functions.",
      "Less smooth than other wavelets.",
    ],

    applications: [
      "Image compression",
      "Edge detection",
      "Feature extraction",
      "Image analysis",
    ],
  },
};

function createDemoImage() {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="640"
         height="420"
         viewBox="0 0 640 420">
      <defs>
        <linearGradient id="bg"
          x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ddddda"/>
          <stop offset="100%" stop-color="#777"/>
        </linearGradient>
      </defs>

      <rect width="640" height="420" fill="url(#bg)"/>
      <circle cx="180" cy="210" r="105" fill="#111"/>
      <circle cx="180" cy="210" r="55" fill="#ddd"/>
      <rect x="330" y="95"
            width="190"
            height="230"
            rx="18"
            fill="#f3f3f3"/>
      <rect x="360" y="130"
            width="130"
            height="45"
            fill="#111"/>
      <rect x="360" y="195"
            width="90"
            height="25"
            fill="#777"/>
      <rect x="360" y="235"
            width="110"
            height="25"
            fill="#aaa"/>
      <text x="40" y="55"
            font-family="Arial"
            font-size="25"
            fill="#111">
        RegionSeg DIP Laboratory
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function OperationPreview({ operation }) {
  const originalRef = useRef(null);
  const processedRef = useRef(null);

  useEffect(() => {
  const img = new Image();

  img.src = "/src/assets/example-image.png";

  img.onload = () => {
    const originalCanvas = originalCanvasRef.current;
    const processedCanvas = processedCanvasRef.current;

    if (!originalCanvas || !processedCanvas) return;

    const width = img.width;
    const height = img.height;

    /* =========================
       ORIGINAL IMAGE
    ========================= */

    originalCanvas.width = width;
    originalCanvas.height = height;

    const originalCtx = originalCanvas.getContext("2d");

    originalCtx.clearRect(0, 0, width, height);
    originalCtx.drawImage(img, 0, 0, width, height);


    /* =========================
       PROCESSED IMAGE
    ========================= */

    processedCanvas.width = width;
    processedCanvas.height = height;

    const processedCtx = processedCanvas.getContext("2d");

    processedCtx.clearRect(0, 0, width, height);
    processedCtx.drawImage(img, 0, 0, width, height);


    /* =========================
       GRAYSCALE OPERATION
    ========================= */

    if (operation.id === "grayscale") {

      const imageData = processedCtx.getImageData(
        0,
        0,
        width,
        height
      );

      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {

        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];

        // Grayscale conversion
        const gray =
          0.299 * red +
          0.587 * green +
          0.114 * blue;

        data[i] = gray;       // Red
        data[i + 1] = gray;   // Green
        data[i + 2] = gray;   // Blue
      }

      processedCtx.putImageData(
        imageData,
        0,
        0
      );
    }
  };
}, [operation]);
  return (
    <div className="operation-preview-grid">
      <div className="preview-card">
        <span>ORIGINAL IMAGE</span>
        <canvas ref={originalRef} />
      </div>

      <div className="preview-card">
        <span>PROCESSED IMAGE</span>
        <canvas ref={processedRef} />
      </div>
    </div>
  );
}

function OperationDetails() {
  const { operationId } = useParams();

  const operation = operationData[operationId];

  if (!operation) {
    return (
      <div className="not-found-operation">
        <h1>Operation Not Found</h1>
        <Link to="/operations">
          ← Back to Operations
        </Link>
      </div>
    );
  }

  return (
    <div className="operation-details-page">

      <section className="operation-detail-hero">

        <Link
          to="/operations"
          className="back-link"
        >
          ← All DIP Operations
        </Link>

        <span className="eyebrow">
          DIGITAL IMAGE PROCESSING · {operation.category}
        </span>

        <h1>{operation.name}</h1>

        <p>
          {operation.information}
        </p>

        <Link
          to={`/operations/${operationId}/try`}
          className="primary-operation-button"
        >
          Try {operation.name} →
        </Link>
      </section>

      <section className="operation-detail-content">

        {/* INFORMATION */}
        <div className="detail-block">
          <span className="detail-number">01</span>

          <div>
            <h2>What is {operation.name}?</h2>
            <p>{operation.information}</p>
          </div>
        </div>

        {/* ALGORITHM */}
        <div className="detail-block">
          <span className="detail-number">02</span>

          <div>
            <h2>Algorithm</h2>

            <ol className="algorithm-list">
              {operation.algorithm.map(
                (step, index) => (
                  <li key={index}>
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                )
              )}
            </ol>
          </div>
        </div>

        {/* FORMULA */}
        <div className="detail-block formula-block">
          <span className="detail-number">03</span>

          <div>
            <h2>Formula</h2>

            <div className="formula-box">
              {operation.formula}
            </div>
          </div>
        </div>

        {/* CODE */}
        <div className="detail-block">
          <span className="detail-number">04</span>

          <div className="code-container">
            <h2>Implementation</h2>

            <pre>
              <code>{operation.code}</code>
            </pre>
          </div>
        </div>

        {/* ADVANTAGES */}
        <div className="detail-columns">

          <div className="detail-list-block">
            <span>05 — ADVANTAGES</span>

            <h2>Advantages</h2>

            <ul>
              {operation.advantages.map(
                (item, index) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>
          </div>

          {/* LIMITATIONS */}
          <div className="detail-list-block">
            <span>06 — LIMITATIONS</span>

            <h2>Limitations</h2>

            <ul>
              {operation.limitations.map(
                (item, index) => (
                  <li key={index}>{item}</li>
                )
              )}
            </ul>
          </div>

        </div>

        {/* APPLICATIONS */}
        <div className="applications-detail">
          <span>07 — APPLICATIONS</span>

          <h2>Applications</h2>

          <div className="application-tags">
            {operation.applications.map(
              (application) => (
                <span key={application}>
                  {application}
                </span>
              )
            )}
          </div>
        </div>

        {/* PREVIEW */}
        <div className="preview-section">

          <span>08 — VISUAL EXAMPLE</span>

          <h2>
            See the operation
            <br />
            in action.
          </h2>

          <OperationPreview
            operation={operation}
          />

        </div>

        {/* TRY */}
        <div className="try-operation-panel">

          <div>
            <span>READY TO EXPERIMENT?</span>

            <h2>
              Use your
              <br />
              own image.
            </h2>
          </div>

          <Link
            to={`/operations/${operationId}/try`}
          >
            Try Now →
          </Link>

        </div>

      </section>
    </div>
  );
}

export default OperationDetails;