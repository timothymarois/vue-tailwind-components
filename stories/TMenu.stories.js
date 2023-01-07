import TMenu from '../src/components/Elements/TMenu.vue';
import TButton from '../src/components/Elements/TButton.vue';
import TCard from '../src/components/Elements/TCard.vue';

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
	methods: {
		menuChange(v) {
			this.menuOpen = v
		}
	},
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
			<t-menu :items="items" v-model="menuOpen">
				<template v-slot:opener>
					<t-button color="indigo" @click="menuOpen=!menuOpen">Open menu</t-button>
				</template>
			</t-menu>				
		</div>
		`,
});

export const Basic = (argTypes) => ({
	props: Object.keys(argTypes),
	components: { TMenu },
	methods: {
		menuChange(v) {
			this.menuOpen = v
		}
	},
    data: () => ({
        color: 'indigo',
		label: 'Menu',
		items: [
			{
				label: 'Home',
				value: 'home',
				disabled: false
			},
			{
				label: 'About',
				value: 'about',
				disabled: false
			},
			{
				label: 'About',
				value: 'about',
				color: 'red',
				hover: 'red',
				disabled: false
			},
			{
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
			<t-menu :items="items" label="Menu" />			
		</div>
		`,
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
				divider: true
			},
			{
				icon: 'arrow-right',
				label: 'Disabled',
				value: 'disabled',
				disabled: true
			}
		],
		menuOpen0: false,
		menuOpen: true,
		menuOpen2: false,
		menuOpen3: false,
		menuOpen4: false,
		menuOpen5: false,
		menuOpen6: false,
		menuOpen7: false,
		menuOpen8: false,
		menuOpen9: false,
		menuOpen10: false,
		menuOpen11: false,
		menuOpen12: false,
		menuOpen13: false
    }),
	template: 
	`

	<t-app>
		<t-page class="py-4">

	<div class="p-6">
		<div class="w-full flex flex-col space-y-4">
		
			<t-card title="Menu with button">
				<div class="w-full mx-auto flex flex-col items-center justify-between sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end">
					<t-menu v-model="menuOpen8" :items="items">
						<template v-slot:opener>
							<t-button color="indigo" @click="menuOpen8=!menuOpen8">Open menu (left)</t-button>
						</template>
					</t-menu>
					<t-menu v-model="menuOpen9" :items="items" side="right">
						<template v-slot:opener>
							<t-button color="indigo" @click="menuOpen9=!menuOpen9">Open menu (right)</t-button>
						</template>
					</t-menu>
				</div>
			</t-card>
			<t-card title="Menu with button and auto-detected sides">
				<div class="w-full mx-auto flex flex-col items-center justify-between sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end">
					<t-menu v-model="menuOpen10" :items="items">
						<template v-slot:opener>
							<t-button color="indigo" @click="menuOpen10=!menuOpen10">Open menu (left)</t-button>
						</template>
					</t-menu>
					<t-menu v-model="menuOpen11" :items="items">
						<template v-slot:opener>
							<t-button color="indigo" @click="menuOpen11=!menuOpen11">Open menu (right)</t-button>
						</template>
					</t-menu>
				</div>
			</t-card>
			<t-card title="Menu with custom content">
				<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-between sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end">
					<t-menu v-model="menuOpen12">
						<template v-slot:opener>
							<t-button color="indigo" @click="menuOpen12=!menuOpen12">Open menu (left)</t-button>
						</template>
						<template v-slot:content>
							Here's some custom content for inside the menu.
						</template>
					</t-menu>
					<t-menu v-model="menuOpen13" side="right">
						<template v-slot:opener>
							<t-button color="indigo" @click="menuOpen13=!menuOpen13">Open menu (right)</t-button>
						</template>
						<template v-slot:content>
							Here's some custom content for inside the menu. <div class="cursor-pointer" @click="menuOpen13=false">Close Menu</div>
						</template>
					</t-menu>
				</div>
			</t-card>
			<t-card title="Menu with no text">
				<div class="w-full mx-auto flex flex-col items-center justify-between sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end">
					<t-menu v-model="menuOpen5" :items="items">
						<template v-slot:opener>
							<div @click="menuOpen5=!menuOpen5">Open Menu</div>
						</template>
					</t-menu>
					<t-menu v-model="menuOpen6" :items="items" side="right">
						<template v-slot:opener>
						<div @click="menuOpen6=!menuOpen6">Open Menu</div>
						</template>
					</t-menu>
				</div>
			</t-card>
			<t-card title="Menu with min-width">
				<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-between sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end">
					<t-menu v-model="menuOpen4" :items="items" min-width="500">
						<template v-slot:opener>
							<t-button color="indigo" @click="menuOpen4=!menuOpen4">Open menu (left)</t-button>
						</template>
					</t-menu>
					<t-menu v-model="menuOpen7" :items="items" min-width="500">
						<template v-slot:opener>
							<t-button color="indigo" @click="menuOpen7=!menuOpen7">Open menu (right)</t-button>
						</template>
					</t-menu>
				</div>
			</t-card>
			<t-card title="Menu with max-height">
				<div class="w-full mx-auto space-y-4 flex flex-col items-center justify-between sm:space-y-0 sm:space-x-2 sm:flex-row sm:items-end">
					<t-menu v-model="menuOpen3" :items="items" max-height="100">
						<template v-slot:opener>
							<t-button color="indigo" @click="menuOpen3=!menuOpen3">Open menu (left)</t-button>
						</template>
					</t-menu>
					<t-menu v-model="menuOpen0" :items="items" max-height="100" side="right">
						<template v-slot:opener>
							<t-button color="indigo" @click="menuOpen0=!menuOpen0">Open menu (right)</t-button>
						</template>
					</t-menu>
				</div>
			</t-card>


			<t-card title="Menu with button and icon">
				<t-menu v-model="menuOpen2" :items="items">
					<template v-slot:opener>
						<t-button side="right" color="indigo" @click="menuOpen2=!menuOpen2" :iconRight="menuOpen2 ? 'chevron-up' : 'chevron-down'">
							Menu with button and icon
						</t-button>
					</template>
				</t-menu>
			</t-card>


			<t-card title="Menu: active option">
				<t-menu v-model="menuOpen" :items="items">
					<template v-slot:opener>
						<t-button side="right" color="indigo" @click="menuOpen=!menuOpen" :iconRight="menuOpen ? 'chevron-up' : 'chevron-down'">
							Menu with active state
						</t-button>
					</template>
				</t-menu>

				{{ menuOpen }}
			</t-card>


			<t-card title="Testing menu">
				<t-menu 
					:classes="{
						item: 'p-2'
					}"
					outlined
					direction="top"
					side="left"
					:items="items"
				>Manage</t-menu>
			</t-card>

		</div>

		

	</div>

		</t-page>	
	</t-app>
	`
});