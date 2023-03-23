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
import { useState } from "react";
import { useAccount } from "wagmi";

function CreateFirm() {
  const { isConnected } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [statusText, setStatusText] = useState("");

  const handleButtonClick = () => {
    setStatusText("Not implemented yet!");
  };

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
            <Text>{statusText}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleButtonClick}>
              Submit
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
