import React from "react";

// import Link from 'next/link';
import cuid from "cuid";
import _ from "lodash";
import { contexts } from "../../../public/js/lib";
import { Card, Row, Col, Modal, Button } from "react-bootstrap";
import actions from "../../../public/js/actions";
import { initCap } from "../../../public/js/lib";
// import { threadId } from 'worker_threads';
import { AlertBox } from "../../ux/components";
const appConfig = require("../../../app/lib/contours/app.config");
import Router from 'next/router';


// import history from 'react-router-dom'

class ProductsList extends React.Component {
    constructor(props) {
        super(props);
        this.navigateTo = this.navigateTo.bind(this);
        this.state = {
            products: [],
            current: this.props.current,
            productImgs: appConfig.constants.productImgs,
            showAlertPopup: false,

        };
    }

    componentWillMount() {
        // if(this.props.whichJourney)
        actions.getObjectList(this.props.pylonInfo, "product", "en-us", this.props.whichJourney, (error, data) => {
            if (error) {
            }
            let products = _.cloneDeep(data);
            if (_.get(contexts.getContext("fabric-user"), 'agentId') === _.get(appConfig, 'constants.partners.hero.agentId'))
                products = data.filter(o => o.shortCode === '2852');
            if (!JSON.parse(localStorage.getItem('isFlexiSupremeVisible')) && products) {
                products = products.filter(item => item.key !== "2846")
            }
            if (appConfig.constants.capp_removed) {
                products = products.filter(item => item.key !== "2837")
            }
            this.setState({ products: products });
        });
    }

    navigateTo(pd, pn, buyPlansDetails, e) {
        this.props.navigateTo(pd, pn, buyPlansDetails);
    }


    isPopupOpen = (isTrue) => {
        this.setState({ showAlertPopup: isTrue })
    }

