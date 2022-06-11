export default {
	title: 'Application/TPage'
};

export const DefaultState = () => ({
	template: 
	`
		<t-app>

            <t-nav>
            
                <div>
                    Nav Title
                </div>

                <div class="hidden md:ml-6 md:flex md:space-x-8">
                    <div>link 1</div>
                    <div>link 2</div>
                    <div>link 3</div>
                </div>

            </t-nav>

            <t-page offsetHeight="64">
                <div style="height:2000px">
                    This is my long page content
                    <br>
                    This is my long page content
                    <br>
                    This is my long page content
                    <br>
                    This is my long page content
                    <br>
                    This is my long page content
                </div>
            </t-page>

        </t-app>
	`,
});

// export const DarkModeOnState = () => ({
// 	template: 
// 	`
// 		<t-app dark>
//             this is my app with dark mode on
//         </t-app>
// 	`,
// });


// export const AutoDarkModeState = () => ({
// 	template: 
// 	`
// 		<t-app autoDarkMode>
//             this is my app with auto dark mode on
//         </t-app>
// 	`,
// });
