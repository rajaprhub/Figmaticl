      let membersList = [];
        this.state.currentMembers.forEach((mmbr, index) => {
            // mmbr.disabled = _.findIndex(this.props.RELC, function (o) { return o === initCap(mmbr.RELATIONSHIP) }) >= 0 ? false : true;
            let a = mmbr["AGE"];
            if (a < 1) {
                a = a * 12;
                a = Math.round(a);
                a = "0." + a;
            }
            const cid = cuid();
            let mmbrArray = []
            mmbrArray.push(mmbr)

            if (this.props.coverType === "familyfloater" && this.props.productCode === "2890") {

                if (['son', 'daughter', 'self', 'wife', 'husband'].includes(mmbr.RELATIONSHIP)) {
                    const mbrBox = (
                        <Row className="row_col d-flex mb-1" key={mmbr.memberId}>
                            <Col md={4}>{initCap(mmbr.RELATIONSHIP)}
                                {(mmbr.RELATIONSHIP === "self" && this.props.productCode === "2890") && <span style={{ color: "red" }}>&nbsp;*</span>}
                            </Col>
                            <Col md={4} className="text-center">

                                (Age: {a})
                            </Col>
                            <Col md={4} className="text-right">
                                {this.props.productCode === "2890" ?
                                    <input
                                        type="checkbox"
                                        id={cid}
                                        // disabled={mmbr.disabled}
                                        data-tailor-memberId={mmbr.memberId}
                                        checked={mmbr.included ? mmbr.included : false}
                                        onClick={this.includeExclude}
                                    />
                                    :
                                    <input
                                        type="checkbox"
                                        id={cid}
                                        // disabled={mmbr.disabled}
                                        data-tailor-memberId={mmbr.memberId}
                                        checked={mmbr.included ? mmbr.included : false}
                                        onClick={this.includeExclude}
                                    />
                                }
                            </Col>
                        </Row>
                    );
                    membersList.push(mbrBox);
                }
            } else {
                const mbrBox = (
                    <Row className="row_col d-flex mb-1" key={mmbr.memberId}>
                        <Col md={4}>{initCap(mmbr.RELATIONSHIP)}
                            {(mmbr.RELATIONSHIP === "self" && this.props.productCode === "2890") && <span style={{ color: "red" }}>&nbsp;*</span>}
                        </Col>

                        <Col md={4} className="text-center">
                            (Age: {a})
                        </Col>
                        <Col md={4} className="text-right">
                            {console.log(cid, 'mmbr')}
                            {this.props.productCode === "2890" ?
                                <input
                                    type="checkbox"
                                    id={cid}
                                    // disabled={mmbr.disabled}
                                    data-tailor-memberId={mmbr.memberId}
                                    checked={mmbr.included ? mmbr.included : false}
                                    onClick={this.includeExclude}
                                />
                                :
                                <input
                                    type="checkbox"
                                    id={cid}
                                    disabled={mmbr.disabled}
                                    data-tailor-memberId={mmbr.memberId}
                                    checked={mmbr.included ? mmbr.included : false}
                                    onClick={this.includeExclude}
                                />
                            }
                        </Col>
                    </Row>
                );
                membersList.push(mbrBox);
            }
        });
