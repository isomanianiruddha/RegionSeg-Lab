import { Link } from "react-router-dom";

function RealWorld() {
  const cases = [
    {
      id: "medical",
      number: "01",
      title: "Medical Imaging",
      subtitle: "Understanding structures inside the human body.",
      description:
        "Digital image processing helps separate important anatomical structures from medical images so that regions can be analyzed more effectively.",
      techniques: [
        "Grayscale",
        "Contrast Stretching",
        "Thresholding",
        "Segmentation",
      ],
      examples: [
        "Tumor detection",
        "Organ segmentation",
        "Tissue analysis",
        "Medical image enhancement",
      ],
    },

    {
      id: "satellite",
      number: "02",
      title: "Satellite Imaging",
      subtitle: "Understanding land from above.",
      description:
        "Satellite images contain large amounts of information about land, water and vegetation. Image processing helps separate these regions for analysis.",
      techniques: [
        "Color Models",
        "Histogram",
        "Thresholding",
        "Segmentation",
      ],
      examples: [
        "Land classification",
        "Water detection",
        "Urban mapping",
        "Vegetation analysis",
      ],
    },

    {
      id: "agriculture",
      number: "03",
      title: "Agriculture",
      subtitle: "Turning images into crop information.",
      description:
        "Image processing can identify crop regions, vegetation patterns and affected areas, helping analyze agricultural images.",
      techniques: [
        "Color Models",
        "Histogram",
        "Thresholding",
        "Region Segmentation",
      ],
      examples: [
        "Crop monitoring",
        "Disease detection",
        "Vegetation analysis",
        "Field mapping",
      ],
    },

    {
      id: "industrial",
      number: "04",
      title: "Industrial Inspection",
      subtitle: "Finding defects before they become problems.",
      description:
        "Image processing techniques can isolate defects and irregular regions in manufactured components for automated inspection.",
      techniques: [
        "Grayscale",
        "Blur",
        "Edge/Region Analysis",
        "Thresholding",
      ],
      examples: [
        "Crack detection",
        "Surface inspection",
        "Defect detection",
        "Component analysis",
      ],
    },
  ];

  return (
    <div className="real-world-page">

      {/* =========================================
          HERO
      ========================================= */}

      <section className="real-world-hero">

        <div className="real-world-hero-content">

          <span className="eyebrow">
            DIGITAL IMAGE PROCESSING · REAL WORLD
          </span>

          <h1>
            From Classroom
            <br />
            <span>to Real Problems.</span>
          </h1>

          <p>
            Digital Image Processing is not limited to theoretical
            calculations. The same techniques can be used to analyze
            medical scans, satellite images, agricultural fields and
            industrial components.
          </p>

        </div>


        <div className="real-world-hero-stat">

          <strong>04</strong>

          <span>
            REAL-WORLD
            <br />
            CASE STUDIES
          </span>

        </div>

      </section>


      {/* =========================================
          INTRO
      ========================================= */}

      <section className="real-world-intro">

        <div>

          <span className="eyebrow">
            WHY IMAGE PROCESSING?
          </span>

          <h2>
            Images contain
            <br />
            more than pixels.
          </h2>

        </div>

        <p>
          A digital image can contain information about objects,
          structures, materials, colors and regions. DIP techniques
          transform this raw pixel information into useful visual
          information that can be measured and analyzed.
        </p>

      </section>


      {/* =========================================
          CASE STUDIES
      ========================================= */}

      <section className="real-world-cases">

        <div className="real-world-section-heading">

          <span className="eyebrow">
            01 — APPLICATION AREAS
          </span>

          <h2>
            Four fields.
            <br />
            One discipline.
          </h2>

        </div>


        <div className="real-world-grid">

          {cases.map((item) => (

            <article
              className="real-world-card"
              key={item.number}
            >

              {/* CARD HEADER */}

              <div className="real-world-card-top">

                <span>
                  {item.number}
                </span>

                <span>
                  CASE STUDY
                </span>

              </div>


              {/* TITLE */}

              <div className="real-world-card-title">

                <h3>
                  {item.title}
                </h3>

                <p className="case-subtitle">
                  {item.subtitle}
                </p>

              </div>


              {/* DESCRIPTION */}

              <p className="case-description">
                {item.description}
              </p>


              {/* TECHNIQUES */}

              <div className="case-block">

                <span className="case-label">
                  USEFUL DIP TECHNIQUES
                </span>

                <div className="technique-list">

                  {item.techniques.map((technique) => (

                    <span key={technique}>
                      {technique}
                    </span>

                  ))}

                </div>

              </div>


              {/* EXAMPLES */}

              <div className="case-block">

                <span className="case-label">
                  EXAMPLES
                </span>

                <div className="example-list">

                  {item.examples.map((example) => (

                    <div key={example}>

                      <span>+</span>

                      <span>
                        {example}
                      </span>

                    </div>

                  ))}

                </div>

              </div>


              {/* BUTTON */}

              <Link
                to={`/real-world/${item.id}`}
                className="case-button"
              >
                View Case Study →
              </Link>

            </article>

          ))}

        </div>

      </section>


      {/* =========================================
          WORKFLOW
      ========================================= */}

      <section className="real-world-workflow">

        <div className="workflow-heading">

          <span className="eyebrow">
            02 — GENERAL WORKFLOW
          </span>

          <h2>
            From image
            <br />
            to information.
          </h2>

          <p>
            Most real-world image-processing problems follow a
            similar pipeline. The exact operations depend on the
            application and the characteristics of the input image.
          </p>

        </div>


        <div className="real-world-pipeline">

          <div className="pipeline-step">

            <span>01</span>

            <h3>
              Acquire
            </h3>

            <p>
              Capture or obtain the digital image that needs
              to be analyzed.
            </p>

          </div>


          <div className="pipeline-arrow">
            →
          </div>


          <div className="pipeline-step">

            <span>02</span>

            <h3>
              Preprocess
            </h3>

            <p>
              Improve the image using grayscale, filtering,
              enhancement or other preprocessing operations.
            </p>

          </div>


          <div className="pipeline-arrow">
            →
          </div>


          <div className="pipeline-step">

            <span>03</span>

            <h3>
              Process
            </h3>

            <p>
              Apply transformations, thresholding, color models
              or other image-processing techniques.
            </p>

          </div>


          <div className="pipeline-arrow">
            →
          </div>


          <div className="pipeline-step">

            <span>04</span>

            <h3>
              Analyze
            </h3>

            <p>
              Extract useful regions, objects, measurements or
              patterns from the processed image.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================
          COMPARISON
      ========================================= */}

      <section className="real-world-comparison">

        <div className="real-world-section-heading">

          <span className="eyebrow">
            03 — DIP IN PRACTICE
          </span>

          <h2>
            Same tools.
            <br />
            Different problems.
          </h2>

        </div>


        <div className="comparison-grid">

          <div className="comparison-item">

            <span>MEDICAL</span>

            <strong>
              Find structures
            </strong>

            <p>
              Separate meaningful anatomical regions from
              surrounding image information.
            </p>

          </div>


          <div className="comparison-item">

            <span>SATELLITE</span>

            <strong>
              Classify land
            </strong>

            <p>
              Distinguish vegetation, water, urban areas and
              other geographical regions.
            </p>

          </div>


          <div className="comparison-item">

            <span>AGRICULTURE</span>

            <strong>
              Monitor crops
            </strong>

            <p>
              Analyze crop regions, vegetation and potentially
              affected areas.
            </p>

          </div>


          <div className="comparison-item">

            <span>INDUSTRIAL</span>

            <strong>
              Detect defects
            </strong>

            <p>
              Identify cracks, irregularities and defects in
              manufactured components.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================
          CTA
      ========================================= */}

      <section className="real-world-cta">

        <div>

          <span className="eyebrow">
            READY TO EXPERIMENT?
          </span>

          <h2>
            Bring your own
            <br />
            image.
          </h2>

          <p>
            Upload an image and experiment with the image
            processing operations available in RegionSeg Lab.
          </p>

        </div>


        <Link
          to="/custom-lab"
          className="case-button"
        >
          Launch Custom Lab →
        </Link>

      </section>


      {/* =========================================
          FOOTER
      ========================================= */}

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

          <p>
            End Term Project
          </p>

          <p>
            Digital Image Processing
          </p>

          <p>
            Region Splitting & Merging
          </p>

        </div>

      </footer>

    </div>
  );
}

export default RealWorld;