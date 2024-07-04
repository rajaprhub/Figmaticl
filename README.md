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
