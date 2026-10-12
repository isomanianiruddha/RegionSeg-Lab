import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Grayscale() {
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [fileName, setFileName] = useState("");

  /* =========================================================
     IMAGE UPLOAD
  ========================================================= */

  function handleUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        setImage(img);
        setResult(null);
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  /* =========================================================
     GRAYSCALE PROCESSING
     
     Gray = 0.299R + 0.587G + 0.114B
  ========================================================= */

  function convertToGrayscale() {
    if (!image) return;

    const canvas = canvasRef.current;

    const maxWidth = 900;
    const maxHeight = 500;

    let width = image.width;
    let height = image.height;

    const scale = Math.min(
      maxWidth / width,
      maxHeight / height,
      1
    );

    width = Math.round(width * scale);
    height = Math.round(height * scale);

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      0,
      0,
      width,
      height
    );

    const imageData = ctx.getImageData(
      0,
      0,
      width,
      height
    );

    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const gray =
        0.299 * r +
        0.587 * g +
        0.114 * b;

      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }

    ctx.putImageData(imageData, 0, 0);

    setResult(canvas.toDataURL("image/png"));
  }

  /* =========================================================
     RESET
  ========================================================= */

  function resetLab() {
    setImage(null);
    setResult(null);
    setFileName("");

    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  /* =========================================================
     DOWNLOAD
  ========================================================= */

  function downloadResult() {
    if (!result) return;

    const link = document.createElement("a");

    link.download = "grayscale-result.png";
    link.href = result;

    link.click();
  }

  return (
    <div className="dip-operation-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="operation-hero">

        <div className="operation-number">
          01
        </div>

        <div className="operation-heading">

          <span className="eyebrow">
            DIP OPERATIONS · OPERATION 01
          </span>

          <h1>
            Grayscale
          </h1>

          <p className="operation-intro">
            Convert a color image into a single-channel
            intensity representation using a weighted combination
            of red, green and blue components.
          </p>

        </div>

        <div className="operation-mode">

          <span>OPERATION</span>

          <strong>
            INTENSITY TRANSFORMATION
          </strong>

        </div>

      </section>


      {/* =====================================================
          INFORMATION
      ===================================================== */}

      <section className="operation-information">

        <div className="information-left">

          <span className="eyebrow">
            WHAT IS GRAYSCALE?
          </span>

          <h2>
            Represent an image
            <br />
            using intensity alone.
          </h2>

          <p>
            A grayscale image contains shades of gray ranging
            from black to white. Instead of storing separate
            red, green and blue values for every pixel, grayscale
            conversion represents each pixel using a single
            intensity value.
          </p>

          <p>
            Grayscale conversion is commonly used as a
            preprocessing step because many image processing
            and computer vision algorithms do not require
            full color information.
          </p>

          <p>
            The conversion gives greater importance to green
            because the human visual system is more sensitive
            to green wavelengths than red or blue.
          </p>

        </div>


        <div className="information-right">

          <div className="info-card">

            <span>INPUT</span>

            <h3>
              RGB Image
            </h3>

            <p>
              Three color channels: Red, Green and Blue.
            </p>

          </div>


          <div className="info-card">

            <span>PROCESS</span>

            <h3>
              Weighted Combination
            </h3>

            <p>
              Each pixel's RGB values are combined using
              perceptual weights.
            </p>

          </div>


          <div className="info-card">

            <span>OUTPUT</span>

            <h3>
              Intensity Image
            </h3>

            <p>
              One intensity value representing each pixel.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          FORMULA
      ===================================================== */}

      <section className="formula-section">

        <div className="formula-heading">

          <span className="eyebrow">
            MATHEMATICAL FOUNDATION
          </span>

          <h2>
            Grayscale Formula
          </h2>

        </div>


        <div className="formula-large-card">

          <span>
            STANDARD LUMINANCE FORMULA
          </span>

          <strong>
            Gray = 0.299R + 0.587G + 0.114B
          </strong>

          <p>
            R, G and B represent the red, green and blue
            intensity values of a pixel. The resulting value
            represents the grayscale intensity.
          </p>

        </div>

      </section>


      {/* =====================================================
          ALGORITHM
      ===================================================== */}

      <section className="algorithm-section">

        <div className="algorithm-heading">

          <span className="eyebrow">
            ALGORITHM
          </span>

          <h2>
            How grayscale
            <br />
            conversion works.
          </h2>

        </div>


        <div className="algorithm-list">

          <div className="algorithm-step">

            <span>01</span>

            <div>
              <h3>
                Read the image
              </h3>

              <p>
                Load the RGB image and access the pixel values
                of each location.
              </p>
            </div>

          </div>


          <div className="algorithm-step">

            <span>02</span>

            <div>
              <h3>
                Extract RGB values
              </h3>

              <p>
                Obtain the red, green and blue intensity values
                for every pixel.
              </p>
            </div>

          </div>


          <div className="algorithm-step">

            <span>03</span>

            <div>
              <h3>
                Apply the formula
              </h3>

              <p>
                Calculate the grayscale intensity using the
                weighted RGB equation.
              </p>
            </div>

          </div>


          <div className="algorithm-step">

            <span>04</span>

            <div>
              <h3>
                Generate the output
              </h3>

              <p>
                Replace the three color components with the
                calculated grayscale value.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ADVANTAGES / LIMITATIONS / APPLICATIONS
      ===================================================== */}

      <section className="operation-details">

        <div className="detail-card">

          <span>01 · ADVANTAGES</span>

          <h3>
            Advantages
          </h3>

          <ul>
            <li>Reduces image data from three channels to one.</li>
            <li>Requires less storage and processing.</li>
            <li>Simplifies many image processing algorithms.</li>
            <li>Useful as a preprocessing step.</li>
          </ul>

        </div>


        <div className="detail-card">

          <span>02 · LIMITATIONS</span>

          <h3>
            Limitations
          </h3>

          <ul>
            <li>Color information is lost.</li>
            <li>Different colors can produce similar gray values.</li>
            <li>Some object information may become less distinguishable.</li>
            <li>Not suitable when color is essential for analysis.</li>
          </ul>

        </div>


        <div className="detail-card">

          <span>03 · APPLICATIONS</span>

          <h3>
            Applications
          </h3>

          <ul>
            <li>Document processing.</li>
            <li>Computer vision preprocessing.</li>
            <li>Edge detection.</li>
            <li>Thresholding and segmentation.</li>
            <li>Pattern recognition.</li>
          </ul>

        </div>

      </section>


      {/* =====================================================
          INTERACTIVE LAB
      ===================================================== */}

      <section className="operation-lab">

        <div className="lab-heading">

          <div>

            <span className="eyebrow">
              INTERACTIVE LAB
            </span>

            <h2>
              Try Grayscale.
            </h2>

            <p>
              Upload your own image and convert it into
              grayscale directly in your browser.
            </p>

          </div>

          <div className="lab-operation-tag">
            GRAYSCALE
          </div>

        </div>


        {/* UPLOAD */}

        {!image && (

          <label className="operation-upload">

            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
            />

            <div className="upload-icon">
              ↑
            </div>

            <h3>
              Upload an Image
            </h3>

            <p>
              Click here to select an image
            </p>

            <small>
              PNG · JPG · JPEG · WEBP
            </small>

          </label>

        )}


        {/* IMAGE WORKSPACE */}

        {image && (

          <div className="image-comparison">

            <div className="image-panel">

              <div className="image-panel-header">

                <span>
                  ORIGINAL IMAGE
                </span>

              </div>

              <div className="image-display">

                <img
                  src={image.src}
                  alt="Original"
                />

              </div>

            </div>


            <div className="image-arrow">
              →
            </div>


            <div className="image-panel">

              <div className="image-panel-header">

                <span>
                  GRAYSCALE RESULT
                </span>

              </div>

              <div className="image-display">

                {!result && (
                  <div className="result-placeholder">
                    <span>+</span>
                    <p>
                      Click Convert to generate result
                    </p>
                  </div>
                )}

                <canvas
                  ref={canvasRef}
                  style={{
                    display: result ? "block" : "none",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                  }}
                />

              </div>

            </div>

          </div>

        )}


        {/* CONTROLS */}

        {image && (

          <div className="lab-controls">

            <div>

              <span className="file-name">
                {fileName}
              </span>

            </div>

            <div className="lab-buttons">

              <button
                className="primary-button"
                onClick={convertToGrayscale}
              >
                {result
                  ? "Convert Again →"
                  : "Convert to Grayscale →"}
              </button>

              <button
                className="secondary-button"
                onClick={resetLab}
              >
                Reset
              </button>

              <button
                className="secondary-button"
                onClick={downloadResult}
                disabled={!result}
              >
                ↓ Download
              </button>

            </div>

          </div>

        )}

      </section>


      {/* =====================================================
          CODE
      ===================================================== */}

      <section className="code-section">

        <div>

          <span className="eyebrow">
            IMPLEMENTATION
          </span>

          <h2>
            Grayscale
            <br />
            code.
          </h2>

        </div>


        <div className="code-box">

<pre>{`function grayscale(R, G, B) {
  return (
    0.299 * R +
    0.587 * G +
    0.114 * B
  );
}`}</pre>

        </div>

      </section>


      {/* =====================================================
          NEXT OPERATION
      ===================================================== */}

      <section className="operation-next">

        <div>

          <span>
            NEXT OPERATION
          </span>

          <h2>
            Blur →
          </h2>

        </div>

        <Link to="/blur">
          Explore Blur →
        </Link>

      </section>

    </div>
  );
}

export default Grayscale;