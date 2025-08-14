import OscdMenuOpen from '@omicronenergy/oscd-menu-open';
import OscdMenuSave from '@omicronenergy/oscd-menu-save';
import OscdBackgroundEditV1 from '@omicronenergy/oscd-background-editv1';

import OscdEditorTemplateUpdate from '../oscd-editor-template-update.js';

customElements.define('oscd-menu-open', OscdMenuOpen);
customElements.define('oscd-menu-save', OscdMenuSave);
customElements.define('oscd-background-editv1', OscdBackgroundEditV1);
customElements.define('oscd-editor-template-update', OscdEditorTemplateUpdate);

export const plugins = {
  menu: [
    {
      name: 'Open File',
      translations: { de: 'Datei öffnen' },
      icon: 'folder_open',
      tagName: 'oscd-menu-open',
    },
    {
      name: 'Save File',
      translations: { de: 'Datei speichern' },
      icon: 'save',
      requireDoc: true,
      tagName: 'oscd-menu-save',
    },
  ],
  editor: [
    {
      name: 'Template Update',
      translations: { de: 'Template Update' },
      icon: 'copy_all',
      requireDoc: true,
      tagName: 'oscd-editor-template-update',
    },
    {
      name: 'Template Editor',
      translations: { de: 'Template Editor' },
      icon: 'edit',
      requireDoc: true,
      src: 'https://omicronenergyoss.github.io/oscd-editor-template/oscd-editor-template.js',
    },
    {
      name: 'Template Generator',
      translations: { de: 'Template Generator' },
      icon: 'add_box',
      requireDoc: true,
      src: 'https://omicronenergyoss.github.io/oscd-editor-template-generator/oscd-editor-template-generator.js',
    },
  ],
  background: [
    {
      name: 'EditV1 Events Listener',
      icon: 'none',
      requireDoc: true,
      tagName: 'oscd-background-editv1',
    },
    {
      name: 'Background Plugin for Wizard Events',
      src: 'https://omicronenergyoss.github.io/oscd-background-wizard-events/oscd-background-wizard-events.js',
      requireDoc: true,
      icon: 'none',
    },
  ],
};
