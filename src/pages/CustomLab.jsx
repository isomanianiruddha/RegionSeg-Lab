import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function CustomLab() {
  const canvasRef = useRef(null);

  const [image, setImage] = useState(null);
  const [operation, setOperation] = useState("original");
  const [fileName, setFileName] = useState("");

  const operations = [
    {
      id: "original",
      name: "Original",
      description: "Display the uploaded image.",
    },
    {
      id: "grayscale",
      name: "Grayscale",
      description: "Convert RGB image into grayscale.",
    },
    {
      id: "negative",
      name: "Negative",
      description: "Invert the intensity values.",
    },
    {
      id: "blur",
      name: "Blur",
      description: "Apply a smoothing filter.",
    },
    {
      id: "contrast",
      name: "Contrast Stretch",
      description: "Improve the intensity distribution.",
    },
    {
      id: "transpose",
      name: "Transpose",
      description: "Transpose the image matrix.",
    },
  ];

  function handleUpload(event) {
    const file = event.target.files[0];

    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        setImage(img);
        setOperation("original");
        drawImage(img, "original");
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  function drawImage(img, selectedOperation) {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const maxWidth = 800;
    const maxHeight = 550;

    let width = img.width;
    let height = img.height;

    const scale = Math.min(
      maxWidth / width,
      maxHeight / height,
      1
    );

    width = Math.round(width * scale);
    height = Math.round(height * scale);

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(img, 0, 0, width, height);

    const imageData = ctx.getImageData(
      0,
      0,
      width,
      height
    );

    const data = imageData.data;

    if (selectedOperation === "grayscale") {
      applyGrayscale(data);
    }

    if (selectedOperation === "negative") {
      applyNegative(data);
    }

    if (selectedOperation === "contrast") {
      applyContrast(data);
    }

    if (selectedOperation === "blur") {
      applyBlur(ctx, width, height);
      return;
    }

    if (selectedOperation === "transpose") {
      applyTranspose(img);
      return;
    }

    ctx.putImageData(imageData, 0, 0);
  }

  function applyGrayscale(data) {
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
  }

  function applyNegative(data) {
    for (let i = 0; i < data.length; i += 4) {

      data[i] = 255 - data[i];
      data[i + 1] = 255 - data[i + 1];
      data[i + 2] = 255 - data[i + 2];

    }
  }

  function applyContrast(data) {

    let min = 255;
    let max = 0;

    for (let i = 0; i < data.length; i += 4) {

      const gray =
        0.299 * data[i] +
        0.587 * data[i + 1] +
        0.114 * data[i + 2];

      min = Math.min(min, gray);
      max = Math.max(max, gray);
    }

    for (let i = 0; i < data.length; i += 4) {

      data[i] =
        ((data[i] - min) * 255) /
        (max - min || 1);

      data[i + 1] =
        ((data[i + 1] - min) * 255) /
        (max - min || 1);

      data[i + 2] =
        ((data[i + 2] - min) * 255) /
        (max - min || 1);
    }
  }

  function applyBlur(ctx, width, height) {

    const imageData = ctx.getImageData(
      0,
      0,
      width,
      height
    );

    const source = imageData.data;

    const output = new Uint8ClampedArray(
      source.length
    );

    const radius = 1;

    for (let y = 0; y < height; y++) {

      for (let x = 0; x < width; x++) {

        let r = 0;
        let g = 0;
        let b = 0;
        let count = 0;

        for (
          let ky = -radius;
          ky <= radius;
          ky++
        ) {

          for (
            let kx = -radius;
            kx <= radius;
            kx++
          ) {

            const px = x + kx;
            const py = y + ky;

            if (
              px >= 0 &&
              px < width &&
              py >= 0 &&
              py < height
            ) {

              const index =
                (py * width + px) * 4;

              r += source[index];
              g += source[index + 1];
              b += source[index + 2];

              count++;
            }
          }
        }

        const index =
          (y * width + x) * 4;

        output[index] = r / count;
        output[index + 1] = g / count;
        output[index + 2] = b / count;
        output[index + 3] = 255;
      }
    }

    const result = new ImageData(
      output,
      width,
      height
    );

    ctx.putImageData(result, 0, 0);
  }

  function applyTranspose(img) {

    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");

    const maxWidth = 800;
    const maxHeight = 550;

    let width = img.height;
    let height = img.width;

    const scale = Math.min(
      maxWidth / width,
      maxHeight / height,
      1
    );

    width = Math.round(width * scale);
    height = Math.round(height * scale);

    canvas.width = width;
    canvas.height = height;

    ctx.save();

    ctx.translate(width, 0);

    ctx.rotate(Math.PI / 2);

    ctx.drawImage(
      img,
      0,
      0,
      height,
      width
    );

    ctx.restore();
  }

  function selectOperation(id) {

    if (!image) return;

    setOperation(id);

    setTimeout(() => {
      drawImage(image, id);
    }, 0);
  }

  function downloadResult() {

    const canvas = canvasRef.current;

    if (!canvas) return;

    const link =
      document.createElement("a");

    link.download =
      `${operation}-${fileName || "image"}.png`;

    link.href =
      canvas.toDataURL("image/png");

    link.click();
  }

  return (
    <div className="custom-lab">

      {/* ================= HERO ================= */}

      <section className="custom-hero">

        <div>

          <span className="eyebrow">
            DIGITAL IMAGE PROCESSING · LAB
          </span>

          <h1>
            Your Image.
            <br />
            <span>Your Experiment.</span>
          </h1>

          <p>
            Upload any image and experiment with image preprocessing
            and transformation operations directly in your browser.
          </p>

        </div>

        <div className="lab-tag">
          <span>MODE</span>
          <strong>INTERACTIVE</strong>
        </div>

      </section>


      {/* ================= UPLOAD ================= */}

      <section className="upload-section">

        <label className="upload-box">

          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
          />

          <div className="upload-icon">
            ↑
          </div>

          <strong>
            Upload an Image
          </strong>

          <span>
            PNG · JPG · JPEG · WEBP
          </span>

          {fileName && (
            <small>
              Selected: {fileName}
            </small>
          )}

        </label>

      </section>


      {/* ================= LAB ================= */}

      <section className="lab-section">

        <div className="operation-sidebar">

          <div className="sidebar-heading">

            <span>OPERATIONS</span>

            <small>
              {operations.length}
            </small>

          </div>

          {operations.map((item) => (

            <button
              key={item.id}
              className={
                operation === item.id
                  ? "operation active"
                  : "operation"
              }
              onClick={() =>
                selectOperation(item.id)
              }
              disabled={!image}
            >

              <span>
                {item.name}
              </span>

              <small>
                {item.description}
              </small>

            </button>

          ))}

          <div className="sidebar-divider" />

          <div className="advanced-operation">

            <span>SEGMENTATION</span>

            <button disabled={!image}>
              Region Splitting
            </button>

            <button disabled={!image}>
              Region Merging
            </button>

          </div>

        </div>


        {/* ================= VIEWPORT ================= */}

        <div className="lab-workspace">

          <div className="workspace-header">

            <div>

              <span>
                CURRENT OPERATION
              </span>

              <strong>
                {
                  operations.find(
                    (item) =>
                      item.id === operation
                  )?.name
                }
              </strong>

            </div>

            <button
              className="download-button"
              onClick={downloadResult}
              disabled={!image}
            >
              ↓ Download
            </button>

          </div>


          <div className="image-viewport">

            {!image && (

              <div className="empty-state">

                <div>+</div>

                <strong>
                  No image loaded
                </strong>

                <span>
                  Upload an image above to begin
                  experimenting.
                </span>

              </div>

            )}

            <canvas
              ref={canvasRef}
              className={
                image
                  ? "lab-canvas visible"
                  : "lab-canvas"
              }
            />

          </div>

        </div>

      </section>


      {/* ================= FORMULA ================= */}

      <section className="operation-info">

        <div>

          <span className="eyebrow">
            CURRENT OPERATION
          </span>

          <h2>
            {
              operations.find(
                (item) =>
                  item.id === operation
              )?.name
            }
          </h2>

        </div>


        <div className="operation-formula">

          {operation === "grayscale" && (
            <>
              <span>FORMULA</span>

              <strong>
                Gray = 0.299R + 0.587G + 0.114B
              </strong>

              <p>
                Converts the three RGB channels into a
                single intensity value.
              </p>
            </>
          )}

          {operation === "negative" && (
            <>
              <span>FORMULA</span>

              <strong>
                s = L − 1 − r
              </strong>

              <p>
                For an 8-bit image, the intensity is
                inverted using 255 − r.
              </p>
            </>
          )}

          {operation === "contrast" && (
            <>
              <span>FORMULA</span>

              <strong>
                s = ((r − rₘᵢₙ) / (rₘₐₓ − rₘᵢₙ)) × 255
              </strong>

              <p>
                Expands the existing intensity range to
                the complete 0–255 range.
              </p>
            </>
          )}

          {operation === "blur" && (
            <>
              <span>METHOD</span>

              <strong>
                3 × 3 Mean Filter
              </strong>

              <p>
                Each pixel is replaced by the average of
                its neighboring pixels.
              </p>
            </>
          )}

          {operation === "transpose" && (
            <>
              <span>MATRIX OPERATION</span>

              <strong>
                Aᵀ[i][j] = A[j][i]
              </strong>

              <p>
                Rows of the image matrix become columns
                and columns become rows.
              </p>
            </>
          )}

          {operation === "original" && (
            <>
              <span>INPUT</span>

              <strong>
                Original Image
              </strong>

              <p>
                This is the source image before any
                preprocessing operation.
              </p>
            </>
          )}

        </div>

      </section>


      {/* ================= NEXT ================= */}

      <section className="custom-next">

        <div>

          <span>
            NEXT MODULE
          </span>

          <h2>
            Region
            <br />
            Segmentation.
          </h2>

        </div>

        <Link to="/segmentation">
          Open Segmentation Lab →
        </Link>

      </section>

    </div>
  );
}

export default CustomLab;