import React, {useState} from "react";
import image from "../../assets/hero.svg";
import chatimage from "../../assets/chat1.JPG";
import "./home.css";
import {Steps, Tooltip, Button as AntButton} from "antd";
import {Link} from "react-router-dom";
import {isAuth} from "../../Utils/auth";
import reactIcon from "../../assets/reactjs.svg";
import reduxIcon from "../../assets/redux.svg";
import nodeIcon from "../../assets/nodejs.svg";
import expreeIcon from "../../assets/express.svg";
import mongoIcon from "../../assets/mongo.svg";
import bootstrapIcon from "../../assets/bootstrap.svg";
import antIcon from "../../assets/ant.svg";
import firebaseIcon from "../../assets/firebase.svg";
import scrumBoard from "../../assets/undraw_Scrum_board_re_wk7v.svg";
import check from "../../assets/undraw_Booked_re_vtod.svg";
import signupImg from "../../assets/signup.png";
import loginImg from "../../assets/login.png";
import dashImg from "../../assets/dashboard.png";
import boardImg from "../../assets/board.png";
import {GithubOutlined} from "@ant-design/icons";
import "animate.css";
import WOW from "wowjs";
new WOW.WOW().init();
const {Step} = Steps;
const imgArr=[signupImg,loginImg,dashImg,boardImg]
function Home() {
    const [current, setCurrent] = useState(0)
    return (
        <div className="home-container">
            <div className="hero-container ">
                <div className="hero-text wow animate__animated animate__fadeInUp   ">
                    <p>
                        <p
                            className="p-0 m-0 text-muted"
                            style={{fontSize: "0.4em"}}
                        >
                            {" "}
                            Visualize project worlflows with
                        </p>{" "}
                        Kanban Board
                    </p>
                    <p>
                        Kanban Board is most preffered way to manage project
                        workflows for Agile Teams.
                    </p>
                    <div className="w-100 action-btns d-flex mt-3">
                        {isAuth() ? null : (
                            <>
                                <Link to="/login">
                                    {" "}
                                    <AntButton
                                        size="sm"
                                        type="primary"
                                        className=" p-3 pl-5 pr-5"
                                    >
                                        Login
                                    </AntButton>
                                </Link>
                                <Link to="/register">
                                    <AntButton
                                        size="sm"
                                        type="primary"
                                        className=" p-3 ml-5 pl-5 pr-5"
                                    >
                                        Sign Up
                                    </AntButton>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                <div className="hero-image-cont wow animate__animated animate__fadeInUp">
                    <img className="hero-image" src={image} alt="" />
                </div>
            </div>
            <div className="defination mt-5 mb-5">
                <blockquote class="blockquote text-center">
                    <p class="blockquote-header" style={{fontSize: "0.9em"}}>
                        What is kanban?
                    </p>
                    <p class="mb-0" style={{fontSize: "0.8em"}}>
                        Kanban is a method for managing the creation of products
                        with an emphasis on continual delivery while not
                        overburdening the development team. Like Scrum, Kanban
                        is a process designed to help teams work together more
                        effectively.
                    </p>
                    <footer
                        class="blockquote-footer "
                        style={{fontSize: "0.7em"}}
                    >
                        Digital.ai
                    </footer>
                </blockquote>
            </div>
            <div className="steps mt-5">
                <h3>Steps</h3>
                <div className="d-flex align-items-center wow animate__animated animate__fadeInUp">
                    <Steps
                        progressDot
                        current={current}
                        onChange={c => {
                            setCurrent(c);
                            console.log(c);
                        }}
                        direction="vertical"
                    >
                        <Step
                            title="Sign Up"
                            description={
                                <p className="desc">
                                    Sign up in the application by filling up
                                    some details along with your email.
                                </p>
                            }
                        />
                        <Step
                            title="Login"
                            description={
                                <p className="desc">
                                    Login through your email and password and
                                    get introduced your profile dashboard
                                </p>
                            }
                        />
                        <Step
                            title="Dashboard"
                            description={
                                <p className="desc">
                                   Get your all Kanban Boards on dashboard
                                </p>
                            }
                        />
                        <Step
                            title="Good to go"
                            description={
                                <p className="desc">
                                    Boom you can now use this application to manage the workflows 🍻
                                </p>
                            }
                        />
                    </Steps>
                    <div>
                        <img
                            className="chat-screen wow  animate__animated animate__fadeInUp"
                            src={imgArr[current]}
                            alt=""
                        />
                    </div>
                </div>
            </div>

            <div className=" upFoot-cont d-flex ">
                <img src={scrumBoard} className="scrumImg" alt="scrumBoard" />
                <div className="d-flex flex-column align-items-center">
                    <p style={{fontSize: "1.4em", fontWeight: 600}}>
                        Start Structuring Your Project Workflows Today{" "}
                    </p>
                    <p>Create account now and manage your project workflow.</p>
                    {isAuth() ? null : (
                        <>
                            <Link to="/login">
                                <AntButton
                                    size="sm"
                                    type="primary"
                                    className=" p-3 pl-5 pr-5"
                                >
                                    Lets Get Started
                                </AntButton>
                            </Link>
                        </>
                    )}
                </div>
                <img src={check} className="scrumImg" alt="scrumBoard" />
            </div>
            <div className="steps tech-cont">
                <h3>Technologies Used</h3>
                <div className="d-flex align-items-center justify-content-center flex-wrap wow  animate__animated animate__fadeInUpwow  animate__animated animate__fadeInUp">
                    <Tooltip placement="bottom" title="ReactJS">
                        <div className="tech-icons-cont wow  animate__animated animate__fadeInUp">
                            <img src={reactIcon} alt="" />
                        </div>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Redux">
                        <div className="tech-icons-cont wow  animate__animated animate__fadeInUp">
                            <img src={reduxIcon} alt="reduxIcon" />
                        </div>
                    </Tooltip>
                    <Tooltip placement="bottom" title="NodeJS">
                        <div className="tech-icons-cont wow  animate__animated animate__fadeInUp">
                            <img src={nodeIcon} alt="nodeIcon" />
                        </div>
                    </Tooltip>
                    <Tooltip placement="bottom" title="ExpressJS">
                        <div className="tech-icons-cont wow  animate__animated animate__fadeInUp">
                            <img src={expreeIcon} alt="expreeIcon" />
                        </div>
                    </Tooltip>
                    <Tooltip placement="bottom" title="MongoDB">
                        <div className="tech-icons-cont wow  animate__animated animate__fadeInUp">
                            <img src={mongoIcon} alt="mongoIcon" />
                        </div>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Bootstrap">
                        <div className="tech-icons-cont wow  animate__animated animate__fadeInUp">
                            <img src={bootstrapIcon} alt="bootstrapIcon" />
                        </div>
                    </Tooltip>
                    <Tooltip placement="bottom" title="Ant-Design">
                        <div className="tech-icons-cont wow  animate__animated animate__fadeInUp">
                            <img src={antIcon} alt="antIcon" />
                        </div>
                    </Tooltip>
                </div>
            </div>

            <div
                className="steps tech-cont"
                style={{background: "black", color: "white"}}
            >
                <h3
                    className="pb-0 wow  animate__animated animate__fadeInUp"
                    style={{color: "white"}}
                >
                    About Project
                </h3>
                <p>This Project is developed by Saurabh Burade</p>
                <div className="d-flex align-items-center justify-content-center">
                    <a
                        href="https://github.com/saurabhburade/kanban-board"
                        target="_blank"
                    >
                        <AntButton
                            type="primary"
                            shape="round"
                            icon={<GithubOutlined />}
                            size="large"
                            style={{background: "black"}}
                        >
                            Go to GitHub Project
                        </AntButton>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Home;
