import React from 'react';
import BaseButton from './BaseButton';
import clsx from 'clsx';

export interface TransparentBorderButtonProps {
    className?: string;
    title: string;
    onPress: () => void;
}

const TransparentBorderButton = ({
    className,
    title,
    onPress,
}: TransparentBorderButtonProps) => {
    return (
        <BaseButton
            className={clsx('border-2 border-jarvisPrimary bg-transparent', className)}
            textClassName="text-jarvisPrimary"
            title={title}
            onPress={onPress}
        />
    );
};

export default TransparentBorderButton;
