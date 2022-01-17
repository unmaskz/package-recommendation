import React, { PropsWithChildren } from 'react';
import { Tree } from 'components/shared/Shared';
import { useControls } from 'components/controls/Controls';

export interface StepProps<T> {
    name: keyof T;
}

export function Step<T extends Tree>({
    children,
    name,
}: PropsWithChildren<StepProps<T>>) {
    const { step, tree } = useControls<T>();

    React.useEffect(() => {
        if (!Object.keys(tree).includes(name as string)) {
            console.warn(`Step component with name ${name} is not found in step tree!`);
        }
    }, [name, tree]);

    return <>{step === name && children}</>;
}