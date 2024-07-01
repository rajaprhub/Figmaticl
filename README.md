export const ckyc = async (proceedToBuy, cartId, state) => {
    let obj = { journeyId: "", App_Ref_No: "", isFailure: false, showPopup: false }
    try {
        const iblCheck = config.PartnerNames.includes(contexts.getContext('partnerName'))
        if (!iblCheck) {
            let App_Ref_No = state.App_Ref_No
            const result = await invoke.getKycValidationResult("partner")
            if (!result.tobeByepassed) {
                if (!state.journeyId || !state.App_Ref_No) {
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
                                obj.showPopup = true
                                obj = { ...obj, ...result }
                            }
                        }
                    }
                }
                if (App_Ref_No) {
                    const data = await invoke.ckycAuth()
                    if (data && data.TokenKey) {
                        const res = await invoke.ckycQuery(data.TokenKey, App_Ref_No)
                        if (res) {
                            if (res.Status.trim() == "Failure" || res.Status == null) {
                                obj.isFailure = true
                                // Handle failure state, do not proceed
                                return obj; // Return failure state
                            } else {
                                proceedToBuy();
                                return "success"; // Proceed with buying process
                            }
                        }
                    }
                }
            } else {
                proceedToBuy();
            }
        } else {
            proceedToBuy();
        }
        return obj; // Return final state
    } catch (err) {
        console.log(err)
        // Handle errors gracefully
        return obj; // Return final state with error
    }
}
