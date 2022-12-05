import { RenderManualFieldExtensionConfigScreenCtx } from 'datocms-plugin-sdk';
import { Canvas, Form, TextField } from 'datocms-react-ui';
import { useCallback, useState } from 'react';
import { validPrefixKeys } from './utils'

type PropTypes = {
  ctx: RenderManualFieldExtensionConfigScreenCtx;
};

type Parameters = {
  pathPrefix: string | undefined,
  label: string | undefined,
  disableRoles: string | undefined,
  includePrefix: boolean
};
type Role = {
  name: string,
  id: string,
  enabled: boolean
}
type RoleMap = {
  [key: string]: Role
}
export default function AdvancedSlugConfigScreen({ ctx }: PropTypes) {

  const [formValues, setFormValues] = useState<Partial<Parameters>>(ctx.parameters);

  const update = useCallback((field: string, value: string | boolean) => {
    const validKeys = validPrefixKeys(ctx)
    const newParameters = { ...formValues, [field]: value };
    setFormValues(newParameters);
    ctx.setParameters(newParameters);
  }, [formValues, setFormValues, ctx.setParameters]);


  return (
    <Canvas ctx={ctx}>
      <Form>
        <p>
          <TextField
            id="path-prefix"
            value={formValues.pathPrefix}
            label="Base path"
            name="path-prefix"
            placeholder={'path/sub...'}
            onChange={update.bind(null, 'pathPrefix')}
          />
        </p>
        <p>
          <TextField
            id="label"
            value={formValues.label}
            label="Label"
            name="label"
            placeholder={'Title...'}
            onChange={update.bind(null, 'label')}
          />
        </p>
      </Form>
    </Canvas>
  );
}