import { Link, useParams } from "react-router-dom";

const caseStudies = {
  medical: {
    number: "01",
    title: "Medical Imaging",
    subtitle: "Understanding structures inside the human body.",

    problem:
      "Medical images can contain complex anatomical structures with different intensity levels. Image processing helps enhance these images and isolate meaningful regions for analysis.",

    objective:
      "The objective is to preprocess a medical image, improve its visual quality and separate important regions from the surrounding image.",

    operations: [
      {
        name: "Grayscale",
        purpose:
          "Converts the image into a single intensity channel, simplifying further processing."
      },
      {
        name: "Blur",
        purpose:
          "Reduces unwanted noise and small intensity variations."
      },
      {
        name: "Contrast Stretching",
        purpose:
          "Improves visibility by expanding the intensity range."
      },
      {
        name: "Thresholding",
        purpose:
          "Separates regions according to their intensity values."
      },
      {
        name: "Region Segmentation",
        purpose:
          "Identifies connected regions that may represent meaningful structures."
      }
    ],

    workflow: [
      "Upload medical image",
      "Convert image to grayscale",
      "Reduce noise using filtering",
      "Enhance image contrast",
      "Apply thresholding",
      "Segment the required region",
      "Analyze the processed result"
    ],

    applications: [
      "Tumor detection",
      "Organ segmentation",
      "Tissue analysis",
      "Medical image enhancement",
      "Abnormality detection"
    ],

    advantages: [
      "Improves image visibility",
      "Reduces unnecessary image information",
      "Helps isolate important regions",
      "Supports computer-assisted analysis"
    ],

    limitations: [
      "Image quality strongly affects results",
      "Threshold values may need adjustment",
      "Complex medical images may require advanced techniques",
      "Processing results should not replace professional diagnosis"
    ]
  },

  satellite: {
    number: "02",
    title: "Satellite Imaging",
    subtitle: "Understanding land from above.",

    problem:
      "Satellite images contain information about large geographical areas. Image processing can help distinguish different land-cover regions such as vegetation, water and urban areas.",

    objective:
      "The objective is to enhance and process satellite imagery so that different geographical regions can be identified and analyzed.",

    operations: [
      {
        name: "Grayscale",
        purpose:
          "Simplifies image intensity information for further processing."
      },
      {
        name: "Color Models",
        purpose:
          "Separates useful color and intensity components."
      },
      {
        name: "Histogram",
        purpose:
          "Analyzes the distribution of image intensity values."
      },
      {
        name: "Thresholding",
        purpose:
          "Separates selected regions based on pixel values."
      },
      {
        name: "Segmentation",
        purpose:
          "Divides the image into meaningful geographical regions."
      }
    ],

    workflow: [
      "Acquire satellite image",
      "Preprocess the image",
      "Analyze color or intensity information",
      "Enhance important regions",
      "Apply segmentation",
      "Classify image regions",
      "Analyze the final result"
    ],

    applications: [
      "Land-use classification",
      "Water detection",
      "Urban mapping",
      "Vegetation analysis",
      "Environmental monitoring"
    ],

    advantages: [
      "Processes large geographical areas",
      "Makes visual interpretation easier",
      "Supports land classification",
      "Can assist environmental monitoring"
    ],

    limitations: [
      "Clouds can affect image quality",
      "Different regions can have similar pixel values",
      "High-resolution imagery can require significant processing"
    ]
  },

  agriculture: {
    number: "03",
    title: "Agriculture",
    subtitle: "Turning images into crop information.",

    problem:
      "Agricultural images can contain information about crops, soil and affected regions. Digital image processing can help identify and analyze these areas.",

    objective:
      "The objective is to process agricultural images and extract useful information about crop and vegetation regions.",

    operations: [
      {
        name: "Color Models",
        purpose:
          "Separates useful color components from the agricultural image."
      },
      {
        name: "Histogram",
        purpose:
          "Examines the distribution of image intensities."
      },
      {
        name: "Thresholding",
        purpose:
          "Separates vegetation or selected regions from the background."
      },
      {
        name: "Segmentation",
        purpose:
          "Divides the image into meaningful crop or field regions."
      }
    ],

    workflow: [
      "Capture agricultural image",
      "Preprocess the image",
      "Analyze color information",
      "Separate vegetation from background",
      "Segment important regions",
      "Analyze crop areas",
      "Generate useful observations"
    ],

    applications: [
      "Crop monitoring",
      "Vegetation analysis",
      "Field mapping",
      "Disease-region analysis",
      "Agricultural monitoring"
    ],

    advantages: [
      "Can analyze large crop areas",
      "Reduces manual image inspection",
      "Helps identify important regions",
      "Supports agricultural monitoring"
    ],

    limitations: [
      "Lighting conditions affect images",
      "Background and vegetation can have similar colors",
      "Different crops may require different processing parameters"
    ]
  },

  industrial: {
    number: "04",
    title: "Industrial Inspection",
    subtitle: "Finding defects before they become problems.",

    problem:
      "Manufactured components can contain cracks, surface defects or irregularities that may be difficult to identify manually. Image processing can help highlight these regions.",

    objective:
      "The objective is to process an industrial image and identify regions that differ from the expected appearance of the component.",

    operations: [
      {
        name: "Grayscale",
        purpose:
          "Simplifies the image into intensity information."
      },
      {
        name: "Blur",
        purpose:
          "Reduces small unwanted variations and noise."
      },
      {
        name: "Contrast Enhancement",
        purpose:
          "Makes differences between normal and abnormal regions more visible."
      },
      {
        name: "Thresholding",
        purpose:
          "Separates potential defect regions from the background."
      },
      {
        name: "Segmentation",
        purpose:
          "Isolates the detected regions for further analysis."
      }
    ],

    workflow: [
      "Capture component image",
      "Convert to grayscale",
      "Reduce noise",
      "Enhance contrast",
      "Apply thresholding",
      "Segment potential defects",
      "Analyze detected regions"
    ],

    applications: [
      "Crack detection",
      "Surface inspection",
      "Manufacturing defect detection",
      "Component analysis",
      "Quality control"
    ],

    advantages: [
      "Can automate repetitive inspection",
      "Provides consistent image-based analysis",
      "Highlights small visual differences",
      "Can support quality-control systems"
    ],

    limitations: [
      "Lighting must be controlled",
      "Surface appearance can vary",
      "Incorrect thresholds may produce false detections",
      "Complex defects may require advanced algorithms"
    ]
  }
};

