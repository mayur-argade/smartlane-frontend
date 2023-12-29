import React, { useState, useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./Landingpage.css";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import video from '../../assets/img/intro.mp4'

export default function LandingPage() {
    // const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [selectedCheckbox, setSelectedCheckbox] = useState("");
    console.log(selectedCheckboxes);
    console.log(email);
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        const name = form.current.user_name.value.trim();
        const email = form.current.user_email.value.trim();

        // Get the selected checkboxes
        const checkboxes = form.current.querySelectorAll(
            '[name="message"]:checked'
        );
        const selectedCheckboxes = Array.from(checkboxes).map(
            (checkbox) => checkbox.value
        );

        const fullMessage = `
      Name: ${name}
      Email: ${email}
      Message: ${selectedCheckboxes.join(", ")}
    `;

        console.log("Full Message:", fullMessage);
        console.log(checkboxes);

        if (!name || !email || selectedCheckboxes.length === 0) {
            toast("Please fill all required fields");
            console.log("Please fill all required fields");
            return;
        }

        emailjs
            .sendForm(
                "service_xfqbh9g",
                "template_vpnq65b",
                form.current,
                "I8Ktm-jJ0Q48l3MIP"
            )
            .then(
                (result) => {
                    console.log(result.text);
                    toast(`We will connect soon.`);

                    // Reset checkboxes using the state setter function
                    setSelectedCheckboxes([]);
                    setSelectedCheckbox("");
                    form.current.reset();
                },
                (error) => {
                    console.log(error.text);
                    console.log("test", form.current);
                }
            );
    };

    // Handle checkbox changes
    const handleCheckboxChange = (value) => {
        setSelectedCheckbox(value);

        setSelectedCheckboxes((prevCheckboxes) =>
            prevCheckboxes.includes(value)
                ? prevCheckboxes.filter((checkbox) => checkbox !== value)
                : [...prevCheckboxes, value]
        );
    };

    //   scroll to video funtion logic
    const ScrollToVideo = (divId) => {
        const targetDiv = document.getElementById(divId);

        if (targetDiv) {
            const yOffset = targetDiv.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: yOffset, behavior: 'smooth' });
        }
    };

    return (
        <div className="form-container">
            <div className="innner_form" style={{ background: "#121213" }}>
                <div
                    className="home-message-main fontfamBecomeTopHead"
                    style={{ height: "80px" }}
                >
                    <h1 className="lnd_mainlnding">
                        <span className="fontfamBecomeTopHead"> Become a </span>
                        <span
                            className="home-message-sub-1 fontfamBecomeTopHead"
                            style={{ color: "#B9B2DC" }}
                        >
                            propeller
                        </span>{" "}
                        today.
                    </h1>
                    <p className="home-message-sub-2 fontfamBecomeTopHead">
                        Stay up to date with our latest product and investment news.
                    </p>
                </div>
            </div>

            <Card
                variant="outlined"
                style={{ borderRadius: "20px", padding: "0 30px" }}
            >
                <div>
                    <CardContent>
                        <h1 className="form_head1">
                            Join our newsletter
                        </h1>
                        <form ref={form} onSubmit={sendEmail} className="frm_main">
                            {/* Row 1: Checkboxes with text on the right */}
                            <h5 className="frm_check_head">
                                Select all that apply
                            </h5>
                            <div
                                style={{
                                    margin: "20px 0",
                                }}
                                className="Carddiv card_top_form"
                            >
                                <div style={{ margin: "-10px 25px -10px 0px" }}>
                                    <FormControlLabel
                                        style={{ margin: "0", fontSize: "14px" }}
                                        control={
                                            <Checkbox
                                                style={{ margin: "0 0 0 -11px", fontSize: "14px" }}
                                                name="message"
                                                value="I’m a prospective investor"
                                                checked={
                                                    selectedCheckbox === "I’m a prospective investor"
                                                }
                                                onChange={() =>
                                                    handleCheckboxChange("I’m a prospective investor")
                                                }
                                            />
                                        }
                                        label="I’m a prospective investor"
                                        labelPlacement="end"
                                    />
                                </div>
                                <div style={{ margin: "-10px 25px -10px 0px" }}>
                                    <FormControlLabel
                                        style={{ margin: "0" }}
                                        control={
                                            <Checkbox
                                                style={{ margin: "0 0 0 -11px" }}
                                                name="message"
                                                value="I just want to be in the loop"
                                                checked={
                                                    selectedCheckbox === "I just want to be in the loop"
                                                }
                                                onChange={() =>
                                                    handleCheckboxChange("I just want to be in the loop")
                                                }
                                            />
                                        }
                                        label="I just want to be in the loop"
                                        labelPlacement="end"
                                    />
                                </div>
                                <div style={{ margin: "-10px 25px -10px 0px" }}>
                                    <FormControlLabel
                                        style={{ margin: "0" }}
                                        control={
                                            <Checkbox
                                                style={{ margin: "0 0 0 -11px" }}
                                                name="message"
                                                value="I am a landlord, and want to use Propell"
                                                checked={
                                                    selectedCheckbox ===
                                                    "I am a landlord, and want to use Propell"
                                                }
                                                onChange={() =>
                                                    handleCheckboxChange(
                                                        "I am a landlord, and want to use Propell"
                                                    )
                                                }
                                            />
                                        }
                                        label="I am a landlord, and want to use Propell"
                                        labelPlacement="end"
                                    />
                                </div>
                            </div>

                            {/* Row 2: Inputs */}
                            <div className="field-container">
                                <TextField
                                    type="text"
                                    name="user_name"
                                    label="First Name"
                                    variant="outlined"
                                    style={{
                                        flex: "1",
                                        marginBottom: "16px",
                                        width: "100%",
                                        marginRight: "16px",
                                    }}
                                />
                                <TextField
                                    label="Last Name"
                                    style={{ flex: "1", marginBottom: "16px", width: "100%" }}
                                    variant="outlined"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>

                            {/* Row 3: Input */}
                            <div style={{ marginBottom: "16px", flex: "1" }}>
                                <TextField
                                    className="email_input"
                                    type="email"
                                    name="user_email"
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                />
                            </div>

                            {/* Row 4: Submit Button */}
                            <div style={{ width: "100%" }}>
                                <Button
                                    className="form_submt"
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    onClick={sendEmail}
                                >
                                    Sign me up!
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </div>
            </Card>
            <Link to="welcome-signup" style={{ textAlign: "center" }}>
                <div
                    style={{
                        display: "none",
                        marginTop: "10px",
                        color: "#FFF",
                        fontFamily: "Moderat",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "normal",
                    }}
                >
                    Learn more
                </div>
                {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M15.75 17.25L12 21M12 21L8.25 17.25M12 21V3"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg> */}
            </Link>

            <button onClick={() => ScrollToVideo("video")} id="learnmore" to="welcome-signup" style={{ textAlign: "center", marginTop: "30px", background: "none", border: 'none' }}>
                <div
                    style={{
                        display: "none",
                        marginTop: "10px",
                        color: "#FFF",
                        fontFamily: "Moderat",
                        fontSize: "20px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "normal",
                    }}
                >
                    Learn more
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M15.75 17.25L12 21M12 21L8.25 17.25M12 21V3"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            <div id="video" style={{ height: "100vh", width: '100%', marginTop: '159px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <video width="640" height="360" controls style={{ width: '100%', maxWidth: '640px', maxHeight: '360px' }}>
                    <source src={video} type="video/mp4" />
                </video>
            </div>
        </div>
    );
}
