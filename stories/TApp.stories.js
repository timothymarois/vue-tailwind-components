export default {
	title: 'Application/TApp'
};

export const DefaultState = () => ({
	template: 
	`
		<t-app>this is my app</t-app>
	`,
});

export const DarkModeOnState = () => ({
	template: 
	`
		<t-app dark>
            this is my app with dark mode on
        </t-app>
	`,
});


export const AutoDarkModeState = () => ({
	template: 
	`
		<t-app autoDarkMode>
            this is my app with auto dark mode on
        </t-app>
	`,
});
