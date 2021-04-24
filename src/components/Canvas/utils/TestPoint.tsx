import React, {FC} from 'react';

interface Props {
    top: number;
    left: number;
}
const TestPoint: FC<Props> = ({top, left}) => {
    return <div style={{position: 'fixed', top, left, border: '1px solid'}}></div>;
};
export default TestPoint;
