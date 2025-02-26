import { useState } from "react";
import { Col, Collapse, Container, Row } from "react-bootstrap"
import { FaChevronRight, FaLongArrowAltDown } from "react-icons/fa";
import { FaArrowTurnDown } from "react-icons/fa6";
import { MdSubdirectoryArrowRight } from "react-icons/md";

const OpenCardContent = () => {
    const [openResearch, setOpenResearch] = useState(false);
    const [openWorth, setOpenWorth] = useState(false);
    const [openPitch, setOpenPitch] = useState(false);
    const [openCalm, setOpenCalm] = useState(false);
    const [openReady, setOpenReady] = useState(false);

    function toggleResearch() {
        setOpenResearch(!openResearch)
    }
    function toggleWorth() {
        setOpenWorth(!openWorth)
    }
    function togglePitch() {
        setOpenPitch(!openPitch)
    }
    function toggleCalm() {
        setOpenCalm(!openCalm)
    }
    function toggleReady() {
        setOpenReady(!openReady)
    }

    const ArrowComponentRight = () => {
        return <>
            <Col lg={4} sm={12} className="d-flex justify-content-center align-items-center">
                {/* FaArrowTurnDown for larger screens */}
                <FaArrowTurnDown size={"10vw"} className="arrow-icon d-none d-lg-block mt-5" />
                {/* FaLongArrowAltDown for smaller screens */}
                <FaLongArrowAltDown size={"10vh"} className="arrow-icon d-lg-none d-block mt-3" />
            </Col>
        </>
    }

    const ArrowComponentLeft = () => {
        return <>
            <Col lg={4} sm={12} className="d-flex justify-content-center align-items-center">
                {/* FaLongArrowAltDown for smaller screens */}
                <MdSubdirectoryArrowRight size={"10vh"} className="arrow-icon d-none d-lg-block mt-5" />
            </Col>
        </>
    }
    return (
        <Container>
            <Row className="mt-3">
                <Col lg={8} sm={12} className="p-3 headline-content">
                    <div
                        className="p-3 mb-0 collapse-header"
                        onClick={toggleResearch}

                    >
                        <div className="d-flex">
                            <div>
                                <div className="d-flex align-items-center gap-3">
                                    <h2>Do Your Research</h2>
                                </div>
                                <p className="pt-0 mt-0" style={{ fontStyle: "italic" }}>
                                    Find out what your position pays.
                                </p>
                            </div>
                            <div className="d-flex align-items-center m-2">
                                <FaChevronRight
                                    className={`chevron ${openResearch ? 'rotate-90' : ''}`}
                                    size={32}
                                />
                            </div>
                        </div>
                    </div>
                    <Collapse in={openResearch} dimension="height">
                        <p className="p-3">
                            Before you consider the salary figure you want, dig a little deeper. What is the average salary in your city? How much do other companies pay for similar positions? Visit salary websites, ask people close to you, and delve into market rates. Knowledge is power - and in this case, it's also money!
                        </p>
                    </Collapse>
                </Col>
                <ArrowComponentRight />
            </Row>
            <Row>
                <ArrowComponentLeft />
                <Col className="text-end p-3 headline-content" lg={8} sm={12}>
                    <div className="d-flex justify-content-end align-items-center p-3 collapse-header" onClick={toggleWorth}>
                        <div>
                            <div className="d-flex align-items-center gap-3">
                                <h2>2. Know Your Worth</h2>
                            </div>
                            <p className="pt-0 mt-0" style={{ fontStyle: "italic" }}>
                                It's time to show off!
                            </p>
                        </div>
                        <div className="d-flex align-items-center m-2">
                            <FaChevronRight
                                className={`chevron ${openWorth ? 'rotate-90' : ''}`}
                                size={32}
                            />
                        </div>
                    </div>
                    <Collapse in={openWorth} dimension="height">
                        <p className="p-3">
                            This is where you boast about yourself! Think about all the skills, achievements, and unique qualities you have brought. What makes you stand out? List your achievements, quantify them as much as possible, and understand how these achievements align with the job you are applying for. This is not bragging - it's about understanding your value and being prepared to express it!
                        </p>
                    </Collapse>
                </Col>
                <div className="d-flex justify-content-center align-items-center pt-3">
                    <FaLongArrowAltDown size={"10vh"} className="arrow-icon d-lg-none d-block" />
                </div>
            </Row>
            <Row>
                <Col lg={8} sm={12} className="p-3 headline-content">
                    <div className="d-flex justify-content-start align-items-center p-3 collapse-header" onClick={togglePitch}>
                        <div>
                            <div className="d-flex align-items-center gap-3">
                                <h2>3. Practice Your Pitch</h2>
                            </div>
                            <p className="pt-0 mt-0" style={{ fontStyle: "italic" }}>
                                Don't improvise!
                            </p>
                        </div>
                        <div className="d-flex align-items-center m-2">
                            <FaChevronRight
                                className={`chevron ${openPitch ? 'rotate-90' : ''}`}
                                size={32}
                            />
                        </div>
                    </div>
                    <Collapse in={openPitch}>
                        <p className="p-3">
                            No one likes to feel like they are improvising, especially when it comes to money. So, practice makes perfect! Write down your key points, rehearse loudly, and constantly improve until you can confidently express them. Consider seeking feedback from friends or mentors. What is the goal? Sounds elegant and natural - like you're just saying how great you are
                        </p>
                    </Collapse>
                </Col>
                <ArrowComponentRight />
            </Row>
            <Row>
                <ArrowComponentLeft />
                <Col className="text-end p-3 headline-content">
                    <div className="d-flex justify-content-end align-items-center p-3 collapse-header" onClick={toggleCalm}>
                        <div>
                            <div className="d-flex align-items-center gap-3">
                                <h2>Stay Calm and Confident</h2>
                            </div>
                            <p className="pt-0 mt-0" style={{ fontStyle: "italic" }}>
                                Nervous? It's okay to be!
                            </p>
                        </div>
                        <div className="d-flex align-items-center m-2">
                            <FaChevronRight
                                className={`chevron ${openCalm ? 'rotate-90' : ''}`}
                                size={32}
                            />
                        </div>
                    </div>
                    <Collapse in={openCalm}>
                        <p className="p-3">
                            You have done your homework, your value, and your speech - now it's performance time! Stay calm. Speak clearly and confidently. Remember, feeling nervous is normal, but don't show it. Take a deep breath, maintain a friendly tone, and focus on your strengths. All of this is to show confidence, even if you pretend a little.
                        </p>
                    </Collapse>
                </Col>
                <div className="d-flex justify-content-center align-items-center pt-3">
                    <FaLongArrowAltDown size={"10vh"} className="arrow-icon d-lg-none d-block" />
                </div>
            </Row>
            <Row>
                <Col lg={8} sm={12} className="p-3 headline-content">
                    <div className="d-flex justify-content-start align-items-center p-3 collapse-header" onClick={toggleReady}>
                        <div>
                            <div className="d-flex align-items-center gap-3">
                                <h2>Be Ready to Compromise</h2>
                            </div>
                            <p className="pt-0 mt-0" style={{ fontStyle: "italic" }}>
                                Maintain an open mindset
                            </p>
                        </div>
                        <div className="d-flex align-items-center m-2">
                            <FaChevronRight
                                className={`chevron ${openReady ? 'rotate-90' : ''}`}
                                size={32}
                            />
                        </div>
                    </div>
                    <Collapse in={openReady}>
                        <p className="p-3">
                            Salary negotiation is not just about getting what you want - it's about finding common ground. Maintain an open attitude towards alternative solutions such as bonuses, flexible working hours, remote work options, or professional development opportunities. Sometimes, the value of the entire plan may be as much as (or even more than) a few dollars of additional income. Flexibility indicates your willingness to collaborate, and this often leads to better outcomes for both parties.
                        </p>
                    </Collapse>
                </Col>
            </Row>
        </Container>
    )
}

export default OpenCardContent;