/* eslint-disable no-underscore-dangle */

import classNames from 'classnames';
import React, { forwardRef } from 'react';

import Input from '@/components/common/Input/Input';
import styles from '@/components/common/Input/RadioInputForm/RadioInputForm.module.scss';
// import { ReactComponent as ButtonCheck } from '@/public/svgs/buttonCheck.svg';
// import { ReactComponent as ButtonUnCheck } from '@/public/svgs/buttonUnCheck.svg';
interface RadioInputFormProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  errorMessage?: string | undefined | null;
  labels?: string[];
  register?: React.Ref<HTMLInputElement>;
}

const RadioInputForm = forwardRef<HTMLInputElement, RadioInputFormProps>(
  ({ className = '', errorMessage = '', labels = ['', ''], register, ...rest }: RadioInputFormProps, ref) => {
    const { ...restProps } = rest;

    const classes = {
      inputFieldContainer: classNames(styles.RadioInputFieldContainer),
      inputComponent: classNames(styles.input, styles[className])
    };

    return (
      <div>
        <div className={classes.inputFieldContainer}>
          <label htmlFor="radioInput">
            <Input
              invalid={!!errorMessage}
              ref={register || ref}
              type="radio"
              className={classes.inputComponent}
              {...restProps}
              id="radioInput"
              required
              value="employer"
            />
            {labels[0]}
          </label>
        </div>
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        <div className={classes.inputFieldContainer}>
          <label htmlFor="radioInput">
            <Input
              invalid={!!errorMessage}
              ref={register || ref}
              type="radio"
              className={classes.inputComponent}
              {...restProps}
              id="radionInput"
              value="employee"
            />
            {labels[1]}
          </label>
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
        </div>
      </div>
    );
  }
);

export default RadioInputForm;
