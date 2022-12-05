import type { RenderManualFieldExtensionConfigScreenCtx, RenderFieldExtensionCtx, RenderItemFormSidebarPanelCtx} from "datocms-plugin-sdk"
import slug from 'slug'
import { buildClient, Client } from '@datocms/cma-client-browser';

type PluginContext = RenderManualFieldExtensionConfigScreenCtx | RenderFieldExtensionCtx | RenderItemFormSidebarPanelCtx

export const stringToSlug = (str : string) : string => {
  return str
}
export const validPrefixKeys = (ctx: PluginContext) : string[] => {
  return Object.keys(ctx.fields)
    .filter(k => ctx.fields[k]?.attributes.field_type === 'string')
    .map(k => ctx.fields[k]?.attributes.api_key) as string[]
}

export const parseTemplateString = (s: string, ctx: RenderFieldExtensionCtx | RenderItemFormSidebarPanelCtx) : string | undefined => {

  if(!s) return undefined

  const validKeys = validPrefixKeys(ctx)
  let str = s;
  
  validKeys.forEach(k => {
    if(typeof ctx.item?.attributes[k] === 'string' && str.indexOf(`{${k}}`) > -1)
      str = str.replace(new RegExp(`{${k}}`, 'g'), ctx.item?.attributes[k] as string)
  })
  str = str.replace(new RegExp(`{LOCALE}`, 'g'), ctx.locale)
  return str

}

export const parsePrefix = (s: string, ctx: RenderFieldExtensionCtx | RenderItemFormSidebarPanelCtx) : string | undefined => {
  const str = parseTemplateString(s, ctx)?.toLowerCase()
  return str ? slug(str) : undefined
}


export const parseUrl = (s: string, ctx: RenderFieldExtensionCtx | RenderItemFormSidebarPanelCtx) : string | undefined => {

  const pathPrefix = parsePrefix(s, ctx)
  const siteUrl = ctx.plugin.attributes.parameters.siteUrl as string
  const paths : string[] = [siteUrl, pathPrefix || ''].filter(p => p).map(p => !p.endsWith('/') ? p + '/' : p)
  const slugFieldId = Object.keys(ctx.fields).find(k => ctx.fields[k]?.attributes.field_type === 'slug') as string

  if(!slugFieldId) return
  
  const slugField = ctx.fields[slugFieldId]  
  const slugValue = ctx.formValues[slugField?.attributes.api_key as string]
  const prefix = paths.join('')
  const url = `${prefix}${slugValue}`
  
  return url
}

export const getClient = (apiToken:string) : Client => {
  const client = buildClient({ apiToken });
  return client
}