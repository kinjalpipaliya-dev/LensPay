import { useEffect, useState } from "react";
import { getProfiles } from "../services/lens";
import { User$ } from "../services/user";

const useLensProfile = (address) => {
    const [lensProfile, setLensProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('Fetching profile from lens');

    const getOwnedProfiles = async () => {
        setIsLoading(true);
        try {
            const userProfile = await getProfiles({
                "ownedBy": [address],
                "limit": 1
            });
            if (userProfile) {
                console.log("Lens profiles", userProfile);
                setLensProfile(userProfile?.data?.profiles?.items[0]);
                // await updatePluginLens('wallet', address, userProfile?.data?.profiles?.items[0]);
            }
        } catch (error) {
        }
        setIsLoading(false);
    }

    useEffect(() => {
        if (address) {
            getOwnedProfiles();
        }
    }, [address]);



    return ({
        lensData: User$(lensProfile),
        isLoading: isLoading,
        loadingText: loadingText,
        getOwnedProfiles: getOwnedProfiles
    }
    )

}
export default useLensProfile;