    render() {
        let prodBox, prods;
        switch (this.props.model) {
            case "box":
                prods = [];
                let filterProduct;
                if (this.props.partnerName == "share") {
                    filterProduct = this.props.partnerName == "pnb" ? this.state.products.splice(this.state.products.length - 2, 1) : this.state.products.splice(this.state.products.length - 7, 1)
                } else {
                    filterProduct = this.props.partnerName == "pnb" ? this.state.products.splice(this.state.products.length - 2, 1) : this.state.products.splice(this.state.products.length - 8, 0)
                }
                this.props.partnerName == "pnb" || this.props.partnerName == "share" ? filterProduct.forEach((prod, index) => {
                    let bx = (
                        <Col xs={3} className="select_products">
                            <Card
                                key={"prod-" + index + prod.key}
                                onClick={this.navigateTo.bind(this, prod.key, prod.displayText, this.props.buyPlansDetails)}
                                className="productBox"
                            >
                                <div className="heading_img">
                                    <img src={this.state.productImgs[prod.shortCode]} />
                                </div>
                                <Card.Body>
                                    <Card.Title>{prod.displayText}</Card.Title>
                                    <Card.Text>{prod.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                    prods.push(bx);
                }) : this.state.products.forEach((prod, index) => {
                    let bx = (
                        <Col xs={3} className="select_products">
                            <Card
                                key={"prod-" + index + prod.key}
                                onClick={this.navigateTo.bind(this, prod.key, prod.displayText, this.props.buyPlansDetails)}
                                className="productBox"
                            >
                                <div className="heading_img">
                                    <img src={this.state.productImgs[prod.shortCode]} />
                                </div>
                                <Card.Body>
                                    <Card.Title>{prod.displayText}</Card.Title>
                                    <Card.Text>{prod.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                    prods.push(bx);
                });
                prodBox = prods;
                break;

            case "dropdown":
                prods = this.state.products.map((prod, index) => (
                    <option key={prod.key + "-" + index} value={prod.key}>
                        {prod.displayText}
                    </option>
                ));
                prodBox = (
                    <select
                        onChange={this.navigateTo.bind(this, this.value, this.options[this.selectedIndex].innerText)}
                    >
                        {prods}
                    </select>
                );
                break;

            default:
                break;
        }
        return <div className="product-box-wrapper row">{prodBox}</div>;
    }
}

class MemberList extends React.Component {
    constructor(props) {
        super(props);
        this.node = React.createRef();
        this.includeExclude = this.includeExclude.bind(this);
        this.confirm = this.confirm.bind(this);
        this.isMemberValid = this.isMemberValid.bind(this);
        this.canSelectMember = this.canSelectMember.bind(this);
        this.state = {
            status: { code: "none", title: "", text: "" },
            currentMembers: [],
        };
    }

    includeExclude(e) {
        const cm = e.target;
        const cmId = cm.attributes["data-tailor-memberid"].value;
        let members = _.cloneDeep(this.state.currentMembers);
        let member = _.find(this.state.currentMembers, { memberId: cmId });
        console.log(cmId, members, member, "cm")
        const memIdx = _.findIndex(this.state.currentMembers, { memberId: cmId });
        if (this.canSelectMember(members, member)) {
            console.log("comming inside")
            member.included = !member.included; //? false : true;
            members[memIdx] = member;
            this.setState({ currentMembers: members });
        }
        // else{
        // 	member.included = false;
        // 	members[memIdx] = member;
        // 	this.setState({ currentMembers: members });
        // }
    }

    confirm(e) {
        let relMaster = { 'spouse': ['husband', 'wife'] };
        let memberData = _.filter(this.state.currentMembers, function (o) {
            return o.included;
        });
        memberData.forEach((member) => {
            if (member.AGE >= this.props.RELC.AE.minChildAge
                && member.AGE <= this.props.RELC.AE.maxChildAge
                && (member.RELATIONSHIP.toLowerCase() === "son" || member.RELATIONSHIP.toLowerCase() === "daughter")) {
                member.isAdult = false;
                member.isChild = true;
            } else if (member.AGE >= this.props.RELC.AE.minAdultAge
                && member.AGE <= this.props.RELC.AE.maxAdultAge) {
                member.isAdult = true;
                member.isChild = false;
            }
        });
        let adults = 0;
        this.state.currentMembers.forEach((mmbr, index) => {
            if (mmbr.included && parseFloat(mmbr.AGE) >= this.props.RELC.AE.minAdultAge && parseFloat(mmbr.AGE) <= this.props.RELC.AE.maxAdultAge) {
                adults++;
            }
        });

        if (this.props.coverType === "individual") {
            let childrenLength = this.state.currentMembers.filter(val => val.included === true && (val.RELATIONSHIP == 'son' || val.RELATIONSHIP == 'daughter')).length
            if (childrenLength > 4) {
                this.setState({
                    status: {
                        code: "alert",
                        title: "Invalid selection",
                        text: `You are not allowed to select more than 4 child for individual`,
                    },
                });
                return;
            }
        }

        if (this.props.coverType === "familyfloater") {
            let childrenLength = this.state.currentMembers.filter(val => val.included === true && (val.RELATIONSHIP == 'son' || val.RELATIONSHIP == 'daughter')).length
            if (childrenLength > 6) {
                this.setState({
                    status: {
                        code: "alert",
                        title: "Invalid selection",
                        text: `You are not allowed to select more than 6 child for the family floater`,
                    },
                });
                return;
            }
        }

        //  if(this.props.coverType === "familyfloater"){
        //     let childrenLength = this.state.currentMembers.filter(val => val.included === true && (val.RELATIONSHIP == 'son' || val.RELATIONSHIP == 'daughter')).length
        //     const isselfselected = memberData.filter(item => ['self'].includes(item?.RELATIONSHIP))
        //     let isHusbandSelected = memberData.filter(item => ['husband'].includes(item?.RELATIONSHIP))
        //     if (childrenLength.length > 0 && isselfselected == 0 || isHusbandSelected == 0) {
        //         this.setState({
        //             status: {
        //                 code: "alert",
        //                 title: "Invalid selection",
        //                 text: `Parent is mandatory for children to buy policy`,
        //             },
        //         });
        //         return;
        //     }
        // }

        // if(this.props.coverType === "individual") {
        //     const isselfselected = memberData.filter(item => ['self'].includes(item?.RELATIONSHIP))
        //     console.log(isselfselected, 'c')
        //     if (isselfselected.length == 0) {
        //         this.setState({
        //             status: {
        //                 code: "alert",
        //                 title: "Invalid selection",
        //                 text: `Self is mandatory`,
        //             },
        //         });
        //         return;
        //     }
        //     }

        debugger
        if (this.props.coverType === "familyfloater") {
            memberData.forEach((val) => {
                if ((val.RELATIONSHIP === 'son' || val.RELATIONSHIP === 'daughter') && val.AGE < 18) {
                    this.setState({
                        status: {
                            code: "alert",
                            title: "Invalid selection",
                            text: `Parent is  mandatory to purchase the policy`,
                        },
                    });
                    return;
                }
            })
        }
        if (this.props.coverType === "individual") {
            memberData.forEach((val) => {
                if ((val.RELATIONSHIP === 'son' || val.RELATIONSHIP === 'daughter') && val.AGE < 18) {
                    this.setState({
                        status: {
                            code: "alert",
                            title: "Invalid selection",
                            text: `Parent is  mandatory to purchase the policy`,
                        },
                    });
                    return;
                }
            })
        }


        if (!memberData.length) {
            this.setState({
                status: {
                    code: "alert",
                    title: "Invalid selection",
                    text: `Please select at least one member.`,
                },
            });

            return;
        }
        else if (this.props.coverType === "familyfloater") {
            const isselfselected = memberData.filter(item => ['self'].includes(item?.RELATIONSHIP))
            if (isselfselected.length == 0) {
                this.setState({
                    status: {
                        code: "alert",
                        title: "Invalid selection",
                        text: `Self is mandatory to purchase the policy`,
                    },
                });
                return;
            }
        }
        if (this.props.coverType === "individual") {
            const isselfselected = memberData.filter(item => ['self'].includes(item?.RELATIONSHIP))
            const issibilingSelected = memberData.filter(item => (['brother'].includes(item?.RELATIONSHIP) && item?.AGE <= 18) || (['sister'].includes(item?.RELATIONSHIP) && item?.AGE <= 18))
            const isChildSelected = memberData.filter(item => (['son'].includes(item?.RELATIONSHIP) && item?.AGE <= 18) || (['daughter'].includes(item?.RELATIONSHIP) && item?.AGE <= 18))
            if (issibilingSelected.length) {
                if (isselfselected.length == 0) {
                    this.setState({
                        status: {
                            code: "alert",
                            title: "Invalid selection",
                            text: `Self is mandatory to purchase the policy`,
                        },
                    });
                    return;
                }
            } else if (isChildSelected.length) {
                if (isselfselected.length == 0) {
                    this.setState({
                        status: {
                            code: "alert",
                            title: "Invalid selection",
                            text: `Parent is mandatory to purchase the policy`,
                        },
                    });
                    return;
                }
            }

        }
        if (this.props.coverType === "individual") {
            const isselfselected = memberData.filter(item => ['self'].includes(item?.RELATIONSHIP))
            const issibilingSelected = memberData.filter(item => (['brother'].includes(item?.RELATIONSHIP) && item?.AGE <= 18) || (['sister'].includes(item?.RELATIONSHIP) && item?.AGE <= 18))
            const isChildSelected = memberData.filter(item => (['son'].includes(item?.RELATIONSHIP) && item?.AGE <= 18) || (['daughter'].includes(item?.RELATIONSHIP) && item?.AGE <= 18))
            if (issibilingSelected.length) {
                if (isselfselected.length == 0) {
                    this.setState({
                        status: {
                            code: "alert",
                            title: "Invalid selection",
                            text: `Self is mandatory to purchase the policy`,
                        },
                    });
                    return;
                }
            } else if (isChildSelected.length) {
                if (isselfselected.length == 0) {
                    this.setState({
                        status: {
                            code: "alert",
                            title: "Invalid selection",
                            text: `Parent is mandatory to purchase the policy`,
                        },
                    });
                    return;
                }
            }

        }


        else if (adults < this.props.RELC.NOIACT.minAdult && this.props.coverType === "familyfloater") {
            this.setState({
                status: {
                    code: "alert",
                    title: "Invalid selection",
                    text: `Parent is  mandatory to purchase the policy `,
                },
            });
            return;
        }
        else if (adults < this.props.RELC.NOIACT.minAdult && this.props.coverType === "individual") {
            this.setState({
                status: {
                    code: "alert",
                    title: "Invalid selection",
                    text: `Please select atleast ${this.props.RELC.NOIACT.minAdult} adult`,
                },
            });
            return;
        }
        else if (this.props.RELC.RELC.mandatoryRelationships) {
            let excludedRel = this.props.RELC.RELC.mandatoryRelationships.split(',').filter((o) => {
                return !memberData.some((mbr) => {
                    return (mbr.RELATIONSHIP.toLowerCase() === o.toLowerCase() || (_.get(relMaster, o.toLowerCase(), undefined) ? relMaster[o.toLowerCase()].includes(mbr.RELATIONSHIP.toLowerCase()) : false))
                });
            })
            if (excludedRel.length > 0) {
                this.setState({
                    status: {
                        code: "alert",
                        title: "Invalid selection",
                        text: `Please select ${excludedRel.join(', ')}`,
                    },
                });
                // alert(`Please select ${excludedRel.join(', ')}`);
                return;
            }
        }

        this.props.buildMemberList(memberData);
    }


    canSelectMember(members, mbr) {
        let mbrs = 0;
        let adults = 0;
        let childrens = 0;
        let parents = 0;
        let parentinlaws = 0;
        let siblings = 0;
        let lessThanExpected = false;
        members.forEach((mmbr, index) => {
            if (mmbr.included) {
                console.log("mmbr.included", mmbr.included)
                mbrs++;
                if (
                    parseFloat(mmbr.AGE) <= this.props.RELC.AE.minChildAge &&
                    parseFloat(mmbr.AGE) > this.props.RELC.AE.maxChildAge
                ) {
                    console.log('children lessThanExpected', lessThanExpected)
                    childrens++;

                }
                if ((parseFloat(mmbr.AGE) >= this.props.RELC.AE.minAdultAge && parseFloat(mmbr.AGE) <= this.props.RELC.AE.maxAdultAge) && (mmbr.RELATIONSHIP.toLowerCase() !== "son" && mmbr.RELATIONSHIP.toLowerCase() !== "daughter")) {
                    adults++;
                }
                if (mmbr.RELATIONSHIP.toLowerCase() === "father" || mmbr.RELATIONSHIP.toLowerCase() === "mother") {
                    parents++;
                }
                if (
                    mmbr.RELATIONSHIP.toLowerCase() === "father-in-law" ||
                    mmbr.RELATIONSHIP.toLowerCase() === "mother-in-law"
                ) {
                    parentinlaws++;
                }
                if (mmbr.RELATIONSHIP.toLowerCase() === "brother" || mmbr.RELATIONSHIP.toLowerCase() === "sister") {
                    console.log('sibilngs lessThanExpected', lessThanExpected)
                    siblings++;
                }
            }
        });
        // if (!lessThanExpected &&
        //     (mbr.RELATIONSHIP.toLowerCase() === "self" ||
        //         mbr.RELATIONSHIP.toLowerCase() === "wife" ||
        //         mbr.RELATIONSHIP.toLowerCase() === "husband")
        // ) {
        //     return true
        // }
        if (this.props.isCoronaRakshak && parseFloat(mbr.AGE) < 18 || parseFloat(mbr.AGE) >= 75) {
            window.alert('your age criteria does not matched. Age should be below 75')
            Router.replace(`/gr`);
            // this.props.history.push("/");
            // this.navigateTo('/')
        }

        if (mbr.narcotics == true) {
            console.log("comming 1");

            return false;
        }

        if (!mbr.included && mbrs >= this.props.RELC.NOIACT.max) {
            console.log("comming 2");

            return false;
        }

        if (mbr.included && mbrs <= this.props.RELC.NOIACT.min) {
            console.log("comming 3");

            return false;
        }

        if (
            mbr.included && parseFloat(mbr.AGE) >= this.props.RELC.AE.minAdultAge &&
            parseFloat(mbr.AGE) <= this.props.RELC.AE.maxAdultAge &&
            adults <= this.props.RELC.NOIACT.minAdult &&
            !(mbr.RELATIONSHIP.toLowerCase() === "son" ||
                mbr.RELATIONSHIP.toLowerCase() === "daughter" || mbr.RELATIONSHIP.toLowerCase() === "brother" || mbr.RELATIONSHIP.toLowerCase() === "sister")) {
            console.log("comming 444", mbr.RELATIONSHIP);
            return false;
        }
        if (
            childrens != 0 && !mbr.included && (mbr.RELATIONSHIP.toLowerCase() === "son" || mbr.RELATIONSHIP.toLowerCase === "daughter") && childrens >= this.props.RELC.NOIACT.maxChild
        ) {
            console.log("comming 5");

            return false;
        }
        if (
            !mbr.included &&
            parseFloat(mbr.AGE) > this.props.RELC.AE.maxChildAge &&
            adults >= this.props.RELC.NOIACT.maxAdult
        ) {
            console.log("comming 6");

            return false;
        }

        if (
            !mbr.included &&
            (mbr.RELATIONSHIP.toLowerCase() === "father" || mbr.RELATIONSHIP.toLowerCase() === "mother") &&
            parents >= this.props.RELC.RELC.maxParentAllowed
        ) {
            console.log("comming 7");

            return false;
        }
        if (
            !mbr.included &&
            (mbr.RELATIONSHIP.toLowerCase() === "father-in-law" ||
                mbr.RELATIONSHIP.toLowerCase() === "mother-in-law") &&
            parentinlaws >= this.props.RELC.RELC.maxParentInLawAllowed
        ) {
            console.log("comming 8");

            return false;
        }
        if (
            !mbr.included &&
            (mbr.RELATIONSHIP.toLowerCase() === "brother" || mbr.RELATIONSHIP.toLowerCase() === "sister") &&
            siblings >= this.props.RELC.RELC.siblings
        ) {
            console.log("comming 9");

            return false;
        }

        return true;
    }
    isMemberValid(mbr) {
        let mmbr = _.find(this.props.RELC.RELC.list, (o) => {
            return o.toLowerCase() === mbr["RELATIONSHIP"].toLowerCase();
        });
        if (!mmbr) {
            return false;
        }
        if (this.props.RELC.AE.maxAdultAge < parseFloat(mbr.AGE)) {
            return false;
        }
        if ((mbr.RELATIONSHIP.toLowerCase() === 'son' || mbr.RELATIONSHIP.toLowerCase() === 'daughter')
            && (parseFloat(mbr.AGE) > this.props.RELC.AE.maxChildAge || parseFloat(mbr.AGE) < this.props.RELC.AE.minChildAge)) {
            return false;
        }
        if (mbr.narcotics == true) {
            return false;
        }

        if (
            parseFloat(mbr.AGE) <= this.props.RELC.AE.minChildAge &&
            parseFloat(mmbr.AGE) > this.props.RELC.AE.maxChildAge
        ) {
            return false;
        }
        if (this.props.productCode === '2811' && mbr.RELATIONSHIP.toLowerCase() === 'self' && _.some(this.props.custData, (cd) => {
            return cd.key.toLowerCase() === 'gender-male';
        })) {
            return false;
        }

        //GENDER-FEMALE
        // if (
        //     (mbr.RELATIONSHIP.toLowerCase() === "son" || mbr.RELATIONSHIP.toLowerCase() === "daughter") &&
        //     (this.props.RELC.AE.maxChildAge < parseFloat(mbr.AGE) ||
        //         this.props.RELC.AE.minChildAge > parseFloat(mbr.AGE) * 12)
        // ) {
        //     return false;
        // }
        return true;
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClick, false);
    }

    handleClick = (e) => {
        if (this.node.current.contains(e.target)) {
            return;
        }
        this.close();
    };

    close = () => {
        this.props.onclose();
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClick, false);
        let isLessThanAge;
        let currMember = _.cloneDeep(this.props.membersSelected);
        let checkProductInfo = contexts.getContext("checkProductInfo")
        currMember.forEach((mmbr, index) => {
            let mbr = _.find(this.props.members, { memberId: mmbr.memberId });
            if (parseFloat(mmbr.AGE) <= 18 && ['son', 'daughter', 'brother', 'sister'].includes(mmbr.RELATIONSHIP.toLowerCase())) {
                isLessThanAge = true
            }
            if (mbr) {
                if (parseFloat(currMember[index].AGE) < 5 && checkProductInfo == "Chola MS Critical Healthline Insurance") {
                    currMember[index].disabled = true;
                } else {
                    currMember[index] = mbr;
                    currMember[index].included = true;
                    currMember[index].disabled = false;
                }
            } else {
                currMember[index].included = false;
                if (parseFloat(currMember[index].AGE) < this.props.RELC.AE.minChildAge && checkProductInfo == "Chola MS Critical Healthline Insurance") {
                    currMember[index].disabled = true;
                } else {
                    if (this.isMemberValid(currMember[index])) {
                        currMember[index].disabled = false;
                    } else {
                        currMember[index].disabled = true;
                    }
                }
            }
        });
        this.setState({ currentMembers: currMember, isLessThanAge: isLessThanAge });
    }

    render() {
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
                            {console.log(cid, 'mmbr Number of memebers cid')}
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

        return (
            <>


                <div className="product-modal" >
                    <Modal.Dialog >
                        <div ref={this.node}>
                            <Modal.Header onHide={this.close} closeButton>
                                <p className="font_18 mb-0">{this.props.title}</p>
                            </Modal.Header>
                            <Modal.Body>{membersList}</Modal.Body>
                            <Modal.Footer className="text-center mt-2">
                                <Button onClick={this.confirm} variant="danger">
                                    CONFIRM
                                </Button>
                            </Modal.Footer>
                        </div>
                    </Modal.Dialog>
                </div>
                {this.state.status.code === "alert" && (
                    <AlertBox
                        mode="danger"
                        title={this.state.status.title}
                        text={this.state.status.text}
                        setStatus={this.setStatus}
                    />
                )}
            </>
        );

    }
}

class ProtectionLevel extends React.Component {
    constructor(props) {
        super(props);
        this.node = React.createRef();

        this.proceed = this.proceed.bind(this);
        this.state = {
            protectionLevelDesc: appConfig.constants.protectionLevelDesc,
            proceed: false,
        };
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClick, false);
    }

    handleClick = (e) => {
        if (this.node.current.contains(e.target)) {
            if (typeof this.props.proceedToBuy === "function") {
                this.props.proceedToBuy();
            }
            return;
        }
        this.close();
    };

    close() {
        this.props.setProtectionLevelStatus("none");
    }

    proceed() {
        if (this.props.type === "delete") {
            this.props.setProtectionLevelStatus("none", this.props.type);
        } else if (this.props.type === "buy") {
            this.props.proceedToBuy();
        } else if (this.props.type === "add to cart") {
            this.props.setProtectionLevelStatus("none", this.props.type);
        } else if (this.props.type === "MED2OPN") {
            this.props.setProtectionLevelStatus("none");
            this.props.addOnChanged(this.props.type, this.props.e);
        }
    }
    render() {
        return (
            <div className="product-modal">
                <Modal.Dialog>
                    <div ref={this.node}>
                        <Modal.Header closeButton>{/* <Modal.Title>{this.props.title}</Modal.Title> */}</Modal.Header>
                        <Modal.Body>
                            <div className="text-center mb-4">
                                <img src={this.state.protectionLevelDesc[this.props.protectionLevel].imgSrc} />
                            </div>
                            <p className="text-center mb-0">{this.state.protectionLevelDesc[this.props.protectionLevel].text}</p>
                        </Modal.Body>
                        <Modal.Footer className="text-center pt-0">
                            {(this.props.protectionLevel === "low" || this.props.protectionLevel === "incomplete") && (
                                <Button
                                    onClick={() => {
                                        this.proceed();
                                    }} variant="secondary" className="mr-2 border-0">
                                    Yes
                                </Button>
                            )}
                            {(this.props.protectionLevel === "low" || this.props.protectionLevel === "incomplete") && (
                                <Button onClick={() => this.props.setProtectionLevelStatus("none")} variant="secondary" className="ml-2 border-0">
                                    No
                                </Button>
                            )}
                            {this.props.protectionLevel === "fullyProtected" && (
                                <Button
                                    onClick={() => {
                                        this.proceed();
                                    }}
                                    variant="danger"
                                    className="lg"
                                >
                                    Continue
                                </Button>
                            )}
                        </Modal.Footer>
                    </div>
                </Modal.Dialog>
            </div>
        );
    }
}

class Pitches extends React.Component {
    constructor(props) {
        super(props);
        this.node = React.createRef();

        this.proceed = this.proceed.bind(this);
        this.state = {
            title: "Products",
        };
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClick, false);
    }

