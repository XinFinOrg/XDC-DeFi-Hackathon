import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";
import { toast } from "@backpackapp-io/react-native-toast";

// NFT.storage 
import { STORAGE_API_KEY } from "@env"
const apiUrl = 'https://api.nft.storage/upload';
const storageApiKey = STORAGE_API_KEY;

import { AppContext } from "../context/AppProvider";

const PodcastMinter = ({ podcast, setPodcast }) => {
    const { currentWalletAddress, seed } = React.useContext(AppContext);

    const [modalVisible, setModalVisible] = useState(false);
    const [mintData, setMintData] = useState({});
    const { colors } = useTheme();

    // Function to mint a podcast
    const postPodcast = async (podcast) => {
        setModalVisible(true);
        // Upload podcast to IPFS (using HTTPS API)
        const file = new FormData();
        const name = podcast.name;
        const filename = podcast.uri;
        file.append(name, filename);

        try {
            fetch(apiUrl, {
                method: 'POST',
                body: podcast,
                headers: {
                    Authorization: `Bearer ${storageApiKey}`
                },
            }).then(async (url) => {
                await url.json().then(async (url) => {
                    toast.success(`Uploaded Audio to IPFS`);
                    toast.success(`ipfs://${url.value.cid}`);
                    // console.log('NFT.Storage URL:', `${JSON.stringify(url.value)}`);
                    console.log('IPFS URL:', `ipfs://${url.value.cid}`);
                    const ipfsurl = `ipfs://${url.value.cid}`
                    // console.log(url);
                    // Mint Podcast as NFT using IPFS and XRPL
                    console.log(`Minting Podcast ${podcast.name} on XRP  wallet ${currentWalletAddress}`)
                    //   const post = await XRPFunctions.mintToken(seed, podcast, ipfsurl);
                    //   console.log(post),
                    //   setMintData(post),
                    //   toast.success(`XRP NFT MINTED; ${mintData}`);
                    setModalVisible(!modalVisible);
                    // clear podcast;
                    setPodcast();
                })
            });
        } catch (err) {
            toast.error(`Fail: ${err}`);
        }
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Minting your {podcast.name} Podcast...</Text>
                        <ActivityIndicator size={20} style={styles.indicator} />

                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={() => postPodcast(podcast)}
            >
                <Text style={[styles.textStyle, { backgroundColor: colors.primary }]}>Mint Podcast</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    indicator: {
        margin: 20,
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default PodcastMinter;