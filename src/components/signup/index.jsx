import { useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../httpUtil";
import { httpError, error } from "../../Notification/notificationSlice";
import { useDispatch } from "react-redux";

export default function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: false });

    const onSubmit = async (e) => {
        e.preventDefault();

        var regex = new RegExp("^[a-zA-Z0-9 ]+$");

        if (!regex.test(formData.password)) {
            dispatch(error("Password can only have numbers or alphabets."));
            return;
        }

        const [status, responseBody] = await signupUser(formData);
        if (status != 200) {
            dispatch(httpError([status, responseBody]));
            return;
        } else {
            navigate("/signup-success");
        }
    }


    return (
        <div className="container-fluid h-100 ">
            <div className="row justify-content-center align-items-center h-50">
                <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">

                    <div className="form-group">
                        <Image src="img/rakbank-logo.webp" fluid />
                    </div>

                    <h3>Create Account</h3>

                    <Form onSubmit={onSubmit} >
                        <Form.Group className="mb-3" controlId="signupForm.fullName">
                            <Form.Control type="text" placeholder="Full Name" required
                                maxLength={50} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signupForm.email">
                            <Form.Control type="email" placeholder="Email Address" required
                                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="signupForm.password">
                            <Form.Control type="password" minLength={8} placeholder="Password" required
                                value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Check type='checkbox' checked={formData.confirm}
                                label={'I agree with Terms and Privacy'} id='signupForm.confirmation'
                                onChange={(e) => setFormData({ ...formData, confirm: e.target.checked })} />
                        </Form.Group>

                        <div className="row">
                            <div className="col-md-12 linebreak">
                            </div>
                        </div>

                        <Form.Group>
                            <Button disabled={!formData.confirm} type="submit" variant="danger" size="lg">SIGN UP</Button>
                        </Form.Group>
                        <Form.Group>
                            <Button className="btn-light" variant="danger" size="lg">Sign Up with Google</Button>
                        </Form.Group>
                    </Form>
                    <div className="row">
                        <div className="col-md-12 linebreak">
                        </div>
                    </div>
                    <span>Already have an account? <span className="text-danger">Login</span></span>

                </div>
            </div>
        </div >

    );

}