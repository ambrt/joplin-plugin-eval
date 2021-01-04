import joplin from 'api';
import { MenuItemLocation, ToolbarButtonLocation } from 'api/types';
const {serializeError, deserializeError} = require('serialize-error');


joplin.plugins.register({
	onStart: async function() {
		await joplin.commands.register({
			name: 'evalHighlighted',
			iconName: 'fab fa-node-js',
			label: 'Eval text',
			execute: async () => {
				const selectedText = (await joplin.commands.execute('selectedText') as string);
				
				let evalResult
				try {
				 evalResult = await eval(selectedText)
				}catch(err){
					evalResult = JSON.stringify(serializeError(err))
				}

				await joplin.commands.execute('replaceSelection', `${selectedText}\n\n${evalResult}`);

			}
		})
		await joplin.views.menuItems.create('evalHighlightedMenu','evalHighlighted', MenuItemLocation.EditorContextMenu);
		await joplin.views.toolbarButtons.create('evalHighlightedToolbar', 'evalHighlighted', ToolbarButtonLocation.EditorToolbar);
	},
});
