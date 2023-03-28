import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'tiptap',
	name: 'TipTap',
	icon: 'text_fields',
	description: 'Tip Tap editor',
	component: InterfaceComponent,
	types: ['json'],
	group: "standard",
	options: null,
});
