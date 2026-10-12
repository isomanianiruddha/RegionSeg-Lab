function areAdjacent(a, b) {

  const horizontalTouch =
    (
      a.x + a.width === b.x ||
      b.x + b.width === a.x
    ) &&
    (
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );

  const verticalTouch =
    (
      a.y + a.height === b.y ||
      b.y + b.height === a.y
    ) &&
    (
      a.x < b.x + b.width &&
      a.x + a.width > b.x
    );

  return horizontalTouch || verticalTouch;
}


function areSimilar(a, b, threshold) {

  return Math.abs(a.mean - b.mean) <= threshold;

}


function mergeRegions(a, b) {

  const left = Math.min(a.x, b.x);
  const top = Math.min(a.y, b.y);

  const right = Math.max(
    a.x + a.width,
    b.x + b.width
  );

  const bottom = Math.max(
    a.y + a.height,
    b.y + b.height
  );

  const areaA = a.width * a.height;
  const areaB = b.width * b.height;

  const totalArea = areaA + areaB;

  const weightedMean =
    (
      a.mean * areaA +
      b.mean * areaB
    ) / totalArea;

  return {

    x: left,
    y: top,

    width: right - left,
    height: bottom - top,

    mean: weightedMean,

    variance:
      (
        a.variance * areaA +
        b.variance * areaB
      ) / totalArea

  };

}


export function regionMerge(
  regions,
  threshold = 20
) {

  let result = [...regions];

  let changed = true;


  while (changed) {

    changed = false;

    outerLoop:

    for (let i = 0; i < result.length; i++) {

      for (let j = i + 1; j < result.length; j++) {

        const regionA = result[i];
        const regionB = result[j];


        if (
          areAdjacent(regionA, regionB) &&
          areSimilar(
            regionA,
            regionB,
            threshold
          )
        ) {

          const merged =
            mergeRegions(
              regionA,
              regionB
            );


          result.splice(j, 1);
          result.splice(i, 1);

          result.push(merged);

          changed = true;

          break outerLoop;
        }

      }

    }

  }


  return result;
}