import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
  Box,
} from "@chakra-ui/react";
import { useAccount } from "wagmi";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import {
  firmFactoryABI,
  firmFactoryContractAddress,
} from "@/config/firmFactory";
import { generateNonce } from "@/util/nonceUtil";
import { useEffect } from "react";
import { goerli } from "wagmi";

function CreateFirm() {
  const { address, isConnected } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const nonce = generateNonce();

  const { config } = usePrepareContractWrite({
    address: firmFactoryContractAddress,
    abi: firmFactoryABI,
    chainId: goerli.id,
    functionName: "createBarebonesFirm",
    args: [address, nonce],
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  //console.log("config", config);
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  useEffect(() => {
    console.log("mounting called");
  }, []);

  return (
    <>
      {isConnected ? (
        <Button onClick={onOpen}>Create</Button>
      ) : (
        <Box minHeight="10"></Box>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new company</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Create a barebone company with a one owner safe.</Text>
            {isLoading && <div>Check Wallet</div>}
            {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              disabled={!write}
              onClick={() => write?.()}
            >
              Create
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateFirm;
