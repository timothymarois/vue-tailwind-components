import '../index.css'

import Vue from 'vue'
import VueComponents from '../src/components/index.js';
import {
    TCard,
    TButton,
    TApp,
    TIcon,
	TCheckbox
} from '../src/components';

let settings = {
	't-app': {
		component: TApp,
		props: {
			replacedClasses: {
				wrapper: 'bg-gray-100 text-black dark:bg-gray-800 dark:text-white p-10'
			}
		}
	},
	't-card': {
		component: TCard,
		props: {
			variants: {
				red: {
					root: 'w-full bg-red-300 border-2 border-red-600'
				},
				fullRound: {
					root: 'w-full bg-white shadow rounded-full'
				}
			}
		}
	},
	't-button': {
		component: TButton
	},
	't-checkbox': {
		component: TCheckbox
	},
    't-icon': {
		component: TIcon,
        props: {
            variants: {
                large: 'h-16 w-16',
                largeGreen: 'h-16 w-16 text-green-500'
            }
        }
	}
}

Vue.use(VueComponents, settings);

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
}