import clsx from 'clsx';
import React from 'react';

interface LineAnimationProps {
    leftWidth?: string;
    rightWidth?: string;
}

const LineAnimation: React.FC<LineAnimationProps> = ({
    leftWidth = 'w-2/3',
    rightWidth = 'w-1/3',
}) => {
    return (
        <div className="flex gap-2">
            <div className={clsx('animated-line-container', leftWidth)}>
                <div className="animated-line-mover"></div>
            </div>
            <div className={clsx('animated-line-container', rightWidth)}>
                <div className="animated-line-mover delay-half"></div>
            </div>
        </div>
    );
};

export default LineAnimation;
