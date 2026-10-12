/*
========================================================
PIXEL-BASED REGION SEGMENTATION

Pipeline:

Image
  ↓
Grayscale
  ↓
Region Splitting
  ↓
Leaf Regions
  ↓
Adjacency Analysis
  ↓
Region Merging
  ↓
Pixel Label Map

Each pixel is assigned to exactly one final region.
========================================================
*/


// ======================================================
// MEAN
// ======================================================

function calculateMean(
  data,
  width,
  x,
  y,
  w,
  h
) {

  let sum = 0;
  let count = 0;

  for (let j = y; j < y + h; j++) {

    for (let i = x; i < x + w; i++) {

      const index =
        (j * width + i) * 4;

      sum += data[index];
      count++;

    }

  }

  return count
    ? sum / count
    : 0;

}


// ======================================================
// VARIANCE
// ======================================================

function calculateVariance(
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

      sum +=
        difference * difference;

      count++;

    }

  }

  return count
    ? sum / count
    : 0;

}


// ======================================================
// REGION SPLITTING
// ======================================================

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

  depth = 0,
  maxDepth = 7
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


  // -----------------------------------------------
  // STOP CONDITION
  // -----------------------------------------------

  if (
    variance <= threshold ||
    w <= 4 ||
    h <= 4 ||
    depth >= maxDepth
  ) {

    regions.push({

      x,
      y,

      width: w,
      height: h,

      mean,
      variance,

      depth

    });

    return;

  }


  // -----------------------------------------------
  // SPLIT INTO FOUR
  // -----------------------------------------------

  const halfW =
    Math.floor(w / 2);

  const halfH =
    Math.floor(h / 2);


  splitRegion(
    data,
    width,
    height,

    x,
    y,

    halfW,
    halfH,

    threshold,

    regions,

    depth + 1,
    maxDepth
  );


  splitRegion(
    data,
    width,
    height,

    x + halfW,
    y,

    w - halfW,
    halfH,

    threshold,

    regions,

    depth + 1,
    maxDepth
  );


  splitRegion(
    data,
    width,
    height,

    x,
    y + halfH,

    halfW,
    h - halfH,

    threshold,

    regions,

    depth + 1,
    maxDepth
  );


  splitRegion(
    data,
    width,
    height,

    x + halfW,
    y + halfH,

    w - halfW,
    h - halfH,

    threshold,

    regions,

    depth + 1,
    maxDepth
  );

}


// ======================================================
// ADJACENCY
// ======================================================

function areAdjacent(a, b) {

  const horizontal =
    (
      a.x + a.width === b.x ||
      b.x + b.width === a.x
    ) &&
    (
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );


  const vertical =
    (
      a.y + a.height === b.y ||
      b.y + b.height === a.y
    ) &&
    (
      a.x < b.x + b.width &&
      a.x + a.width > b.x
    );


  return horizontal || vertical;

}


// ======================================================
// REGION MERGING
// ======================================================

function mergeRegions(
  regions,
  threshold
) {

  const parent =
    regions.map(
      (_, index) => index
    );


  function find(x) {

    while (
      parent[x] !== x
    ) {

      parent[x] =
        parent[parent[x]];

      x =
        parent[x];

    }

    return x;

  }


  function union(a, b) {

    const rootA =
      find(a);

    const rootB =
      find(b);


    if (
      rootA !== rootB
    ) {

      parent[rootB] =
        rootA;

    }

  }


  // -----------------------------------------------
  // COMPARE ADJACENT REGIONS
  // -----------------------------------------------

  for (
    let i = 0;
    i < regions.length;
    i++
  ) {

    for (
      let j = i + 1;
      j < regions.length;
      j++
    ) {

      if (
        areAdjacent(
          regions[i],
          regions[j]
        )
      ) {

        const difference =
          Math.abs(
            regions[i].mean -
            regions[j].mean
          );


        if (
          difference <= threshold
        ) {

          union(i, j);

        }

      }

    }

  }


  // -----------------------------------------------
  // CREATE FINAL REGION IDS
  // -----------------------------------------------

  const finalIds =
    new Map();

  let nextId = 0;


  const labels =
    new Array(
      regions.length
    );


  regions.forEach(
    (_, index) => {

      const root =
        find(index);


      if (
        !finalIds.has(root)
      ) {

        finalIds.set(
          root,
          nextId++
        );

      }


      labels[index] =
        finalIds.get(root);

    }
  );


  return {

    labels,

    regionCount: nextId

  };

}


// ======================================================
// PIXEL LABEL MAP
// ======================================================

function createLabelMap(
  regions,
  labels,
  width,
  height
) {

  const labelMap =
    new Int32Array(
      width * height
    );


  regions.forEach(
    (region, index) => {

      const label =
        labels[index];


      for (
        let y = region.y;
        y < region.y + region.height;
        y++
      ) {

        for (
          let x = region.x;
          x < region.x + region.width;
          x++
        ) {

          labelMap[
            y * width + x
          ] = label;

        }

      }

    }
  );


  return labelMap;

}


