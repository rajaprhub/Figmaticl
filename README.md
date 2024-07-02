class CaptureDiseasesDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            qKey: this.props.qKey,
            showPopover: false,
            event: "",
            currentMember: this.props.memberList[0],
            currentDisease: this.props.custData.diseases[0].diseasesList[0].key,
            value: this.props.custData.diseases ? this.props.custData.diseases : {},
            valid: false,
        };
    }

    handleMemberOnClick = (memberId) => {
        //change member in state and reset the fields if switched to a new member
        if (this.state.currentMember.memberId !== memberId) {
            let selectedMember = array.findAndSay(this.props.memberList, { memberId: memberId });
            let diseaseData = this.getDiseasesByMember(memberId);
            this.setState({ currentMember: selectedMember, currentDisease: diseaseData.diseasesList[0].key }, () => {
                document.getElementById(this.state.currentDisease).reset();
                document.querySelector("ion-datetime").value = "";
                document.querySelectorAll(".error_message").forEach((element) => {
                    element.parentNode.removeChild(element);
                });
                document.querySelector('a[data-rb-event-key="' + this.state.currentDisease + '"]').click();
            });
        }
    };
    getCurrentMemberDiseaseData = () => {
        let currentQuesData = _.cloneDeep(this.state.value);
        let currentMemberData = array.findAndSay(currentQuesData, { memberId: this.state.currentMember.memberId });
        let currentDiseaseData = array.findAndSay(currentMemberData.diseasesList, { key: this.state.currentDisease });
        return currentDiseaseData;
    };

    validateData = () => {
        //mandatory
        let valid = true;
        let allData = _.cloneDeep(this.state.value);
        for (const { diseasesList, memberId } of allData) {
            for (const disease of diseasesList) {
                //get all details key of current disease
                let existingKeys = Object.keys(disease);
                //check if radio button is selected or not in case of PED
                if (!existingKeys.includes(lib.DISEASE_MANAGEDBY) && this.state.qKey === "PED") {
                    valid = false;
                    break;
                }
                //get the fields for disease details
                let fields = this.props.stage3Qs[disease.type];
                let mandatoryFieldKeys;
                //get all keys in disease fields which is mandatory
                if (this.state.qKey === "PED") {
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
    /**
     *
     * @param {Medical Ques} qid
     * @param {disease ques} aid
     * @param {disease ques value} value
     */
    updateObject = (qid, aid, value, additionalInfo = "") => {
        let valid = false;
        let currentQuesData = _.cloneDeep(this.state.value);
        let currentMemberData = array.findAndSay(currentQuesData, { memberId: this.state.currentMember.memberId });
        let currentDiseaseData = array.findAndSay(currentMemberData.diseasesList, { key: this.state.currentDisease });
        if (aid === lib.DISEASE_MANAGEDBY) {
            //Todo:Need to make it dynamic
            //only add the keys here which are coming from previous stage
            currentDiseaseData = _.pick(currentDiseaseData, [
                lib.DISEASE_DIAGNOSISYEAR,
                lib.DISEASE_MANAGEDBY,
                "catId",
                "displayText",
                "key",
                "type",
                "decision",
                "additionalInfo",
                "catDisplayText",
                "DISEASE_COMPLICATION_OTHERS",
            ]);
        }
        // let memberKey = currentDiseaseData.findIndex((el) => el.key === aid);
        let newDiseaseValue = { [aid]: value };
        currentDiseaseData = { ...currentDiseaseData, ...newDiseaseValue };
        if (additionalInfo) {
            currentDiseaseData = { ...currentDiseaseData, ...additionalInfo };
        }
        const diseaseIndex = currentMemberData.diseasesList.findIndex((el) => el.key === currentDiseaseData.key);
        if (diseaseIndex !== -1) {
            currentMemberData.diseasesList.splice(diseaseIndex, 1, currentDiseaseData);
        }
        const memberIndex = currentQuesData.findIndex((el) => el.memberId === currentMemberData.memberId);
        if (memberIndex !== -1) {
            currentQuesData.splice(memberIndex, 1, currentMemberData);
        }
        this.setState({ value: currentQuesData }, () => {
            valid = this.validateData();
            this.setState({ valid }, () => {
                this.props.onBuild(this.props.qKey, this.state.value, "", this.state.valid, "diseases");
            });
        });
    };
    getDiseasesByMember = (mId) => {
        return array.findAndSay(this.props.custData.diseases, { memberId: mId });
    };
    setCurrentDisease = (selectedDisease) => {
        this.setState({ currentDisease: selectedDisease });
    };
    render() {
        let currentDiseases = this.getDiseasesByMember(this.state.currentMember.memberId);
        let currentMemberDiseaseData = this.getCurrentMemberDiseaseData();
        if ((currentMemberDiseaseData !== null && currentMemberDiseaseData !== undefined) && currentMemberDiseaseData.DISEASE_MANAGEDBY !== null) {
            currentMemberDiseaseData.DISEASE_MANAGEDBY = lib.DISEASE_MANAGEDBY;
        }
        return (
            <>
                <>
                    <IonPopover
                        cssClass='my-custom-class'
                        isOpen={this.state.showPopover}
                        onDidDismiss={() => this.setState({showPopover: false})}
                    >
                        <p>{this.state.message}</p>
                    </IonPopover>
                </>
                <div className="disease-details">
                    <MemberList
                        memberList={this.props.memberList}
                        currentMember={this.state.currentMember}
                        onClick={this.handleMemberOnClick}
                    />
                    {/* is it possible for different diseases to have different stage3Qs type if yes then we need to render separately */}
                    <Tabs
                        defaultActiveKey={this.props.currentDisease}
                        onSelect={(eventKey) => this.setCurrentDisease(eventKey)}
                    >
                        {currentDiseases &&
                            currentDiseases.diseasesList.map((disease, index) => (
                                <Tab eventKey={disease.key} title={<span>
                                    {
                                      disease.displayText.length > 10 ? disease.displayText.substring(0, 10) + "..." : disease.displayText
                                    } <span onClick={
                                        () => this.setState({showPopover: true, message: disease.displayText})
                                    } class="info sarvaInfo">i</span>
                                </span>} key={disease.key}>
                                    <DiseaseDetails
                                        key={disease.key}
                                        medQuesKey={this.state.qKey}
                                        seq={index}
                                        disease={disease}
                                        currentMemberDiseaseData={disease}
                                        diseaseInfoFields={this.props.stage3Qs[disease.type]}
                                        currentMember={this.state.currentMember.memberId}
                                        currentDisease={this.state.currentDisease}
                                        onBuild={this.updateObject}
                                    />
                                </Tab>
                            ))}
                    </Tabs>
                </div>
            </>
        );
    }
}