function RealWorldDetail() {
  const { caseId } = useParams();

  const data = caseStudies[caseId];

  if (!data) {
    return (
      <div className="real-world-page">
        <section className="real-world-not-found">
          <h1>Case Study Not Found</h1>
          <Link to="/real-world">
            ← Back to Real World
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="real-world-detail-page">

      {/* HERO */}

      <section className="detail-hero">

        <div>

          <span className="eyebrow">
            REAL WORLD · CASE STUDY {data.number}
          </span>

          <h1>
            {data.title}
          </h1>

          <p>
            {data.subtitle}
          </p>

        </div>

        <Link
          to="/real-world"
          className="back-button"
        >
          ← All Case Studies
        </Link>

      </section>


      {/* PROBLEM */}

      <section className="detail-problem">

        <div className="detail-label">
          THE PROBLEM
        </div>

        <div>

          <h2>
            Why is image processing useful here?
          </h2>

          <p>
            {data.problem}
          </p>

        </div>

      </section>


      {/* OBJECTIVE */}

      <section className="detail-objective">

        <span className="eyebrow">
          PROJECT OBJECTIVE
        </span>

        <h2>
          {data.objective}
        </h2>

      </section>


      {/* OPERATIONS */}

      <section className="detail-section">

        <div className="detail-section-heading">

          <span className="eyebrow">
            01 — DIP OPERATIONS
          </span>

          <h2>
            Operations used
            <br />
            in this problem.
          </h2>

        </div>


        <div className="detail-operation-grid">

          {data.operations.map((operation, index) => (

            <div
              className="detail-operation-card"
              key={operation.name}
            >

              <span>
                {(index + 1)
                  .toString()
                  .padStart(2, "0")}
              </span>

              <h3>
                {operation.name}
              </h3>

              <p>
                {operation.purpose}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* WORKFLOW */}

      <section className="detail-workflow">

        <div className="detail-section-heading">

          <span className="eyebrow">
            02 — PROCESSING PIPELINE
          </span>

          <h2>
            How the solution
            <br />
            works.
          </h2>

        </div>


        <div className="detail-workflow-list">

          {data.workflow.map((step, index) => (

            <div
              className="detail-workflow-step"
              key={step}
            >

              <span>
                {(index + 1)
                  .toString()
                  .padStart(2, "0")}
              </span>

              <h3>
                {step}
              </h3>

              {index < data.workflow.length - 1 && (
                <div className="workflow-line" />
              )}

            </div>

          ))}

        </div>

      </section>


      {/* APPLICATIONS */}

      <section className="detail-section">

        <div className="detail-section-heading">

          <span className="eyebrow">
            03 — APPLICATIONS
          </span>

          <h2>
            Where it
            <br />
            is used.
          </h2>

        </div>


        <div className="detail-list-grid">

          {data.applications.map((item, index) => (

            <div
              className="detail-list-item"
              key={item}
            >

              <span>
                {(index + 1)
                  .toString()
                  .padStart(2, "0")}
              </span>

              <strong>
                {item}
              </strong>

            </div>

          ))}

        </div>

      </section>


      {/* ADVANTAGES / LIMITATIONS */}

      <section className="detail-pros">

        <div className="pros-column">

          <span className="eyebrow">
            ADVANTAGES
          </span>

          <h2>
            Strengths
          </h2>

          {data.advantages.map((item) => (
            <p key={item}>
              + {item}
            </p>
          ))}

        </div>


        <div className="pros-column">

          <span className="eyebrow">
            LIMITATIONS
          </span>

          <h2>
            Limitations
          </h2>

          {data.limitations.map((item) => (
            <p key={item}>
              − {item}
            </p>
          ))}

        </div>

      </section>


      {/* TRY IT */}

      <section className="detail-cta">

        <div>

          <span className="eyebrow">
            EXPERIMENT
          </span>

          <h2>
            Try the image
            <br />
            processing yourself.
          </h2>

          <p>
            Upload your own image and experiment with the
            processing techniques used in this case study.
          </p>

        </div>

        <Link
          to="/custom-lab"
          className="detail-cta-button"
        >
          Launch Custom Lab →
        </Link>

      </section>


      <footer>

        <div>

          <h2>
            RegionSeg<span>Lab</span>
          </h2>

          <p>
            Interactive Digital Image Processing Laboratory
          </p>

        </div>

      </footer>

    </div>
  );
}

export default RealWorldDetail;