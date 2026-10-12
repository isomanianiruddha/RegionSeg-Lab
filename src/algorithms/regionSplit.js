/*
==================================================
REGION SPLITTING ALGORITHM
Digital Image Processing Project

Input:
    grayscale image data

Output:
    collection of homogeneous regions

Homogeneity criterion:

    Variance(R) <= Threshold

If the region is homogeneous:
    Keep it

If the region is not homogeneous:
    Split it into four subregions

This creates a quadtree-like segmentation.
==================================================
*/


// ------------------------------------------------
// Calculate Mean
// ------------------------------------------------

export function calculateMean(data, width, x, y, w, h) {

  let sum = 0;
  let count = 0;

  for (let j = y; j < y + h; j++) {

    for (let i = x; i < x + w; i++) {

      const index =
        (j * width + i) * 4;

      const value = data[index];

      sum += value;
      count++;

    }
  }

  return count === 0
    ? 0
    : sum / count;
}


// ------------------------------------------------
// Calculate Variance
// ------------------------------------------------

export function calculateVariance(
  data,
  width,
  x,
  y,
  w,
  h,
  mean
) {

  let sum = 0;
  let count = 0;

  for (let j = y; j < y + h; j++) {

    for (let i = x; i < x + w; i++) {

      const index =
        (j * width + i) * 4;

      const difference =
        data[index] - mean;

      sum += difference * difference;

      count++;

    }
  }

  return count === 0
    ? 0
    : sum / count;
}


// ------------------------------------------------
// Standard Deviation
// ------------------------------------------------

export function calculateStandardDeviation(
  variance
) {

  return Math.sqrt(variance);

}


// ------------------------------------------------
// Split Region
// ------------------------------------------------

function splitRegion(
  data,
  width,
  height,
  x,
  y,
  w,
  h,
  threshold,
  regions,
  maxDepth,
  depth
) {

  // Prevent infinitely small regions

  if (
    w <= 2 ||
    h <= 2 ||
    depth >= maxDepth
  ) {

    const mean =
      calculateMean(
        data,
        width,
        x,
        y,
        w,
        h
      );

    const variance =
      calculateVariance(
        data,
        width,
        x,
        y,
        w,
        h,
        mean
      );

    regions.push({
      x,
      y,
      width: w,
      height: h,
      mean,
      variance,
      standardDeviation:
        calculateStandardDeviation(
          variance
        ),
      depth
    });

    return;
  }


  // Calculate statistics

  const mean =
    calculateMean(
      data,
      width,
      x,
      y,
      w,
      h
    );

  const variance =
    calculateVariance(
      data,
      width,
      x,
      y,
      w,
      h,
      mean
    );


  // --------------------------------------------
  // HOMOGENEITY TEST
  // --------------------------------------------

  if (variance <= threshold) {

    // Region is homogeneous

    regions.push({

      x,
      y,

      width: w,
      height: h,

      mean,
      variance,

      standardDeviation:
        calculateStandardDeviation(
          variance
        ),

      depth,

      homogeneous: true

    });

    return;
  }


  // --------------------------------------------
  // REGION IS NOT HOMOGENEOUS
  // SPLIT INTO FOUR
  // --------------------------------------------

  const halfWidth =
    Math.floor(w / 2);

  const halfHeight =
    Math.floor(h / 2);


  // Avoid invalid regions

  if (
    halfWidth < 1 ||
    halfHeight < 1
  ) {

    regions.push({

      x,
      y,

      width: w,
      height: h,

      mean,
      variance,

      standardDeviation:
        calculateStandardDeviation(
          variance
        ),

      depth,

      homogeneous: false

    });

    return;
  }


  // Top-left

  splitRegion(
    data,
    width,
    height,
    x,
    y,
    halfWidth,
    halfHeight,
    threshold,
    regions,
    maxDepth,
    depth + 1
  );


  // Top-right

  splitRegion(
    data,
    width,
    height,
    x + halfWidth,
    y,
    w - halfWidth,
    halfHeight,
    threshold,
    regions,
    maxDepth,
    depth + 1
  );


  // Bottom-left

  splitRegion(
    data,
    width,
    height,
    x,
    y + halfHeight,
    halfWidth,
    h - halfHeight,
    threshold,
    regions,
    maxDepth,
    depth + 1
  );


  // Bottom-right

  splitRegion(
    data,
    width,
    height,
    x + halfWidth,
    y + halfHeight,
    w - halfWidth,
    h - halfHeight,
    threshold,
    regions,
    maxDepth,
    depth + 1
  );

}


// ------------------------------------------------
// PUBLIC FUNCTION
// ------------------------------------------------

export function regionSplit(
  imageData,
  threshold = 500,
  maxDepth = 6
) {

  const {
    data,
    width,
    height
  } = imageData;


  const regions = [];


  splitRegion(
    data,
    width,
    height,

    0,
    0,

    width,
    height,

    threshold,

    regions,

    maxDepth,

    0
  );


  return regions;
}