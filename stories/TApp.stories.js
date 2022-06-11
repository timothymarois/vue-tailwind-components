export default {
	title: 'Application/TApp'
};

export const DefaultState = () => ({
	template: 
	`
		<t-app>
			<div class="p-10">
				<t-card>this is my app</t-card>
			</div>
		</t-app>
	`,
});

export const DarkModeOnState = () => ({
	template: 
	`
		<t-app dark>
			<div class="p-10">
				<t-card>this is my app with DARK MODE</t-card>
			</div>
        </t-app>
	`,
});


export const AutoDarkModeState = () => ({
	template: 
	`
		<t-app autoDarkMode>
			<div class="p-10">
				<t-card>this is my app with AUTO DARK MODE</t-card>
			</div>
        </t-app>
	`,
});
