import {Box} from '@chakra-ui/react';
import {ElementStyle} from '../../../type';

type RectangleLocationContainerProps = {
    position: ElementStyle['position'];
    size: ElementStyle['size'];
    onSelect: () => void;
};

export const RectangleLocationContainer: React.FC<RectangleLocationContainerProps> = ({
    children,
    size,
    position,
    onSelect,
}) => {
    return (
        <Box
            position="absolute"
            style={{...size, ...position}}
            onMouseDown={() => onSelect()}
            onClick={(e) => e.stopPropagation()}>
            {children}
        </Box>
    );
};
