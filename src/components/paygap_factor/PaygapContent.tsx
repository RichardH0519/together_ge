import { useState } from "react";
import AgeGroupChart from "./AgeGroupChart";
import OccupationChart from "./OccupationChart";
import OccupationSubChart from "./OccupationSubChart";
import IndustryChart from "./IndustryChart";
import "./paygap.css";



const PaygapContent = () => {
  const [readMoreOccupation, setReadMoreOccupation] = useState<boolean>(false);
  const [readMoreInsight, setReadMoreInsight] = useState<boolean>(false);
  const [readMoreSector, setReadMoreSector] = useState<boolean>(false);
  const [readPayGap, setReadPayGap] = useState<boolean>(false);

  const toggleReadMoreOccupation = () => {
    setReadMoreOccupation(!readMoreOccupation);
  };
  const toggleReadMoreInsight = () => {
    setReadMoreInsight(!readMoreInsight);
  };
  const toggleReadMoreSector = () => {
    setReadMoreSector(!readMoreSector);
  };
  const toggleReadPayGap = () => {
    setReadPayGap(!readPayGap);
  };


  return (
    <div className="graph-content min-h-content">
      <div className="container home-content pt-4">
        <div style={{ minHeight: 300 }} className="pt-4">
          <h1>Age and the Gender Pay Gap: Why women earn less as they age</h1>
          <p>
            The gender pay gap fluctuates significantly with age, reflecting the challenges women face
            at different stages of their careers
            {readPayGap && <span id="more"> . While the gap is minimal for younger workers, it
              widens dramatically as women progress in their careers, peaking between the ages of 35 and 44.
              This peak corresponds to a time when many women juggle career growth with increased family
              responsibilities, often leading to career interruptions or reduced work hours..</span>}
            <span id="dots" onClick={toggleReadPayGap}><br />{readPayGap ? "Read less" : "Read more"}...</span>
          </p>
          <AgeGroupChart />
        </div>

        <div className="container home-content pt-4">
          <div style={{ minHeight: 300 }} className="pt-4">
            <h1>Role Matters: Pay Gap by Occupation</h1>
            <p>
              Occupations significantly impact the gender pay gap, with some roles exhibiting much larger
              disparities than others.
              {readMoreOccupation && <span id="more"> At a broader level, the gender pay gap varies significantly among different
                occupational categories. High-level roles, such as managerial positions, often exhibit notable
                disparities in pay between men and women. These differences can be attributed to factors like
                career advancement opportunities, work-life balance challenges, and historical gender biases in
                leadership roles. This disparity is further magnified when we examine specific occupations
                within these broader categories.</span>}
              <span id="dots" onClick={toggleReadMoreOccupation}><br />{readMoreOccupation ? "Read less" : "Read more"}...</span>
            </p>
            <OccupationChart />
          </div>

          <div style={{ minHeight: 300 }} className="pt-4">
            <h1>
              Granular Insight: Gender Pay Gap within Specific Occupations
            </h1>
            <p>
              In exploring the gender pay gap within specific job subcategories, we find that
              'Machine Operators' and 'Sports & Personal' exhibit the highest disparities.
              {readMoreInsight && <span id="more">With women in
                these roles facing significant wage inequalities compared to their male counterparts.
                On the other hand, 'Arts & Media' and 'Assistants & Secretaries' show the lowest pay gaps
                among the analyzed subcategories, indicating relatively more equitable pay structures in
                these areas. This variation underscores the complexity of wage disparity, revealing where
                targeted efforts are needed to address and reduce gender pay gaps across different
                professions.</span>}
              <span id="dots" onClick={toggleReadMoreInsight}><br />{readMoreInsight ? "Read less" : "Read more"}...</span>
            </p>
              <OccupationSubChart />
          </div>

          <div style={{ minHeight: 300 }} className="py-4">
            <h1>Industry Spotlight: Pay Gap by Sector</h1>
            <p>
              The gender pay gap varies widely across industries, with certain sectors showing more
              significant disparities than others.
              {readMoreSector && <span id="more">
                Mining and Financial Services are two industries
                where the pay gap is most pronounced, reflecting longstanding male dominance and the
                underrepresentation of women in these fields. On the other hand, industries like Public
                Administration & Safety and Agriculture, Forestry, & Fishing tend to have lower pay gaps,
                possibly due to more standardized pay scales or greater gender balance in these sectors.</span>}
              <span id="dots" onClick={toggleReadMoreSector}><br />{readMoreSector ? "Read less" : "Read more"}...</span>

            </p>
            <IndustryChart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaygapContent;