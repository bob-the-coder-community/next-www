import React from 'react';

type Props = {
    name: string;
    label: string;
    type: 'text' | 'email' | 'password' | 'tel' | 'number' | 'date' | 'datetime-local';
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    autoComplete?: 'on' | 'off';
    placeholder?: string;
    hasError?: boolean;
};
type State = {};

class Input extends React.PureComponent<Props, State> {
    render(): JSX.Element {
        const { 
            name, 
            label, 
            type, 
            value, 
            onChange, 
            autoComplete, 
            placeholder, 
            hasError
        } = this.props;

        return (
            <div className="form-group">
                <label htmlFor={name} className="required">{label}</label>
                <input
                    type={type}
                    name={name}
                    value={value || ''}
                    onChange={onChange || (() => null)}
                    className={`form-control ${ hasError && 'has-error' }`}
                    autoComplete={autoComplete || 'off'}
                    placeholder={placeholder}
                />
            </div>
        )
    }
}

export default Input;
