import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { authenticate_user, generateChallenge } from "../services/lens";
import useLensProfile from "./useLensProfile";

let ethersProvider
if (window.ethereum) {
    ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
}

const signText = (text) => {
    console.log("Signing the message");
    return ethersProvider.getSigner().signMessage(text);
}

const useLensAuth = () => {

    const [token, setToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const lensProfile = useLensProfile(ethersProvider.getSigner().address);
    const [isLoading, setIsLoading] = useState(lensProfile.isLoading);
    const [loadingText, setLoadingText] = useState('Fetching lens profile');
    const [signButtonText, setSignButtonText] = useState("Sign-In with Lens");

    // hooks
    
    const fetchLensToken = async () => {
        console.log("signerAddress", ethersProvider.getSigner().address);
        setIsLoading(true);
        if (lensProfile?.lensData) {
            try {
                const challenge = await generateChallenge(ethersProvider.getSigner().address);
                const signature = await signText(challenge);
                // const authRequest = await authenticate_user(signerAddress, signature);
                console.log("Got signature");

                authenticate_user(ethersProvider.getSigner().address, signature).then(data => {
                    // console.log('Lens Tokens', data);
                    setToken(data['accessToken']);
                    localStorage.setItem('accessToken', data['accessToken']);
                    setRefreshToken(data['refreshToken']);
                });
            } catch (error) {
                console.log("Couldn't Sign request");
                console.log(error);
                setSignButtonText("Couldn't sign request");
                setIsLoading(false);
            }
        } else {
            console.log("Couldn't find any Lens profile with this address");
        }
        // setIsLoading(false);
    }

    return (
        {
            accessToken: token,
            refreshToken: refreshToken,
            profile: lensProfile?.lensData,            
            isLoading: isLoading,
            loadingText: loadingText,
            loadingProfile: lensProfile?.isLoading,
            signButtonText: signButtonText,
            fetchLensToken: fetchLensToken
        }
    )
}

export default useLensAuth;