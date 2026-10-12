import { Link } from "react-router-dom";

function Operations() {
  const operations = [
    {
      id: "grayscale",
      name: "Grayscale",
      description:
        "Converts a color image into a single-channel grayscale image."
    },
    {
      id: "blur",
      name: "Blur",
      description:
        "Smooths the image and reduces noise using neighboring pixel values."
    },
    {
      id: "transpose",
      name: "Transpose",
      description:
        "Interchanges the rows and columns of the image matrix."
    },
    {
      id: "transform",
      name: "Transform",
      description:
        "Applies mathematical transformations to modify image data."
    },
    {
      id: "histogram",
      name: "Color Histogram",
      description:
        "Displays the distribution of pixel intensities for color channels."
    },
    {
      id: "rotation",
      name: "Rotation",
      description:
        "Rotates an image around its center by a selected angle."
    },
    {
      id: "resize",
      name: "Resize",
      description:
        "Changes the spatial dimensions of an image while preserving its content."
    },
    {
      id: "negative",
      name: "Negative",
      description:
        "Inverts the intensity values of pixels to produce a photographic negative."
    },
    {
      id: "log",
      name: "Log Transformation",
      description:
        "Expands dark intensity values using a logarithmic transformation."
    },
    {
      id: "inverse-log",
      name: "Inverse Log",
      description:
        "Applies an inverse logarithmic transformation to modify intensity values."
    },
    {
      id: "gamma05",
      name: "Gamma 0.5",
      description:
        "Brightens the image using a power-law transformation with gamma 0.5."
    },
    {
      id: "gamma2",
      name: "Gamma 2.0",
      description:
        "Darkens the image using a power-law transformation with gamma 2.0."
    },
    {
      id: "piecewise",
      name: "Piecewise Linear",
      description:
        "Maps intensity values using multiple linear transformation regions."
    },
    {
      id: "contrast",
      name: "Contrast Stretching",
      description:
        "Expands the intensity range to improve the contrast of an image."
    },
    {
      id: "gray-slicing",
      name: "Gray Level Slicing",
      description:
        "Highlights pixels that fall within a selected range of gray levels."
    },
    {
      id: "thresholding",
      name: "Thresholding",
      description:
        "Separates image regions according to a selected intensity threshold."
    },
    {
      id: "hsi",
      name: "HSI",
      description:
        "Represents colors using Hue, Saturation and Intensity components."
    },
    {
      id: "hsv",
      name: "HSV",
      description:
        "Represents colors using Hue, Saturation and Value components."
    },
    {
      id: "ycbcr",
      name: "YCbCr",
      description:
        "Separates image luminance from chrominance components."
    },
    {
      id: "cmyk",
      name: "CMYK",
      description:
        "Represents colors using Cyan, Magenta, Yellow and Black components."
    },
    {
      id: "dct",
      name: "DCT",
      description:
        "Transforms spatial image information into frequency-domain components."
    },
    {
      id: "dft",
      name: "DFT",
      description:
        "Transforms image data from the spatial domain into the frequency domain."
    },
    {
      id: "wht",
      name: "WHT",
      description:
        "Uses Walsh-Hadamard basis functions to transform image information."
    },
    {
      id: "haar",
      name: "Haar Transformation",
      description:
        "Uses Haar wavelet functions to represent image information at different scales."
    }
  ];

  return (
    <div className="operations-page">

      {/* =====================================
          HERO
      ===================================== */}

      <section className="operations-hero">

        <div className="operations-hero-content">

          <span className="eyebrow">
            DIGITAL IMAGE PROCESSING · OPERATIONS
          </span>

          <h1>
            Explore
            <br />
            <span>DIP Operations.</span>
          </h1>

          <p>
            Explore the fundamental image processing techniques used
            throughout the Digital Image Processing course. Learn the
            concept, formula, algorithm and practical applications of
            each operation.
          </p>

        </div>

        <div className="operations-hero-count">

          <strong>24</strong>

          <span>
            IMAGE
            <br />
            OPERATIONS
          </span>

        </div>

      </section>


      {/* =====================================
          OPERATIONS
      ===================================== */}

      <section className="operations-section">

        <div className="operations-heading">

          <div>
            <span className="eyebrow">
              COMPLETE COLLECTION
            </span>

            <h2>
              Image Processing
              <br />
              Operations
            </h2>
          </div>

          <p>
            Select an operation to learn how it works or open its
            interactive laboratory to experiment with your own image.
          </p>

        </div>


        {/* =====================================
            3 × X GRID
        ===================================== */}

        <div className="operation-grid">

          {operations.map((operation, index) => (

            <div
              className="operation-card"
              key={operation.id}
            >

              <div className="operation-top">

                <span className="operation-number">
                  {(index + 1)
                    .toString()
                    .padStart(2, "0")}
                </span>

                <span className="operation-tag">
                  DIP
                </span>

              </div>


              <div className="operation-content">

                <h3>
                  {operation.name}
                </h3>

                <p>
                  {operation.description}
                </p>

              </div>


              <div className="operation-actions">

                <Link
                  to={`/operations/${operation.id}`}
                  className="details-button"
                >
                  More Details →
                </Link>

                <Link
                  to={`/operations/${operation.id}/lab`}
                  className="try-button"
                >
                  Try Now
                </Link>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================
          CTA
      ===================================== */}

      <section className="operations-cta">

        <div>

          <span className="eyebrow">
            EXPERIMENT WITH YOUR IMAGE
          </span>

          <h2>
            Ready to process
            <br />
            an image?
          </h2>

          <p>
            Upload your own image and experiment with different
            Digital Image Processing operations.
          </p>

        </div>

        <Link
          to="/custom-lab"
          className="cta-button"
        >
          Launch Custom Lab →
        </Link>

      </section>


      {/* =====================================
          FOOTER
      ===================================== */}

      <footer>

        <div>

          <h2>
            RegionSeg<span>Lab</span>
          </h2>

          <p>
            Interactive Digital Image Processing Laboratory
          </p>

        </div>

        <div className="footer-info">

          <p>End Term Project</p>
          <p>Digital Image Processing</p>
          <p>Region Splitting & Merging</p>

        </div>

      </footer>

    </div>
  );
}

export default Operations;