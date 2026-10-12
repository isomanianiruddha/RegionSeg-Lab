import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* ================= HERO ================= */}

      <section className="hero" id="home">

        <div className="hero-content">

          <div className="badge">
            DIGITAL IMAGE PROCESSING · END TERM PROJECT
          </div>

          <h1>
            Region Splitting
            <br />
            <span>& Merging</span>
          </h1>

          <p className="hero-text">
            An interactive Digital Image Processing laboratory for
            understanding image segmentation through Region Splitting,
            Region Merging and Homogeneity Criteria.
          </p>

          <div className="hero-buttons">

            <Link to="/learn" className="primary-button">
              Learn the Concept →
            </Link>

            <Link to="/custom-lab" className="secondary-button">
              Upload an Image
            </Link>

          </div>

          <div className="hero-stats">

            <div>
              <strong>01</strong>
              <span>Core Algorithm</span>
            </div>

            <div>
              <strong>24+</strong>
              <span>DIP Operations</span>
            </div>

            <div>
              <strong>04</strong>
              <span>Real-World Cases</span>
            </div>

          </div>

        </div>


        <div className="hero-visual">

          <div className="image-card">

            <div className="segmentation-demo">

              <div className="demo-title">
                ORIGINAL REGION
              </div>

              <div className="big-region">
                R
              </div>

              <div className="split-arrow">
                ↓ SPLIT
              </div>

              <div className="small-regions">

                <div>R₁</div>
                <div>R₂</div>
                <div>R₃</div>
                <div>R₄</div>

              </div>

            </div>

            <div className="visual-label">
              <span>QUADTREE APPROACH</span>
              <strong>Region Splitting</strong>
            </div>

          </div>

        </div>

      </section>


      {/* ================= PROJECT INTRODUCTION ================= */}

      <section className="section">

        <div className="section-heading">

          <span>01 — PROJECT OVERVIEW</span>

          <h2>
            What is Region-Based Segmentation?
          </h2>

          <p>
            Image segmentation divides an image into meaningful regions
            so that objects, structures or areas can be analyzed
            independently.
          </p>

        </div>


        <div className="three-column">

          <div className="info-card">

            <div className="card-number">01</div>

            <h3>Region Splitting</h3>

            <p>
              The image is initially treated as one large region. If the
              region does not satisfy the selected homogeneity criterion,
              it is divided into smaller regions.
            </p>

          </div>


          <div className="info-card">

            <div className="card-number">02</div>

            <h3>Homogeneity</h3>

            <p>
              Statistical properties such as mean, variance, standard
              deviation and intensity range determine whether a region
              is sufficiently uniform.
            </p>

          </div>


          <div className="info-card">

            <div className="card-number">03</div>

            <h3>Region Merging</h3>

            <p>
              Neighboring regions with similar characteristics can be
              combined to reduce unnecessary fragmentation and produce
              meaningful final regions.
            </p>

          </div>

        </div>

      </section>


      {/* ================= COMPLETE WORKFLOW ================= */}

      <section className="dark-section">

        <div className="section-heading light">

          <span>02 — COMPLETE WORKFLOW</span>

          <h2>
            From Image to Segmentation
          </h2>

          <p>
            The complete processing pipeline used by RegionSeg Lab.
          </p>

        </div>


        <div className="large-workflow">

          <div className="workflow-step">
            <span>01</span>
            <h3>Input Image</h3>
            <p>
              Select an image from the available examples or upload
              your own image.
            </p>
          </div>

          <div className="workflow-arrow">→</div>

          <div className="workflow-step">
            <span>02</span>
            <h3>Preprocessing</h3>
            <p>
              Convert to grayscale and optionally apply filtering or
              enhancement.
            </p>
          </div>

          <div className="workflow-arrow">→</div>

          <div className="workflow-step">
            <span>03</span>
            <h3>Homogeneity Test</h3>
            <p>
              Calculate statistical properties of the current region.
            </p>
          </div>

          <div className="workflow-arrow">→</div>

          <div className="workflow-step">
            <span>04</span>
            <h3>Split</h3>
            <p>
              Non-homogeneous regions are divided into four subregions.
            </p>
          </div>

          <div className="workflow-arrow">→</div>

          <div className="workflow-step">
            <span>05</span>
            <h3>Merge</h3>
            <p>
              Similar neighboring regions are combined according to
              the merge criterion.
            </p>
          </div>

          <div className="workflow-arrow">→</div>

          <div className="workflow-step">
            <span>06</span>
            <h3>Final Result</h3>
            <p>
              The segmented image is displayed with its regions and
              statistics.
            </p>
          </div>

        </div>

      </section>


      {/* ================= MATHEMATICAL FORMULAS ================= */}

      <section className="section">

        <div className="section-heading">

          <span>03 — MATHEMATICAL FOUNDATION</span>

          <h2>
            Formulas Used in the Project
          </h2>

          <p>
            The segmentation algorithm uses statistical measures to
            evaluate the homogeneity of image regions.
          </p>

        </div>


        <div className="formula-grid">

          {/* Mean */}

          <div className="formula-card">

            <div className="formula-top">
              <span>01</span>
              <small>STATISTICS</small>
            </div>

            <h3>Mean Intensity</h3>

            <div className="formula">
              μ = (1/N) Σ xᵢ
            </div>

            <p>
              The average intensity of all pixels belonging to a
              particular region.
            </p>

            <div className="formula-use">
              Used for comparing the brightness of regions.
            </div>

          </div>


          {/* Variance */}

          <div className="formula-card featured">

            <div className="formula-top">
              <span>02</span>
              <small>HOMOGENEITY</small>
            </div>

            <h3>Variance</h3>

            <div className="formula">
              σ² = (1/N) Σ(xᵢ − μ)²
            </div>

            <p>
              Measures how much the pixel intensities vary around
              their mean value.
            </p>

            <div className="formula-use">
              Low variance → more homogeneous region.
            </div>

          </div>


          {/* Standard deviation */}

          <div className="formula-card">

            <div className="formula-top">
              <span>03</span>
              <small>SPREAD</small>
            </div>

            <h3>Standard Deviation</h3>

            <div className="formula">
              σ = √σ²
            </div>

            <p>
              Represents the spread of intensity values around the
              mean intensity.
            </p>

            <div className="formula-use">
              Smaller σ indicates greater uniformity.
            </div>

          </div>


          {/* Range */}

          <div className="formula-card">

            <div className="formula-top">
              <span>04</span>
              <small>INTENSITY</small>
            </div>

            <h3>Intensity Range</h3>

            <div className="formula">
              R = Iₘₐₓ − Iₘᵢₙ
            </div>

            <p>
              Difference between the highest and lowest pixel
              intensity within a region.
            </p>

            <div className="formula-use">
              Small range → similar pixel intensities.
            </div>

          </div>


          {/* Split criterion */}

          <div className="formula-card">

            <div className="formula-top">
              <span>05</span>
              <small>SPLITTING</small>
            </div>

            <h3>Split Criterion</h3>

            <div className="formula">
              σ²(R) ≤ Tₛ
            </div>

            <p>
              A region is accepted when its variance is below the
              selected threshold.
            </p>

            <div className="formula-use">
              If σ²(R) &gt; Tₛ → Split.
            </div>

          </div>


          {/* Merge criterion */}

          <div className="formula-card">

            <div className="formula-top">
              <span>06</span>
              <small>MERGING</small>
            </div>

            <h3>Merge Criterion</h3>

            <div className="formula">
              |μᵢ − μⱼ| ≤ Tₘ
            </div>

            <p>
              Neighboring regions can be merged when their mean
              intensities are sufficiently similar.
            </p>

            <div className="formula-use">
              Smaller difference → more likely to merge.
            </div>

          </div>

        </div>

      </section>


      {/* ================= SPLIT / MERGE VISUALIZATION ================= */}

      <section className="visual-section">

        <div className="section-heading">

          <span>04 — VISUAL CONCEPT</span>

          <h2>
            How Splitting & Merging Works
          </h2>

        </div>


        <div className="split-merge-container">

          <div className="process-panel">

            <div className="process-label">
              STEP 1
            </div>

            <h3>Initial Image</h3>

            <div className="process-grid initial-grid">
              <div></div>
            </div>

            <p>
              The entire image begins as a single region R.
            </p>

          </div>


          <div className="process-symbol">
            →
          </div>


          <div className="process-panel">

            <div className="process-label">
              STEP 2
            </div>

            <h3>Recursive Splitting</h3>

            <div className="process-grid four-grid">

              <div>R₁</div>
              <div>R₂</div>
              <div>R₃</div>
              <div>R₄</div>

            </div>

            <p>
              Regions failing the homogeneity test are divided.
            </p>

          </div>


          <div className="process-symbol">
            →
          </div>


          <div className="process-panel">

            <div className="process-label">
              STEP 3
            </div>

            <h3>Merging</h3>

            <div className="process-grid merge-grid">

              <div>R₁</div>
              <div>R₂</div>
              <div>R₃</div>
              <div>R₄</div>

            </div>

            <p>
              Similar neighboring regions are combined.
            </p>

          </div>

        </div>

      </section>


      {/* ================= EXAMPLE ================= */}

      <section className="section">

        <div className="example-preview">

          <div>

            <span>05 — INTERACTIVE EXAMPLE</span>

            <h2>
              See the Algorithm
              <br />
              Step by Step.
            </h2>

            <p>
              Instead of simply displaying the final segmented image,
              RegionSeg Lab will allow you to observe every stage of
              the algorithm.
            </p>

            <Link to="/example" className="primary-button">
              Open Interactive Example →
            </Link>

          </div>


          <div className="example-timeline">

            <div>
              <strong>01</strong>
              <span>Original</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Test</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Split</span>
            </div>

            <div>
              <strong>04</strong>
              <span>Merge</span>
            </div>

            <div>
              <strong>05</strong>
              <span>Result</span>
            </div>

          </div>

        </div>

      </section>


      {/* ================= DIP OPERATIONS ================= */}

      <section className="dark-section">

        <div className="section-heading light">

          <span>06 — DIGITAL IMAGE PROCESSING</span>

          <h2>
            Explore Other DIP Operations
          </h2>

          <p>
            Along with Region Splitting and Merging, the laboratory
            contains common image-processing operations studied during
            the Digital Image Processing course.
          </p>

        </div>


        <div className="operations-preview">

          <div>Grayscale</div>
          <div>Blur</div>
          <div>Thresholding</div>
          <div>Contrast Stretching</div>
          <div>Histogram</div>
          <div>Transpose</div>
          <div>DCT</div>
          <div>DFT</div>
          <div>WHT</div>
          <div>Haar</div>

        </div>


        <Link to="/operations" className="outline-light-button">
          Explore All Operations →
        </Link>

      </section>


      {/* ================= REAL WORLD ================= */}

      <section className="section">

        <div className="section-heading">

          <span>07 — REAL WORLD APPLICATIONS</span>

          <h2>
            From Classroom Concept
            <br />
            to Real Problems.
          </h2>

          <p>
            Image segmentation is used in many practical fields. Select
            a problem and see how image-processing techniques can help
            solve it.
          </p>

        </div>


        <div className="application-grid">

          <div className="application-card">
            <span>01</span>
            <h3>Medical Imaging</h3>
            <p>
              Segment structures such as tumors, organs or tissues
              from medical images.
            </p>
          </div>


          <div className="application-card">
            <span>02</span>
            <h3>Satellite Imaging</h3>
            <p>
              Identify land, water, vegetation and urban areas from
              satellite imagery.
            </p>
          </div>


          <div className="application-card">
            <span>03</span>
            <h3>Agriculture</h3>
            <p>
              Analyze crop regions, vegetation patterns and affected
              areas from images.
            </p>
          </div>


          <div className="application-card">
            <span>04</span>
            <h3>Industrial Inspection</h3>
            <p>
              Detect defects, cracks and irregular regions in
              manufactured components.
            </p>
          </div>

        </div>


        <Link to="/real-world" className="secondary-button">
          Explore Real-World Problems →
        </Link>

      </section>


      {/* ================= CUSTOM LAB CTA ================= */}

      <section className="custom-cta">

        <div>

          <span>08 — YOUR IMAGE</span>

          <h2>
            Ready to Experiment?
          </h2>

          <p>
            Upload your own image and experiment with preprocessing,
            segmentation and other Digital Image Processing operations.
          </p>

        </div>

        <Link to="/custom-lab" className="cta-button">
          Launch Custom Lab →
        </Link>

      </section>


      {/* ================= FOOTER ================= */}

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

    </>
  );
}

export default Home;