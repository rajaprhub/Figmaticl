        return (
            <div className="round_l mx_-20 p-2 mb_-20 pb-3 mt-3">
                <div className="d-inline-block w-100">
                    <div className="form-group m-0 pull-left pt-2">
                        <label>{this.props.data.label} <span class="px-2">|</span></label>
                    </div>
                    <div className="">
                        <button type="button" disabled={this.props.coverType === null ? true : false} className="font_14 btn-link p-0 btn text-capitalize" onClick={this.toggleAddMember}>
                            Manage Members
                        </button>
                    </div>
                </div>
                {this.state.memberData.length > 0 && (
                    <>
                        <Row className="btn_badge">
                            <Col>{memberHeader}</Col>
                        </Row>
                        {this.props.coverType === "individual" && this.state.showSI && (
                            <>
                                <Row className="mt-2">
                                    <Col>Sum Insured</Col>
                                </Row>
                                <Row className="mt-1">
                                    <Col>{memberbody}</Col>
                                </Row>
                            </>
                        )}
                        {this.props.coverType === "individual" && this.state.showSI && this.props.data.askDeductible && (
                            <>
                                {memberDeducts ?
                                    <>
                                        <Row className="mt-3">
                                            <Col>Deductible</Col>
                                        </Row>
                                        <Row className="mt-1">
                                            <Col>{memberDeducts}</Col>
                                        </Row>
                                    </>
                                    : null}
                            </>
                        )}
                    </>
                )}
                {this.props.coverType === "familyfloater" && this.state.showSI && (
                    <>
                        <Row className="mt-2">
                            <Col>Sum Insured</Col>
                        </Row>
                        <Row className="mt-1 mb-2">
                            <Col className="px-0 ml-3 normal_select dark">{floaterBody}</Col>
                        </Row>
                    </>
                )}
                {this.props.coverType === "familyfloater" && this.state.showSI && this.props.data.askDeductible && (
                    <>
                        {memberDeducts ?
                            <>
                                <Row style={{ marginTop: "30px" }}>
                                    <Col>Deductible</Col>
                                </Row>
                                <Row style={{ marginTop: "10px" }}>
                                    <Col>{memberDeducts}</Col>
                                </Row>
                            </>
                            : null}
                    </>
                )}
                {!this.state.showSI && (
                    <Row className="my-2">
                        <Col>{memberbody}</Col>
                    </Row>
                )}
                {addons}
                {console.log(this.state.memberSelected, 'memberSelected state')
                }                {this.state.addingMember && (
                    <MemberList
                        coverType={this.props.coverType}
                        allowedMembers={this.props.data.relationshipList[this.props.coverType]}
                        RELC={this.props.laws.RELC[this.props.coverType ? this.props.coverType : "individual"]}
                        members={_.cloneDeep(this.state.memberData)}
                        membersSelected={_.cloneDeep(this.state.memberSelected)}
                        buildMemberList={this.buildMemberList}
                        productCode={this.props.productCode}
                        custData={this.props.custData}
                        // NOIACT={this.props.laws.NOIACT}
                        title="Select Members to be covered"
                        isCoronaRakshak={this.props.isCoronaRakshak}
                        onclose={() => this.setState({ addingMember: false })}
                    />
                )}
                {this.state.nudge && (
                    <MemberList
                        coverType={this.props.coverType}
                        allowedMembers={this.props.data.relationshipList[this.props.coverType]}
                        RELC={this.props.laws.RELC[this.props.coverType]}
                        members={_.cloneDeep(this.state.memberData)}
                        membersSelected={this.state.memberSelected}
                        buildMemberList={this.buildMemberList}
                        // NOIACT={this.props.laws.NOIACT}
                        title="Select Members to be covered"
                        onclose={() => this.setState({ addingMember: false })}
                    />
                )}
                {this.state.status.protectionLevelCode === "nudge" && <ProtectionLevel {...this.state.plp} />}
            </div>
        );
    }
