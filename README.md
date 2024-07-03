render() {
    let membersList = [];

    this.state.currentMembers.forEach((mmbr, index) => {
        let a = mmbr["AGE"];
        if (a < 1) {
            a = a * 12;
            a = Math.round(a);
            a = "0." + a;
        }
        const cid = cuid();
        const isFamilyFloater = this.props.coverType === "familyfloater";

        // Condition to designate parent member
        const isParent = index === 0; // Example: designate the first member as the parent

        const mbrBox = (
            <Row className="row_col d-flex mb-1" key={mmbr.memberId}>
                <Col md={4}>{initCap(mmbr.RELATIONSHIP)}
                    {isParent && <span style={{ color: "red" }}>&nbsp;*</span>}
                </Col>
                <Col md={4} className="text-center">
                    (Age: {a})
                </Col>
                <Col md={4} className="text-right">
                    <input
                        type="checkbox"
                        id={cid}
                        data-tailor-memberId={mmbr.memberId}
                        checked={mmbr.included ? mmbr.included : false}
                        onClick={this.includeExclude}
                        disabled={isFamilyFloater && !isParent} // Disable checkboxes for non-parent members in familyfloater
                    />
                </Col>
            </Row>
        );

        membersList.push(mbrBox);
    });

    return (
        <div>
            {membersList}
            <button onClick={this.validatePolicyPurchase}>Purchase Policy</button>
        </div>
    );
}

validatePolicyPurchase = () => {
    const { currentMembers } = this.state;
    const isFamilyFloater = this.props.coverType === "familyfloater";

    // Validate if at least one parent member is selected for familyfloater
    if (isFamilyFloater && !currentMembers.some(mmbr => mmbr.included && mmbr.isParent)) {
        alert("Parent is mandatory to purchase policy");
        return;
    }

    // Proceed with policy purchase logic
}
