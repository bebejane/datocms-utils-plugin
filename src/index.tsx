import 'datocms-react-ui/styles.css';
import {
  connect,
  IntentCtx,
  RenderManualFieldExtensionConfigScreenCtx,
  RenderFieldExtensionCtx,
  RenderItemFormSidebarPanelCtx,
  ItemType,
  InitPropertiesAndMethods
} from 'datocms-plugin-sdk';
import { render } from './utils/render';
import ConfigScreen from './entrypoints/ConfigScreen';
import AdvancedSlugConfigScreen from './entrypoints/advanced-slug/AdvancedSlugConfigScreen'
import AdvancedSlugSidebar from './entrypoints/advanced-slug/AdvancedSlugSidebar'
import AdvancedSlug from './entrypoints/advanced-slug/AdvancedSlug'

import React from 'react'
import ReactDOM from 'react-dom'

const isDev = document.location.hostname === 'localhost';


connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />);
  },
  manualFieldExtensions(ctx: IntentCtx) {
    return [
      {
        id: 'advancedSlug',
        name: `Advanced Slug ${isDev ? ' (dev)' : ''}`,
        type: 'editor',
        fieldTypes: ['slug'],
        configurable: true
      },
    ];
  },
  itemFormSidebarPanels(itemType: ItemType, ctx: InitPropertiesAndMethods) {
    if (ctx.plugin.attributes.parameters.disable || ctx.plugin.attributes.parameters.hideSidebar)
      return []

    return [
      {
        id: 'sidebarAdvancedSlug',
        label: `Advanced Slug ${isDev ? ' (dev)' : ''}`,
        startOpen: true,
      },
    ];
  },
  renderItemFormSidebarPanel(sidebarPanelId, ctx: RenderItemFormSidebarPanelCtx) {
    if (ctx.plugin.attributes.parameters.hideSidebar)
      return null

    ReactDOM.render(
      <React.StrictMode>
        <AdvancedSlugSidebar ctx={ctx} />
      </React.StrictMode>,
      document.getElementById('root'),
    );
  },
  renderFieldExtension(fieldExtensionId: string, ctx: RenderFieldExtensionCtx) {
    if (ctx.plugin.attributes.parameters.disable)
      return null

    switch (fieldExtensionId) {
      case 'advancedSlug':
        return render(<AdvancedSlug ctx={ctx} />);
    }
  },
  renderManualFieldExtensionConfigScreen(fieldExtensionId: string, ctx: RenderManualFieldExtensionConfigScreenCtx) {
    ReactDOM.render(
      <React.StrictMode>
        <AdvancedSlugConfigScreen ctx={ctx} />
      </React.StrictMode>,
      document.getElementById('root'),
    );
  },
  validateManualFieldExtensionParameters(fieldExtensionId: string, parameters: Record<string, any>) {
    const errors: Record<string, string> = {};
    return errors;
  },
});