// ======================================================
// FINAL IMAGE
// ======================================================

function createSegmentedImage(
  imageData,
  labelMap,
  regions,
  labels
) {

  const {
    width,
    height
  } = imageData;


  const output =
    new ImageData(
      width,
      height
    );


  // ==================================================
  // CREATE A COLOR FOR EACH FINAL REGION
  // ==================================================

  const colors = new Map();


  const generateColor = (label) => {

    // Golden-angle based color generation
    const hue =
      (label * 137.508) % 360;

    const saturation = 70;
    const lightness = 55;


    const h = hue / 60;
    const c =
      (1 - Math.abs(
        2 * lightness / 100 - 1
      )) *
      saturation / 100;

    const x =
      c *
      (1 - Math.abs(
        (h % 2) - 1
      ));

    const m =
      lightness / 100 -
      c / 2;


    let r = 0;
    let g = 0;
    let b = 0;


    if (h < 1) {
      r = c;
      g = x;
    }
    else if (h < 2) {
      r = x;
      g = c;
    }
    else if (h < 3) {
      g = c;
      b = x;
    }
    else if (h < 4) {
      g = x;
      b = c;
    }
    else if (h < 5) {
      r = x;
      b = c;
    }
    else {
      r = c;
      b = x;
    }


    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255)
    ];

  };


  // ==================================================
  // GENERATE COLORS
  // ==================================================

  regions.forEach(
    (_, index) => {

      const label =
        labels[index];

      if (
        !colors.has(label)
      ) {

        colors.set(
          label,
          generateColor(label)
        );

      }

    }
  );


  // ==================================================
  // DRAW SEGMENTATION
  // ==================================================

  for (
    let y = 0;
    y < height;
    y++
  ) {

    for (
      let x = 0;
      x < width;
      x++
    ) {

      const pixelIndex =
        y * width + x;

      const label =
        labelMap[pixelIndex];


      const color =
        colors.get(label) ||
        [200, 200, 200];


      const outputIndex =
        pixelIndex * 4;


      output.data[
        outputIndex
      ] = color[0];


      output.data[
        outputIndex + 1
      ] = color[1];


      output.data[
        outputIndex + 2
      ] = color[2];


      output.data[
        outputIndex + 3
      ] = 255;

    }

  }


  // ==================================================
  // DRAW REGION BOUNDARIES
  // ==================================================

  for (
    let y = 0;
    y < height;
    y++
  ) {

    for (
      let x = 0;
      x < width;
      x++
    ) {

      const current =
        labelMap[
          y * width + x
        ];


      let boundary = false;


      // Left
      if (x > 0) {

        if (
          labelMap[
            y * width + (x - 1)
          ] !== current
        ) {

          boundary = true;

        }

      }


      // Right
      if (x < width - 1) {

        if (
          labelMap[
            y * width + (x + 1)
          ] !== current
        ) {

          boundary = true;

        }

      }


      // Top
      if (y > 0) {

        if (
          labelMap[
            (y - 1) * width + x
          ] !== current
        ) {

          boundary = true;

        }

      }


      // Bottom
      if (y < height - 1) {

        if (
          labelMap[
            (y + 1) * width + x
          ] !== current
        ) {

          boundary = true;

        }

      }


      // --------------------------------------------
      // BLACK BOUNDARY
      // --------------------------------------------

      if (boundary) {

        const index =
          (y * width + x) * 4;


        output.data[index] = 20;
        output.data[index + 1] = 20;
        output.data[index + 2] = 20;
        output.data[index + 3] = 255;

      }

    }

  }


  return output;

}


// ======================================================
// MAIN FUNCTION
// ======================================================

export function performRegionSegmentation(
  imageData,
  splitThreshold = 500,
  mergeThreshold = 20
) {

  const {
    data,
    width,
    height
  } = imageData;


  // -----------------------------------------------
  // STEP 1 — SPLITTING
  // -----------------------------------------------

  const regions = [];


  splitRegion(
    data,
    width,
    height,

    0,
    0,

    width,
    height,

    splitThreshold,

    regions
  );


  // -----------------------------------------------
  // STEP 2 — MERGING
  // -----------------------------------------------

  const mergeResult =
    mergeRegions(
      regions,
      mergeThreshold
    );


  // -----------------------------------------------
  // STEP 3 — LABEL MAP
  // -----------------------------------------------

  const labelMap =
    createLabelMap(
      regions,

      mergeResult.labels,

      width,
      height
    );


  // -----------------------------------------------
  // STEP 4 — FINAL IMAGE
  // -----------------------------------------------

  const segmentedImage =
    createSegmentedImage(
      imageData,

      labelMap,

      regions,

      mergeResult.labels
    );


  return {

    regions,

    labels:
      mergeResult.labels,

    labelMap,

    segmentedImage,

    splitRegionCount:
      regions.length,

    mergedRegionCount:
      mergeResult.regionCount

  };

}