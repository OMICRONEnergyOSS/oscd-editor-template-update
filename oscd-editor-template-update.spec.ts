/* eslint-disable @typescript-eslint/no-unused-expressions */
import { fixture, expect, html, waitUntil } from '@open-wc/testing';
import { restore, SinonSpy, spy } from 'sinon';

import {
  extension,
  lln0Selection,
  mmxuExceptSelection,
  mmxuSelection,
  nsdSpeced,
  customDataObjectInvalidCDC,
} from './oscd-editor-template-update.testfiles.js';
import './oscd-editor-template-update.js';
import OscdEditorTemplateUpdate from './oscd-editor-template-update.js';
import { EditEventV2, Insert, Remove } from '@omicronenergy/oscd-api';
import { TreeGrid } from '@openenergytools/tree-grid';
import { XMLEditor } from '@omicronenergy/oscd-editor';

customElements.define('oscd-editor-template-update', OscdEditorTemplateUpdate);

describe('NsdTemplateUpdater', () => {
  let plugin: OscdEditorTemplateUpdate;
  let editEventListener: SinonSpy;
  const editor = new XMLEditor();
  beforeEach(async () => {
    plugin = await fixture(
      html`<oscd-editor-template-update></oscd-editor-template-update>`,
    );

    editEventListener = spy();
    plugin.addEventListener('oscd-edit-v2', (event: EditEventV2) => {
      const { edit, title, squash } = event.detail;
      editor.commit(edit, { title, squash });
      editEventListener(event);
    });

    await new Promise(res => {
      setTimeout(res, 200);
    });
  });

  it('shows notification without loaded doc', () => {
    expect(plugin.shadowRoot?.querySelector('h1')).to.exist;
    expect(plugin.shadowRoot?.querySelector('tree-grid')).to.not.exist;
    expect(plugin.shadowRoot?.querySelector('md-fab')).to.not.exist;
  });

  describe('given a nsd specced document', () => {
    afterEach(restore);
    beforeEach(async () => {
      const doc = new DOMParser().parseFromString(nsdSpeced, 'application/xml');
      plugin.doc = doc;
      await plugin.updateComplete;
    });

    it('displays an action button', () =>
      expect(plugin.shadowRoot?.querySelector('md-fab')).to.exist);

    it('updates MMXU on action button click', async () => {
      const event = {
        detail: { id: 'MMXU$oscd$_c53e78191fabefa3' },
      } as CustomEvent;

      await plugin.onLNodeTypeSelect(event);

      await new Promise(resolve => {
        setTimeout(resolve, 0);
      });

      plugin.treeUI.selection = mmxuSelection;

      (plugin.shadowRoot?.querySelector('md-fab') as HTMLElement).click();
      await plugin.updateComplete;

      const inserts = editEventListener.args[0][0].detail.edit;
      const removes = editEventListener.args[1][0].detail.edit;
      expect(inserts).to.have.lengthOf(5);
      expect(removes).to.have.lengthOf(2);

      expect(
        ((inserts[0] as Insert).node as Element).getAttribute('id'),
      ).to.equal('MMXU$oscd$_b96484e663b92760');
      expect(
        ((inserts[1] as Insert).node as Element).getAttribute('id'),
      ).to.equal('Beh$oscd$_954939784529ca3d');
      expect(
        ((inserts[2] as Insert).node as Element).getAttribute('id'),
      ).to.equal('phsB$oscd$_65ee65af9248ae5d');
      expect(
        ((inserts[3] as Insert).node as Element).getAttribute('id'),
      ).to.equal('A$oscd$_ad714f2a7845e863');
      expect(
        ((inserts[4] as Insert).node as Element).getAttribute('id'),
      ).to.equal('stVal$oscd$_2ff6286b1710bcc1');

      expect(
        ((removes[0] as Remove).node as Element).getAttribute('id'),
      ).to.equal('MMXU$oscd$_c53e78191fabefa3');
      expect(
        ((removes[1] as Remove).node as Element).getAttribute('id'),
      ).to.equal('A$oscd$_41824603f63b26ac');
    }).timeout(5000);

    it('updates LLN0 on action button click', async () => {
      const event = {
        detail: { id: 'LLN0$oscd$_85c7ffbe25d80e63' },
      } as CustomEvent;
      await plugin.onLNodeTypeSelect(event);

      plugin.treeUI.selection = lln0Selection; // change selection
      await plugin.updateComplete;

      (plugin.shadowRoot?.querySelector('md-fab') as HTMLElement).click();
      await new Promise(res => {
        setTimeout(res, 200);
      });

      const inserts = editEventListener.args[0][0].detail.edit;
      const removes = editEventListener.args[1][0].detail.edit;

      expect(inserts).to.have.lengthOf(9);
      expect(removes).to.have.lengthOf(5);

      expect(
        ((inserts[0] as Insert).node as Element).getAttribute('id'),
      ).to.equal('LLN0$oscd$_70973585614987f4');
      expect(
        ((inserts[1] as Insert).node as Element).getAttribute('id'),
      ).to.equal('Mod$oscd$_ca3ec0d8276151d7');
      expect(
        ((inserts[2] as Insert).node as Element).getAttribute('id'),
      ).to.equal('origin$oscd$_8c586402c5f97d31');
      expect(
        ((inserts[3] as Insert).node as Element).getAttribute('id'),
      ).to.equal('SBOw$oscd$_59a179d1c87265eb');
      expect(
        ((inserts[4] as Insert).node as Element).getAttribute('id'),
      ).to.equal('origin$oscd$_a128160f5df91cfa');
      expect(
        ((inserts[5] as Insert).node as Element).getAttribute('id'),
      ).to.equal('Oper$oscd$_1c003786901c1473');
      expect(
        ((inserts[6] as Insert).node as Element).getAttribute('id'),
      ).to.equal('ctlModel$oscd$_40d881a91fe5c769');
      expect(
        ((inserts[7] as Insert).node as Element).getAttribute('id'),
      ).to.equal('orCat$oscd$_677850ccf85aee7a');
      expect(
        ((inserts[8] as Insert).node as Element).getAttribute('id'),
      ).to.equal('orCat$oscd$_8f842fc78e972b98');

      expect(
        ((removes[0] as Remove).node as Element).getAttribute('id'),
      ).to.equal('LLN0$oscd$_85c7ffbe25d80e63');
      expect(
        ((removes[1] as Remove).node as Element).getAttribute('id'),
      ).to.equal('Mod$oscd$_d63dba598ea9104c');
      expect(
        ((removes[2] as Remove).node as Element).getAttribute('id'),
      ).to.equal('Oper$oscd$_4974a5c5ec541314');
      expect(
        ((removes[3] as Remove).node as Element).getAttribute('id'),
      ).to.equal('SBOw$oscd$_4974a5c5ec541314');
      expect(
        ((removes[4] as Remove).node as Element).getAttribute('id'),
      ).to.equal('ctlModel$oscd$_f80264355419aeff');
    }).timeout(5000);

    it('does not update with same selection', async () => {
      const event = {
        detail: { id: 'LLN0$oscd$_85c7ffbe25d80e63' },
      } as CustomEvent;
      await plugin.onLNodeTypeSelect(event);

      expect(editEventListener.callCount, 'call count before').to.equal(0);

      (plugin.shadowRoot?.querySelector('md-fab') as HTMLElement).click();
      await new Promise(res => {
        setTimeout(res, 200);
      });

      expect(editEventListener.callCount, 'call count after').to.equal(0);
    });

    it('shows the data loss dialog if (part of) selection is not in tree', async () => {
      plugin.selectedLNodeType = plugin.doc!.querySelector('LNodeType')!;
      plugin.treeUI.tree = { foo: {} };
      plugin.treeUI.selection = { foo: {}, bar: {} };
      plugin.treeUI.requestUpdate = () => {};
      plugin.nsdSelection = { foo: {} };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (plugin as any).handleUpdateTemplate();
      await waitUntil(() => plugin.choiceDialog?.open);
      expect(plugin.choiceDialog?.open).to.be.true;
      expect(plugin.choiceDialog).shadowDom.to.equalSnapshot();
    });
  });

  describe("given a non nsd spec'd document", () => {
    afterEach(restore);
    beforeEach(async () => {
      const doc = new DOMParser().parseFromString(extension, 'application/xml');
      plugin.doc = doc;
      await plugin.updateComplete;
    });

    it('does not load non NSD ln classes', async () => {
      const event = { detail: { id: 'invalidLnClass' } } as CustomEvent;
      plugin.onLNodeTypeSelect(event);
      await new Promise(res => {
        setTimeout(res, 50);
      });

      expect(JSON.stringify(plugin.treeUI.tree)).to.equal('{}');
      expect(plugin.warningDialog?.getAttribute('open')).to.not.be.null;
    });

    it('notifies with LNodeType is referenced', async () => {
      const event = {
        detail: { id: 'LLN0$oscd$_85c7ffbe25d80e63' },
      } as CustomEvent;
      plugin.onLNodeTypeSelect(event);
      await new Promise(res => {
        setTimeout(res, 200);
      });

      expect(plugin.warningDialog?.getAttribute('open')).to.not.be.null;
      expect(
        plugin.warningDialog?.querySelector('form')?.textContent,
      ).to.include(
        `The selected logical node type is referenced. This plugin should be used during specification only.`,
      );
    });

    it('updates MMXU on action button click', async () => {
      const event = {
        detail: { id: 'MMXU$oscd$_c53e78191fabefa3' },
      } as CustomEvent;
      await plugin.onLNodeTypeSelect(event);
      await new Promise(res => {
        setTimeout(res, 0);
      });

      plugin.treeUI.selection = mmxuExceptSelection;
      await plugin.updateComplete;

      (plugin.shadowRoot?.querySelector('md-fab') as HTMLElement).click();
      await plugin.updateComplete;

      (
        plugin.choiceDialog?.querySelector('.button.proceed') as HTMLElement
      ).click();
      await plugin.updateComplete;

      const inserts = editEventListener.args[0][0].detail.edit;
      const removes = editEventListener.args[1][0].detail.edit;

      expect(inserts).to.have.lengthOf(5);
      expect(removes).to.have.lengthOf(1);

      expect(
        ((inserts[0] as Insert).node as Element).getAttribute('id'),
      ).to.equal('MMXU$oscd$_3027abc2662ec638');
      expect(
        ((inserts[1] as Insert).node as Element).getAttribute('id'),
      ).to.equal('Beh$oscd$_954939784529ca3d');
      expect(
        ((inserts[2] as Insert).node as Element).getAttribute('id'),
      ).to.equal('phsB$oscd$_65ee65af9248ae5d');

      expect(
        ((removes[0] as Remove).node as Element).getAttribute('id'),
      ).to.equal('MMXU$oscd$_c53e78191fabefa3');
    }).timeout(5000);

    it('updates the selected LNodeType when the description is changed', async () => {
      const event = {
        detail: { id: 'LLN0$oscd$_85c7ffbe25d80e63' },
      } as CustomEvent;
      plugin.onLNodeTypeSelect(event);
      await new Promise(res => {
        setTimeout(res, 0);
      });

      plugin.lnodeTypeDesc.value = 'New Description';
      await plugin.updateComplete;

      (plugin.shadowRoot?.querySelector('md-fab') as HTMLElement).click();
      await plugin.updateComplete;
      expect(editEventListener).to.have.been.called;
    });
  });

  describe('given a document with unsupported CDC', () => {
    afterEach(restore);
    beforeEach(async () => {
      const doc = new DOMParser().parseFromString(
        customDataObjectInvalidCDC,
        'application/xml',
      );
      plugin.doc = doc;
      await plugin.updateComplete;
      const treeUI = plugin.shadowRoot?.querySelector('tree-grid') as TreeGrid;
      if (treeUI) {
        treeUI.tree = {};
        treeUI.requestUpdate = () => {};
      }
      await treeUI.updateComplete;
    });

    it('shows a warning dialog when a lnode type has user defined DOs with unsupported CDC', async () => {
      const event = {
        detail: { id: 'MMXU$oscd$_c53e78191fabefa3' },
      } as CustomEvent;
      plugin.onLNodeTypeSelect(event);
      await new Promise(res => {
        setTimeout(res, 0);
      });

      plugin.treeUI.selection = mmxuSelection;
      await plugin.updateComplete;

      (plugin.shadowRoot?.querySelector('md-fab') as HTMLElement).click();
      await plugin.updateComplete;

      expect(plugin.warningDialog?.getAttribute('open')).to.not.be.null;
      expect(
        plugin.warningDialog?.querySelector('form')?.textContent,
      ).to.include(
        'The selected logical node type contains user-defined data objects with unsupported CDCs.',
      );
    });

    it('adds a data object to the tree when form is valid', async () => {
      const dialog = plugin.shadowRoot?.querySelector(
        'add-data-object-dialog',
      ) as HTMLElement & { show: () => void };
      dialog.show();

      const cdcSelect = dialog.shadowRoot?.querySelector(
        '#cdc-type',
      ) as HTMLSelectElement;
      const doNameField = dialog.shadowRoot?.querySelector(
        '#do-name',
      ) as HTMLInputElement;

      cdcSelect.value = 'WYE';
      doNameField.value = 'TestDO';

      cdcSelect.dispatchEvent(new Event('input', { bubbles: true }));
      doNameField.dispatchEvent(new Event('input', { bubbles: true }));
      // Submit the form
      const form = dialog.shadowRoot!.querySelector('form')!;
      form.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true }),
      );
      await plugin.updateComplete;

      expect(plugin.treeUI.tree).to.have.property('TestDO');
      expect(plugin.treeUI.tree.TestDO).to.include({
        type: 'WYE',
        tagName: 'DataObject',
        descID: '',
        presCond: 'O',
      });
    });

    it('does not add a data object if form is invalid', async () => {
      const dialog = plugin.shadowRoot?.querySelector(
        'add-data-object-dialog',
      ) as HTMLElement & { show: () => void };
      dialog.show();
      await plugin.updateComplete;
      const form = dialog.shadowRoot!.querySelector('form')!;
      form.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true }),
      );
      await plugin.updateComplete;
      expect(plugin.treeUI.tree).to.not.have.property('TestDO');
    });
  });
});
