import s from './AdvancedSlug.module.scss'
import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { Canvas, TextInput } from 'datocms-react-ui';
import { FiExternalLink } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import { parsePrefix } from './utils'

type PropTypes = {
  ctx: RenderFieldExtensionCtx;
};


export default function AdvancedSlug({ ctx }: PropTypes) {

  const fieldId = ctx.field.attributes.api_key;
  const slug = ctx.formValues[fieldId] as string
  const pathPrefix = parsePrefix(ctx.parameters.pathPrefix as string, ctx)
  const siteUrl = ctx.plugin.attributes.parameters.siteUrl as string

  const paths: string[] = [siteUrl, pathPrefix || ''].filter(p => p).map(p => !p.endsWith('/') ? p + '/' : p)
  const prefix = paths.join('')
  const url = `${prefix}${slug}`

  const [value, setValue] = useState(ctx.formValues[fieldId] as string | undefined)

  useEffect(() => {
    setValue(ctx.formValues[fieldId] as string)
  }, [ctx.formValues[fieldId], fieldId])


  return (
    <Canvas ctx={ctx}>
      <div className={s.container}>
        <div className={s.prefix}>{prefix}</div>
        <div className={s.slug}>
          <TextInput
            value={value}
            onChange={(value) => ctx.setFieldValue(fieldId, value)}
          />
        </div>
        <div className={s.link}>
          <a href={url} target="_new">
            <FiExternalLink />
          </a>
        </div>
      </div>
    </Canvas>
  );
}