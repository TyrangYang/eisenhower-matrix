// location container handel rectangle position and size

import {Box} from '@chakra-ui/react';
import {RectangleStyleType} from '../../../type';

type RectangleLocationContainerProps = {
    position: RectangleStyleType['position'];
    size: RectangleStyleType['size'];
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
