/**
 * Copyright 2017 CA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */
import React from 'react';
import { createThemedComponent, mapComponentThemes } from '../themes';
import Choice, {
  componentTheme as choiceComponentTheme
} from '../Choice/Choice';
import IconChecked from '../Icon/IconRadioButtonCheck';

type Props = {
  /**
   * Checked state of the radio button. Primarily for use with controlled
   * components. If this prop is specified, an `onChange` handler must also be
   * specified. See also: `defaultChecked`.
   */
  checked?: boolean,
  /** @Private CSS className */
  className?: string,
  /** Determines the position of the control relative to the label */
  controlPosition?: 'start' | 'end',
  /**
   * Initial checked state of the radio button; primarily for use with
   * uncontrolled components
   */
  defaultChecked?: boolean,
  /** Disables the radio button */
  disabled?: boolean,
  /** Ref for the radio button */
  inputRef?: (node: ?React$Component<*, *>) => void,
  /** Props to be applied directly to the root element rather than the input */
  rootProps?: Object,
  /** Indicates that the value of the input is invalid */
  invalid?: boolean,
  /** Label associated with the input element */
  label: string | React$Element<*>,
  /** Used to uniquely define a group of radio buttons */
  name?: string,
  /** Function called when a radio button is selected */
  onChange?: (event: SyntheticEvent<>) => void,
  /** Indicates that the user must select an option before submitting a form */
  required?: boolean,
  /** Available sizes */
  size?: 'small' | 'medium' | 'large' | 'jumbo',
  /** The value of the radio button */
  value?: string
};

export const componentTheme = (baseTheme: Object) => {
  return {
    ...mapComponentThemes(
      {
        name: 'Choice',
        theme: choiceComponentTheme(baseTheme)
      },
      {
        name: 'Radio',
        theme: {
          RadioControl_borderRadius: '100%'
        }
      },
      baseTheme
    )
  };
};

const Root = createThemedComponent(Choice, ({ theme: baseTheme }) => {
  return {
    ...mapComponentThemes(
      {
        name: 'Radio',
        theme: componentTheme(baseTheme)
      },
      {
        name: 'Choice',
        theme: {}
      },
      baseTheme
    )
  };
});

/**
 * Radio allows users to select a single option from a set.
 */
export default function Radio({
  className,
  controlPosition = 'start',
  inputRef,
  rootProps: otherRootProps,
  size = 'large',
  ...restProps
}: Props) {
  const rootProps = {
    controlPosition,
    iconChecked: <IconChecked />,
    inputRef: ref => {
      if (inputRef) {
        inputRef(ref);
      }
    },
    rootProps: {
      className,
      ...otherRootProps
    },
    size,
    type: 'radio',
    ...restProps // Note: Props are spread to input rather than Root
  };

  return <Root {...rootProps} />;
}
