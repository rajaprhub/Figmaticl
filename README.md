                <div class="col-md-12" >
                    <div class="radio-card mb-4 d-md-flex" hidden={this.state.isOptSent}>
                        <span > please select one OTP method to verify your Ayushman Bharath Health Account (ABHA) number  <b>{this.props.data.abhaId}</b> </span>
                        <div class="col-md-4 pb-3 pb-md-0 pt-3" >
                            <label class="col-md-11 col-12 v-center">
                                <input
                                    type="radio"
                                    name="group"
                                    onClick={() => this.setState({ authMethod: "AADHAAR_OTP" })}
                                    checked={this.state.authMethod === "AADHAAR_OTP"}
                                    value="AADHAAR_OTP"
                                />{" "}
                                <span>OTP by AADHAAR</span>
                            </label>
                        </div>
                        <div
                            class="col-md-4 pb-3 pb-md-0"
                        >
                            <label class="col-md-11 col-12 v-center">
                                <input
                                    type="radio"
                                    name="group"
                                    onClick={() => this.setState({ authMethod: "MOBILE_OTP" })}
                                    checked={this.state.authMethod === "MOBILE_OTP"}
                                    value="MOBILE_OTP"
                                />{" "}
                                <span>OTP by mobile</span>
                            </label>
                        </div>

                        <p className="error hide" id="abhaId Error">
                            No record found for for this ABHA ID
                        </p>

                        <div className="m-0 round_l p-2 m_form">
                            <Row className="term_check green_tick d-inline-block w-100 mt-2">
                                <input type="checkbox" name="lifestyle_accordian" className="ml_5" ref="termsRef" />
                                <label>
                                    I am voluntarily sharing my Aadhaar Number / Virtual ID issued by the Unique Identification Authority of India (“UIDAI”), and my demographic information for the purpose of creating an Ayushman Bharat Health Account number (“ABHA number”) and Ayushman Bharat Health Account address (“ABHA Address”). I authorize NHA to use my Aadhaar number / Virtual ID for performing Aadhaar based authentication with UIDAI as per the provisions of the Aadhaar (Targeted Delivery of Financial and other Subsidies, Benefits and Services) Act, 2016 for the aforesaid purpose. I understand that UIDAI will share my e-KYC details, or response of “Yes” with NHA upon successful authentication.
                                </label>
                            </Row>

                            <Row className="term_check green_tick d-inline-block w-100 mt-2">
                                <input type="checkbox" name="lifestyle_accordian" className="ml_5" ref="termsRef1" />
                                <label>
                                    I intend to create Ayushman Bharat Health Account Number (“ABHA number”) and Ayushman Bharat Health Account address (“ABHA Address”) using document other than Aadhaar. (Click here to proceed further)
                                </label>
                            </Row>

                            <Row className="term_check green_tick d-inline-block w-100 mt-2">
                                <input type="checkbox" name="lifestyle_accordian" className="ml_5" ref="termsRef2" />
                                <label>
                                    I consent to usage of my ABHA address and ABHA number for linking of my legacy (past) government health records and those which will be generated during this encounter.                                </label>
                            </Row>
                            <Row className="term_check green_tick d-inline-block w-100 mt-2">
                                <input type="checkbox" name="lifestyle_accordian" className="ml_5" ref="termsRef3" />
                                <label>
                                    I authorize the sharing of all my health records with healthcare provider(s) for the purpose of providing healthcare services to me during this encounter.                                   </label>
                            </Row>
                            <Row className="term_check green_tick d-inline-block w-100 mt-2">
                                <input type="checkbox" name="lifestyle_accordian" className="ml_5" ref="termsRef4" />
                                <label>
                                    I consent to the anonymization and subsequent use of my government health records for public health purposes.                                 </label>
                            </Row>
                            <Row className="term_check green_tick d-inline-block w-100 mt-2">
                                <input type="checkbox" name="lifestyle_accordian" className="ml_5" ref="termsRef5" />
                                <label>
                                    I, have been explained about the consent as stated above and hereby provide my consent for the aforementioned purposes.                                 </label>
                            </Row>
                        </div>




                        <Button
                            className="btn btn-primary w-100 lg my-3"
                            onClick={() => { this.generateOtp() }}
                        >
                            GENERATE OTP
                        </Button>
                    </div>


                    <div className="px-4 py-2 text-center" hidden={this.state.isOptverified}>
                        <Form.Label column sm="4">
                            An OTP has been sent to Registerd Mobile no.
                        </Form.Label>
                        {/* <Form.Label column sm="4">Mobile No.</Form.Label> */}
                        <Col sm="8" className="mt-5 mx-auto" >
                            <Form.Control
                                className="input input2 text-center mx-auto"
                                type="password"
                                id="otp"
                                value={this.state.otp}
                                onChange={(e) => this.setState({ otp: e.target.value })}
                                placeholder="Enter OTP"
                                style={{ height: "52px" }}
                            />
                        </Col>
                        <Button
                            className="btn btn-primary w-100 lg my-3"
                            onClick={() => {
                                this.verifyAbhaOTP();
                            }}
                        >
                            VERIFY OTP
                        </Button>
                        <span
                            className="blue"
                            onClick={() => {
                                this.generateOtp()
                            }}
                        >
                            Resend OTP
                        </span>

                        <p className="error hide" id="abhaId otp Error">
                           Invalid OTP 
                        </p>
                    </div>

                </div>
