import * as React from 'react';
export type TogglerProps={
    toggler:boolean,
    setToggler: React.Dispatch<React.SetStateAction<boolean>>
}