import { Image } from "react-bootstrap";

export default function SignupSuccess() {

    return (
        <div className="container-fluid h-100">
            <div className="row justify-content-center align-items-center h-50">
                <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-3">

                    <div>
                        <Image src="img/rakbank-logo.webp" fluid />
                    </div>

                    <div>
                        <h3 className="text-success text-center">Successfully Submitted !</h3>
                    </div>

                    <div style={{ padding: 30 }} className="form-group">
                        <Image src="img/success.png" fluid />
                    </div>

                    <div>
                        <span style={{ padding: 30 }} className="text-center"> Our representative will get in touch with you shortly.</span>
                    </div>
                </div>
            </div>
        </div >
    );
}