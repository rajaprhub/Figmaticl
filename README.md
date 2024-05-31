"use strict";

//common
import _ from "lodash";
import React from "react";
import { Form, Row, Col, Card, Button, Badge, Modal } from "react-bootstrap";
import moment from "moment";
import { ErrorBox, AlertBox } from "../ux/components";
import { array, initCap, contexts } from "../../public/js/lib";
import invoke from "../../app/lib/helpers/invoke";
import actions from "../../public/js/actions";
import { STAGE_1, STAGE_2, STAGE_3, LOCALE, CART_COOKIE_NAME } from "./med-ques/helper";
import * as lib from "./med-ques/utility/lib";
//define once
// import "bootstrap/dist/css/bootstrap.min.css";

//components
import MedicalQuestions from "./med-ques/MedicalQuestions";
import NoStatement from "./med-ques/NoStatement";
import CaptureDiseasesForMembers from "./med-ques/CaptureDiseasesForMembers";
import CaptureDiseasesDetails from "./med-ques/CaptureDiseasesDetails";
import CaptureLifestyleQues from "./med-ques/CaptureLifestyleQues";
//dummydata
const medQues = require("./med-ques/content/medicalQuesData.json");
const lifestyleQuesJson = require("./med-ques/content/lifestyleQues.json");

