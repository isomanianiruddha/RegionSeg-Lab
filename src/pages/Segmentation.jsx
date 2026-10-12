import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  performRegionSegmentation
} from "../algorithms/regionSegmentation";


function Segmentation() {

  const originalCanvas =
    useRef(null);

  const resultCanvas =
    useRef(null);


  const [image, setImage] =
    useState(null);

  const [threshold, setThreshold] =
    useState(500);

  const [mergeThreshold, setMergeThreshold] =
    useState(20);

  const [regions, setRegions] =
    useState([]);

  const [mergedRegions, setMergedRegions] =
    useState([]);

  const [statistics, setStatistics] =
    useState(null);


  // ==========================================
  // UPLOAD IMAGE
  // ==========================================

  function handleUpload(event) {

    const file =
      event.target.files[0];

    if (!file) return;


    const reader =
      new FileReader();


    reader.onload = (e) => {

      const img =
        new Image();


      img.onload = () => {

        setImage(img);

        drawOriginal(img);

      };


      img.src =
        e.target.result;

    };


    reader.readAsDataURL(file);

  }


  // ==========================================
  // DRAW ORIGINAL
  // ==========================================

  function drawOriginal(img) {

    const canvas =
      originalCanvas.current;

    const ctx =
      canvas.getContext("2d");


    const maxSize = 650;


    let width =
      img.width;

    let height =
      img.height;


    const scale =
      Math.min(
        maxSize / width,
        maxSize / height,
        1
      );


    width =
      Math.round(
        width * scale
      );

    height =
      Math.round(
        height * scale
      );


    canvas.width =
      width;

    canvas.height =
      height;


    ctx.drawImage(
      img,
      0,
      0,
      width,
      height
    );

  }


  // ==========================================
  // RUN SEGMENTATION
  // ==========================================

  function runSegmentation() {

    if (!image) return;


    const canvas =
      originalCanvas.current;

    const ctx =
      canvas.getContext("2d");


    const imageData =
      ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );


    // ----------------------------------------
    // CONVERT TO GRAYSCALE
    // ----------------------------------------

    const data =
      imageData.data;


    for (
      let i = 0;
      i < data.length;
      i += 4
    ) {

      const gray =
        0.299 * data[i] +
        0.587 * data[i + 1] +
        0.114 * data[i + 2];


      data[i] =
        gray;

      data[i + 1] =
        gray;

      data[i + 2] =
        gray;

    }


    ctx.putImageData(
      imageData,
      0,
      0
    );

      const result =
  performRegionSegmentation(
    imageData,
    threshold,
    mergeThreshold
  );


setRegions(
  result.regions
);


setMergedRegions(
  result.labels
);


setStatistics({

  mean:
    result.regions.reduce(
      (sum, region) =>
        sum + region.mean,
      0
    ) / result.regions.length,

  variance:
    result.regions.reduce(
      (sum, region) =>
        sum + region.variance,
      0
    ) / result.regions.length,

  deviation:
    Math.sqrt(
      result.regions.reduce(
        (sum, region) =>
          sum + region.variance,
        0
      ) / result.regions.length
    )

});


drawResult(
  result.segmentedImage
);

    // ----------------------------------------
    // STATISTICS
    // ----------------------------------------

    const mean =
      calculateMean(
        data,
        canvas.width,
        0,
        0,
        canvas.width,
        canvas.height
      );


    const variance =
      calculateVariance(
        data,
        canvas.width,
        0,
        0,
        canvas.width,
        canvas.height,
        mean
      );


    const deviation =
      calculateStandardDeviation(
        variance
      );


    setStatistics({
      mean,
      variance,
      deviation
    });


    // ----------------------------------------
    // REGION SPLITTING
    // ----------------------------------------

    const splitResult =
      regionSplit(
        imageData,
        threshold,
        7
      );


    setRegions(
      splitResult
    );


    // ----------------------------------------
    // REGION MERGING
    // ----------------------------------------

    const mergeResult =
      regionMerge(
        splitResult,
        mergeThreshold
      );


    setMergedRegions(
      mergeResult
    );


    // ----------------------------------------
    // DRAW RESULT
    // ----------------------------------------

    function drawResult(imageData) {

      const canvas =
        resultCanvas.current;

      const ctx =
        canvas.getContext("2d");


      canvas.width =
        imageData.width;

      canvas.height =
        imageData.height;


      ctx.putImageData(
        imageData,
        0,
        0
      );

    }

  }


  // ==========================================
  // DRAW SEGMENTATION
  // ==========================================

  function drawResult(
    result,
    width,
    height
  ) {

    const canvas =
      resultCanvas.current;


    canvas.width =
      width;

    canvas.height =
      height;


    const ctx =
      canvas.getContext("2d");


    ctx.fillStyle =
      "#eeeeea";


    ctx.fillRect(
      0,
      0,
      width,
      height
    );


    result.forEach(
      (region, index) => {

        const gray =
          Math.max(
            0,
            Math.min(
              255,
              region.mean
            )
          );


        ctx.fillStyle =
          `rgb(${gray}, ${gray}, ${gray})`;


        ctx.fillRect(
          region.x,
          region.y,
          region.width,
          region.height
        );


        ctx.strokeStyle =
          "#111";


        ctx.lineWidth =
          1;


        ctx.strokeRect(
          region.x,
          region.y,
          region.width,
          region.height
        );

      }
    );

  }


  // ==========================================
  // DOWNLOAD
  // ==========================================

  function downloadResult() {

    const canvas =
      resultCanvas.current;


    if (!canvas.width) return;


    const link =
      document.createElement("a");


    link.download =
      "segmented-image.png";


    link.href =
      canvas.toDataURL(
        "image/png"
      );


    link.click();

  }


  return (

    <div className="segmentation-page">

      {/* =====================================
          HERO
      ===================================== */}

      <section className="segmentation-hero">

        <span className="eyebrow">
          CORE ALGORITHM
        </span>

        <h1>
          Region
          <br />
          <span>Segmentation.</span>
        </h1>

        <p>
          Analyze an image using statistical
          homogeneity, recursively split non-uniform
          regions, and merge similar neighboring
          regions.
        </p>

      </section>

        {/* =====================================================
          ALGORITHM PIPELINE
      ===================================================== */}

      <section className="algorithm-pipeline">

        <div className="section-label">
          ALGORITHM PIPELINE
        </div>

        <h2>
          Region Splitting &amp; Merging
        </h2>

        <p className="pipeline-description">
          The image is first converted to grayscale. Regions are
          recursively split according to their variance and then
          adjacent homogeneous regions are merged based on their
          mean intensity.
        </p>


        <div className="pipeline-grid">

          <div className="pipeline-card">

            <span className="pipeline-number">
              01
            </span>

            <h3>
              Input Image
            </h3>

            <p>
              The user provides a digital image for
              segmentation.
            </p>

          </div>


          <div className="pipeline-card">

            <span className="pipeline-number">
              02
            </span>

            <h3>
              Grayscale
            </h3>

            <p>
              RGB information is converted into
              intensity values.
            </p>

            <div className="formula">
              I = 0.299R + 0.587G + 0.114B
            </div>

          </div>


          <div className="pipeline-card">

            <span className="pipeline-number">
              03
            </span>

            <h3>
              Region Splitting
            </h3>

            <p>
              Non-homogeneous regions are recursively
              divided into four smaller regions.
            </p>

            <div className="formula">
              Variance &gt; Tₛ → Split
            </div>

          </div>


          <div className="pipeline-card">

            <span className="pipeline-number">
              04
            </span>

            <h3>
              Homogeneity Test
            </h3>

            <p>
              Statistical variance determines whether
              a region is sufficiently homogeneous.
            </p>

            <div className="formula">
              σ² = (1/N) Σ(I − μ)²
            </div>

          </div>


          <div className="pipeline-card">

            <span className="pipeline-number">
              05
            </span>

            <h3>
              Region Merging
            </h3>

            <p>
              Adjacent regions with similar mean
              intensity are combined.
            </p>

            <div className="formula">
              |μ₁ − μ₂| ≤ Tₘ → Merge
            </div>

          </div>


          <div className="pipeline-card">

            <span className="pipeline-number">
              06
            </span>

            <h3>
              Final Segmentation
            </h3>

            <p>
              Every pixel receives a final region
              label and the segmented image is produced.
            </p>

            <div className="formula">
              Pixel → Region Label
            </div>

          </div>

        </div>

      </section>

      {/* =====================================
          UPLOAD + CONTROLS
      ===================================== */}

      <section className="segmentation-controls">

        <div className="control-card">

          <span>
            01 · INPUT IMAGE
          </span>

          <label className="seg-upload">

            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
            />

            Upload Image

          </label>

        </div>


        <div className="control-card">

          <span>
            02 · SPLIT THRESHOLD
          </span>

          <strong>
            {threshold}
          </strong>

          <input
            type="range"
            min="50"
            max="2000"
            step="10"
            value={threshold}
            onChange={(e) =>
              setThreshold(
                Number(e.target.value)
              )
            }
          />

          <small>
            Variance ≤ threshold → homogeneous
          </small>

        </div>


        <div className="control-card">

          <span>
            03 · MERGE THRESHOLD
          </span>

          <strong>
            {mergeThreshold}
          </strong>

          <input
            type="range"
            min="5"
            max="80"
            step="1"
            value={mergeThreshold}
            onChange={(e) =>
              setMergeThreshold(
                Number(e.target.value)
              )
            }
          />

          <small>
            Similar mean intensity → merge
          </small>

        </div>


        <button
          className="run-button"
          onClick={runSegmentation}
          disabled={!image}
        >
          Run Segmentation →
        </button>

      </section>

      

      {/* =====================================
          VIEW
      ===================================== */}

      <section className="segmentation-view">

        <div className="seg-image">

          <div className="view-title">
            INPUT / GRAYSCALE
          </div>

          {!image && (
            <div className="no-image">
              Upload an image to begin.
            </div>
          )}

          <canvas
            ref={originalCanvas}
          />

        </div>


        <div className="seg-image">

          <div className="view-title">
            FINAL SEGMENTATION
          </div>

          {!mergedRegions.length && (
            <div className="no-image">
              Segmentation result will appear here.
            </div>
          )}

          <canvas
            ref={resultCanvas}
          />

        </div>

      </section>


      {/* =====================================
          STATISTICS
      ===================================== */}

      <section className="segmentation-stats">

        <div>

          <span className="eyebrow">
            IMAGE STATISTICS
          </span>

          <h2>
            Statistical
            <br />
            Analysis
          </h2>

        </div>


        <div className="stats-grid">

          <div>
            <span>MEAN</span>

            <strong>
              {statistics
                ? statistics.mean.toFixed(2)
                : "—"}
            </strong>
          </div>


          <div>
            <span>VARIANCE</span>

            <strong>
              {statistics
                ? statistics.variance.toFixed(2)
                : "—"}
            </strong>
          </div>


          <div>
            <span>STD. DEVIATION</span>

            <strong>
              {statistics
                ? statistics.deviation.toFixed(2)
                : "—"}
            </strong>
          </div>


          <div>
            <span>SPLIT REGIONS</span>

            <strong>
              {regions.length || "—"}
            </strong>
          </div>


          <div>
            <span>MERGED REGIONS</span>

            <strong>
              {
                mergedRegions.length
                  ? new Set(mergedRegions).size
                  : "—"
              }
            </strong>
          </div>


        </div>

      </section>


      {/* =====================================
          FORMULA
      ===================================== */}

      <section className="segmentation-formula">

        <div>

          <span className="eyebrow">
            HOMOGENEITY CRITERION
          </span>

          <h2>
            The mathematical
            <br />
            decision.
          </h2>

        </div>


        <div className="formula-box">

          <div>
            σ²(R) ≤ T
          </div>

          <p>
            If the variance of a region is less than
            or equal to the selected threshold, the
            region is considered homogeneous.
          </p>


          <div>
            σ²(R) &gt; T
          </div>

          <p>
            If the variance exceeds the threshold,
            the region is divided into four
            subregions.
          </p>


          <div>
            |μ₁ − μ₂| ≤ Tₘ
          </div>

          <p>
            Neighboring regions with sufficiently
            similar mean intensities are merged.
          </p>

        </div>

      </section>


      {/* =====================================
          DOWNLOAD
      ===================================== */}

      <section className="segmentation-footer">

        <button
          onClick={downloadResult}
          disabled={!mergedRegions.length}
        >
          ↓ Download Segmented Image
        </button>


        <Link to="/custom-lab">
          ← Back to Custom Lab
        </Link>

      </section>

    </div>

  );

}


export default Segmentation;