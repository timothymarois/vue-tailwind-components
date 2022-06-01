import '../index.css'

import Vue from 'vue'
import VueComponents from '../src/components/index.js';
import {
    TApp,

    TAlert,
    TIcon,
    TLoader,
    TButton,
    TMenu,
    TModal,
    TOverlay,
    TCard,
    TBadge,
    TTooltip,
    TTabs,
    TTabContent,
    TAvatar,
    TNotify,
    TStepper,
    TProgressBar,

    TLabel,
    TTextField,
    TSelect,
    TCheckbox,
    TSwitch,

    TTableSimple,
    TPagination
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
    't-icon': {
		component: TIcon,
        props: {
            variants: {
                large: 'h-16 w-16',
                largeGreen: 'h-16 w-16 text-green-500'
            }
        }
	},

	// --------------------------------------------------

	't-label': {
		component: TLabel
	}, 
	't-checkbox': {
		component: TCheckbox,
		props: {
			variants: {
				red: {
					iconWrapper: 'bg-white h-5 w-5 border-2 border-red-800 rounded',
					iconSolid: 'h-3 w-3 bg-red-800 rounded-sm'
				},
				redRound: {
					iconWrapper: 'bg-white h-5 w-5 border-2 border-red-800 rounded-full',
					iconSolid: 'h-3 w-3 bg-red-800 rounded-full'
				}
			}
		}
	},
	't-text-field': {
		component: TTextField,
        props: {
            variants: {
				custom: {
					input: 'w-20 appearance-none py-0 pl-2 -mt-1 ml-0.5 border-t-0 border-r-0 border-l-0 border-gray-400 mr-1 font-semibold text-indigo-800 focus:ring-0 focus:border-indigo-700 focus:text-indigo-800'
				},
                icon: {
					input: 'w-full h-10 rounded text-sm focus:outline-none focus:ring-0 text-black border-gray-300 hover:bg-indigo-100 hover:border-indigo-900 focus:border-indigo-800 hover:text-indigo-900 pl-8'
				}
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