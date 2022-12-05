import { RenderItemFormSidebarPanelCtx } from 'datocms-plugin-sdk';
import { Canvas, Button } from 'datocms-react-ui';
import { parseUrl, parseTemplateString } from '../utils';

export type PropTypes = { ctx: RenderItemFormSidebarPanelCtx };

export default function AdvancedSlugSidebar({ ctx }: PropTypes) {
  
  const itemFields = ctx.itemType.relationships.fields.data.map((f) => f.id)
  const slugFieldId = Object.keys(ctx.fields).find(k => ctx.fields[k]?.attributes.field_type === 'slug' && ctx.fields[k]?.id && itemFields.includes(ctx.fields[k]?.id as string)) as string
  const slugField = ctx.fields[slugFieldId]
  const pathPrefix = slugField?.attributes.appearance.parameters.pathPrefix
  const label = parseTemplateString(slugField?.attributes.appearance.parameters.label as string, ctx) || 'Preview'
  const haveSlug = ctx.itemType.relationships.fields.data.find(f => f.id === slugFieldId)
  const url = haveSlug ? parseUrl(pathPrefix as string, ctx) : undefined;
  
  return (
    <Canvas ctx={ctx}>
      <Button 
        buttonSize={'xs'} 
        onClick={()=>window.open(url, '_new')?.focus()} 
        disabled={!url}
        fullWidth
      >
        {url ? label : 'No preview...'}
      </Button>
    </Canvas>
  );
}