import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { authenticate_user, generateChallenge, getProfiles } from "../services/lens";
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
    const lensProfile = useLensProfile();
    const [isLoading, setIsLoading] = useState(false);
    const [screen, setScreenn] = useState(false);
    const [lensHandle, setLenseHandle] = useState("");
    const [loadingText, setLoadingText] = useState('Fetching lens profile');
    const [signButtonText, setSignButtonText] = useState("Sign-In with Lens");

    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState("");

    // hooks
    
    const networks = {
        polygon: {
          chainId: `0x${Number(80001).toString(16)}`,
          chainName: "Polygon Testnet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
          blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
        },
      };

    const connectWallet = async () => {
        setIsLoading(true);
        await window.ethereum.request({ method: "eth_requestAccounts"});
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        if (provider.network !== "matic"){
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        ...networks["polygon"]
                    },
                ],
            });
        }

        const account = provider.getSigner();
        const Address = await account.getAddress();
        console.log("Wallet connected:",Address);
        setAddress(Address);
        const Balance = ethers.utils.formatEther(await account.getBalance());
        setBalance(Balance);
        fetchLensToken(Address);

    }

    const fetchLensToken = async (walletAddress) => {
        console.log("signerAddress", walletAddress);
            try {
                const challenge = await generateChallenge(walletAddress);
                const signature = await signText(challenge);
                console.log("Got signature");

                authenticate_user(walletAddress, signature).then(data => {
                    console.log('Lens Tokens', data);
                    setToken(data['accessToken']);
                    localStorage.setItem('accessToken', data['accessToken']);
                });

                const userProfile = await getProfiles({
                    "ownedBy": [walletAddress],
                    "limit": 1
                });
                if (userProfile) {
                    console.log("Lens profiles", userProfile.data.profiles.items[0].handle);
                    setLenseHandle(userProfile.data.profiles.items[0].handle);
                }
                setIsLoading(false);
                setScreenn(true);

            } catch (error) {
                console.log("Couldn't Sign request");
                console.log(error);
                setSignButtonText("Couldn't sign request");
            }
    }

    return (
        {
            connectWallet: connectWallet,
            accessToken: token,
            isLoading: isLoading,
            loadingText: loadingText,
            screen: screen,
            lensHandle: lensHandle,
            fetchLensToken: fetchLensToken,
            address: address
            }
        )
    }
export default useLensAuth;