import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import exampleImage from "../assets/example-image.png";

function Example() {
  const canvasRef = useRef(null);

  const [step, setStep] = useState(0);
  const [threshold, setThreshold] = useState(350);

  const steps = [
    "Original Image",
    "Grayscale",
    "Region Analysis",
    "Region Splitting",
    "Region Merging",
    "Final Segmentation",
  ];

  useEffect(() => {
    drawExample(step);
  }, [step, threshold]);

  /*
  =========================================================
  DRAW EXAMPLE
  =========================================================
  */

  function drawExample(currentStep) {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const width = 600;
    const height = 400;

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    const img = new Image();

    img.onload = () => {
      /*
      =====================================================
      STEP 0 — ORIGINAL IMAGE
      =====================================================
      */

      if (currentStep === 0) {
        drawImageContain(ctx, img, width, height);
      }

      /*
      =====================================================
      STEP 1 — GRAYSCALE
      =====================================================
      */

      if (currentStep === 1) {
        drawGrayscale(ctx, img, width, height);
      }

      /*
      =====================================================
      STEP 2 — REGION ANALYSIS
      =====================================================
      */

      if (currentStep === 2) {
        drawGrayscale(ctx, img, width, height);

        ctx.strokeStyle = "#111";
        ctx.lineWidth = 4;
        ctx.strokeRect(5, 5, 590, 390);

        ctx.fillStyle = "#111";
        ctx.font = "bold 20px Arial";
        ctx.fillText("Region R", 25, 35);

        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.fillRect(20, 55, 220, 85);

        ctx.fillStyle = "#111";
        ctx.font = "bold 14px Arial";
        ctx.fillText("REGION ANALYSIS", 35, 80);

        ctx.font = "12px Arial";
        ctx.fillText("Mean / Variance / Std. Deviation", 35, 105);
        ctx.fillText("Intensity Range", 35, 125);
      }

      /*
      =====================================================
      STEP 3 — REGION SPLITTING
      =====================================================
      */

      if (currentStep === 3) {
        drawGrayscale(ctx, img, width, height);

        ctx.strokeStyle = "#111";
        ctx.lineWidth = 3;

        ctx.beginPath();

        ctx.moveTo(300, 0);
        ctx.lineTo(300, 400);

        ctx.moveTo(0, 200);
        ctx.lineTo(600, 200);

        ctx.stroke();

        ctx.fillStyle = "rgba(255,255,255,0.75)";
        ctx.fillRect(85, 75, 55, 32);
        ctx.fillRect(385, 75, 55, 32);
        ctx.fillRect(85, 275, 55, 32);
        ctx.fillRect(385, 275, 55, 32);

        ctx.fillStyle = "#111";
        ctx.font = "bold 18px Arial";

        ctx.fillText("R₁", 100, 97);
        ctx.fillText("R₂", 400, 97);
        ctx.fillText("R₃", 100, 297);
        ctx.fillText("R₄", 400, 297);
      }

      /*
      =====================================================
      STEP 4 — REGION MERGING
      =====================================================
      */

      if (currentStep === 4) {
        drawGrayscale(ctx, img, width, height);

        ctx.strokeStyle = "#111";
        ctx.lineWidth = 5;

        ctx.beginPath();

        ctx.moveTo(300, 0);
        ctx.lineTo(300, 400);

        ctx.stroke();

        ctx.fillStyle = "rgba(255,255,255,0.78)";
        ctx.fillRect(55, 170, 190, 55);
        ctx.fillRect(355, 170, 190, 55);

        ctx.fillStyle = "#111";
        ctx.font = "bold 16px Arial";

        ctx.fillText("Merged Region A", 75, 202);
        ctx.fillText("Merged Region B", 375, 202);
      }

      /*
      =====================================================
      STEP 5 — FINAL SEGMENTATION
      =====================================================
      */

      if (currentStep === 5) {
        drawFinal(ctx, img, width, height);
      }
    };

    img.src = exampleImage;
  }


  /*
  =========================================================
  IMAGE CONTAIN
  =========================================================
  */

  function drawImageContain(ctx, img, width, height) {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, width, height);

    const scale = Math.min(
      width / img.width,
      height / img.height
    );

    const newWidth = img.width * scale;
    const newHeight = img.height * scale;

    const x = (width - newWidth) / 2;
    const y = (height - newHeight) / 2;

    ctx.drawImage(
      img,
      x,
      y,
      newWidth,
      newHeight
    );
  }


  /*
  =========================================================
  GRAYSCALE IMAGE
  =========================================================
  */

  function drawGrayscale(ctx, img, width, height) {
    const offscreen = document.createElement("canvas");

    offscreen.width = width;
    offscreen.height = height;

    const offCtx = offscreen.getContext("2d");

    drawImageContain(
      offCtx,
      img,
      width,
      height
    );

    const imageData = offCtx.getImageData(
      0,
      0,
      width,
      height
    );

    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const gray =
        0.299 * data[i] +
        0.587 * data[i + 1] +
        0.114 * data[i + 2];

      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }

    offCtx.putImageData(
      imageData,
      0,
      0
    );

    ctx.drawImage(
      offscreen,
      0,
      0
    );
  }


  /*
  =========================================================
  FINAL SEGMENTATION
  =========================================================
  */

  function drawFinal(ctx, img, width, height) {
    drawGrayscale(
      ctx,
      img,
      width,
      height
    );

    /*
    Overlay the final segmented regions.
    */

    ctx.fillStyle = "rgba(20,20,20,0.35)";
    ctx.fillRect(
      0,
      0,
      width / 2,
      height
    );

    ctx.fillStyle = "rgba(220,220,220,0.25)";
    ctx.fillRect(
      width / 2,
      0,
      width / 2,
      height
    );

    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 4;

    ctx.beginPath();

    ctx.moveTo(
      width / 2,
      0
    );

    ctx.lineTo(
      width / 2,
      height
    );

    ctx.stroke();

    ctx.fillStyle = "#fff";
    ctx.font = "bold 18px Arial";

    ctx.fillText(
      "REGION A",
      80,
      40
    );

    ctx.fillText(
      "REGION B",
      390,
      40
    );
  }


  /*
  =========================================================
  STATISTICS
  =========================================================
  */

  function getStatistics() {
    const statistics = [
      {
        mean: "128.4",
        variance: "842.7",
        deviation: "29.03",
        range: "116",
        status: "INPUT",
      },

      {
        mean: "126.8",
        variance: "781.2",
        deviation: "27.95",
        range: "110",
        status: "GRAYSCALE",
      },

      {
        mean: "126.8",
        variance: "781.2",
        deviation: "27.95",
        range: "110",
        status:
          781.2 <= threshold
            ? "HOMOGENEOUS"
            : "NOT HOMOGENEOUS",
      },

      {
        mean: "126.8",
        variance: "781.2",
        deviation: "27.95",
        range: "110",
        status: "SPLITTING",
      },

      {
        mean: "127.2",
        variance: "210.4",
        deviation: "14.51",
        range: "54",
        status: "MERGING",
      },

      {
        mean: "127.2",
        variance: "210.4",
        deviation: "14.51",
        range: "54",
        status: "COMPLETE",
      },
    ];

    return statistics[step];
  }

  const stats = getStatistics();


  /*
  =========================================================
  RENDER
  =========================================================
  */

  return (
    <div className="example-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="example-hero">

        <div>

          <span className="eyebrow">
            INTERACTIVE DEMONSTRATION
          </span>

          <h1>
            Watch the
            <br />
            <span>Algorithm Work.</span>
          </h1>

          <p>
            Follow the Region Splitting and Merging process
            step by step. The demonstration shows how an image
            is analyzed, divided and reconstructed into
            meaningful regions.
          </p>

        </div>

        <div className="example-counter">

          <span>STEP</span>

          <strong>
            {String(step + 1).padStart(2, "0")}
          </strong>

          <small>
            / {String(steps.length).padStart(2, "0")}
          </small>

        </div>

      </section>


      {/* =================================================
          MAIN DEMO
      ================================================= */}

      <section className="demo-section">

        <div className="demo-top">

          <div>

            <span className="eyebrow">
              LIVE SIMULATION
            </span>

            <h2>
              {steps[step]}
            </h2>

          </div>


          <div className="demo-controls">

            <button
              onClick={() =>
                setStep(
                  Math.max(0, step - 1)
                )
              }
              disabled={step === 0}
            >
              ← Previous
            </button>

            <button
              onClick={() =>
                setStep(
                  Math.min(
                    steps.length - 1,
                    step + 1
                  )
                )
              }
              disabled={
                step === steps.length - 1
              }
            >
              Next Step →
            </button>

          </div>

        </div>


        {/* =================================================
            STEP PROGRESS
        ================================================= */}

        <div className="step-progress">

          {steps.map((item, index) => (

            <button
              key={item}
              className={
                index === step
                  ? "active"
                  : index < step
                  ? "completed"
                  : ""
              }
              onClick={() =>
                setStep(index)
              }
            >

              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              <small>
                {item}
              </small>

            </button>

          ))}

        </div>


        {/* =================================================
            IMAGE + STATISTICS
        ================================================= */}

        <div className="demo-grid">

          {/* IMAGE */}

          <div className="canvas-panel">

            <div className="panel-header">

              <span>
                IMAGE VIEWPORT
              </span>

              <span>
                600 × 400
              </span>

            </div>

            <canvas
              ref={canvasRef}
              className="example-canvas"
            />

          </div>


          {/* STATISTICS */}

          <div className="statistics-panel">

            <div className="panel-header">

              <span>
                REGION ANALYSIS
              </span>

              <span>
                R
              </span>

            </div>


            <div className="stat-list">

              <div>
                <span>Mean</span>
                <strong>
                  {stats.mean}
                </strong>
              </div>

              <div>
                <span>Variance</span>
                <strong>
                  {stats.variance}
                </strong>
              </div>

              <div>
                <span>Std. Deviation</span>
                <strong>
                  {stats.deviation}
                </strong>
              </div>

              <div>
                <span>Intensity Range</span>
                <strong>
                  {stats.range}
                </strong>
              </div>

            </div>


            {/* =================================================
                THRESHOLD
            ================================================= */}

            <div className="threshold-control">

              <div className="threshold-title">

                <span>
                  Split Threshold
                </span>

                <strong>
                  {threshold}
                </strong>

              </div>

              <input
                type="range"
                min="100"
                max="1000"
                step="10"
                value={threshold}
                onChange={(e) =>
                  setThreshold(
                    Number(e.target.value)
                  )
                }
              />

              <small>
                Change the threshold to see how
                the homogeneity decision changes.
              </small>

            </div>


            {/* STATUS */}

            <div className="status-box">

              <span>
                REGION STATUS
              </span>

              <strong>
                {stats.status}
              </strong>

            </div>

          </div>

        </div>


        {/* =================================================
            STEP EXPLANATION
        ================================================= */}

        <div className="step-explanation">

          <span>
            STEP {String(step + 1).padStart(2, "0")}
          </span>


          {step === 0 && (
            <>
              <h3>
                Start with the original image.
              </h3>

              <p>
                The uploaded example image is used as the
                input for the region-based segmentation
                process. No segmentation has been performed
                at this stage.
              </p>
            </>
          )}


          {step === 1 && (
            <>
              <h3>
                Convert the image into grayscale.
              </h3>

              <p>
                The RGB image is converted into a grayscale
                image so that each pixel can be represented
                using a single intensity value.
              </p>
            </>
          )}


          {step === 2 && (
            <>
              <h3>
                Evaluate the region's homogeneity.
              </h3>

              <p>
                Mean, variance, standard deviation and
                intensity range are evaluated. The variance
                is compared with the selected splitting
                threshold.
              </p>
            </>
          )}


          {step === 3 && (
            <>
              <h3>
                The region is divided into four.
              </h3>

              <p>
                When a region does not satisfy the selected
                homogeneity condition, it is recursively
                divided into smaller subregions using a
                quadtree approach.
              </p>
            </>
          )}


          {step === 4 && (
            <>
              <h3>
                Similar neighboring regions are merged.
              </h3>

              <p>
                Regions with sufficiently similar properties
                are combined to reduce unnecessary
                fragmentation and produce meaningful regions.
              </p>
            </>
          )}


          {step === 5 && (
            <>
              <h3>
                The final segmentation is produced.
              </h3>

              <p>
                After the splitting and merging stages,
                the image is represented using meaningful
                regions that satisfy the selected
                segmentation criteria.
              </p>
            </>
          )}

        </div>

      </section>


      {/* =================================================
          MATHEMATICAL DECISION
      ================================================= */}

      <section className="example-formula">

        <div>

          <span className="eyebrow">
            MATHEMATICAL DECISION
          </span>

          <h2>
            Why does the
            <br />
            region split?
          </h2>

        </div>


        <div className="decision-card">

          <div className="decision-equation">

            σ²(R) = {stats.variance}

            <br />

            Tₛ = {threshold}

          </div>


          <div className="decision-result">

            {Number(stats.variance) > threshold ? (

              <>
                <strong>
                  σ²(R) &gt; Tₛ
                </strong>

                <span>
                  Region fails the homogeneity criterion.
                </span>

                <b>
                  → SPLIT
                </b>
              </>

            ) : (

              <>
                <strong>
                  σ²(R) ≤ Tₛ
                </strong>

                <span>
                  Region satisfies the homogeneity criterion.
                </span>

                <b>
                  → KEEP
                </b>
              </>

            )}

          </div>

        </div>

      </section>


      {/* =================================================
          NEXT
      ================================================= */}

      <section className="example-next">

        <div>

          <span>
            NEXT
          </span>

          <h2>
            Try it with
            <br />
            your own image.
          </h2>

        </div>


        <Link to="/custom-lab">
          Open Custom Lab →
        </Link>

      </section>

    </div>
  );
}

export default Example;