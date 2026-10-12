import { Link } from "react-router-dom";

function Learn() {
  return (
    <div className="learn-page">

      {/* ================= HEADER ================= */}

      <section className="learn-hero">

        <div className="learn-hero-content">

          <span className="eyebrow">
            DIGITAL IMAGE PROCESSING · THEORY
          </span>

          <h1>
            Understanding
            <br />
            <span>Region Segmentation.</span>
          </h1>

          <p>
            Learn the mathematical concepts and algorithmic principles
            behind Region Splitting, Homogeneity Criteria and Region
            Merging.
          </p>

        </div>

        <div className="learn-index">

          <span>CONTENTS</span>

          <a href="#segmentation">01 · Segmentation</a>
          <a href="#homogeneity">02 · Homogeneity</a>
          <a href="#splitting">03 · Region Splitting</a>
          <a href="#merging">04 · Region Merging</a>
          <a href="#algorithm">05 · Algorithm</a>

        </div>

      </section>


      {/* ================= INTRODUCTION ================= */}

      <section className="learn-section" id="segmentation">

        <div className="learn-section-title">

          <span>01</span>

          <div>
            <small>FOUNDATION</small>

            <h2>
              What is Image Segmentation?
            </h2>
          </div>

        </div>


        <div className="learn-two-column">

          <div>

            <p className="large-text">
              Image segmentation is the process of dividing an image
              into meaningful and non-overlapping regions.
            </p>

            <p>
              Each region contains pixels that share some common
              characteristic such as intensity, color, texture or
              statistical properties.
            </p>

            <p>
              The objective is to simplify an image so that important
              structures or objects can be analyzed separately.
            </p>

          </div>


          <div className="definition-box">

            <span>KEY IDEA</span>

            <h3>
              Image → Regions → Meaningful Structures
            </h3>

            <p>
              A good segmentation separates different areas while
              keeping similar pixels together.
            </p>

          </div>

        </div>

      </section>


      {/* ================= REGION BASED ================= */}

      <section className="learn-section alternate">

        <div className="learn-section-title">

          <span>02</span>

          <div>
            <small>METHOD</small>

            <h2>
              Region-Based Segmentation
            </h2>
          </div>

        </div>


        <div className="learn-two-column">

          <div>

            <p>
              Region-based segmentation is an important 
              image segmentation technique that divides 
              an image into meaningful regions by grouping 
              pixels with similar properties, such as intensity, 
              color, texture, or other predefined characteristics. 
              The main objective is to ensure that pixels within
              the same region are relatively homogeneous while pixels 
              belonging to different regions have distinguishable properties.
            </p>

            <p>
              Unlike edge-based methods that primarily focus on detecting 
              boundaries and abrupt intensity changes, region-based 
              segmentation considers the complete area occupied by objects 
              or structures. This makes it particularly useful when the 
              boundaries of an object are not clearly defined by edges alone.
            </p>

            <p>
              Two important approaches are Region Splitting and Region Merging. 
              Region Splitting starts with a large image region and recursively 
              divides it into smaller regions whenever the region fails a selected
              homogeneity criterion. Region Merging works in the opposite direction
              by combining neighboring regions that have sufficiently similar 
              characteristics. These approaches can also be combined to produce 
              a more meaningful and less fragmented segmentation.
            </p>

          </div>


          <div className="comparison-box">

            <div>
              <strong>REGION SPLITTING</strong>
              <p>
                Start with a large region and recursively divide it
                when it is not homogeneous.
              </p>
              <p>
                Region splitting follows a top-down approach. The complete image is
                initially treated as one large region.
              </p>
              <p>
                If the region does not satisfy the selected homogeneity criterion,
                it is recursively divided into smaller regions.
              </p>
            </div>

            <div>
              <strong>REGION MERGING</strong>
              <p>
                Combine neighboring regions when they satisfy a
                similarity criterion.
              </p>
              <p>
                Region merging follows a bottom-up approach in which neighboring
                regions with similar characteristics are combined.
              </p>
              <p>
                The process reduces unnecessary fragmentation and produces larger,
                more meaningful final regions.
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* ================= HOMOGENEITY ================= */}

      <section className="learn-section" id="homogeneity">

        <div className="learn-section-title">

          <span>03</span>

          <div>
            <small>CORE CONCEPT</small>

            <h2>
              Homogeneity Criteria
            </h2>
          </div>

        </div>


        <p className="section-intro">
          Before deciding whether a region should be split or merged,
          we need a mathematical method for determining whether the
          region is sufficiently uniform.
        </p>


        <div className="criteria-grid">

          {/* MEAN */}

          <div className="criteria-card">

            <div className="criteria-number">01</div>

            <h3>Mean</h3>

            <div className="math-large">
              μ = 1/N Σxᵢ
            </div>

            <p>
              Mean represents the average pixel intensity in the
              region.
            </p>

            <div className="variable-list">
              <span>μ = mean intensity</span>
              <span>N = number of pixels</span>
              <span>xᵢ = intensity of pixel i</span>
            </div>

          </div>


          {/* VARIANCE */}

          <div className="criteria-card highlighted">

            <div className="criteria-number">02</div>

            <h3>Variance</h3>

            <div className="math-large">
              σ² = 1/N Σ(xᵢ − μ)²
            </div>

            <p>
              Variance measures how widely pixel intensities differ
              from the mean.
            </p>

            <div className="variable-list">
              <span>Low variance → homogeneous</span>
              <span>High variance → non-homogeneous</span>
            </div>

          </div>


          {/* STANDARD DEVIATION */}

          <div className="criteria-card">

            <div className="criteria-number">03</div>

            <h3>Standard Deviation</h3>

            <div className="math-large">
              σ = √σ²
            </div>

            <p>
              Standard deviation is the square root of variance and
              represents the spread of intensity values.
            </p>

            <div className="variable-list">
              <span>Small σ → uniform region</span>
              <span>Large σ → varied region</span>
            </div>

          </div>


          {/* RANGE */}

          <div className="criteria-card">

            <div className="criteria-number">04</div>

            <h3>Intensity Range</h3>

            <div className="math-large">
              R = Iₘₐₓ − Iₘᵢₙ
            </div>

            <p>
              Range measures the difference between the maximum and
              minimum pixel intensity.
            </p>

            <div className="variable-list">
              <span>Small R → similar intensities</span>
              <span>Large R → greater variation</span>
            </div>

          </div>

        </div>

      </section>


      {/* ================= THRESHOLD ================= */}

      <section className="threshold-section">

        <div>

          <span className="eyebrow">
            HOMOGENEITY DECISION
          </span>

          <h2>
            Choosing a Threshold
          </h2>

          <p>
            A threshold determines whether the current region is
            considered homogeneous.
          </p>

        </div>


        <div className="threshold-equation">

          <div className="equation-line">
            σ²(R) ≤ Tₛ
          </div>

          <div className="equation-explanation">

            <div>
              <strong>YES</strong>
              <span>Region is homogeneous</span>
              <small>Keep the region</small>
            </div>

            <div>
              <strong>NO</strong>
              <span>Region is not homogeneous</span>
              <small>Split the region</small>
            </div>

          </div>

        </div>

      </section>


      {/* ================= SPLITTING ================= */}

<section className="learn-section" id="splitting">

  {/* HEADER */}
  <div className="learn-section-title">

    <span>04</span>

    <div>
      <small>OPERATION 01</small>

      <h2>
        Region Splitting
      </h2>
    </div>

  </div>


  {/* MAIN TWO COLUMN CONTENT */}
  <div className="learn-two-column splitting-layout">

    {/* ================= LEFT ================= */}

    <div className="splitting-info">

      <p className="large-text">
        Divide an image into smaller
        homogeneous regions.
      </p>

      <p>
        Region splitting is a top-down image segmentation technique
        that begins by treating the entire image as a single region.
        The region is then evaluated using a predefined homogeneity
        criterion.
      </p>

      <p>
        If the region is not sufficiently homogeneous, it is divided
        into four smaller sub-regions. Each sub-region is independently
        tested using the same criterion.
      </p>

      <p>
        This recursive process continues until the regions satisfy
        the homogeneity requirement, reach a minimum size, or reach
        the maximum allowed subdivision depth.
      </p>

    </div>


    {/* ================= RIGHT ================= */}

    <div className="quadtree splitting-process">

      <div className="quadtree-labels">
        <span>QUADTREE REPRESENTATION (TOP-DOWN PROCESS)</span>
      </div>


      {/* ORIGINAL REGION */}

      <div className="qt-level level-one">

        <span>R</span>

      </div>


      <div className="qt-arrow">
        ↓
      </div>


      {/* FOUR REGIONS */}

      <div className="qt-level level-two">

        <div>R₁</div>
        <div>R₂</div>
        <div>R₃</div>
        <div>R₄</div>

      </div>


      <div className="qt-arrow">
        ↓
      </div>


      {/* FURTHER SUBDIVISION */}

      <div className="qt-level level-three">

        <div>R₁₁</div>
        <div>R₁₂</div>
        <div>R₂₁</div>
        <div>R₂₂</div>

      </div>


      <small className="quadtree-caption">
        EACH NON-HOMOGENEOUS REGION IS RECURSIVELY
        DIVIDED INTO SMALLER REGIONS.
      </small>

    </div>

  </div>


  {/* ================= CONDITION ================= */}

  <div className="formula-banner">

    <div>

      <span>SPLIT CONDITION</span>

      <strong>
        σ²(R) &gt; Tₛ
      </strong>

    </div>


    <div>

      <span>ACTION</span>

      <strong>
        Divide R into four regions
      </strong>

    </div>

  </div>

</section>
      {/* ================= MERGING ================= */}

      <section className="learn-section alternate" id="merging">

        <div className="learn-section-title">

          <span>05</span>

          <div>
            <small>OPERATION 02</small>

            <h2>
              Region Merging
            </h2>
          </div>

        </div>


        <div className="learn-two-column">

          <div>

            <p className="large-text">
              Splitting may produce many small regions. Region merging
              combines neighboring regions that are sufficiently
              similar.
            </p>

            <p>
              Two adjacent regions can be merged if their statistical
              properties satisfy the selected merge criterion.
            </p>

          </div>


          <div className="merge-demo">

            <div className="merge-before">

              <div>R₁</div>
              <div>R₂</div>
              <div>R₃</div>
              <div>R₄</div>

            </div>

            <div className="merge-arrow">
              →
            </div>

            <div className="merge-after">

              <div>R₁ + R₂</div>
              <div>R₃ + R₄</div>

            </div>

          </div>

        </div>


        <div className="formula-banner">

          <div>
            <span>MERGE CONDITION</span>
            <strong>|μᵢ − μⱼ| ≤ Tₘ</strong>
          </div>

          <div>
            <span>ACTION</span>
            <strong>Combine neighboring regions</strong>
          </div>

        </div>

      </section>


      {/* ================= ALGORITHM ================= */}

      <section className="algorithm-section" id="algorithm">

        <div className="learn-section-title light-title">

          <span>06</span>

          <div>
            <small>IMPLEMENTATION</small>

            <h2>
              Complete Algorithm
            </h2>
          </div>

        </div>


        <div className="algorithm-flow">

          <div className="algorithm-node">
            <span>01</span>
            <strong>Input Image</strong>
          </div>

          <div className="algorithm-line"></div>

          <div className="algorithm-node">
            <span>02</span>
            <strong>Preprocess</strong>
          </div>

          <div className="algorithm-line"></div>

          <div className="algorithm-node">
            <span>03</span>
            <strong>Calculate Statistics</strong>
          </div>

          <div className="algorithm-line"></div>

          <div className="algorithm-node">
            <span>04</span>
            <strong>Homogeneity Test</strong>
          </div>

          <div className="algorithm-line"></div>

          <div className="algorithm-node">
            <span>05</span>
            <strong>Split</strong>
          </div>

          <div className="algorithm-line"></div>

          <div className="algorithm-node">
            <span>06</span>
            <strong>Merge</strong>
          </div>

          <div className="algorithm-line"></div>

          <div className="algorithm-node">
            <span>07</span>
            <strong>Output</strong>
          </div>

        </div>


        <div className="pseudocode">

          <div className="pseudo-header">

            <span>ALGORITHM</span>

            <strong>Region Split and Merge</strong>

          </div>


          <pre>
{`INPUT: Image I
       Split threshold Ts
       Merge threshold Tm

1. Convert image to grayscale
2. Start with the complete image as region R

3. Calculate statistics of R
       mean(R)
       variance(R)
       standard deviation(R)

4. IF variance(R) > Ts
       Split R into R1, R2, R3, R4
       Repeat step 3 for each subregion
   ELSE
       Keep R

5. Identify neighboring regions

6. Compare their properties
       IF |mean(Ri) - mean(Rj)| <= Tm
           Merge Ri and Rj

7. Repeat merging until no suitable
   neighboring regions remain

8. Display final segmented image

OUTPUT: Segmented Image`}
          </pre>

        </div>

      </section>


      {/* ================= ADVANTAGES ================= */}

      <section className="learn-section">

        <div className="learn-section-title">

          <span>07</span>

          <div>
            <small>ANALYSIS</small>

            <h2>
              Advantages & Limitations
            </h2>
          </div>

        </div>


        <div className="pros-cons">

          <div className="pros">

            <span>ADVANTAGES</span>

            <ul>
              <li>Uses region information rather than only edges.</li>
              <li>Can produce connected meaningful regions.</li>
              <li>Works well for images with relatively uniform areas.</li>
              <li>Easy to visualize using a quadtree structure.</li>
              <li>Thresholds can be adjusted for experimentation.</li>
            </ul>

          </div>


          <div className="cons">

            <span>LIMITATIONS</span>

            <ul>
              <li>Performance depends on threshold selection.</li>
              <li>Noise can affect statistical measurements.</li>
              <li>Recursive splitting can create many regions.</li>
              <li>Processing can become expensive for large images.</li>
              <li>Very complex textures may not be homogeneous.</li>
            </ul>

          </div>

        </div>

      </section>


      {/* ================= NEXT ================= */}

      <section className="learn-next">

        <div>

          <span>NEXT STEP</span>

          <h2>
            See the algorithm
            <br />
            actually work.
          </h2>

        </div>

        <Link to="/example">
          Open Interactive Example →
        </Link>

      </section>

    </div>
  );
}

export default Learn;