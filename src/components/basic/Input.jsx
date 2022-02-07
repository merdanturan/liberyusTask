import React from 'react';
import cx from 'classnames';
import '../../assets/scss/components/Input.scss';

const Input = ({
    onChange,
    value,
    hidden,
    placeholder,
    type= "text",
    ...rest
}) => {

    const handleChange = e => {
        onChange && onChange(e.nativeEvent.target.value);
    };

    return (
        <label className='InputWrapper'>
            <input
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                type={type}
                {...rest}
                className={cx('Input', { "is-hidden": hidden })}
            />
        </label>
    );
};

export default Input;
