import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react';
import React, {FC} from 'react';
interface Props {
    isOpen: boolean;
    onClose: () => void;
    onClickConfirm: () => void;
}
const ConfirmDeleteDialog: FC<Props> = ({isOpen, onClose, onClickConfirm}) => {
    // const [isOpen, setIsOpen] = React.useState(false);
    // const onClose = () => setIsOpen(false);
    const cancelRef = React.useRef(null);

    return (
        <>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete TODO ?
                        </AlertDialogHeader>

                        <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onClickConfirm} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};
export default ConfirmDeleteDialog;
