import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import AnimatedNumber from "react-animated-numbers";
import GenderPaygap from "../../assets/gender_pay_gap.jpeg";
import FlipCard from "../reusable/FlipCard";
import CarouselContent from "./CardShowContent";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./home.css";

const HomePageContent: React.FC = () => {
  const [animationClass, setAnimationClass] = useState<string>("fade-out");


  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.75,
      onChange: (inView) => {
        if (inView) {
          setAnimationClass("fade-in");
        }
      },
  });

  return (
    <div className="min-h-content">
      <div className="hero-section">
        <div className="overlay w-100 h-100 d-flex align-items-center">
          <div className="container">
            <div className="row">
              <p style={{ fontWeight: 700, fontSize: "5vh", color: "white" }} className="slide-in">
                Equal Pay for Equal Work <br />
              </p>
              <p style={{ fontWeight: 500, fontSize: "36px", color: "white" }} className="slide-up">
                Addressing the Gender Pay Gap in Australia's Workforce
              </p>
              <p style={{ fontWeight: 400, fontSize: "2vh", color: "white" }} className="slide-up">
                Know your worth, understand your pay, find the solution with us
              </p>
              <div className="slide-up">
                <Link to="avatar">
                  <Button>Learn to Negotiate </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="big-number">
        <div className="container home-content pt-4">
          <div style={{ minHeight: 200 }}>
            <div
              ref={ref}
              className="d-flex align-items-center justify-content-center"
            >
              <p className={animationClass} style={{ fontSize: "2rem" }}>
                In Australia, women earn less than men for full-time work.
              </p>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <span style={{ fontSize: "10vw" }}>By&nbsp;</span>
              <AnimatedNumber
                includeComma
                transitions={(index) => ({
                  type: "spring",
                  duration: index + 0.3,
                })}
                animateToNumber={13.3}
                fontStyle={{
                  fontSize: "17vw",
                }}
              />
              <span style={{ fontSize: "17vw" }}>%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container home-content pt-4">
        <div className="row align-items-center h-100 p-4">
          <div className="col-12 col-lg-6 d-flex">
            <img
              src={GenderPaygap}
              className="image-responsive"
              alt="Gender Pay Gap Percentage"
            />
          </div>
          <div className="col-12 col-lg-6 d-flex mt-2">
            <FlipCard
              question="How much money do women lose?"
              answer="Women lost a significant amount for a week"
              back_title="$304.90/week"
              nav_link="/comparator"
              nav_link_hint="Check the comparator"
              click_here={false}
            />
          </div>
        </div>

        <div className="p-4" style={{ minHeight: 300 }}>
          <h1>The Real Question: Why women earn less than men?</h1>
          <div className="row align-items-center h-100">
            <div className="col-12 col-lg-12 align-items-center">
              <FlipCard
                question="Why women earn less than men?"
                answer_list={[
                  "Age",
                  "Occupation",
                  "Industry",
                ]}
                answer="Through data-driven insights, we explore how these factors interact to create persistent wage disparities."
                back_title="3 Disparities Factors"
                nav_link="/factor"
                nav_link_hint="Check the data"
                click_here={false}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="carousel-content">
        <div className="container home-content pt-4">
          <h1>What can Negotiation Simulator helps you?</h1>
          <CarouselContent />
        </div>
      </div>
    </div>
  );
};

export default HomePageContent;
