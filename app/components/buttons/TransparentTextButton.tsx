import React from 'react';
import BaseButton from './BaseButton';
import clsx from 'clsx';

export interface TransparentTextButtonProps {
    className?: string;
    title: string;
    onPress: () => void;
}

const TransparentTextButton = ({
    className,
    title,
    onPress,
}: TransparentTextButtonProps) => {
    return (
        <BaseButton
            className={clsx('bg-transparent px-0 py-0', className)}
            textClassName="text-jarvisPrimary text-base"
            title={title}
            onPress={onPress}
        />
    );
};

export default TransparentTextButton;
