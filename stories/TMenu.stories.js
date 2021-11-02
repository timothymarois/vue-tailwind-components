import TMenu from '../src/components/Elements/TMenu.vue';
import TButton from '../src/components/Elements/TButton.vue';
import TCard from '../src/components/Elements/TCard.vue'

export default {
	title: 'ELEMENTS/TMenu',
	component: TMenu,
	argTypes: { 
		color: {
			name: 'color',
			defaultValue: 'indigo',
			description: 'Tailwind classname for outline and fill color',
			control: { type: 'text' }
		},
		label: {
			name: 'label',
			description: 'Toggle text-only button'
		}
	},
};

export const Standard = (argTypes) => ({
	props: Object.keys(argTypes),
	components: { TMenu, TButton },
    data: () => ({
        color: 'indigo',
		label: 'Menu',
		items: [
			{
				icon: 'arrow-right',
				label: 'Home',
				value: 'home',
				disabled: false
			},
			{
				icon: 'arrow-right',
				label: 'About',
				value: 'about',
				disabled: false
			},
			{
				icon: 'arrow-right',
				label: 'About',
				value: 'about',
				color: 'red',
				hover: 'red',
				disabled: false
			},
			{
				icon: 'arrow-right',
				label: 'Disabled',
				value: 'disabled',
				disabled: true
			}
		],
		menuOpen: false
    }),
	template: 
	`
		<div>
			<div class="ml-10 mt-5 absolute bottom-0" style="width:100px">
				<t-menu :items="items" label="Menu" />
			</div>

			<div class="ml-10 mt-5 float-right" style="width:100px">
				<t-menu :items="items" label="Menu"/>
			</div>
		</div>
	`
});

export const MultipleStates = (argTypes) => ({
	props: Object.keys(argTypes),
	components: { TMenu, TButton, TCard },
    data: () => ({
        color: 'indigo',
		label: 'Menu',
		items: [
			{
				icon: 'arrow-right',
				label: 'Home',
				value: 'home',
				disabled: false
			},
			{
				icon: 'arrow-right',
				label: 'About',
				value: 'about',
				disabled: false
			},
			{
				icon: 'arrow-right',
				label: 'About',
				value: 'about',
				color: 'red',
				hover: 'red',
				disabled: false
			},
			{
				icon: 'arrow-right',
				label: 'Disabled',
				value: 'disabled',
				disabled: true
			}
		],
		menuOpen: false
    }),
	template: 
	`
	<div class="p-6 bg-gray-100">
		<div class="w-full flex flex-col space-y-4">
			<t-card title="Menu with no text">
				<div class="w-full mx-auto flex flex-col items-center justify-between sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end">
					<t-menu :items="items">
						<template v-slot:opener>
							Open menu (left)
						</template>
					</t-menu>
					<t-menu :items="items" side="right">
						<template v-slot:opener>
							Open menu (right)
						</template>
					</t-menu>
				</div>
			</t-card>
			<t-card title="Menu with button">
				<div class="w-full mx-auto flex flex-col items-center justify-between sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end">
					<t-menu :items="items">
						<template v-slot:opener>
							<t-button color="indigo">Open menu (left)</t-button>
						</template>
					</t-menu>
					<t-menu :items="items" side="right">
						<template v-slot:opener>
							<t-button color="indigo">Open menu (right)</t-button>
						</template>
					</t-menu>
				</div>
			</t-card>
			<t-card title="Menu with button and auto-detected sides">
				<div class="w-full mx-auto flex flex-col items-center justify-between sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end">
					<t-menu :items="items">
						<template v-slot:opener>
							<t-button color="indigo">Open menu (left)</t-button>
						</template>
					</t-menu>
					<t-menu :items="items">
						<template v-slot:opener>
							<t-button color="indigo">Open menu (right)</t-button>
						</template>
					</t-menu>
				</div>
			</t-card>
			<t-card title="Menu with custom content">
				<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-between sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end">
					<t-menu>
						<template v-slot:opener>
							<t-button color="indigo">Open menu (left)</t-button>
						</template>
						<template v-slot:content>
							Here's some custom content for inside the menu.
						</template>
					</t-menu>
					<t-menu side="right">
						<template v-slot:opener>
							<t-button color="indigo">Open menu (right)</t-button>
						</template>
						<template v-slot:content>
							Here's some custom content for inside the menu.
						</template>
					</t-menu>
				</div>
			</t-card>
			<t-card title="Menu with min-width">
				<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-between sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end">
					<t-menu :items="items" min-width="500">
						<template v-slot:opener>
							<t-button color="indigo">Open menu (left)</t-button>
						</template>
					</t-menu>
					<t-menu :items="items" min-width="500">
						<template v-slot:opener>
							<t-button color="indigo">Open menu (right)</t-button>
						</template>
					</t-menu>
				</div>
			</t-card>
			<t-card title="Menu with max-height">
				<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-between sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end">
					<t-menu :items="items" max-height="100">
						<template v-slot:opener>
							<t-button color="indigo">Open menu (left)</t-button>
						</template>
					</t-menu>
					<t-menu :items="items" max-height="100" side="right">
						<template v-slot:opener>
							<t-button color="indigo">Open menu (right)</t-button>
						</template>
					</t-menu>
				</div>
			</t-card>
		</div>

		<div class="ml-10 mt-5">
			<t-menu :items="items" side="left" @menu-open="menuOpen = !menuOpen" min-width="300">
				<t-button :color="indigo" :iconRight="menuOpen ? 'chevron-up' : 'chevron-down'">
					Menu with button and icon
				</t-button>
			</t-menu>
		</div>

	</div>
	`
});