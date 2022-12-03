import { ethers } from "ethers";
import ERC20Tokens from "../tokens/tokens.json";
import erc20ABI from "../contracts/erc20ABI.json";
import { getProfileForHandle } from "../services/lens";
import { useState } from "react";

const useSendTokens = () => {

    // let sendTokens = new Promise(function())
    const [isLoading, setIsLoading] = useState(false);

    const sendTokens = async (amount, lensHandle, addressFrom, tokenAddress = null) => {
        setIsLoading(true);
        const userProfile = await getProfileForHandle({handle: lensHandle});
        console.log("Address from receiver's handle",userProfile.data.profile.ownedBy);
        const ownerAddress = userProfile.data.profile.ownedBy;
        console.log("Entered the sendTokens function");
        let promise = new Promise(async function (resolve) {
            console.log("This is the amount and address", amount, ownerAddress);
            console.log("ERC20 Token USDc", ERC20Tokens.USDc);
            console.log("All ERC20 Tokens", Object.keys(ERC20Tokens));

            let ethersProvider;
            if (window.ethereum) {
                ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = ethersProvider.getSigner();
                console.log("Got signer");

                let currentGasPrice = await ethersProvider.getGasPrice();
                let gasPrice = ethers.utils.hexlify(parseInt(currentGasPrice));
                console.log("The Gas price is", parseInt(gasPrice));

                    // USDc address - 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174
                    if (tokenAddress) {
                        // sending an ERC20 token
                        let contract = new ethers.Contract(tokenAddress, erc20ABI, signer);
                        let numberOfTokens = ethers.utils.parseUnits(amount, 6);
                        console.log("Number of tokens", parseInt(numberOfTokens._hex));
                        let balance = await contract.balanceOf(addressFrom);
                        console.log("The user balance is ", parseInt(balance));
                        try {
                            
                            console.log("Address from receiver's handle",ownerAddress);
                            const transaction = await contract.transfer(ownerAddress, numberOfTokens);
                            const receipt = await transaction.wait();
                            console.log("Here is the transaction receipt", receipt);
                            console.dir(transaction);
                            console.log("Transaction success");
                            resolve (receipt);
                        } catch (error) {
                            console.log(error);
                            resolve (error);
                        }

                    } else {
                        // sending matic
                        const txn = {
                            from: addressFrom,
                            to: ownerAddress,
                            value: ethers.utils.parseEther(amount),
                            nonce: ethersProvider.getTransactionCount(
                                addressFrom,
                                "latest"
                            ),
                            gasLimit: ethers.utils.hexlify(100000),
                            gasPrice: gasPrice
                        }
                        console.log(txn);

                        try {
                            signer.sendTransaction(txn).then(async transaction => {
                                const receipt = await transaction?.wait();
                                console.dir(transaction);
                                console.log("Transaction finished");
                                // return transaction;
                                setIsLoading(false);
                                resolve (receipt);
                            });
                        } catch (error) {
                            console.log("Transaction failed");
                            setIsLoading(false);
                            resolve (error);
                        }
                    }
            }

        });
        console.log(promise);
        return promise;
    }

    return {
        sendTokens: sendTokens,
        isLoading: isLoading
    }
}
export default useSendTokens;