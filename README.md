
    static generateClaimStatusToken() {
        var urlencoded = new URLSearchParams();
        urlencoded.append("grant_type", "password");
        urlencoded.append("username", "usr_inthat");
        urlencoded.append("password", "!nt#@t");
        const options = {
            uri: `${config.constants.modelPremium.baseUrl}/endpoint/token`,
            method: "POST",
            body: urlencoded,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic XzloZ2ZZdHlUU3dmbTgzcDZLVWFsRkVCT0t3YToxOHdzYXgxbm94Tjgxa09wRmx4RzVDcUQzeXNh",
            },
            redirect: "follow"
        };
        try {
            return callThisOne(options)
        } catch (ex) {
            return null;
        }
    }
