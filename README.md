
export const ckyc = async (proceedToBuy, cartId, state) => {
    let obj = { journeyId: "", App_Ref_No: "", isFailure: false }
    try {
        let App_Ref_No = state.App_Ref_No
        const result = await invoke.getKycValidationResult("agency")
        if (!result.tobeByepassed) {
            // if (!state.journeyId || !state.App_Ref_No) {
                const response = await invoke.getFullCartContentsByCartId(cartId);
                if (response) {
                    const journeyDetail = await invoke.getJourneyDetails("pr", response[0].cartDetailsId);
                    obj.journeyId = response[0].cartDetailsId
                    if (journeyDetail) {
                        const find = _.find(journeyDetail.preparedData, "ckycInfo")
                        obj.preparedData = journeyDetail.preparedData
                        if (find) {
                            App_Ref_No = _.get(find, "ckycInfo.App_Ref_No", "")
                            obj.App_Ref_No = App_Ref_No
                        }
                        const result = await setDetails(cartId)
                        if (result) {
                            obj = { ...obj, ...result }
                        }
                    }
                }
            // }
            if (App_Ref_No) {
                const data = await invoke.ckycAuth()
                if (data && data.TokenKey) {
                    const res = await invoke.ckycQuery(data.TokenKey, App_Ref_No)
                    if (res && (res.Status.trim() == "Failure" || res.Status == null)) {
                        obj.isFailure = true
                    } else {
                        proceedToBuy();
                        return ""
                    }
                }
            }
        } else {
            proceedToBuy();
        }
        return obj
    } catch (err) {
        console.log(err)
    }
}

export const kycVerification = async (state, preparedData, setIsKycValid) => {
    const obj = { status: "", data: {} }
    const preData = _.cloneDeep(preparedData)
    const kycRes = await kycValidation(state)
    if (kycRes.check) {
        setIsKycValid()
        if (preparedData && preparedData.length) {
            const name = _.find(preparedData, { key: "NAME" }).a
            const mobile = _.find(preparedData, { key: "MOBILE" }).a
            const gender = preparedData.find(ele => ele.key.includes("GENDER"))
            const setGender = gender.key.split("-")[1]
            let raw = {
                "PrivateKey": config.constants.ckyc_privateKey,
                "Verify_Type": "VERIFY_DEMOGRAPHY", //VERIFY or VERIFY_DEMOGRAPHY
                "App_Ref_No": uuidv4(),
                "Customer_Type": "I",
                "Customer_Name": name[0] + " " + (name[1] ? name[1] + " " : "") + name[2],
                "DOB_DOI": moment(new Date(state.dobForKyc)).format("DD-MM-YYYY"),
                "Mobile_No": mobile,
                "CKYC_No": state.kycDetail['CKYC'] || "",
                "PAN_No": state.kycDetail['PAN CARD'] || "",
                "Aadhar_No": state.kycDetail['AADHAAR CARD'] || "",
                "DL_No": state.kycDetail['DRIVING LICENSE'] || "",
                "Voter_ID": state.kycDetail['VOTER ID CARD'] || "",
                "Passport_no": state.kycDetail['PASSPORT'] || "",
                "Gender": setGender == "MALE" ? "M" : setGender == "FEMALE" ? "F" : "O",
                "CIN": ""
            }
            return new Promise(resolve => {
                actions.validateCkycStatus(raw, ((data, error) => {
                    obj.data = data
                    if (data.Status == "Failure") {
                        obj.status = "Failure"
                    }
                    const find = _.find(preData, "ckycInfo")
                    if (find) {
                        const findIndex = _.findIndex(preData, "ckycInfo")
                        if (findIndex !== -1) {
                            preData.splice(findIndex, 1)
                        }
                    }
                    preData.push({ ckycInfo: data })
                    actions.registerJourney(
                        config.constants.pylonInfo,
                        contexts.getContext('journey'),
                        state.journeyId,
                        name[0] + " " + (name[1] ? name[1] + " " : "") + name[2], preData, "", "", "", "",
                        (data) => {
                            if (_.get(data, "cartId"))
                                contexts.setContext("fabric-cart", data.cartId);
                        }
                    );
                    obj.check = true
                    return resolve(obj)
                }))
            });
        }
    } else {
        return kycRes
    }
    return obj
}
