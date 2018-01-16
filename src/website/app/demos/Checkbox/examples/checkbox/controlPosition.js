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
import DemoForm from '../../components/DemoForm';
import Checkbox from '../../../../../../Checkbox';
import { FormFieldDivider } from '../../../../../../Form';

export default {
  id: 'control-position',
  title: 'Control Position',
  description: `Use the \`controlPosition\` prop to adjust the position of the
control relative to the label.`,
  scope: { Checkbox, DemoForm, FormFieldDivider },
  source: `
    <DemoForm>
      <Checkbox name="minerals" label="Quartz" value="quartz" />
      <FormFieldDivider />
      <Checkbox name="minerals" label="Magnetite" value="magnetite" controlPosition="end" />
    </DemoForm>
  `
};