    handleClick = (e) => {
        if (this.node.current.contains(e.target)) {
            return;
        }
        this.close();
    };

    close() {
        this.props.setStatus("");
    }

    proceed() {
        if (this.props.type === "delete") {
            this.props.setProtectionLevelStatus("none", this.props.type);
        } else if (this.props.type === "buy") {
            this.props.proceedToBuy();
        } else if (this.props.type === "add to cart") {
            this.props.setProtectionLevelStatus("none", this.props.type);
        }
    }
    render() {
        const products = this.props.recom.products.map((product, index) => (
            <>
                <Row>
                    <Col md={12} className="gray_3 my_5">
                        {product.productName}
                    </Col>
                </Row>
                {!!product.pitches.needs.length && (
                    <div>
                        <Row className="mt_5">Need</Row>
                        <div className="bg_dark_gray need_benefits">
                            {product.pitches.needs.map((benefit, index) => (
                                <Row>
                                    <Col md={12} className="gray_3 font_14">
                                        {benefit}
                                    </Col>
                                </Row>
                            ))}
                        </div>
                    </div>
                )}

                {!!product.pitches.benefits.length && (
                    <div>
                        <Row className="mt_5">Benefits</Row>
                        <div className="bg_dark_gray need_benefits">
                            {product.pitches.benefits.map((need, index) => (
                                <Row>
                                    <Col md={12} className="gray_3 font_14">
                                        {need}
                                    </Col>
                                </Row>
                            ))}
                        </div>
                    </div>
                )}
            </>
        ));

        return (
            <Modal.Dialog className="cart_summary_info">
                <div ref={this.node}>
                    <p
                        className="pull-right"
                        onClick={() => {
                            this.props.setStatus("");
                        }}
                    >
                        <img className="close_modal" src="/assets/icons/Forma -8.svg" />
                    </p>
                    <Modal.Header>
                        <Modal.Title>{this.state.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{products}</Modal.Body>
                </div>
            </Modal.Dialog>
        );
    }
}

export { ProductsList, MemberList, ProtectionLevel, Pitches };
