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
import { hideVisually } from 'polished';
import { createStyledComponent, pxToEm } from '../styles';

type Props = {
  /**
   * Checked state of the input. Primarily for use with controlled
   * components. If this prop is specified, an `onChange` handler must also be
   * specified. See also: `defaultChecked`.
   */
  checked?: boolean,
  /** @Private CSS className */
  className?: string,
  /** Determines the position of the control relative to the label */
  controlPosition?: 'start' | 'end',
  /**
   * Initial checked state of the input; primarily for use with
   * uncontrolled components
   */
  defaultChecked?: boolean,
  /** Disables the input */
  disabled?: boolean,
  /** The checked icon */
  iconChecked: React$Element<*>,
  /** Ref for the input */
  inputRef?: (node: ?React$Component<*, *>) => void,
  /** Props to be applied directly to the root element rather than the input */
  rootProps?: Object,
  /** Indicates that the value of the input is invalid */
  invalid?: boolean,
  /** Label associated with the input element */
  label: string | React$Element<*>,
  /** Used to uniquely define a group of inputs */
  name?: string,
  /** Function called when a input is selected */
  onChange?: (event: SyntheticEvent<>) => void,
  /** Indicates that the user must select an option before submitting a form */
  required?: boolean,
  /** Available sizes */
  size?: 'small' | 'medium' | 'large' | 'jumbo',
  /** The type of HTML input */
  type: 'checkbox' | 'radio',
  /** The value of the input */
  value?: string
};

export const componentTheme = (baseTheme: Object) => {
  const colors = {
    background: baseTheme.color_white,
    regular: baseTheme.borderColor,
    checked: baseTheme.color_theme_60,
    focus: baseTheme.color_theme_60,
    hover: baseTheme.color_theme_70
  };

  return {
    ChoiceControl_backgroundColor: colors.background,
    ChoiceControl_backgroundColor_checked: colors.checked,
    ChoiceControl_backgroundColor_checkedHover: colors.hover,
    ChoiceControl_borderColor: colors.regular,
    ChoiceControl_borderColor_hover: colors.hover,
    ChoiceControl_borderColor_checked: colors.checked,
    ChoiceControl_borderColor_checkedHover: colors.hover,
    ChoiceControl_borderRadius: baseTheme.borderRadius_1,
    ChoiceControl_boxShadow_focus: `0 0 0 1px ${colors.background}, 0 0 0 2px ${colors.focus}`,
    ChoiceControl_marginHorizontal: baseTheme.space_inline_md,
    ChoiceControl_size: pxToEm(16),
    ChoiceControl_size_jumbo: pxToEm(24),

    ChoiceText_color_text: baseTheme.color_text_80,
    ChoiceText_fontSize: baseTheme.fontSize_ui,
    ChoiceText_fontSize_small: pxToEm(12),

    ...baseTheme
  };
};

const styles = {
  control: ({ disabled, controlPosition, size, theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);
    const rtl = theme.direction === 'rtl';
    const backgroundColor = disabled
      ? theme.backgroundColor_disabled
      : theme.ChoiceControl_backgroundColor;
    const controlDimensions =
      size === 'jumbo'
        ? theme.ChoiceControl_size_jumbo
        : theme.ChoiceControl_size;
    const controlAtEnd = controlPosition === 'end';

    return {
      alignItems: 'center',
      backgroundColor,
      borderColor: theme.ChoiceControl_borderColor,
      borderRadius: theme.ChoiceControl_borderRadius,
      borderStyle: 'solid',
      borderWidth: '1px',
      color: backgroundColor,
      content: ' ',
      display: 'inline-flex',
      flex: 'none',
      height: controlDimensions,
      justifyContent: 'center',
      marginLeft:
        (controlAtEnd && !rtl) || (!controlAtEnd && rtl)
          ? theme.ChoiceControl_marginHorizontal
          : 0,
      marginRight:
        (controlAtEnd && !rtl) || (!controlAtEnd && rtl)
          ? 0
          : theme.ChoiceControl_marginHorizontal,
      width: controlDimensions,

      '& svg': {
        fill: 'currentColor',
        height: 'auto',
        width: '100%'
      }
    };
  },
  input: ({ theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);

    return {
      ...hideVisually(),

      // NOTE: These hover styles are only needed for the "states" demo.
      // Otherwise they are applied from styles.root
      '&:hover,&[data-simulate-hover]': {
        '&:not(:disabled) + span': {
          borderColor: theme.ChoiceControl_borderColor_hover
        }
      },

      '&:focus,&[data-simulate-focus]': {
        '& + span': {
          boxShadow: theme.ChoiceControl_boxShadow_focus
        }
      },

      '&:checked,[type="checkbox"]:indeterminate': {
        '& + span': {
          backgroundColor: theme.ChoiceControl_backgroundColor_checked,
          borderColor: theme.ChoiceControl_borderColor_checked
        },

        '&:hover,&[data-simulate-hover]': {
          '& + span': {
            backgroundColor: theme.ChoiceControl_backgroundColor_checkedHover,
            borderColor: theme.ChoiceControl_borderColor_checkedHover
          }
        },

        '&:disabled': {
          '& + span': {
            backgroundColor: theme.ChoiceControl_borderColor,
            borderColor: theme.ChoiceControl_borderColor,
            color: theme.ChoiceControl_backgroundColor
          }
        }
      }
    };
  },
  root: ({ disabled, controlPosition, theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);
    const controlAtEnd = controlPosition === 'end';

    return {
      alignItems: 'center',
      cursor: !disabled && 'pointer',
      display: 'flex',
      position: 'relative',
      flexDirection: controlAtEnd && 'row-reverse',
      justifyContent: controlAtEnd && 'space-between',
      '&:hover,&[data-simulate-hover]': {
        '& span:first-of-type': {
          borderColor: !disabled && theme.ChoiceControl_borderColor_hover
        }
      }
    };
  },
  text: ({ disabled, size, theme: baseTheme }) => {
    const theme = componentTheme(baseTheme);

    return {
      color: disabled ? theme.color_text_disabled : theme.ChoiceText_color_text,
      fontSize:
        size === 'small'
          ? theme.ChoiceText_fontSize_small
          : theme.ChoiceText_fontSize
    };
  }
};

const Root = createStyledComponent('label', styles.root, {
  displayName: 'Choice',
  includeStyleReset: true
});
const Input = createStyledComponent('input', styles.input, {
  rootEl: 'input'
});
const Text = createStyledComponent('span', styles.text);
const Control = createStyledComponent('span', styles.control);

/**
 * Choice is base renderer for Checkbox and Radio.
 */
export default function Choice({
  checked,
  className,
  defaultChecked,
  disabled,
  iconChecked,
  inputRef,
  invalid,
  label,
  controlPosition = 'start',
  required,
  rootProps: otherRootProps,
  size = 'large',
  type,
  ...restProps
}: Props) {
  const rootProps = {
    className,
    disabled,
    controlPosition,
    ...otherRootProps
  };

  const inputProps = {
    'aria-invalid': invalid,
    'aria-required': required,
    checked,
    defaultChecked,
    disabled,
    innerRef: ref => {
      if (inputRef) {
        inputRef(ref);
      }
    },
    required,
    size,
    type,
    ...restProps // Note: Props are spread to input rather than Root
  };

  const controlProps = {
    disabled,
    controlPosition,
    size
  };

  const textProps = {
    disabled,
    size
  };

  return (
    <Root {...rootProps}>
      <Input {...inputProps} />
      <Control {...controlProps}>{iconChecked}</Control>
      <Text {...textProps}>{label}</Text>
    </Root>
  );
}
