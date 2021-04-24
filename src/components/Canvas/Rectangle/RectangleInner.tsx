// Container for content in rectangle

import {Box} from '@chakra-ui/react';

const getBorderColor = (visible: boolean) => {
    return visible ? '#CCC' : 'transparent';
};

export const RectangleInner = ({
    selected,
    title,
    description,
}: {
    selected: boolean;
    title: string;
    description: string;
}) => {
    return (
        <Box
            border={`1px solid ${getBorderColor(selected)}`}
            transition="0.1s border-color ease-in-out"
            width="100%"
            height="100%"
            display="flex"
            padding="2px">
            <Box
                flex="1"
                border="3px dashed #101010"
                borderRadius="255px 15px 225px 15px/15px 225px 15px 255px"
                backgroundColor="white">
                {title}
                {description}
            </Box>
        </Box>
    );
};
