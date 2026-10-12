import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { operationsList } from "../utils/operationList";
import "./Operations.css";

function OperationLab() {
  const { operationId } = useParams();

  const originalCanvasRef = useRef(null);
  const processedCanvasRef = useRef(null);

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");

  const [threshold, setThreshold] = useState(128);
  const [angle, setAngle] = useState(90);
  const [scale, setScale] = useState(1);

  const [processing, setProcessing] = useState(false);

  const operation = operationsList.find(
    (item) => item.id === operationId
  );


  /* =========================================================
     PROCESS IMAGE WHENEVER INPUT / PARAMETER CHANGES
  ========================================================= */

  useEffect(() => {
    if (!image) return;

    processImage();
  }, [
    image,
    threshold,
    angle,
    scale,
    operationId
  ]);


  /* =========================================================
     UPLOAD IMAGE
  ========================================================= */

  function uploadImage(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setProcessing(true);
    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();

      img.onload = () => {
        setImage(img);
        setProcessing(false);
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }


  /* =========================================================
     IMAGE SIZE
  ========================================================= */

  function getImageSize(img) {
    const maxWidth = 900;
    const maxHeight = 550;

    const ratio = Math.min(
      maxWidth / img.width,
      maxHeight / img.height,
      1
    );

    return {
      width: Math.round(img.width * ratio),
      height: Math.round(img.height * ratio)
    };
  }


  /* =========================================================
     DRAW ORIGINAL IMAGE
  ========================================================= */

  function drawOriginal(img, width, height) {
    const canvas = originalCanvasRef.current;

    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    ctx.clearRect(
      0,
      0,
      width,
      height
    );

    ctx.drawImage(
      img,
      0,
      0,
      width,
      height
    );
  }


  /* =========================================================
     PROCESS IMAGE
  ========================================================= */

  function processImage() {
    const processedCanvas =
      processedCanvasRef.current;

    if (!processedCanvas || !image) return;

    const size = getImageSize(image);

    const width = size.width;
    const height = size.height;


    /* =========================
       ORIGINAL IMAGE
    ========================= */

    drawOriginal(
      image,
      width,
      height
    );


    /* =========================
       ROTATION
    ========================= */

    if (operationId === "rotation") {
      processedCanvas.width = width;
      processedCanvas.height = height;

      const ctx =
        processedCanvas.getContext("2d");

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      const radians =
        angle * Math.PI / 180;

      ctx.save();

      ctx.translate(
        width / 2,
        height / 2
      );

      ctx.rotate(radians);

      ctx.drawImage(
        image,
        -width / 2,
        -height / 2,
        width,
        height
      );

      ctx.restore();

      return;
    }


    /* =========================
       RESIZE
    ========================= */

    if (operationId === "resize") {
      const newWidth =
        Math.max(
          1,
          Math.round(width * scale)
        );

      const newHeight =
        Math.max(
          1,
          Math.round(height * scale)
        );

      processedCanvas.width =
        newWidth;

      processedCanvas.height =
        newHeight;

      const ctx =
        processedCanvas.getContext("2d");

      ctx.clearRect(
        0,
        0,
        newWidth,
        newHeight
      );

      ctx.drawImage(
        image,
        0,
        0,
        newWidth,
        newHeight
      );

      return;
    }


    /* =========================
       NORMAL PROCESSING
    ========================= */

    processedCanvas.width = width;
    processedCanvas.height = height;

    const ctx =
      processedCanvas.getContext("2d");

    ctx.clearRect(
      0,
      0,
      width,
      height
    );

    ctx.drawImage(
      image,
      0,
      0,
      width,
      height
    );


    const imageData =
      ctx.getImageData(
        0,
        0,
        width,
        height
      );

    const pixels =
      imageData.data;


    /* =========================
       PIXEL PROCESSING
    ========================= */

    for (
      let i = 0;
      i < pixels.length;
      i += 4
    ) {
      let r = pixels[i];
      let g = pixels[i + 1];
      let b = pixels[i + 2];


      const gray =
        0.299 * r +
        0.587 * g +
        0.114 * b;


      switch (operationId) {

        /* =====================
           GRAYSCALE
        ===================== */

        case "grayscale":

          r = gray;
          g = gray;
          b = gray;

          break;


        /* =====================
           NEGATIVE
        ===================== */

        case "negative":

          r = 255 - r;
          g = 255 - g;
          b = 255 - b;

          break;


        /* =====================
           GAMMA 0.5
        ===================== */

        case "gamma05":

          r =
            255 *
            Math.pow(
              r / 255,
              0.5
            );

          g =
            255 *
            Math.pow(
              g / 255,
              0.5
            );

          b =
            255 *
            Math.pow(
              b / 255,
              0.5
            );

          break;


        /* =====================
           GAMMA 2.0
        ===================== */

        case "gamma2":
        case "gamma20":

          r =
            255 *
            Math.pow(
              r / 255,
              2
            );

          g =
            255 *
            Math.pow(
              g / 255,
              2
            );

          b =
            255 *
            Math.pow(
              b / 255,
              2
            );

          break;


        /* =====================
           LOG
        ===================== */

        case "log": {

          const c =
            255 /
            Math.log(256);

          r =
            c *
            Math.log(1 + r);

          g =
            c *
            Math.log(1 + g);

          b =
            c *
            Math.log(1 + b);

          break;
        }


        /* =====================
           INVERSE LOG
        ===================== */

        case "inverse-log":

          r =
            255 *
            (
              Math.exp(r / 255) - 1
            ) /
            (Math.E - 1);

          g =
            255 *
            (
              Math.exp(g / 255) - 1
            ) /
            (Math.E - 1);

          b =
            255 *
            (
              Math.exp(b / 255) - 1
            ) /
            (Math.E - 1);

          break;


        /* =====================
           THRESHOLDING
        ===================== */

        case "thresholding":

          r =
            g =
            b =
              gray >= threshold
                ? 255
                : 0;

          break;


        /* =====================
           GRAY LEVEL SLICING
        ===================== */

        case "gray-slicing":

          if (
            gray >= threshold - 30 &&
            gray <= threshold + 30
          ) {
            r = 255;
            g = 255;
            b = 255;
          } else {
            r = 0;
            g = 0;
            b = 0;
          }

          break;


        /* =====================
           CONTRAST STRETCH
        ===================== */

        case "contrast":

          r =
            ((r - 30) / 195) *
            255;

          g =
            ((g - 30) / 195) *
            255;

          b =
            ((b - 30) / 195) *
            255;

          break;


        /* =====================
           TRANSFORM
        ===================== */

        case "transform":

          r =
            1.15 * r + 10;

          g =
            1.15 * g + 10;

          b =
            1.15 * b + 10;

          break;


        /* =====================
           HSI
        ===================== */

        case "hsi":

          r = gray;
          g = gray;
          b = gray;

          break;


        /* =====================
           HSV
        ===================== */

        case "hsv": {

          const value =
            Math.max(
              r,
              g,
              b
            );

          r = value;
          g = value;
          b = value;

          break;
        }


        /* =====================
           YCbCr
        ===================== */

        case "ycbcr":

          r = gray;
          g = gray;
          b = gray;

          break;


        /* =====================
           CMYK
        ===================== */

        case "cmyk":

          r = 255 - r;
          g = 255 - g;
          b = 255 - b;

          break;


        /* =====================
           BLUR
        ===================== */

        case "blur":

          break;


        /* =====================
           DEFAULT
        ===================== */

        default:

          break;
      }


      pixels[i] =
        Math.max(
          0,
          Math.min(
            255,
            r
          )
        );

      pixels[i + 1] =
        Math.max(
          0,
          Math.min(
            255,
            g
          )
        );

      pixels[i + 2] =
        Math.max(
          0,
          Math.min(
            255,
            b
          )
        );
    }


    ctx.putImageData(
      imageData,
      0,
      0
    );


    /* =========================
       BLUR
    ========================= */

    if (operationId === "blur") {

      const temp =
        document.createElement(
          "canvas"
        );

      temp.width = width;
      temp.height = height;

      const tempCtx =
        temp.getContext("2d");

      tempCtx.filter =
        "blur(5px)";

      tempCtx.drawImage(
        image,
        0,
        0,
        width,
        height
      );

      ctx.clearRect(
        0,
        0,
        width,
        height
      );

      ctx.drawImage(
        temp,
        0,
        0
      );
    }
  }


  /* =========================================================
     DOWNLOAD
  ========================================================= */

  function downloadResult() {
    const canvas =
      processedCanvasRef.current;

    if (!canvas || !image) return;

    const link =
      document.createElement("a");

    link.download =
      `${operation?.name || "result"}-${fileName || "image"}.png`;

    link.href =
      canvas.toDataURL(
        "image/png"
      );

    link.click();
  }


  /* =========================================================
     RESET
  ========================================================= */

  function resetLab() {
    setImage(null);
    setFileName("");
    setThreshold(128);
    setAngle(90);
    setScale(1);

    const original =
      originalCanvasRef.current;

    const processed =
      processedCanvasRef.current;

    if (original) {
      original
        .getContext("2d")
        .clearRect(
          0,
          0,
          original.width,
          original.height
        );
    }

    if (processed) {
      processed
        .getContext("2d")
        .clearRect(
          0,
          0,
          processed.width,
          processed.height
        );
    }
  }


  /* =========================================================
     OPERATION NOT FOUND
  ========================================================= */

  if (!operation) {
    return (
      <div className="not-found-operation">
        <h1>
          Operation Not Found
        </h1>

        <Link to="/operations">
          ← Back to Operations
        </Link>
      </div>
    );
  }


  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div
      className="operation-lab-page"
      style={{
        background: "#f7f7f5",
        minHeight: "100vh",
        color: "#111"
      }}
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section
        style={{
          padding:
            "55px 7% 65px",
          borderBottom:
            "1px solid #deded9"
        }}
      >

        <Link
          to="/operations"
          style={{
            display: "inline-block",
            color: "#777",
            textDecoration: "none",
            fontSize: "12px",
            marginBottom: "35px"
          }}
        >
          ← Back to Operations
        </Link>


        <span
          style={{
            display: "block",
            fontSize: "9px",
            letterSpacing: "3px",
            color: "#888",
            marginBottom: "18px"
          }}
        >
          INTERACTIVE LAB
        </span>


        <h1
          style={{
            margin: 0,
            fontSize:
              "clamp(55px, 7vw, 95px)",
            lineHeight: ".95",
            letterSpacing: "-4px"
          }}
        >
          {operation.name}
        </h1>


        <p
          style={{
            margin:
              "25px 0 0",
            maxWidth: "650px",
            color: "#666",
            fontSize: "15px",
            lineHeight: "1.7"
          }}
        >
          Upload an image and experiment with{" "}
          {operation.name}.
        </p>

      </section>


      {/* =====================================================
          MAIN LAB
      ===================================================== */}

      <section
        style={{
          padding:
            "35px 6% 60px"
        }}
      >

        <div
          style={{
            maxWidth: "1250px",
            margin: "0 auto",

            display: "grid",

            gridTemplateColumns:
              "270px minmax(0, 1fr)",

            gap: "20px",

            alignItems: "stretch"
          }}
        >


          {/* =================================================
              LEFT CONTROL PANEL
          ================================================= */}

          <aside
            style={{
              background: "#171717",
              color: "#fff",

              borderRadius: "14px",

              padding: "22px",

              minHeight: "600px",

              boxSizing: "border-box",

              display: "flex",
              flexDirection: "column"
            }}
          >

            {/* PANEL HEADER */}

            <div
              style={{
                paddingBottom: "18px",
                borderBottom:
                  "1px solid #303030"
              }}
            >

              <span
                style={{
                  display: "block",
                  fontSize: "8px",
                  letterSpacing: "3px",
                  color: "#777",
                  marginBottom: "10px"
                }}
              >
                OPERATION
              </span>

              <strong
                style={{
                  fontSize: "21px"
                }}
              >
                {operation.name}
              </strong>

            </div>


            {/* UPLOAD */}

            <label
              style={{
                marginTop: "22px",

                minHeight: "145px",

                border:
                  "1px dashed #555",

                borderRadius: "9px",

                display: "flex",
                flexDirection: "column",

                justifyContent: "center",
                alignItems: "center",

                textAlign: "center",

                cursor: "pointer",

                padding: "18px",

                boxSizing: "border-box"
              }}
            >

              <input
                type="file"
                accept="image/*"
                onChange={uploadImage}
                style={{
                  display: "none"
                }}
              />

              <span
                style={{
                  fontSize: "28px",
                  marginBottom: "9px"
                }}
              >
                ↑
              </span>

              <strong
                style={{
                  fontSize: "14px"
                }}
              >
                Upload Image
              </strong>

              <small
                style={{
                  color: "#888",
                  marginTop: "7px",
                  fontSize: "9px"
                }}
              >
                PNG · JPG · JPEG · WEBP
              </small>

            </label>


            {/* FILE NAME */}

            {fileName && (
              <div
                style={{
                  marginTop: "12px",

                  padding: "10px",

                  background: "#242424",

                  borderRadius: "6px",

                  fontSize: "10px",

                  color: "#aaa",

                  overflow:
                    "hidden",

                  textOverflow:
                    "ellipsis",

                  whiteSpace:
                    "nowrap"
                }}
              >
                {fileName}
              </div>
            )}


            {/* CONTROLS */}

            <div
              style={{
                marginTop: "25px"
              }}
            >

              {/* THRESHOLD */}

              {(
                operationId ===
                  "thresholding" ||
                operationId ===
                  "gray-slicing"
              ) && (

                <div
                  style={{
                    marginBottom: "25px"
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      marginBottom: "10px"
                    }}
                  >

                    <span
                      style={{
                        fontSize: "9px",
                        letterSpacing: "1px",
                        color: "#999"
                      }}
                    >
                      THRESHOLD
                    </span>

                    <strong>
                      {threshold}
                    </strong>

                  </div>

                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={threshold}
                    onChange={(e) =>
                      setThreshold(
                        Number(
                          e.target.value
                        )
                      )
                    }
                    style={{
                      width: "100%",
                      accentColor: "#fff"
                    }}
                  />

                </div>
              )}


              {/* ROTATION */}

              {operationId ===
                "rotation" && (

                <div
                  style={{
                    marginBottom: "25px"
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      marginBottom: "10px"
                    }}
                  >

                    <span
                      style={{
                        fontSize: "9px",
                        letterSpacing: "1px",
                        color: "#999"
                      }}
                    >
                      ROTATION
                    </span>

                    <strong>
                      {angle}°
                    </strong>

                  </div>

                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={angle}
                    onChange={(e) =>
                      setAngle(
                        Number(
                          e.target.value
                        )
                      )
                    }
                    style={{
                      width: "100%",
                      accentColor: "#fff"
                    }}
                  />

                </div>
              )}


              {/* RESIZE */}

              {operationId ===
                "resize" && (

                <div
                  style={{
                    marginBottom: "25px"
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      marginBottom: "10px"
                    }}
                  >

                    <span
                      style={{
                        fontSize: "9px",
                        letterSpacing: "1px",
                        color: "#999"
                      }}
                    >
                      SCALE
                    </span>

                    <strong>
                      {scale.toFixed(1)}×
                    </strong>

                  </div>

                  <input
                    type="range"
                    min="0.2"
                    max="2"
                    step="0.1"
                    value={scale}
                    onChange={(e) =>
                      setScale(
                        Number(
                          e.target.value
                        )
                      )
                    }
                    style={{
                      width: "100%",
                      accentColor: "#fff"
                    }}
                  />

                </div>
              )}

            </div>


            {/* BOTTOM BUTTONS */}

            <div
              style={{
                marginTop: "auto"
              }}
            >

              <button
                onClick={
                  downloadResult
                }
                disabled={!image}
                style={{
                  width: "100%",

                  padding: "13px",

                  border: "none",

                  borderRadius: "7px",

                  background:
                    image
                      ? "#fff"
                      : "#333",

                  color:
                    image
                      ? "#111"
                      : "#777",

                  fontWeight: 700,

                  fontSize: "11px",

                  cursor:
                    image
                      ? "pointer"
                      : "not-allowed"
                }}
              >
                ↓ Download Result
              </button>


              <button
                onClick={resetLab}
                disabled={!image}
                style={{
                  width: "100%",

                  marginTop: "9px",

                  padding: "11px",

                  border:
                    "1px solid #444",

                  borderRadius: "7px",

                  background:
                    "transparent",

                  color:
                    image
                      ? "#bbb"
                      : "#555",

                  fontSize: "11px",

                  cursor:
                    image
                      ? "pointer"
                      : "not-allowed"
                }}
              >
                Reset
              </button>

            </div>

          </aside>


          {/* =================================================
              RIGHT WORKSPACE
          ================================================= */}

          <main
            style={{
              background: "#fff",

              border:
                "1px solid #d8d8d3",

              borderRadius: "14px",

              overflow: "hidden",

              minHeight: "600px",

              display: "flex",
              flexDirection: "column"
            }}
          >

            {/* WORKSPACE HEADER */}

            <div
              style={{
                minHeight: "75px",

                padding:
                  "15px 22px",

                borderBottom:
                  "1px solid #ddd",

                display: "flex",

                alignItems: "center",

                justifyContent:
                  "space-between",

                boxSizing:
                  "border-box"
              }}
            >

              <div>

                <span
                  style={{
                    display: "block",
                    fontSize: "8px",
                    letterSpacing: "2px",
                    color: "#999",
                    marginBottom: "6px"
                  }}
                >
                  CURRENT PROCESS
                </span>

                <strong
                  style={{
                    fontSize: "16px"
                  }}
                >
                  {operation.name}
                </strong>

              </div>

              {image && (
                <span
                  style={{
                    fontSize: "10px",
                    color: "#999"
                  }}
                >
                  {processing
                    ? "PROCESSING..."
                    : "READY"}
                </span>
              )}

            </div>


            {/* IMAGE AREA */}

            <div
              style={{
                flex: 1,

                background: "#e8e8e4",

                padding: "25px",

                boxSizing:
                  "border-box"
              }}
            >

              {!image && (

                <div
                  style={{
                    height: "100%",

                    minHeight: "500px",

                    display: "flex",

                    flexDirection:
                      "column",

                    justifyContent:
                      "center",

                    alignItems:
                      "center",

                    textAlign: "center"
                  }}
                >

                  <div
                    style={{
                      width: "60px",
                      height: "60px",

                      border:
                        "1px solid #aaa",

                      borderRadius: "50%",

                      display: "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "center",

                      fontSize: "30px",

                      color: "#888",

                      marginBottom:
                        "18px"
                    }}
                  >
                    +
                  </div>

                  <h2
                    style={{
                      margin: 0,
                      fontSize: "19px"
                    }}
                  >
                    No image loaded
                  </h2>

                  <p
                    style={{
                      margin:
                        "8px 0 0",

                      color: "#888",

                      fontSize: "12px"
                    }}
                  >
                    Upload an image from
                    the panel to start
                    experimenting.
                  </p>

                </div>

              )}


              {image && (

                <div
                  style={{
                    height: "100%",

                    minHeight: "500px",

                    display: "grid",

                    gridTemplateColumns:
                      "1fr 1fr",

                    gap: "18px"
                  }}
                >

                  {/* ORIGINAL */}

                  <div
                    style={{
                      background: "#fff",

                      border:
                        "1px solid #d8d8d3",

                      borderRadius: "10px",

                      overflow: "hidden",

                      display: "flex",

                      flexDirection:
                        "column"
                    }}
                  >

                    <div
                      style={{
                        padding:
                          "13px 16px",

                        borderBottom:
                          "1px solid #ddd"
                      }}
                    >

                      <span
                        style={{
                          fontSize: "8px",
                          letterSpacing: "2px",
                          color: "#999"
                        }}
                      >
                        ORIGINAL IMAGE
                      </span>

                    </div>


                    <div
                      style={{
                        flex: 1,

                        padding: "15px",

                        display: "flex",

                        alignItems:
                          "center",

                        justifyContent:
                          "center",

                        background:
                          "#f0f0ed"
                      }}
                    >

                      <canvas
                        ref={
                          originalCanvasRef
                        }
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                          display: "block"
                        }}
                      />

                    </div>

                  </div>


                  {/* PROCESSED */}

                  <div
                    style={{
                      background: "#fff",

                      border:
                        "1px solid #d8d8d3",

                      borderRadius: "10px",

                      overflow: "hidden",

                      display: "flex",

                      flexDirection:
                        "column"
                    }}
                  >

                    <div
                      style={{
                        padding:
                          "13px 16px",

                        borderBottom:
                          "1px solid #ddd"
                      }}
                    >

                      <span
                        style={{
                          fontSize: "8px",
                          letterSpacing: "2px",
                          color: "#999"
                        }}
                      >
                        PROCESSED IMAGE
                      </span>

                      <strong
                        style={{
                          display: "block",
                          marginTop: "4px",
                          fontSize: "14px"
                        }}
                      >
                        {operation.name}
                      </strong>

                    </div>


                    <div
                      style={{
                        flex: 1,

                        padding: "15px",

                        display: "flex",

                        alignItems:
                          "center",

                        justifyContent:
                          "center",

                        background:
                          "#f0f0ed"
                      }}
                    >

                      <canvas
                        ref={
                          processedCanvasRef
                        }
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                          display: "block"
                        }}
                      />

                    </div>

                  </div>

                </div>

              )}

            </div>

          </main>

        </div>

      </section>

    </div>
  );
}

export default OperationLab;