class CaptureMedicalQAnswers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            stage: STAGE_1,
            showLifestyleQues: false,
            preparedData: [],
            valid: false,
            currentQues: "",
            questionSequencer: [],
            noStatementChecked: false,
            status: { code: "none", title: "", text: "" },
            lifestyleQs: [],
        };
    }

    getCartId = () => {
        let cartId = contexts.getContext(CART_COOKIE_NAME);
        return cartId;
    };

    async componentDidMount() {
        //get medical questions
        const preparedData = {};
        const theSource = {};
        try {
            const qs = await invoke.getQuestions("medq", LOCALE, null);
            ////////////const qs = medQues.data;

            if (!qs) {
                alert("connectivity Issue");
                return;
            }


            ////////////  filtering medical questions by product here. 
            let medQs = [];
            if (this.props.cartId) {
                const cartData = await invoke.getFullCartContentsByCartId(this.props.cartId);
                medQs = qs.Qs.filter((q) => {
                    return q.forProducts.some((fp) => {
                        return cartData.some((crtData) => {
                            return crtData.productCode === fp
                        })
                    })
                })
            }

            theSource.medicalQs = qs ? (medQs && medQs.length > 0) ? medQs : qs.Qs : null;
            theSource.stage3Qs = qs ? qs.stage3Qs : null;
            theSource.lifestyleQs = lifestyleQuesJson;
            if (theSource.medicalQs !== null) {
                for (const { key } of theSource.medicalQs) {
                    preparedData[key] = { memberList: [], diseases: [] };
                }
            }
        } catch (ex) {
            throw new Error(ex);
        }

        //get members list
        let memberDataExist = false;
        let cartId = this.getCartId();
        let memberList = [];
        let showLifestyleQues = false;
        try {
            const members = await invoke.getMemberList(null, cartId);
            // const members = null;
            if (members) {
                for (let memberId in members) {
                    let { RELATIONSHIP, tobacco, proposalDetails, AGE } = members[memberId];
                    if (tobacco) showLifestyleQues = true;
                    memberList.push({
                        memberId,
                        name: initCap(proposalDetails ? proposalDetails[0].fName : ""),
                        RELATIONSHIP: initCap(RELATIONSHIP),
                        tobacco,
                        AGE,
                        cartId
                    });
                }
                memberList = memberList.map((mem) => {
                    let newData = { displayText: `${mem.RELATIONSHIP} - ${mem.name}` };
                    return { ...mem, ...newData };
                });
            } else {
                // memberList = [
                //     {
                //         memberId: 1,
                //         RELATIONSHIP: "Father",
                //         name: "Member",
                //         tobacco: true,
                //     },
                //     {
                //         memberId: 2,
                //         RELATIONSHIP: "Son",
                //         name: "Member",
                //         tobacco: true,
                //     },
                //     {
                //         memberId: 3,
                //         RELATIONSHIP: "Daughter",
                //         name: "Member",
                //         tobacco: true,
                //     },
                // ].map((mem) => {
                //     let newData = { displayText: `${mem.RELATIONSHIP} - ${mem.name}` };
                //     if (mem.tobacco) showLifestyleQues = true;
                //     return { ...mem, ...newData };
                // });
            }
        } catch (ex) {
            throw new Error(ex);
        }

        //check if data present for each member if yes then populate the same

        let count = 0;
        let questionSequencer = [];
        let lifestyleQs = [];
        let promise = new Promise((resolve, reject) => {
            memberList.map(async (mem) => {
                // let memberData = await invoke.getMedicalQuesDetails(cartId, mem.memberId);
                invoke
                    .getMedicalQuesDetails(cartId, mem.memberId)
                    .then((memberData) => {
                        count++;
                        if (memberData) {
                            memberDataExist = true;
                            let questions = Object.keys(memberData);
                            for (const ques of questions) {
                                if (memberData[ques] === null) {
                                    continue;
                                }
                                if (ques === lib.LIFESTYLE_QS) {
                                    let lifeData = { lifestyleList: memberData[ques], memberId: mem.memberId };
                                    lifestyleQs.push(lifeData);
                                } else {
                                    questionSequencer.push(ques);
                                    let newData = { diseasesList: memberData[ques], memberId: mem.memberId, AGE: mem.AGE };
                                    preparedData[ques].diseases.push(newData);
                                    let newMemberData = { displayText: mem.displayText, memberId: mem.memberId, AGE: mem.AGE };
                                    preparedData[ques].memberList.push(newMemberData);
                                }
                            }
                        }
                        if (count === memberList.length) {
                            resolve({ preparedData, questionSequencer, lifestyleQs });
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        });
        promise
            .then(({ preparedData, questionSequencer, lifestyleQs }) => {
                questionSequencer = [...new Set(questionSequencer)];
                this.setState({ preparedData, questionSequencer, valid: !!questionSequencer.length, lifestyleQs });
            })
            .catch((err) => {
                throw new Error(err);
            });

        this.setState({ loading: false, theSource, preparedData, memberList, preparedData, showLifestyleQues });
    }

    saveAndExit = () => {
        // Call API to save med q answers and move to dashboard
        this.storeDataMemberWiseIntoDb(this.setStage, "", "");
        this.props.history.replace("/dash");
    };

    updateObject = (qKey, aid, value, valid, key) => {
        if (key === lib.LIFESTYLE_QS) {
            this.setState({ [key]: aid, valid });
        } else {
            let preparedDataCloned = _.cloneDeep(this.state.preparedData);
            preparedDataCloned[qKey][key] = aid;
            //check if member exists or not
            let remove = false;
            if (!preparedDataCloned[qKey].memberList.length) remove = true;
            let questionSeq;
            if (!remove) {
                questionSeq = [...this.state.questionSequencer, qKey];
                questionSeq = [...new Set(questionSeq)];
            } else {
                questionSeq = [...this.state.questionSequencer];
                const index = questionSeq.indexOf(qKey);
                questionSeq.splice(index, 1);
            }
            this.setState({ preparedData: preparedDataCloned, valid, questionSequencer: questionSeq });
        }
    };

    getMemberDetailsById = (mId) => {
        let memberDetail = this.state.preparedData[this.state.currentQues].memberList.find((el) => el.memberId === mId);
        return memberDetail ? memberDetail.displayText : "";
    };

    jumpNextQuestion = () => {
        let nextQues = [];
        let preData = _.cloneDeep(this.state.preparedData);
        for (let ques in preData) {
            if (preData[ques].memberList.length && this.state.currentQues !== ques) {
                nextQues.push(ques);
            }
        }
        return nextQues[0];
    };

    validateQuestionsDetails = () => {
        let errorCount = 0;
        lib.resetErrorMessages();
        //get visible form id
        let formId = "";
        document.querySelectorAll("form").forEach((ele) => {
            if (!!(ele.offsetWidth || ele.offsetHeight || ele.getClientRects().length)) {
                //true (visible)
                formId = ele.getAttribute("id");
            }
        });
        // document.querySelectorAll(`#${formId} input[name^="ion-dt-"]`).forEach((ele) => {
        //     if (ele.value === "") {
        //         let span = document.createElement("span");
        //         let div = ele.closest(".datepicker");
        //         span.innerHTML = lib.errorMsg.req;
        //         span.classList.add("error_message");
        //         errorCount++;
        //         div.parentNode.insertBefore(span, div.nextSibling);
        //     }
        // });
        
        document.querySelectorAll(`#${formId} input, #${formId} date-picker-stage-three`).forEach((ele) => {
            if (ele.value === ""  && errorCount == 0) {
                let span = document.createElement("span");
                let div = ele.closest(".datepicker");
                span.innerHTML = lib.errorMsg.req;
                span.classList.add("error_message");
                errorCount++;
                div?.parentNode.insertBefore(span, div.nextSibling);
            }
            
        });

        document.querySelectorAll(`#${formId} input, #${formId} select`).forEach((ele) => {
            if (!ele.checkValidity()) {
                let span = document.createElement("span");
                span.innerHTML = lib.errorMsg.req;
                span.classList.add("error_message");
                errorCount++;
                ele.closest(".form-group").insertBefore(span, ele.nextSibling);
            }
        });
        return errorCount;
    };

    validateLifestyleQues = () => {
        lib.resetErrorMessages();
        document.querySelectorAll(`.lifestyleQs input, .lifestyleQs select`).forEach((ele) => {
            if (!ele.checkValidity() && !!(ele.offsetWidth || ele.offsetHeight || ele.getClientRects().length)) {
                let span = document.createElement("span");
                if (ele.getAttribute("name") === lib.MANY_PER_DAY) {
                    span.innerHTML = lib.errorMsg.numberOnly;
                } else {
                    span.innerHTML = lib.errorMsg.req;
                }
                span.classList.add("error_message");
                ele.parentNode.insertBefore(span, ele.parentNode.nextSibling);
            }
        });
    };

    storeDataMemberWiseIntoDb = async (cb, quesToBeSet, stageToBeSet) => {
        let cartId = this.getCartId();
        if (!this.state.currentQues) {
            cb(quesToBeSet, stageToBeSet);
            return;
        }
        if (this.state.currentQues === lib.LIFESTYLE_QS) {
            let currentLifestyleData = _.cloneDeep(this.state.lifestyleQs);
            if (currentLifestyleData.length <= 0) {
                cb(quesToBeSet, stageToBeSet);
                return;
            }
            try {
                for (const habit of currentLifestyleData) {
                    //allow data save only for selected members
                    await invoke.sendMedicalQuestionsDetailMemberWise(
                        this.state.currentQues,
                        habit.lifestyleList,
                        habit.memberId,
                        cartId
                    );
                }
                cb(quesToBeSet, stageToBeSet);
            } catch (ex) {
                throw new Error(ex);
            }
        } else {
            let getCurrentQuesData = _.cloneDeep(this.state.preparedData[this.state.currentQues].diseases);
            let currentSelectedMembers = _.cloneDeep(this.state.preparedData[this.state.currentQues].memberList);
            if (getCurrentQuesData.length <= 0) {
                cb(quesToBeSet, stageToBeSet);
                return;
            }
            try {
                let currentSelectedMembersArray = currentSelectedMembers.map((data) => data.memberId);
                for (const disease of getCurrentQuesData) {
                    //allow data save only for selected members
                    if (currentSelectedMembersArray.includes(disease.memberId)) {
                        await invoke.sendMedicalQuestionsDetailMemberWise(
                            this.state.currentQues,
                            disease.diseasesList,
                            disease.memberId,
                            cartId
                        );
                    } else {
                        await invoke.sendMedicalQuestionsDetailMemberWise(
                            this.state.currentQues,
                            null,
                            disease.memberId,
                            cartId
                        );
                    }
                }
                cb(quesToBeSet, stageToBeSet);
            } catch (ex) {
                throw new Error(ex);
            }
        }
    };

    decideNextStage = () => {
        let stageToBeSet;
        let quesToBeSet;
        if (this.state.stage === STAGE_1) {
            stageToBeSet = STAGE_2;
            quesToBeSet = this.state.questionSequencer[0];
            this.removeMembersDataIfExist();
        } else if (this.state.stage === STAGE_2) {
            if (this.state.currentQues === lib.MEDTEST || this.state.currentQues === lib.LASTMEDTEST) {
                const index = this.state.questionSequencer.indexOf(this.state.currentQues);
                if (index !== -1) {
                    quesToBeSet = this.state.questionSequencer[index + 1];
                    stageToBeSet = STAGE_2;
                }

            } else {
                stageToBeSet = STAGE_3;
                quesToBeSet = this.state.currentQues;
            }
        } else if (this.state.stage === STAGE_3) {
            const index = this.state.questionSequencer.indexOf(this.state.currentQues);
            quesToBeSet = this.state.questionSequencer[index + 1];
            stageToBeSet = STAGE_2;
        } else if (this.state.stage === lib.LIFESTYLE_QS) {
            // this.props.setMode("coveragePeriod");
            this.props.setMode("tc");
        }
        if (!quesToBeSet && this.state.showLifestyleQues) {
            stageToBeSet = lib.LIFESTYLE_QS;
            quesToBeSet = lib.LIFESTYLE_QS;
        } else if (!quesToBeSet) {
            // this.props.setMode("coveragePeriod");
            this.props.setMode("tc");
        }
        //save current data into DB
        this.storeDataMemberWiseIntoDb(this.setStage, quesToBeSet, stageToBeSet);
    };

    setStage = (quesToBeSet, stageToBeSet) => {
        this.setState({
            stage: stageToBeSet,
            // valid: false,
            currentQues: quesToBeSet,
            status: {
                code: "none",
                title: "",
                text: "",
            },
        });
    };

    validateMedTestData = () => {
        let validSelection = true;
        let diseaseCountPerMember = 0;
        for (const data of this.state.preparedData[this.state.currentQues].diseases) {
            if (data.diseasesList.length <= 0) {
                validSelection = false;
                break;
            } else {
                for (const test of data.diseasesList) {
                    let selectedOptions = Object.keys(test);
                    if (selectedOptions.includes(lib.MEDTEST_DATE) && selectedOptions.length <= 1) {
                        validSelection = false;
                        break;
                    }
                }
                diseaseCountPerMember++;
            }
        }
        if (diseaseCountPerMember < this.state.preparedData[this.state.currentQues].memberList.length) {
            validSelection = false;
        }
        return validSelection;
    };

    validateMemberWiseData = () => {
        let validSelection = true;
        let diseaseCountPerMember = 0;
        for (const data of this.state.preparedData[this.state.currentQues].diseases) {
            if (data.diseasesList.length <= 0) {
                validSelection = false;
                break;
            } else {
                diseaseCountPerMember++;
            }
        }
        if (diseaseCountPerMember < this.state.preparedData[this.state.currentQues].memberList.length) {
            validSelection = false;
        }
        return validSelection;
    };

    validateThirdStageData = () => {
        //mandatory
        let valid = true;
        let allData = _.cloneDeep(this.state.preparedData[this.state.currentQues].diseases);
        console.log(allData,'allData')
        for (const { diseasesList, memberId } of allData) {
            for (const disease of diseasesList) {
                let existingKeys = Object.keys(disease);
                if (!existingKeys.includes(lib.DISEASE_MANAGEDBY) && this.state.currentQues === "PED") {
                    valid = false;
                    break;
                }
                let fields = this.state.theSource.stage3Qs[disease.type];
                let mandatoryFieldKeys;
                if (this.state.currentQues === "PED") {
                    mandatoryFieldKeys = _.chain(fields)
                        .map("data")
                        .flatten()
                        .filter({ for: [disease.DISEASE_MANAGEDBY], mandatory: true })
                        .map("key")
                        .value();
                } else {
                    mandatoryFieldKeys = _.chain(fields)
                        .map("data")
                        .flatten()
                        .filter({ mandatory: true })
                        .map("key")
                        .value();
                }
                //all mandatory keys should be in existing keys
                let madKeys = mandatoryFieldKeys.filter((el) => existingKeys.includes(el));
                if (madKeys.length !== mandatoryFieldKeys.length) {
                    valid = false;
                    break;
                }
            }
            if (!valid) break;
        }
        return valid;
    };

    validateLifestyleData = () => {
        let validSelection = true;
        let diseaseCountPerMember = 0;
        for (const data of this.state.lifestyleQs) {
            if (data.lifestyleList.length <= 0) {
                validSelection = false;
                break;
            } else {
                for (const test of data.lifestyleList) {
                    let selectedOptions = Object.keys(test);
                    if (selectedOptions.length < 3) {
                        validSelection = false;
                        break;
                    }
                }
                diseaseCountPerMember++;
            }
        }
        let members = this.state.memberList.filter((mem) => {
            return mem.tobacco;
        });
        if (diseaseCountPerMember !== members.length) {
            validSelection = false;
        }
        return validSelection;
    };

    removeDataForCurrentMembers = async () => {
        //remove all data for all members
        let cartId = this.getCartId();
        for (const member of this.state.memberList) {
            for (const ques of Object.keys(this.state.preparedData)) {
                if (this.state.preparedData[ques].diseases.length) {
                    await invoke.sendMedicalQuestionsDetailMemberWise(ques, null, member.memberId, cartId);
                }
            }
        }
    };

    removeMembersDataIfExist = async () => {
        let cartId = this.getCartId();
        for (const ques of Object.keys(this.state.preparedData)) {
            if (!this.state.preparedData[ques].memberList.length && this.state.preparedData[ques].diseases.length) {
                for (const member of this.state.memberList) {
                    await invoke.sendMedicalQuestionsDetailMemberWise(ques, null, member.memberId, cartId);
                }
            }
        }
    };

    saveAndNext = () => {
        if (this.state.noStatementChecked && this.state.stage !== lib.LIFESTYLE_QS && this.state.showLifestyleQues) {
            this.removeDataForCurrentMembers();
            this.setState({
                stage: lib.LIFESTYLE_QS,
                currentQues: lib.LIFESTYLE_QS,
            });
            return;
        } else if (this.state.noStatementChecked && !this.state.showLifestyleQues) {
            this.removeDataForCurrentMembers();
            // this.props.setMode("coveragePeriod");
            this.props.setMode("tc");
            return;
        }
        // Start: Validation
        let errorObj = {
            error: false,
            text: "",
        };

        if (this.state.stage === STAGE_1 && !this.state.questionSequencer.length) {
            errorObj.error = true;
            errorObj.title = `Select at least one member before proceeding.`;
        } else if (this.state.stage === STAGE_2) {
            if (this.state.currentQues === lib.MEDTEST && !this.validateMedTestData()) {
                errorObj.error = true;
                errorObj.title = `Please select test data for each member before proceeding. Make sure to select at least one test.`;
            } else if (!this.validateMemberWiseData()) {
                errorObj.error = true;
                errorObj.title = `Please select at least one disease for each member before proceeding.`;
            }
        } else if (this.state.stage === STAGE_3 &&   this.validateQuestionsDetails()) {
            // !this.validateThirdStageData()
            errorObj.error = true;
            errorObj.title = `Please select details for each disease and for each member before proceeding further.`;
        } else if (this.state.stage === lib.LIFESTYLE_QS && !this.validateLifestyleData()) {
            this.validateLifestyleQues();
            errorObj.error = true;
            errorObj.title = `Select at least one habit before proceeding for each member.`;
        }

        if (errorObj.error) {
            this.setState({
                status: {
                    code: "error",
                    title: `Can't proceed further`,
                    text: errorObj.title,
                },
            });
            return;
        }
        // End: Validation

        this.decideNextStage();
    };

    handleNoStatementClick = (e) => {
        this.setStatus("none")
        let clonedPreparedData = _.cloneDeep(this.state.preparedData);
        for (const key of Object.keys(clonedPreparedData)) {
            document.querySelectorAll(`input[name="${key}"]`).forEach((ele) => {
                if (e.currentTarget.checked) ele.checked = false;
                ele.disabled = e.currentTarget.checked;
            });
            clonedPreparedData[key].memberList = [];
        }

        this.setState({
            preparedData: clonedPreparedData,
            noStatementChecked: e.currentTarget.checked,
            questionSequencer: [],
        });
    };

    setStatus = (code) => {
        this.setState({ status: { code, title: "", text: "" } });
    };

    handleBackClick = () => {
        let currentQues = "";
        let stage = "";
        let questionSeq = [...this.state.questionSequencer];
        const index = questionSeq.indexOf(this.state.currentQues);
        if (["PED", "SURGERY", "MEDTEST", "LASTMEDTEST", "VECTOR", "SARVA"].includes(this.state.currentQues) && this.state.stage === STAGE_2) {
            currentQues = questionSeq[index - 1];
            if (currentQues === "PED" || currentQues === "SURGERY" || currentQues === "VECTOR" || currentQues === "SARVA") {
                stage = STAGE_3;
            } else if (currentQues === "MEDTEST") {
                stage = STAGE_2;
            } else {
                stage = STAGE_1;
            }
        } else if (["PED", "SURGERY", "MEDTEST", "VECTOR", "SARVA"].includes(this.state.currentQues) && this.state.stage === STAGE_3) {
            currentQues = this.state.currentQues;
            stage = STAGE_2;
        } else if (this.state.stage === "lifestyleQs") {
            if (questionSeq[questionSeq.length - 1]) {
                currentQues = questionSeq[questionSeq.length - 1];
                stage = (currentQues === "MEDTEST") ? STAGE_2 : STAGE_3;
            } else {
                stage = STAGE_1;
            }
        } else if (!questionSeq[index - 1] && this.state.stage !== "lifestyleQs") {
            this.props.setMode("insuredMembersList");
        }
        this.setState({ currentQues, stage });
        //valid needs to be true because you came to current screen after successfully filling all details in previous page
    };

    render() {
        return (
            <>
                <div className="top_bg_green">
                    <div className="container custom_container">
                        <div className="position-relative py_20 white semi-bold h_90 font_18">
                            <button
                                className="back_btn"
                                type="button"
                                onClick={() => {
                                    this.handleBackClick();
                                }}
                            >
                                <img src="assets/icons/Forma -5.svg" />
                            </button>
                            <span className="m_heading">
                                {this.state.stage === "lifestyleQs" ? "Lifestyle" : "Medical Questionnaire"}
                            </span>
                            <div className="status-bar-prod-wrapper" style={{ justifyContent: "flex-end" }}>
                                <div className="status-bar-product">
                                    <div className="status-complete" style={{ width: "90%" }}></div>
                                </div>
                                <div className="status-per">90%</div>
                            </div>
                        </div>
                        <div className="round_l p-4 m_form medical_quesionaire mb-5 ">
                            <div className="row">
                                <div className="col-md-7">
                                    {this.state.status.code === "error" && (
                                        <AlertBox
                                            mode="danger"
                                            setStatus={this.setStatus}
                                            title={this.state.status.title}
                                            text={this.state.status.text}
                                        />
                                    )}
                                    {/*show medical questions*/}
                                    {this.state.stage === STAGE_1 &&
                                        this.state.theSource &&
                                        this.state.theSource.medicalQs.map(({ key, seq, data }) => (
                                            <MedicalQuestions
                                                key={key}
                                                setStatus={this.setStatus}
                                                medQuesData={data}
                                                seq={seq}
                                                onBuild={this.updateObject}
                                                custData={this.state.preparedData[key] || null}
                                                memberList={this.state.memberList ? _.orderBy(this.state.memberList, ['AGE'], ['desc']) : null}
                                            />
                                        ))}

                                    {/* show no statement applies section */}
                                    {this.state.stage === STAGE_1 && (
                                        <NoStatement value={this.state.noStatementChecked} handleClick={this.handleNoStatementClick} />
                                    )}
                                    {/* capture disease for each member */}
                                    {this.state.stage === STAGE_2 &&
                                        this.state.theSource.medicalQs.map(({ key, data }) =>
                                            this.state.preparedData[key].memberList.length ? (
                                                <div
                                                    key={key}
                                                    id={`${key}_${this.state.stage}`}
                                                    className={this.state.currentQues === key ? "" : "hide"}
                                                >
                                                    <CaptureDiseasesForMembers
                                                        key={key}
                                                        qKey={key}
                                                        stage2Qs={data.stage2 ? data.stage2 : null}
                                                        onBuild={this.updateObject}
                                                        memberList={this.state.preparedData[key].memberList}
                                                        custData={this.state.preparedData[key] || null}
                                                    />
                                                </div>
                                            ) : null
                                        )}
                                    {/* capture disease details for each member */}
                                    {this.state.stage === STAGE_3 && (
                                        <CaptureDiseasesDetails
                                            stage3Qs={this.state.theSource.stage3Qs}
                                            memberList={this.state.preparedData[this.state.currentQues].memberList}
                                            onBuild={this.updateObject}
                                            qKey={this.state.currentQues}
                                            custData={this.state.preparedData[this.state.currentQues] || null}
                                        />
                                    )}
                                    {/* capture lifestyle questions */}
                                    {this.state.showLifestyleQues && this.state.stage === "lifestyleQs" && (
                                        <CaptureLifestyleQues
                                            onBuild={this.updateObject}
                                            memberList={
                                                this.state.memberList
                                                    ? this.state.memberList.filter((mem) => {
                                                        return mem.tobacco;
                                                    })
                                                    : null
                                            }
                                            lifestyleQs={this.state.theSource.lifestyleQs ? this.state.theSource.lifestyleQs : null}
                                            custData={this.state.lifestyleQs || null}
                                        />
                                    )}

                                    <div className="mt-5">
                                        {/*		<Button className="round" variant="success" onClick={this.saveAndExit}>
											SAVE FOR LATER
										</Button>  */}
                                        <Button className="round ml-2 w_140" variant="danger" onClick={this.saveAndNext}>
                                            NEXT 
                                        </Button>
                                    </div>
                                </div>
                                <div className="col-lg-5 mt-5 text-center semi-bold lh_26 d-none d-lg-block">
                                    <div className="mb-4"><img src="/img/logo_p2p_color.svg" width="168px" /></div>
                                    <div className="mb-4 px-md-5 green font_22"><span>The perfect way to protect your health</span></div>
                                    <div className="px-md-4"><img src="/img/img1.png" className="w-100" /></div>
                                </div>
                            </div>
                        </div>
                        {/*}	<Row className="row_cl px-1 text-center pt_15 pb-2 top_box_shadow mt-5 mx-0 two_btn bottom_fix">
							<Col className="col-6" md={6}>
								<Button className="w-100 round" variant="success" onClick={this.saveAndExit}>
									SAVE FOR LATER
								</Button>
							</Col>
							<Col className="col-6" md={6}>
								<Button className="w-100 round" variant="danger" onClick={this.saveAndNext}>
									NEXT
								</Button>
							</Col>
						</Row>  */}
                    </div>
                </div>
            </>
        );
    }
}

export { CaptureMedicalQAnswers };
